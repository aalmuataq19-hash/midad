const test = require("node:test");
const assert = require("node:assert");
const P = require("../src/providers.js");
const { PROVIDERS, PROVIDER_LIST, ALLOWED_BASES, buildRequest, parseResponse, readError, classify, scrub,
        detectProvider, keyMismatch, unsupported, estimateTokens, tooBig } = P;

const TXT = { type: "text", text: "نص المرحلة" };
const DOC = { type: "document", source: { type: "text", media_type: "text/plain", data: "[صفحة 1]\nمتن المستند" }, title: "لائحة الدعوى" };
const PDF = { type: "document", source: { type: "base64", media_type: "application/pdf", data: "JVBERi0=" }, title: "صك" };
const IMG = { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBOR" } };
const IN = { system: "نظام", content: [DOC, TXT], maxTokens: 900, model: "m" };

test("جدول المزوّدين مكتمل وقائمته البيضاء مشتقة منه", () => {
  for (const id of PROVIDER_LIST) {
    const p = PROVIDERS[id];
    assert.ok(p.baseUrl.startsWith("https://"), id);
    assert.ok(p.path.startsWith("/"), id);
    assert.ok(p.defaultModels.length, id);
    assert.equal(typeof p.supportsImages, "boolean", id);
    assert.equal(typeof p.contextTokens, "number", id);
    assert.ok(["anthropic", "openai_compat"].includes(p.adapter), id);
    assert.ok(ALLOWED_BASES.includes(p.baseUrl), id);
  }
  assert.equal(PROVIDERS.anthropic.direct, true, "كلود وحده يُنادى من المتصفح");
  assert.ok(!PROVIDERS.deepseek.direct);
});

test("المدخلات نفسها تبني طلبًا صحيحًا عند كل مزوّد", () => {
  const a = buildRequest("anthropic", IN);
  assert.equal(a.system, "نظام");
  assert.equal(a.max_tokens, 900);
  assert.deepEqual(a.messages[0].content, [DOC, TXT]);
  assert.ok(!("temperature" in a));
  for (const id of ["openai", "gemini", "deepseek", "openrouter"]) {
    const b = buildRequest(id, IN);
    assert.equal(b.model, "m", id);
    assert.equal(b.max_tokens, 900, id);
    assert.equal(b.messages[0].role, "system", id);
    assert.equal(b.messages[0].content, "نظام", id);
    assert.equal(b.messages[1].role, "user", id);
    assert.match(b.messages[1].content[0].text, /«لائحة الدعوى»/, id);
    assert.match(b.messages[1].content[0].text, /\[صفحة 1\]/, id);
    assert.equal(b.messages[1].content[1].text, "نص المرحلة", id);
    assert.ok(!("temperature" in b), id);
  }
});

test("الصورة تصير data URL في الصيغة المتوافقة", () => {
  const b = buildRequest("openai", { ...IN, content: [IMG] });
  assert.equal(b.messages[1].content[0].type, "image_url");
  assert.equal(b.messages[1].content[0].image_url.url, "data:image/png;base64,iVBOR");
});

test("cache_control لا يخرج إلا مع كلود", () => {
  const cached = [{ ...DOC, cache_control: { type: "ephemeral" } }];
  assert.match(JSON.stringify(buildRequest("anthropic", { ...IN, content: cached })), /cache_control/);
  assert.ok(!/cache_control/.test(JSON.stringify(buildRequest("openai", { ...IN, content: cached }))));
});

test("قراءة الاستجابة من عينة بشكل كل مزوّد", () => {
  assert.equal(parseResponse("anthropic", { content: [{ type: "thinking" }, { type: "text", text: "أ" }] }), "أ");
  assert.equal(parseResponse("openai", { choices: [{ index: 0, message: { role: "assistant", content: "ب" }, finish_reason: "stop" }] }), "ب");
  assert.equal(parseResponse("deepseek", { choices: [{ message: { role: "assistant", reasoning_content: "تفكير", content: "ج" } }] }), "ج");
  assert.equal(parseResponse("gemini", { choices: [{ message: { content: "د" } }] }), "د");
  assert.equal(parseResponse("openrouter", { choices: [{ message: { content: [{ type: "text", text: "هـ" }] } }] }), "هـ");
  assert.equal(parseResponse("openai", {}), "", "استجابة فارغة لا ترفع استثناء");
});

test("قراءة الخطأ من عينة بشكل كل مزوّد", () => {
  assert.equal(readError("anthropic", { type: "error", error: { type: "authentication_error", message: "x" } }).type, "authentication_error");
  assert.equal(readError("openai", { error: { message: "Incorrect API key provided", type: "invalid_request_error", code: "invalid_api_key" } }).type, "invalid_request_error");
  assert.equal(readError("deepseek", { error: { message: "Insufficient Balance", code: "invalid_request_error" } }).message, "Insufficient Balance");
  assert.equal(readError("gemini", { error: { code: 400, message: "API key not valid", status: "INVALID_ARGUMENT" } }).message, "API key not valid");
  assert.equal(readError("openai", { choices: [] }), null);
});

test("ترجمة الأخطاء إلى صنف واحد مهما اختلف المزوّد", () => {
  assert.equal(classify(401, { type: "authentication_error" }), "auth");
  assert.equal(classify(400, { code: "invalid_api_key", message: "Incorrect API key provided" }), "auth");
  assert.equal(classify(400, { message: "API key not valid. Please pass a valid API key." }), "auth");
  assert.equal(classify(402, { message: "Insufficient Balance" }), "credit");
  assert.equal(classify(404, { message: "The model `gpt-9` does not exist" }), "model");
  assert.equal(classify(429, { type: "rate_limit_error" }), "rate");
  assert.equal(classify(200, { type: "RESOURCE_EXHAUSTED" }), "rate");
  assert.equal(classify(413, { message: "Payload Too Large" }), "size");
  assert.equal(classify(400, { message: "This model's maximum context length is 128000 tokens" }), "size");
  assert.equal(classify(529, { type: "overloaded_error" }), "busy");
});

test("لا يظهر مفتاح في أي نص خطأ", () => {
  const k = "sk-1234567890abcdef";
  assert.ok(!scrub(`Incorrect API key provided: ${k}`, k).includes(k));
  assert.ok(!scrub("bad key sk-or-v1-abcdefghijkl", "").includes("sk-or-v1-abcdefghijkl"), "يُنقّى ولو لم يُمرَّر المفتاح");
  assert.ok(!scrub("key AIzaSyABCDEFGHIJKLMNOP", "").includes("AIzaSyABCDEFGHIJKLMNOP"));
  assert.equal(scrub("رسالة عادية", k), "رسالة عادية");
});

test("المفتاح يدلّ على مزوّده ولا يُخلط", () => {
  assert.equal(detectProvider("sk-ant-api03-x"), "anthropic");
  assert.equal(detectProvider("sk-or-v1-x"), "openrouter");
  assert.equal(detectProvider("AIzaSyX"), "gemini");
  assert.equal(detectProvider("sk-proj-x"), "openai");
  assert.match(keyMismatch("anthropic", "sk-proj-x"), /OpenAI/);
  assert.equal(keyMismatch("anthropic", "sk-ant-x"), null);
  assert.equal(keyMismatch("deepseek", "sk-whatever"), null, "DeepSeek لا يميّز مفتاحه");
});

test("الملفات المصوّرة تُمنع قبل التحليل عند من لا يقرأ الصور", () => {
  assert.match(unsupported("deepseek", [IMG]), /Anthropic أو Gemini أو OpenAI/);
  assert.match(unsupported("deepseek", [PDF]), /نسخة نصية/);
  assert.equal(unsupported("openai", [IMG]), null);
  assert.equal(unsupported("gemini", [IMG]), null);
  assert.equal(unsupported("deepseek", [DOC, TXT]), null, "النص يمرّ عند الجميع");
});

test("حجم السياق يُقدَّر ويُحذَّر منه قبل الإرسال", () => {
  const big = { type: "document", source: { type: "text", media_type: "text/plain", data: "أ".repeat(600000) }, title: "ضخم" };
  assert.ok(estimateTokens("", [big]) > 190000);
  assert.equal(tooBig("gemini", "", [big], 8000), null, "مليون رمز تسع هذا");
  const w = tooBig("deepseek", "", [big], 8000);
  assert.match(w, /DeepSeek/);
  assert.match(w, /ألف رمز/);
  assert.equal(tooBig("anthropic", "", [DOC], 4000), null);
});
