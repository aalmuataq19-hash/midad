// يتأكد أن وسيط server.js يمرّر جسم الطلب كما هو إلى Anthropic،
// وبخاصة cache_control الذي يعتمد عليه التخزين المؤقت للملفات.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const PORT = 10891;
const CAPTURE = path.join(os.tmpdir(), `midad-upstream-${process.pid}.json`);

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

const post = async (body) => {
  try { fs.unlinkSync(CAPTURE); } catch { }
  const res = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-pass": "test-password" },
    body: JSON.stringify(body),
  });
  const sent = JSON.parse(fs.readFileSync(CAPTURE, "utf8"));
  return { res, sent, upstream: JSON.parse(sent.body) };
};

// يحاكي ما يرسله متصفح بقي على نسخة قديمة من app.js: ما زال يضع temperature،
// فكل اختبار في هذا الملف يمر ضمنًا على مسار الحذف الدفاعي.
const withDocs = (extra = {}) => ({
  model: "claude-sonnet-5",
  max_tokens: 6000,
  temperature: 0,
  system: "نظام مِداد",
  messages: [{ role: "user", content: [
    { type: "document", source: { type: "text", media_type: "text/plain", data: "صحيفة الدعوى" }, title: "صحيفة-الدعوى.docx" },
    { type: "document", source: { type: "text", media_type: "text/plain", data: "المذكرة الجوابية" }, title: "المذكرة-الجوابية.docx", cache_control: { type: "ephemeral" } },
    { type: "text", text: "نص المرحلة" },
  ] }],
  ...extra,
});

test("الوسيط يمرّر cache_control إلى Anthropic بلا حذف", async () => {
  const { upstream } = await post(withDocs());
  const blocks = upstream.messages[0].content;
  assert.equal(blocks[1].cache_control.type, "ephemeral");
  assert.equal(blocks[0].cache_control, undefined);
  assert.equal(blocks[2].type, "text");
});

test("الوسيط لا يغيّر ترتيب الكتل ولا محتوى المستندات", async () => {
  const { upstream } = await post(withDocs());
  const blocks = upstream.messages[0].content;
  assert.equal(blocks.length, 3);
  assert.equal(blocks[0].source.data, "صحيفة الدعوى");
  assert.equal(blocks[1].title, "المذكرة-الجوابية.docx");
  assert.equal(upstream.system, "نظام مِداد");
  assert.equal(upstream.model, "claude-sonnet-5");
});

test("cache_control على كتلة نص النظام يمر أيضًا", async () => {
  const { upstream } = await post(withDocs({ system: [{ type: "text", text: "نظام مِداد", cache_control: { type: "ephemeral" } }] }));
  assert.equal(upstream.system[0].cache_control.type, "ephemeral");
});

test("الوسيط يحذف stream وmetadata", async () => {
  const { upstream } = await post(withDocs({ stream: true, metadata: { user_id: "x" } }));
  assert.equal(upstream.stream, undefined);
  assert.equal(upstream.metadata, undefined);
  assert.equal(upstream.messages[0].content[1].cache_control.type, "ephemeral");
});

test("الوسيط يحذف temperature وtop_p وtop_k دفاعيًا", async () => {
  // متصفح بقي على نسخة قديمة من app.js قد يرسلها، والنماذج الحديثة ترفض الطلب الذي يحملها.
  const { upstream } = await post(withDocs({ temperature: 0, top_p: 0.9, top_k: 40 }));
  assert.equal("temperature" in upstream, false);
  assert.equal("top_p" in upstream, false);
  assert.equal("top_k" in upstream, false);
});

test("حذف معاملات المعاينة لا يمس الملفات ولا نقطة التخزين المؤقت", async () => {
  const { upstream } = await post(withDocs({ temperature: 1 }));
  const blocks = upstream.messages[0].content;
  assert.equal("temperature" in upstream, false);
  assert.equal(blocks.length, 3);
  assert.equal(blocks[0].source.data, "صحيفة الدعوى");
  assert.equal(blocks[1].cache_control.type, "ephemeral");
  assert.equal(upstream.model, "claude-sonnet-5");
  assert.equal(upstream.system, "نظام مِداد");
});

test("الوسيط يقصّ max_tokens ولا يمس الكتل", async () => {
  const { upstream } = await post(withDocs({ max_tokens: 999999 }));
  assert.equal(upstream.max_tokens, 8000);
  assert.equal(upstream.messages[0].content[1].cache_control.type, "ephemeral");
});

test("١٠ — مفتاح الحد من الطلبات يؤخذ من آخر x-forwarded-for لا أولها", async () => {
  // العميل يكتب أول قيمة بنفسه؛ لو اعتُمدت لأمكن تزييفها والتملّص من الحد
  const one = await fetch(`http://127.0.0.1:${PORT}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-midad-pass": "test-password", "x-forwarded-for": "1.1.1.1, 9.9.9.9" },
    body: JSON.stringify({ messages: [{ role: "user", content: "س" }] }),
  });
  assert.equal(one.status, 200);
});

test("رؤوس الأمان وETag على الملفات الثابتة", async () => {
  const r = await fetch(`http://127.0.0.1:${PORT}/`);
  const csp = r.headers.get("content-security-policy") || "";
  assert.match(csp, /default-src 'none'/);
  assert.match(csp, /script-src [^;]*cdnjs\.cloudflare\.com/);
  assert.match(csp, /script-src [^;]*'sha256-/, "بصمة النص المضمّن لا 'unsafe-inline'");
  assert.ok(!/script-src[^;]*'unsafe-inline'/.test(csp), "لا unsafe-inline للنصوص");
  assert.match(csp, /connect-src [^;]*api\.anthropic\.com/);
  assert.match(csp, /frame-ancestors 'self'/);
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.equal(r.headers.get("referrer-policy"), "no-referrer");
  const tag = r.headers.get("etag");
  assert.ok(tag, "ETag موجود");
  const again = await fetch(`http://127.0.0.1:${PORT}/`, { headers: { "If-None-Match": tag } });
  assert.equal(again.status, 304, "البصمة نفسها ترد 304 بلا إعادة تنزيل");
});

test("القائمة البيضاء للملفات الثابتة", async () => {
  for (const [path, code] of [["/", 200], ["/app.js", 200], ["/healthz", 200],
                              ["/server.js", 404], ["/HANDOFF.md", 404], ["/app.src.jsx", 404],
                              ["/package.json", 404], ["/src/providers.js", 404], ["/.env", 404]]) {
    const r = await fetch(`http://127.0.0.1:${PORT}${path}`);
    assert.equal(r.status, code, `${path} توقّع ${code}`);
  }
});
