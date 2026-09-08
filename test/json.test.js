// اختبارات قراءة JSON من إجابة النموذج: node --test
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { repairJSON, pj, createPjOrFix } = require("../src/json-repair.js");

test("JSON صالح يُقرأ كما هو", () => {
  const out = repairJSON('{"facts":[{"date":"2026-03-12","text":"أبرم الطرفان العقد."}]}');
  assert.equal(out.facts.length, 1);
  assert.equal(out.facts[0].text, "أبرم الطرفان العقد.");
});

test("JSON صالح مع فراغات وأسطر", () => {
  const out = repairJSON('\n  {\n "a" : 1 ,\n "b" : [1,2,3]\n }\n');
  assert.deepEqual(out, { a: 1, b: [1, 2, 3] });
});

test("مقطوع في منتصف مصفوفة: يُقطع عند آخر عنصر مكتمل", () => {
  const raw = '{"facts":[{"text":"الأولى","conf":"high"},{"text":"الثانية","conf":"low"},{"text":"الثال';
  const out = repairJSON(raw);
  assert.equal(out.facts.length, 2);
  assert.equal(out.facts[1].text, "الثانية");
});

test("مقطوع داخل قيمة نصية في أول عنصر", () => {
  const out = repairJSON('{"gaps":[{"text":"لم يتضح تاريخ التسلي');
  assert.equal(Array.isArray(out.gaps), true);
  assert.equal(out.gaps[0].text.startsWith("لم يتضح"), true);
});

test("مقطوع بعد مفتاح بلا قيمة", () => {
  const out = repairJSON('{"summary":{"claim":"مطالبة مالية","asks":');
  assert.equal(out.summary.claim, "مطالبة مالية");
});

test("مقطوع في منتصف مصفوفة متداخلة", () => {
  const out = repairJSON('{"issues":[{"title":"هل انعقد العقد؟","questions":["س١","س٢","س');
  assert.equal(out.issues[0].title, "هل انعقد العقد؟");
  assert.deepEqual(out.issues[0].questions.slice(0, 2), ["س١", "س٢"]);
});

test("فواصل زائدة قبل الأقواس تُزال", () => {
  const out = repairJSON('{"pl":[{"text":"أ",},{"text":"ب",},],"df":[],}');
  assert.equal(out.pl.length, 2);
  assert.deepEqual(out.df, []);
});

test("فاصلة داخل قيمة نصية لا تُمس", () => {
  const out = repairJSON('{"text":"المبلغ 850,000 ريال، ثم 920,000 ريال"}');
  assert.equal(out.text, "المبلغ 850,000 ريال، ثم 920,000 ريال");
});

test("داخل أسوار ```json", () => {
  const raw = '```json\n{"conflicts":[{"type":"مبلغ"}],"gaps":[]}\n```';
  const out = repairJSON(raw);
  assert.equal(out.conflicts[0].type, "مبلغ");
});

test("داخل أسوار بلا كلمة json", () => {
  assert.deepEqual(repairJSON('```\n{"ok":true}\n```'), { ok: true });
});

test("نص عربي قبله وبعده", () => {
  const raw = 'تفضل نتيجة التحليل كما طلبت:\n{"evidence":[{"doc":"عقد المقاولة","by":"المدعي"}]}\nوهذا كل ما ورد في الملف.';
  const out = repairJSON(raw);
  assert.equal(out.evidence[0].doc, "عقد المقاولة");
});

test("نص قبله يحتوي قوسًا معقوفًا مضللًا", () => {
  const raw = 'ملاحظة {مهمة جدًا} قبل الإجابة:\n{"parties":[{"name":"شركة النور","role":"مدعي"}]}';
  const out = repairJSON(raw);
  assert.equal(out.parties[0].name, "شركة النور");
});

test("أسوار ونص محيط وقطع معًا", () => {
  const raw = 'حسنًا:\n```json\n{"facts":[{"text":"واقعة أولى"},{"text":"واقعة ثاني';
  const out = repairJSON(raw);
  assert.equal(out.facts.length, 1);
  assert.equal(out.facts[0].text, "واقعة أولى");
});

test("علامات اقتباس عربية «» داخل القيم", () => {
  const out = repairJSON('{"text":"ورد في المستند «تم التسليم كاملًا» بحسب المدعى عليه"}');
  assert.equal(out.text, "ورد في المستند «تم التسليم كاملًا» بحسب المدعى عليه");
});

test("علامات اقتباس مزخرفة “ ” داخل القيم", () => {
  const out = repairJSON('{"quote":"قال المدعي “لم يسلَّم المشروع” في صحيفة الدعوى"}');
  assert.equal(out.quote, "قال المدعي “لم يسلَّم المشروع” في صحيفة الدعوى");
});

test("اقتباس مهرَّب بعلامات ASCII داخل القيم", () => {
  const out = repairJSON('{"quote":"ورد لفظ \\"التسليم النهائي\\" في الصفحة الرابعة"}');
  assert.equal(out.quote, 'ورد لفظ "التسليم النهائي" في الصفحة الرابعة');
});

test("«» مع قطع في منتصف المصفوفة", () => {
  const raw = '{"conflicts":[{"a":{"text":"«850,000 ريال»"},"b":{"text":"«920,000 ريال»"}},{"a":{"text":"غير مكت';
  const out = repairJSON(raw);
  assert.equal(out.conflicts.length, 1);
  assert.equal(out.conflicts[0].b.text, "«920,000 ريال»");
});

test("سطر جديد حقيقي داخل قيمة نصية يُهرَّب بدل أن يفشل", () => {
  const out = repairJSON('{"text":"سطر أول\nسطر ثانٍ"}');
  assert.equal(out.text, "سطر أول\nسطر ثانٍ");
});

test("مصفوفة في الجذر", () => {
  assert.deepEqual(repairJSON('[{"a":1},{"a":2}]'), [{ a: 1 }, { a: 2 }]);
});

test("نص بلا JSON يرفع خطأ واضحًا", () => {
  assert.throws(() => repairJSON("لم أعثر في ملفات القضية المرفوعة على ما يثبت ذلك."), /لا يوجد JSON/);
});

test("نص فارغ يرفع خطأ", () => {
  assert.throws(() => repairJSON("   "), /فارغة/);
});

test("pj يضع علامة parseFail ورسالة عربية", () => {
  try { pj("لا شيء هنا"); assert.fail("كان يجب أن يرفع خطأ"); }
  catch (e) { assert.equal(e.parseFail, true); assert.match(e.message, /تعذرت قراءة إجابة النموذج/); }
});

test("pjOrFix يمرّ مباشرة دون استدعاء المصلح حين يكون النص سليمًا", async () => {
  let called = 0;
  const pjOrFix = createPjOrFix(async () => { called++; return "{}"; });
  const out = await pjOrFix('{"ok":true}');
  assert.deepEqual(out, { ok: true });
  assert.equal(called, 0);
});

test("pjOrFix يمرّ مباشرة على نص مقطوع تصلحه الطبقة الأولى", async () => {
  let called = 0;
  const pjOrFix = createPjOrFix(async () => { called++; return "{}"; });
  const out = await pjOrFix('{"facts":[{"text":"أ"},{"text":"ب');
  assert.equal(out.facts.length, 1);
  assert.equal(called, 0);
});

test("pjOrFix يستدعي المصلح حين تعجز الطبقتان", async () => {
  let seen = null;
  const pjOrFix = createPjOrFix(async (t) => { seen = t; return '{"answer":"أُصلح"}'; });
  const out = await pjOrFix("النموذج رد بنص عادي بلا أي بنية");
  assert.equal(out.answer, "أُصلح");
  assert.equal(seen, "النموذج رد بنص عادي بلا أي بنية");
});

test("pjOrFix يرفع الخطأ إن فشل المصلح أيضًا", async () => {
  const pjOrFix = createPjOrFix(async () => "ما زال بلا JSON");
  await assert.rejects(() => pjOrFix("نص عادي"), /تعذرت قراءة إجابة النموذج/);
});

test("pjOrFix يقصّ النص الطويل قبل إرساله للمصلح", async () => {
  let len = -1;
  const pjOrFix = createPjOrFix(async (t) => { len = t.length; return '{"ok":1}'; });
  await pjOrFix("x".repeat(70000));
  assert.equal(len, 60000);
});

test("مخطط المراحل الست يُقرأ مقطوعًا دون فقد ما اكتمل", () => {
  const raw = '```json\n{"pl":[{"text":"طلب أول","basis":"عقد","docs":["صحيفة الدعوى"],"replied":"yes","conf":"high","src":{"doc":"صحيفة الدعوى","page":2,"quote":"«مبلغ 850,000»"}}],"df":[{"text":"طلب مقاب';
  const out = repairJSON(raw);
  assert.equal(out.pl.length, 1);
  assert.equal(out.pl[0].src.page, 2);
});

/* ٢٥ — حالات حدية ظهرت في التدقيق: قيم ليست من JSON، وتعليقات، ومقدمة طويلة. */
test("NaN وInfinity تصير null لا تُفشل القراءة", () => {
  assert.deepEqual(repairJSON('{"a":NaN,"b":1}'), { a: null, b: 1 });
  assert.deepEqual(repairJSON('{"a":Infinity,"b":-Infinity}'), { a: null, b: null });
  assert.deepEqual(repairJSON('{"facts":[{"page":NaN}]}'), { facts: [{ page: null }] });
});

test("ولا تُمس داخل النصوص", () => {
  assert.deepEqual(repairJSON('{"a":"قيمة NaN مذكورة في المستند"}'), { a: "قيمة NaN مذكورة في المستند" });
  assert.deepEqual(repairJSON('{"a":"Infinity Insurance Co"}'), { a: "Infinity Insurance Co" });
});

test("تعليقات النموذج تُزال", () => {
  assert.deepEqual(repairJSON('{\n// شرح من النموذج\n"a":1}'), { a: 1 });
  assert.deepEqual(repairJSON('{/* شرح */"a":1,"b":2}'), { a: 1, b: 2 });
});

test("والمسار الذي فيه // داخل نص لا يُقص", () => {
  assert.deepEqual(repairJSON('{"a":"https://example.com/x"}'), { a: "https://example.com/x" });
});

test("مقدمة فيها عشرات الأقواس قبل الـ JSON الحقيقي", () => {
  assert.deepEqual(repairJSON("{ ".repeat(30) + 'مقدمة طويلة {"a":1}'), { a: 1 });
});

test("الأقواس المفردة تبقى للطبقة الثالثة", () => {
  // إصلاحها محليًا يعني إعادة كتابة النص، وفيه خطر على الاقتباسات العربية
  assert.throws(() => repairJSON("{'a':1}"), /تعذر إصلاح JSON/);
});
