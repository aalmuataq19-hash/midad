// مِداد القاضي — قراءة JSON من إجابة النموذج وإصلاحها.
// وحدة مستقلة عن الواجهة حتى تُختبر بـ node --test، ويضمّها esbuild في app.js.
"use strict";

const CTRL = { 8: "\\b", 9: "\\t", 10: "\\n", 12: "\\f", 13: "\\r" };

// يزيل أسوار markdown و علامة BOM ويقصّ الفراغ.
function stripFences(t) {
  return String(t == null ? "" : t)
    .replace(/^﻿/, "")
    .replace(/```[A-Za-z]*[ \t]*\r?\n?/g, "")
    .trim();
}

// يزيل الفاصلة الزائدة قبل } أو ] دون المساس بما بداخل السلاسل النصية.
function stripTrailingCommas(s) {
  let out = "", inStr = false, esc = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inStr) {
      out += ch;
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; out += ch; continue; }
    if (ch === ",") {
      let j = i + 1;
      while (j < s.length && /\s/.test(s[j])) j++;
      if (s[j] === "}" || s[j] === "]") continue; // فاصلة زائدة تُسقط
    }
    out += ch;
  }
  return out;
}

// يمشي على النص من موضع بداية محتمل، ويبني نسخة نظيفة مع نقاط توقف آمنة.
function scan(src, start) {
  let out = "", inStr = false, esc = false, completeLen = -1;
  const stack = [], checkpoints = [];
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) { out += ch; esc = false; continue; }
      if (ch === "\\") { out += ch; esc = true; continue; }
      if (ch === '"') { out += ch; inStr = false; continue; }
      const code = src.charCodeAt(i);
      // سطر جديد أو حرف تحكم داخل قيمة نصية يجعل JSON غير صالح، فيُهرَّب.
      out += code < 0x20 ? (CTRL[code] || "\\u" + code.toString(16).padStart(4, "0")) : ch;
      continue;
    }
    if (ch === '"') { inStr = true; out += ch; continue; }
    out += ch;
    if (ch === "{" || ch === "[") { stack.push(ch); continue; }
    if (ch === "}" || ch === "]") {
      stack.pop();
      if (stack.length === 0) { completeLen = out.length; break; }
      checkpoints.push({ len: out.length, stack: stack.slice() });
      continue;
    }
    if (ch === "," && stack.length) checkpoints.push({ len: out.length - 1, stack: stack.slice() });
  }
  return { out, stack, checkpoints, completeLen, inStr };
}

const closers = (stack) => { let s = ""; for (let i = stack.length - 1; i >= 0; i--) s += stack[i] === "{" ? "}" : "]"; return s; };
const tryParse = (s) => { try { return { ok: true, value: JSON.parse(s) }; } catch { return { ok: false }; } };

function fromCandidate(src, start) {
  const { out, stack, checkpoints, completeLen, inStr } = scan(src, start);
  if (completeLen >= 0) {
    const r = tryParse(stripTrailingCommas(out.slice(0, completeLen)));
    if (r.ok) return r;
  }
  // مقطوع: نرجع إلى آخر عنصر مكتمل ثم نغلق ما بقي مفتوحًا.
  for (let i = checkpoints.length - 1; i >= 0; i--) {
    const cp = checkpoints[i];
    const r = tryParse(stripTrailingCommas(out.slice(0, cp.len) + closers(cp.stack)));
    if (r.ok) return r;
  }
  if (stack.length) {
    const tail = (inStr ? '"' : "") + closers(stack);
    const r = tryParse(stripTrailingCommas(out.replace(/,\s*$/, "") + tail));
    if (r.ok) return r;
  }
  return { ok: false };
}

// يعيد كائن JSON من إجابة النموذج مهما كان حولها من نص أو أسوار أو قطع.
function repairJSON(t) {
  const src = stripFences(t);
  if (!src) throw new Error("الإجابة فارغة");
  let tried = 0;
  for (let i = 0; i < src.length && tried < 25; i++) {
    const ch = src[i];
    if (ch !== "{" && ch !== "[") continue;
    tried++;
    const r = fromCandidate(src, i);
    if (r.ok && r.value && typeof r.value === "object") return r.value;
  }
  throw new Error(tried ? "تعذر إصلاح JSON في الإجابة" : "لا يوجد JSON في الإجابة");
}

function pj(t) {
  try { return repairJSON(t); }
  catch (e) {
    throw Object.assign(new Error(`تعذرت قراءة إجابة النموذج (${e.message}). بدايتها: ${String(t || "").slice(0, 100)}`), { raw: t, parseFail: true });
  }
}

// الطبقة الثالثة: يُرسل النص للنموذج ليصلحه حين تعجز الطبقتان قبله.
function createPjOrFix(fix) {
  return async function pjOrFix(text, signal) {
    try { return pj(text); }
    catch (e1) {
      if (!e1.parseFail) throw e1;
      return pj(await fix(String(text == null ? "" : text).slice(0, 60000), signal));
    }
  };
}

module.exports = { repairJSON, pj, createPjOrFix, stripFences, stripTrailingCommas };
