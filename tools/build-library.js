/*
  يحوّل ملفات الأنظمة الخام في sources/ إلى مكتبة مِداد بصيغة JSON.
      node tools/build-library.js
  لا يضيف أي اعتمادية. الملفات الخام تبقى في sources/ مرجعًا يُرجع إليه.
  قاعدة ملزمة: لا يُخترع نص ولا يُصحَّح متن. ما لا يُقرأ بثقة يُترك ويُعلن في التقرير.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "sources");
const OUT = path.join(__dirname, "..", "library", "anzima.json");
const norm = (s) => s.normalize("NFC").replace(/[‎‏⁦-⁩﻿]/g, "");
const clean = (s) => String(s || "").replace(/^[‐-―]{5,}$/gm, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

// كتل @الحواشي و@إحالات حواشٍ تحريرية لا متون، وهي في ملف الشركات مشوّهة الاستخراج؛ تُسقط دائمًا.
const DROP_FIELDS = new Set(["الحواشي", "إحالات", "إحالات_المصدر", "مراجع"]);

/* يقسّم ملفًا مُرمَّزًا بـ ## إلى كتل، وكل كتلة إلى حقول @مفتاح */
function blocks(text, marker) {
  const re = new RegExp(`^${marker} (.+)$`, "gm");
  const out = [];
  let m, prev = null;
  while ((m = re.exec(text))) {
    if (prev) out.push({ title: prev.title, body: text.slice(prev.end, m.index) });
    prev = { title: m[1].trim(), end: re.lastIndex };
  }
  if (prev) out.push({ title: prev.title, body: text.slice(prev.end) });
  return out.map((b) => ({ title: b.title, fields: fields(b.body) }));
}
function fields(body) {
  const f = {};
  const lines = body.split("\n");
  let cur = null, buf = [];
  // الحقل قد يتكرر داخل الكتلة الواحدة (مادة لائحية تقتبس أكثر من نص)، فتُجمع كلها لا يُكتفى بآخرها.
  const flush = () => { if (cur) { const v = clean(buf.join("\n")); if (v) f[cur] = f[cur] ? `${f[cur]}\n\n${v}` : v; } cur = null; buf = []; };
  for (const l of lines) {
    const m = l.match(/^@([^:\n]{1,40}):\s?(.*)$/);
    if (m) { flush(); cur = m[1].trim(); buf = [m[2]]; }
    else if (cur) buf.push(l);
  }
  flush();
  for (const k of Object.keys(f)) if (DROP_FIELDS.has(k)) delete f[k];
  return f;
}
const AR = "٠١٢٣٤٥٦٧٨٩";
const toWestern = (s) => String(s).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));

/* المصادر وكيفية قراءة كل واحد. صريحة لا مستنتجة، ليُراجعها إنسان. */
const PLAN = [
  { file: "01_نظام_المعاملات_المدنية 2.txt", system: "نظام المعاملات المدنية", kind: "md", textKeys: ["نص", "النص"] },
  { file: "02_نظام_الإثبات 2.txt", system: "نظام الإثبات", kind: "md", textKeys: ["نص", "النص"] },
  { file: "03_الأدلة_الإجرائية_لنظام_الإثبات 2.txt", system: "الأدلة الإجرائية لنظام الإثبات", kind: "md", textKeys: ["نص", "النص"] },
  { file: "04_نظام_المرافعات_الشرعية_ولائحته_التنفيذية.txt", system: "نظام المرافعات الشرعية", kind: "md", textKeys: ["النظام", "نص", "النص"], regKey: "اللائحة" },
  { file: "05_اللائحة_التنفيذية_لطرق_الاعتراض_على_الأحكام.txt", system: "اللائحة التنفيذية لطرق الاعتراض على الأحكام", kind: "md", textKeys: ["النص", "نص"] },
  { file: "06_لائحة_الوثائق_القضائية.txt", system: "لائحة الوثائق القضائية", kind: "md", textKeys: ["النص", "نص"] },
  { file: "07_قواعد_التوزيع_الداخلي_للدعاوى.txt", system: "قواعد التوزيع الداخلي للدعاوى", kind: "md", textKeys: ["النص", "نص"] },
  { file: "08_لائحة_قسمة_الأموال_المشتركة.txt", system: "لائحة قسمة الأموال المشتركة", kind: "md", textKeys: ["النص", "نص"] },
  { file: "11_نظام_التوثيق_ولائحته_التنفيذية.txt", system: "نظام التوثيق", kind: "md", textKeys: ["النظام", "النص", "نص"], regKey: "اللائحة" },
  { file: "نظام_الشركات_ولائحته_التنفيذية_مفهرس_نهائي.txt", system: "نظام الشركات", kind: "md", textKeys: ["النظام", "النص", "نص"], regKey: "اللائحة" },
  { file: "نظام_ضمان_الحقوق_بالأموال_المنقولة_ولائحته_التنفيذية_نص_مراجع.txt", system: "نظام ضمان الحقوق بالأموال المنقولة", kind: "md", textKeys: ["النظام", "النص", "نص"], regKey: "اللائحة" },
  { file: "نظام_مكافحة_الاحتيال_المالي_وخيانة_الأمانة_مفهرس.txt", system: "نظام مكافحة الاحتيال المالي وخيانة الأمانة", kind: "md", textKeys: ["النظام", "النص", "نص"] },
  { file: "مرجع_نظام_الإفلاس_منقح.txt", system: "نظام الإفلاس", kind: "md", textKeys: ["النص", "نص"], refFromTitle: true },
  // نص خام: عنوان المادة سطر مستقل ينتهي بنقطتين
  { file: "06_نظام_التنفيذ.txt", system: "نظام التنفيذ", kind: "headings" },
  // نص خام: الترقيم «فقرة/مادة» بأرقام هندية في سطر مستقل
  { file: "07_اللائحة_التنفيذية_لنظام_التنفيذ.txt", system: "اللائحة التنفيذية لنظام التنفيذ", kind: "slashnum" },
];
// تُترك عمدًا: تحتاج معالجة مستقلة، ولا تُستورد بالتخمين.
const SKIPPED = [
  ["نظام_المحاكم_التجارية_ولائحته_التنفيذية_مفهرس_مراجع.txt", "ترقيمان متداخلان: @رقم يعطي 281 قيمة فريدة بينما الملف يعلن أن مواد النظام 96، والحقول تتكرر داخل الكتلة الواحدة. استيراده بالتخمين يُنتج أرقام مواد خاطئة."],
  ["09_ملاحق_محاضر_وقواعد_قضائية.txt", "ملاحق ومحاضر لا مواد مرقّمة، بنيتها لا تحتمل التقسيم إلى مواد."],
  ["المبادئ والقرارات.txt", "مبادئ قضائية لا نصوص نظامية، ومصادرها (رقم الحكم والسنة) مشوّشة الاستخراج من الـPDF. مكانها «مكتبتي الشخصية» بعد معالجة مستقلة."],
];

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".txt"));
const byName = (n) => files.find((f) => norm(f) === norm(n));
const read = (n) => fs.readFileSync(path.join(SRC, byName(n)), "utf8");

const statutes = [];
const report = [];
// المسار البنيوي (القسم > الباب > الفصل > الفرع) يحمل موضوع المادة، وهو ما يجعلها قابلة
// للعثور بالبحث ويمنح النموذج سياقها. مثال: فصل التقادم في نظام المعاملات المدنية لا ترد
// كلمة «التقادم» في متن أي مادة من مواده الاثنتي عشرة، بل في مسارها وحده.
const push = (system, ref, text, source, path) => {
  const t = clean(text);
  if (!ref || !t || t.length < 12) return false;
  statutes.push({ ref, system, text: t, path: clean(path || ""), version: "", effective: "", source: source || "" });
  return true;
};

for (const p of PLAN) {
  const name = byName(p.file);
  if (!name) { report.push({ system: p.system, file: p.file, count: 0, note: "الملف غير موجود" }); continue; }
  const raw = read(p.file);
  const src = (raw.match(/^@المصدر:\s*(.+)$/m) || raw.match(/^@أداة_إصدار_النظام:\s*(.+)$/m) || [])[1] || "";
  const before = statutes.length;
  let skippedNoNum = 0;

  if (p.kind === "md" || p.kind === "md2") {
    const cfg = p.kind === "md2" ? p.tier1 : { marker: "##", textKeys: p.textKeys, numKey: "رقم" };
    for (const b of blocks(raw, cfg.marker)) {
      if (/^\[/.test(b.title)) continue; // الديباجة والمرسوم
      const num = b.fields[cfg.numKey];
      const text = cfg.textKeys.map((k) => b.fields[k]).find(Boolean);
      if (!text) { skippedNoNum++; continue; }
      const ref = num ? `المادة (${toWestern(num)})` : (p.refFromTitle ? b.title.replace(/\s*—.*$/, "").trim() : null);
      if (!ref) { skippedNoNum++; continue; }
      const reg = p.regKey ? b.fields[p.regKey] : "";
      push(p.system, ref, reg ? `${text}\n\n[اللائحة التنفيذية]\n${reg}` : text, src, b.fields["مسار"] || b.fields["المسار"] || "");
    }
    if (p.kind === "md2") {
      const t2 = p.tier2;
      for (const b of blocks(raw, t2.marker)) {
        const num = b.fields[t2.numKey];
        const text = t2.textKeys.map((k) => b.fields[k]).find(Boolean);
        if (!num || !text) { skippedNoNum++; continue; }
        push(t2.system, `المادة (${toWestern(num)})`, text, src, b.fields["مسار_اللائحة"] || "");
      }
    }
  } else if (p.kind === "headings") {
    const re = /^(المادة [^\n:]{2,60}):\s*$/gm;
    const hits = [...raw.matchAll(re)];
    hits.forEach((h, i) => {
      const body = raw.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : undefined);
      push(p.system, h[1].trim(), body, src);
    });
  } else if (p.kind === "slashnum") {
    const re = /^([٠-٩]+\/[٠-٩]+)\s*$/gm;
    const hits = [...raw.matchAll(re)];
    hits.forEach((h, i) => {
      const body = raw.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : undefined);
      push(p.system, `المادة (${toWestern(h[1])})`, body, src);
    });
  }
  const declared = (raw.match(/^@(?:عدد_المواد|عدد_القواعد|عدد_مواد_النظام):\s*(\d+)/m) || [])[1];
  const count = statutes.length - before;
  report.push({ system: p.system, count, declared: declared ? +declared : null, skipped: skippedNoNum });
}

// تحقق: لا مادة مكررة في نظام واحد، ولا نص فارغ
const seen = new Map();
const dupes = [];
for (const s of statutes) {
  const k = `${s.system}|${s.ref}`;
  if (seen.has(k)) dupes.push(k); else seen.set(k, 1);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ midad: "library", version: 1, builtAt: new Date().toISOString().slice(0, 10), statutes, principles: [] }));

console.log("النظام".padEnd(44), "قُرئ", "معلن", "تحقق");
console.log("─".repeat(72));
let mismatched = 0;
for (const r of report) {
  const ok = r.declared == null ? "— بلا عدد معلن" : r.count === r.declared ? "✓ مطابق" : "✗ اختلاف";
  if (r.declared != null && r.count !== r.declared) mismatched++;
  console.log(r.system.padEnd(44), String(r.count).padStart(4), String(r.declared == null ? "-" : r.declared).padStart(5), " " + ok);
}
console.log("─".repeat(72));
const grouped = {};
for (const s of statutes) grouped[s.system] = (grouped[s.system] || 0) + 1;
console.log("المجموع".padEnd(46), String(statutes.length).padStart(5), " أنظمة:", Object.keys(grouped).length);
console.log("مكرر:", dupes.length, dupes.length ? dupes.slice(0, 5) : "", "| اختلاف عن المعلن:", mismatched);
console.log("حجم الملف:", (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), "م.ب");
console.log("\nتُركت عمدًا:");
for (const [f, why] of SKIPPED) console.log("  •", f, "—", why);
