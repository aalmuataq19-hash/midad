// وسيط المزوّدين في server.js: القائمة البيضاء، ونقل المفتاح بلا تخزين ولا تسريب.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { ALLOWED_BASES, PROVIDERS } = require("../src/providers.js");

const ROOT = path.join(__dirname, "..");
const PORT = 10893;
const CAPTURE = path.join(os.tmpdir(), `midad-relay-${process.pid}.json`);
let child;

test.before(async () => {
  child = spawn(process.execPath, ["--require", path.join(__dirname, "upstream-stub.js"), "server.js"], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT), ANTHROPIC_API_KEY: "sk-ant-test-not-a-real-key", ACCESS_PASSWORD: "test-password", MIDAD_CAPTURE: CAPTURE },
    stdio: "ignore",
  });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/api`); if (r.ok) return; } catch { }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("لم يقلع الخادم");
});
test.after(() => { if (child) child.kill(); try { fs.unlinkSync(CAPTURE); } catch { } });

const relay = async (provider, key = "sk-test-abcdef123456", extra = {}) => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-provider": provider, "x-midad-key": key, "x-midad-pass": "test-password", ...extra },
    body: JSON.stringify({ model: "m", max_tokens: 50, messages: [{ role: "user", content: "س" }] }),
  });
  let sent = null;
  try { sent = JSON.parse(fs.readFileSync(CAPTURE, "utf8")); } catch { }
  return { res, sent, body: await res.json() };
};

test("يمرّر إلى عنوان المزوّد من القائمة البيضاء وحدها", async () => {
  for (const id of ["openai", "gemini", "deepseek", "openrouter"]) {
    const { res, sent } = await relay(id);
    assert.equal(res.status, 200, id);
    assert.equal(sent.url, PROVIDERS[id].baseUrl + PROVIDERS[id].path, id);
    assert.ok(ALLOWED_BASES.some((b) => sent.url.startsWith(b)), id);
  }
});

test("يرفض مزوّدًا ليس في القائمة", async () => {
  for (const bad of ["evil", "http://127.0.0.1:1/x", "https://attacker.example/v1", "../../etc", ""]) {
    const { res, sent, body } = await relay(bad);
    if (bad === "") { assert.equal(sent.url, "https://api.anthropic.com/v1/messages", "بلا مزوّد يسقط على مسار Anthropic بكلمة مرور الموقع"); continue; }
    assert.equal(res.status, 400, bad);
    assert.equal(body.error.type, "midad_request", bad);
    assert.equal(sent, null, `لم يُرسل شيء إلى ${bad}`);
  }
});

test("Anthropic لا تمرّ بمفتاح في ترويسة بل بمفتاح الخادم وكلمة مروره", async () => {
  const { res, sent } = await relay("anthropic");
  assert.equal(res.status, 200);
  assert.equal(sent.url, "https://api.anthropic.com/v1/messages");
  assert.equal(sent.headers["x-api-key"], "sk-ant-test-not-a-real-key", "مفتاح الخادم لا مفتاح الترويسة");
  assert.ok(!JSON.stringify(sent.headers).includes("sk-test-abcdef"), "مفتاح المستخدم لا يُمرَّر إلى Anthropic");
});

test("مفتاح المزوّد يذهب في ترويسة الطلب ولا يُخلط بمفتاح الخادم", async () => {
  const { sent } = await relay("deepseek", "sk-USERKEY-987654");
  assert.equal(sent.headers.Authorization, "Bearer sk-USERKEY-987654");
  assert.ok(!JSON.stringify(sent.headers).includes("sk-ant-test-not-a-real-key"), "مفتاح الخادم لا يخرج إلى مزوّد آخر");
  assert.ok(!sent.body.includes("sk-USERKEY"), "المفتاح لا يدخل جسم الطلب");
});

test("طلب بلا مفتاح يُرفض قبل أي اتصال", async () => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-midad-provider": "openai", "x-midad-pass": "test-password" },
    body: JSON.stringify({ messages: [] }),
  });
  assert.equal(res.status, 401);
  assert.equal(fs.existsSync(CAPTURE), false);
});

test("لا يخرج المفتاح في رسالة خطأ يردّدها المزوّد", async () => {
  const KEY = "sk-LEAKME-123456789";
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-provider": "openai", "x-midad-key": KEY, "x-midad-pass": "test-password" },
    body: JSON.stringify({ messages: [{ role: "user", content: "س" }] }),
  });
  const text = await res.text();
  assert.ok(!text.includes(KEY), `تسرّب المفتاح: ${text.slice(0, 200)}`);
  assert.ok(text.includes("«المفتاح»"), "يُستبدل بعلامة واضحة");
});

test("معاملات المعاينة تُحذف قبل التمرير", async () => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-provider": "openai", "x-midad-key": "sk-x-123456", "x-midad-pass": "test-password" },
    body: JSON.stringify({ model: "m", messages: [{ role: "user", content: "س" }], temperature: 0.7, stream: true, top_p: 1 }),
  });
  const sent = JSON.parse(JSON.parse(fs.readFileSync(CAPTURE, "utf8")).body);
  assert.ok(!("temperature" in sent) && !("stream" in sent) && !("top_p" in sent));
});

test("التمرير يشترط كلمة مرور الموقع: بلا وسيط مفتوح للعالم", async () => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-provider": "openai", "x-midad-key": "sk-x-123456" },
    body: JSON.stringify({ messages: [{ role: "user", content: "س" }] }),
  });
  assert.equal(res.status, 401);
  assert.equal((await res.json()).error.type, "midad_auth");
  assert.equal(fs.existsSync(CAPTURE), false, "لم يخرج طلب إلى المزوّد");
});

test("وبكلمة المرور الصحيحة يمرّ", async () => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-provider": "openai", "x-midad-key": "sk-x-123456", "x-midad-pass": "test-password" },
    body: JSON.stringify({ messages: [{ role: "user", content: "س" }] }),
  });
  assert.equal(res.status, 200);
  assert.equal(JSON.parse(fs.readFileSync(CAPTURE, "utf8")).url, PROVIDERS.openai.baseUrl + PROVIDERS.openai.path);
});
