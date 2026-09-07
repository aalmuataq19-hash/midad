/*
  محرك تحليل مِداد في سطر الأوامر — يُستعمل من أمر /midad-analyze في Claude Code.
  لا اعتماديات إطلاقًا. النصوص كلها من src/prompts.js وهو المصدر نفسه الذي يستعمله الموقع.

      node tools/midad-analyze.js prompt <مجلد> <مرحلة> [ملف-تحليل-جزئي.json]
      node tools/midad-analyze.js merge  <مجلد>
      node tools/midad-analyze.js check  <ملف analysis.json>

  «prompt» يطبع ما يجب أن يراه النموذج حرفيًا: نص النظام + المستندات + توجيه المرحلة.
  «merge»  يجمع مخرجات المراحل الست من <مجلد>/.midad/*.json في analysis.json بالبنية نفسها
           التي يخزنها التطبيق، ويطابق تعيين الحقول في runStages حرفيًا.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { SYS, STAGES, stagePrompt } = require("../src/prompts.js");

/* ───────── قارئ docx: ملف zip، النص في word/document.xml. بلا اعتماديات ───────── */
function unzipEntry(buf, want) {
  // سجل نهاية الفهرس المركزي
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66000; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("ليس ملف zip صالحًا");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("فهرس zip تالف");
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const cmtLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nameLen).toString("utf8");
    if (name === want) {
      const lNameLen = buf.readUInt16LE(local + 26);
      const lExtraLen = buf.readUInt16LE(local + 28);
      const start = local + 30 + lNameLen + lExtraLen;
      const raw = buf.slice(start, start + compSize);
      return method === 0 ? raw : zlib.inflateRawSync(raw);
    }
    p += 46 + nameLen + extraLen + cmtLen;
  }
  throw new Error(`لا يوجد ${want} داخل الملف`);
}
const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
function docxText(file) {
  const xml = unzipEntry(fs.readFileSync(file), "word/document.xml").toString("utf8");
  return xml
    .replace(/<w:tab\b[^>]*\/>/g, "\t")
    .replace(/<w:br\b[^>]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|apos);/g, (m) => ENT[m])
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ───────── قراءة مجلد القضية ───────── */
const TEXTY = /\.(txt|md)$/i, DOCX = /\.docx$/i, BINARY = /\.(pdf|png|jpe?g|webp|gif)$/i;
function readCase(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) throw new Error(`المجلد غير موجود: ${dir}`);
  const docs = [], needRead = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (!fs.statSync(full).isFile()) continue;
    // ملفات المجلد التوثيقية ليست مستندات قضية
    if (name === "analysis.json" || name.startsWith(".") || /^README/i.test(name) || /\.(js|json)$/i.test(name)) continue;
    try {
      if (DOCX.test(name)) docs.push({ name, text: docxText(full) });
      else if (TEXTY.test(name)) docs.push({ name, text: fs.readFileSync(full, "utf8").trim() });
      else if (BINARY.test(name)) needRead.push({ name, full });
    } catch (e) { docs.push({ name, text: "", error: e.message }); }
  }
  return { docs, needRead };
}

/* ───────── طباعة توجيه مرحلة ───────── */
function printPrompt(dir, stage, prevPath) {
  const keys = STAGES.map((s) => s[0]);
  if (!keys.includes(stage)) throw new Error(`مرحلة غير معروفة: ${stage}. المتاح: ${keys.join(", ")}`);
  const { docs, needRead } = readCase(dir);
  const prev = prevPath && fs.existsSync(prevPath) ? JSON.parse(fs.readFileSync(prevPath, "utf8")) : {};
  const ctx = { issues: (prev.issues || []).map((x) => x.title), statutes: [], caseType: prev.caseType || "" };

  const out = [];
  out.push("════════ نص النظام (SYS) — التزم به حرفيًا ════════");
  out.push(SYS);
  out.push("");
  out.push("════════ مستندات القضية ════════");
  for (const d of docs) {
    out.push(`──── المستند: «${d.name}» ────`);
    out.push(d.error ? `(تعذرت قراءته: ${d.error})` : d.text || "(لم يُستخرج منه نص)");
    out.push("");
  }
  if (needRead.length) {
    out.push("──── مستندات تحتاج قراءتها بأداة Read قبل الإجابة ────");
    for (const f of needRead) out.push(`  ${f.full}`);
    out.push("");
  }
  out.push(`════════ توجيه المرحلة: ${stage} — ${STAGES.find((s) => s[0] === stage)[1]} ════════`);
  out.push(stagePrompt(stage, ctx));
  return out.join("\n");
}

/* ───────── دمج المراحل: التعيين نفسه الذي في runStages ───────── */
function merge(dir) {
  const d = path.join(dir, ".midad");
  const a = { errors: {} };
  const missing = [];
  for (const [key] of STAGES) {
    const f = path.join(d, `${key}.json`);
    if (!fs.existsSync(f)) { missing.push(key); continue; }
    let out;
    try { out = JSON.parse(fs.readFileSync(f, "utf8")); }
    catch (e) { a.errors[key] = `ملف المرحلة ليس JSON صالحًا: ${e.message}`; continue; }
    if (key === "overview") { a.summary = out.summary; a.parties = out.parties || []; a.issues = (out.issues || []).map((x) => ({ title: x.title })); a.meta = out.meta || {}; }
    else if (key === "facts") a.facts = out.facts || [];
    else if (key === "reqdef") { a.pl = out.pl || []; a.df = out.df || []; a.defenses = out.defenses || []; }
    else if (key === "evidence") a.evidence = out.evidence || [];
    else if (key === "issues") { const det = out.issues || []; a.issues = (a.issues || []).map((x, j) => ({ ...x, ...(det[j] || {}), title: x.title })); }
    else if (key === "review") { a.conflicts = out.conflicts || []; a.gaps = out.gaps || []; }
  }
  for (const k of missing) a.errors[k] = "لم تُنفَّذ هذه المرحلة.";
  a.done = true;
  a.at = Date.now();
  a.source = "claude-code";
  const target = path.join(dir, "analysis.json");
  fs.writeFileSync(target, JSON.stringify(a, null, 1));
  return { target, a, missing };
}

/* ───────── فحص البنية والقواعد اللغوية ───────── */
const BANNED = ["يثبت", "ثابت", "متفق عليه", "ثبت أن", "نرجح", "الراجح", "نوصي بالحكم"];
function check(file) {
  const a = JSON.parse(fs.readFileSync(file, "utf8"));
  const problems = [], notes = [];
  const need = ["summary", "parties", "issues", "meta", "facts", "pl", "df", "defenses", "evidence", "conflicts", "gaps", "done", "at"];
  for (const k of need) if (!(k in a)) problems.push(`حقل ناقص: ${k}`);
  for (const k of ["parties", "issues", "facts", "pl", "df", "defenses", "evidence", "conflicts", "gaps"]) {
    if (k in a && !Array.isArray(a[k])) problems.push(`${k} يجب أن يكون مصفوفة`);
  }
  if (a.done !== true) problems.push("done يجب أن يكون true");
  if (typeof a.at !== "number") problems.push("at يجب أن يكون رقمًا");
  // مصادر الوقائع
  for (const [i, f] of (a.facts || []).entries()) if (!f.src || !f.src.doc) notes.push(`الواقعة ${i + 1} بلا مصدر`);
  // غرض المستند يبدأ بالعبارة الملزمة
  for (const [i, e] of (a.evidence || []).entries()) {
    if (e.purpose && !String(e.purpose).startsWith("يراد به بحسب المذكرة")) notes.push(`صف الأدلة ${i + 1}: الغرض لا يبدأ بـ«يراد به بحسب المذكرة»`);
  }
  // ألفاظ محظورة في نثر التحليل. تُستثنى الاقتباسات الحرفية: المستند قد يحوي اللفظ،
  // ونقلُه كما ورد أمانة لا مخالفة. المخالفة أن يكتبه النموذج من عنده.
  const walk = (v, p) => {
    if (/\.quote$/.test(p)) return;
    if (typeof v === "string") { for (const w of BANNED) if (v.includes(w)) problems.push(`لفظ محظور «${w}» في ${p}`); }
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
    else if (v && typeof v === "object") for (const k of Object.keys(v)) walk(v[k], `${p}.${k}`);
  };
  walk({ summary: a.summary, facts: a.facts, pl: a.pl, df: a.df, defenses: a.defenses, evidence: a.evidence, issues: a.issues, conflicts: a.conflicts, gaps: a.gaps }, "analysis");
  // لا نصوص نظامية من عند النموذج
  for (const [i, it] of (a.issues || []).entries()) if ((it.laws || []).length) notes.push(`المسألة ${i + 1}: فيها نصوص نظامية، ويجب ألا تُضاف إلا من مكتبة القاضي`);
  return { problems, notes, counts: {
    مسائل: (a.issues || []).length, وقائع: (a.facts || []).length,
    "طلبات المدعي": (a.pl || []).length, "طلبات المدعى عليه": (a.df || []).length,
    دفوع: (a.defenses || []).length, مستندات: (a.evidence || []).length,
    تعارضات: (a.conflicts || []).length, "يحتاج تحقق": (a.gaps || []).length,
  } };
}

/* ───────── الواجهة ───────── */
const [cmd, ...rest] = process.argv.slice(2);
try {
  if (cmd === "prompt") { console.log(printPrompt(rest[0], rest[1], rest[2])); }
  else if (cmd === "merge") {
    const r = merge(rest[0]);
    console.log(`كُتب: ${r.target}`);
    if (r.missing.length) console.log(`مراحل ناقصة: ${r.missing.join("، ")}`);
    const c = check(r.target);
    console.log("الأعداد:", JSON.stringify(c.counts, null, 0));
    if (c.problems.length) { console.log("مشكلات:"); c.problems.forEach((p) => console.log("  ✗", p)); }
    if (c.notes.length) { console.log("ملاحظات:"); c.notes.forEach((p) => console.log("  •", p)); }
    if (!c.problems.length) console.log("✓ البنية مطابقة والقواعد اللغوية سليمة.");
  }
  else if (cmd === "check") {
    const c = check(rest[0]);
    console.log("الأعداد:", JSON.stringify(c.counts, null, 0));
    c.problems.forEach((p) => console.log("  ✗", p));
    c.notes.forEach((p) => console.log("  •", p));
    if (!c.problems.length) console.log("✓ سليم.");
    process.exit(c.problems.length ? 1 : 0);
  }
  else {
    console.log("الاستعمال:\n  node tools/midad-analyze.js prompt <مجلد> <مرحلة> [تحليل-جزئي.json]\n  node tools/midad-analyze.js merge <مجلد>\n  node tools/midad-analyze.js check <analysis.json>");
    process.exit(1);
  }
} catch (e) { console.error("خطأ:", e.message); process.exit(1); }
