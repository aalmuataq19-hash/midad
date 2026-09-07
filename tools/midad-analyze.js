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
function merge(dir, opts = {}) {
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
  // نصوص المستندات تُحفظ داخل التحليل نفسه، فيعمل «اسأل ملف القضية» وعارض المستندات
  // بعد الاستيراد بلا رفع جديد. ولأنها داخل الملف فإن أمر redact يحجبها كما يحجب سائره.
  const embedded = [], skipped = [];
  if (opts.docs !== false) {
    const { docs, needRead } = readCase(dir);
    const want = opts.only && opts.only.size ? opts.only : null;
    const seen = new Set();
    for (const d of docs) {
      const as = want ? want.get(d.name) : d.name;
      if (want && as === undefined) continue;
      seen.add(d.name);
      if (d.error || !String(d.text || "").trim()) { skipped.push(`${d.name} (لا نص)`); continue; }
      embedded.push({ name: as, text: d.text });
    }
    for (const f of needRead) if (!want || want.has(f.name)) skipped.push(`${f.name} (صيغة لا تُقرأ هنا)`);
    if (want) for (const n of want.keys()) if (!seen.has(n) && !needRead.some((f) => f.name === n)) skipped.push(`${n} (غير موجود)`);
    if (embedded.length) a.docs = embedded;
  }
  const target = path.join(dir, "analysis.json");
  fs.writeFileSync(target, JSON.stringify(a, null, 1));
  return { target, a, missing, embedded, skipped };
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

/* ───────── حجب البيانات الشخصية ─────────
   يُبقي آخر ثلاث خانات من كل رقم معرِّف ويستر الباقي بنجوم **بعدد الخانات نفسه**،
   حتى يبقى اختلاف طول رقمين ظاهرًا للقاضي ولا يضيع بالحجب.
   والأسماء يُبقى منها أول اسمين ويُستر الباقي. */
const AR_D = "٠١٢٣٤٥٦٧٨٩";
function maskNumbers(t, min, keep) {
  return String(t).replace(new RegExp(`[0-9${AR_D}]{${min},}`, "g"), (m) => "*".repeat(m.length - keep) + m.slice(-keep));
}
function maskNames(t, names) {
  let out = String(t);
  // ١) الأسماء الكاملة أولًا، من الأطول إلى الأقصر
  for (const full of [...names].sort((a, b) => b.length - a.length)) {
    const parts = full.split(/\s+/).filter((w) => w && w !== "بن" && w !== "بنت");
    if (parts.length < 3) continue;
    out = out.split(full).join(`${parts[0]} ${parts[1]} ****`);
  }
  // ٢) ما بقي من ألقاب العائلة في صيغ مختصرة، أينما وردت
  // لقب العائلة وحده يُكنس، لا كل ما بعد الاسم الثاني: فقد يكون اسمًا أول لشخص آخر في القضية.
  const tails = new Set();
  for (const full of names) {
    const parts = full.split(/\s+/).filter((w) => w && w !== "بن" && w !== "بنت");
    if (parts.length >= 3) tails.add(parts[parts.length - 1]);
  }
  for (const tail of [...tails].sort((a, b) => b.length - a.length)) {
    out = out.replace(new RegExp(`(?:\\s(?:بن|بنت))?\\s?${tail}(?![\\u0621-\\u063A\\u0640-\\u064A\\u0671-\\u06D3])`, "g"), " ****");
  }
  // ٣) اجمع علامات الأسماء المتتالية فقط. لا تمسّ نجوم الأرقام (لا فراغ بينها وبين الخانات).
  out = out.replace(/(\*{4})(?:\s+\*{4})+/g, "****");
  return out.replace(/[ \t]{2,}/g, " ").replace(/\s+([،.,:؛)])/g, "$1").trim();
}
function redact(file, opts) {
  const a = JSON.parse(fs.readFileSync(file, "utf8"));
  let nNum = 0, nName = 0;
  const walk = (v) => {
    if (typeof v === "string") {
      const m1 = opts.names.length ? maskNames(v, opts.names) : v;
      if (m1 !== v) nName++;
      const m2 = maskNumbers(m1, opts.min, opts.keep);
      if (m2 !== m1) nNum++;
      return m2;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") { const o = {}; for (const k of Object.keys(v)) o[k] = walk(v[k]); return o; }
    return v;
  };
  const out = walk(a);
  out.redacted = { at: Date.now(), rule: `أرقام من ${opts.min} خانة فأكثر: يبقى آخر ${opts.keep}؛ والأسماء: يبقى أول اسمين` };
  fs.writeFileSync(file, JSON.stringify(out, null, 1));
  return { nNum, nName };
}
/* ───────── الواجهة ───────── */
const [cmd, ...rest] = process.argv.slice(2);
try {
  if (cmd === "prompt") { console.log(printPrompt(rest[0], rest[1], rest[2])); }
  else if (cmd === "merge") {
    // --docs=ملف.txt:اسم المستند,ملف٢.txt   يختار المستندات ويسمّيها كما وردت في src.doc
    const noDocs = rest.includes("--no-docs");
    const sel = (rest.find((x) => x.startsWith("--docs=")) || "").replace("--docs=", "");
    const only = new Map();
    for (const part of sel.split(",").map((x) => x.trim()).filter(Boolean)) {
      const i = part.indexOf(":");
      if (i < 0) only.set(part, part);
      else only.set(part.slice(0, i).trim(), part.slice(i + 1).trim());
    }
    const r = merge(rest[0], { docs: !noDocs, only: only.size ? only : null });
    console.log(`كُتب: ${r.target}`);
    if (r.missing.length) console.log(`مراحل ناقصة: ${r.missing.join("، ")}`);
    if (r.embedded && r.embedded.length) console.log(`نصوص المستندات المضمَّنة: ${r.embedded.map((d) => `${d.name} (${d.text.length} حرفًا)`).join("، ")}`);
    else if (!noDocs) console.log("لم يُضمَّن أي نص مستند: «اسأل ملف القضية» لن يعمل بعد الاستيراد.");
    if (r.skipped && r.skipped.length) console.log(`لم تُضمَّن: ${r.skipped.join("، ")}`);
    const c = check(r.target);
    console.log("الأعداد:", JSON.stringify(c.counts, null, 0));
    if (c.problems.length) { console.log("مشكلات:"); c.problems.forEach((p) => console.log("  ✗", p)); }
    if (c.notes.length) { console.log("ملاحظات:"); c.notes.forEach((p) => console.log("  •", p)); }
    if (!c.problems.length) console.log("✓ البنية مطابقة والقواعد اللغوية سليمة.");
  }
  else if (cmd === "redact") {
    const names = (rest.find((x) => x.startsWith("--names=")) || "").replace("--names=", "").split(";").map((x) => x.trim()).filter(Boolean);
    const min = +((rest.find((x) => x.startsWith("--min=")) || "--min=8").replace("--min=", ""));
    const keep = +((rest.find((x) => x.startsWith("--keep=")) || "--keep=3").replace("--keep=", ""));
    const r = redact(rest[0], { names, min, keep });
    console.log(`حُجبت الأرقام في ${r.nNum} نصًا، والأسماء في ${r.nName} نصًا.`);
    const c = check(rest[0]);
    console.log(c.problems.length ? "مشكلات: " + c.problems.join(" | ") : "✓ البنية سليمة بعد الحجب.");
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
    console.log("الاستعمال:\n  node tools/midad-analyze.js prompt <مجلد> <مرحلة> [تحليل-جزئي.json]\n  node tools/midad-analyze.js merge <مجلد> [--docs='ملف.txt:اسم المستند,ملف٢.txt'] [--no-docs]\n  node tools/midad-analyze.js check <analysis.json>\n  node tools/midad-analyze.js redact <analysis.json> --names='اسم كامل;اسم آخر' [--min=8] [--keep=3]");
    process.exit(1);
  }
} catch (e) { console.error("خطأ:", e.message); process.exit(1); }
