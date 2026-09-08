// مِداد القاضي — خادم Render
// يقدّم صفحة التطبيق، ويعمل وسيطًا بين المتصفح و Anthropic API بحيث يبقى المفتاح في الخادم.
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const zlib = require("zlib");

const num = (v, def, min, max) => { const n = parseInt(v, 10); return Number.isFinite(n) && n >= min && n <= max ? n : def; };
const PORT = num(process.env.PORT, 10000, 1, 65535);
const KEY = (process.env.ANTHROPIC_API_KEY || "").trim();
const PASS = (process.env.ACCESS_PASSWORD || "").trim();
const DEFAULT_MODELS = "claude-sonnet-5,claude-opus-5,claude-fable-5-1,claude-haiku-4-5-20251001,claude-sonnet-4-6";
const parseModels = (v) => String(v || "").split(",").map((s) => s.trim()).filter(Boolean);
// قائمة فارغة أو معطوبة كانت تُرسل model = undefined فيرفضه Anthropic.
const ALLOWED = parseModels(process.env.ALLOWED_MODELS).length ? parseModels(process.env.ALLOWED_MODELS) : parseModels(DEFAULT_MODELS);
const MAX_TOKENS = num(process.env.MAX_TOKENS, 8000, 256, 200000);
const RATE = num(process.env.RATE_LIMIT_PER_MINUTE, 30, 0, 100000);
const MAX_BODY = 64 * 1024 * 1024;
const UPSTREAM = "https://api.anthropic.com/v1/messages";
/* وسيط المزوّدين: أغلبهم لا يسمح بالنداء من صفحة ويب، فيمرّ الطلب من هنا.
   المفتاح يصل في ترويسة x-midad-key، ويُستعمل في هذا الطلب وحده:
   لا يُخزَّن، ولا يُسجَّل، ولا يعود في أي رسالة خطأ. */
const { PROVIDERS, PROVIDER_LIST, ALLOWED_BASES, scrub } = require("./src/providers.js");
function upstreamFor(id, kind) {
  // القائمة البيضاء تُغلق باب SSRF: لا يُبنى عنوان إلا من الجدول نفسه.
  const p = PROVIDERS[id];
  if (!p || !PROVIDER_LIST.includes(id) || !ALLOWED_BASES.includes(p.baseUrl)) return null;
  if (p.direct) return null;                       // Anthropic تُنادى من المتصفح مباشرة
  return p.baseUrl + (kind === "models" ? "/models" : p.path);
}

// الملفات العامة المسموح بتقديمها فقط (البقية، مثل server.js، لا تُعرض)
const PUBLIC_FILES = { "/": "index.html", "/index.html": "index.html", "/app.js": "app.js", "/library/anzima.json": "library/anzima.json" };
const MIME = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".json": "application/json; charset=utf-8" };

const buckets = new Map();
function rateOk(ip) {
  if (RATE <= 0) return true;
  const minute = Math.floor(Date.now() / 60000);
  const k = `${ip}|${minute}`;
  const n = (buckets.get(k) || 0) + 1;
  buckets.set(k, n);
  if (buckets.size > 5000) for (const key of buckets.keys()) { if (!key.endsWith(`|${minute}`)) buckets.delete(key); }
  return n <= RATE;
}
function safeEqual(a, b) {
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}
function send(res, code, body, type = "application/json; charset=utf-8", extra = {}) {
  // لا تكتب مرتين: الاتصال قد يكون أُغلق أو أُرسل رد قبله، وذلك يرفع استثناءً يُسقط الخدمة.
  if (res.headersSent || res.writableEnded || res.destroyed) return;
  try {
    res.writeHead(code, { "Content-Type": type, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store", ...extra });
    res.end(body);
  } catch (e) { console.error("send failed:", e.message); }
}
function json(res, code, obj) { send(res, code, JSON.stringify(obj)); }
function fail(res, code, type, message) { json(res, code, { type: "error", error: { type, message } }); }
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > MAX_BODY) { reject(new Error("too_large")); req.destroy(); return; } chunks.push(c); });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/* وضع «المفتاح الشخصي» لمزوّد غير Anthropic: يمرّر الطلب كما هو إلى عنوان من
   القائمة البيضاء، بمفتاح صاحبه، بلا كلمة مرور الموقع وبلا مفتاح الخادم. */
async function handleRelay(req, res, pid) {
  const key = String(req.headers["x-midad-key"] || "").trim();
  const kind = String(req.headers["x-midad-kind"] || "chat");
  // بلا هذا الشرط يصير الخادم وسيطًا مفتوحًا: أي أحد على الإنترنت يمرّر طلبه إلى
  // OpenAI وغيره من عنوان هذا الموقع. كلمة مرور الموقع تحصر الاستعمال في أهله.
  // ويُفحص قبل معرفة المزوّد حتى لا يُستدلّ على المزوّدين المقبولين بلا إذن.
  if (PASS.length >= 6 && !safeEqual(req.headers["x-midad-pass"] || "", PASS)) {
    return fail(res, 401, "midad_auth", "كلمة مرور الدخول غير صحيحة. أدخلها من الإعدادات قبل استعمال مفتاحك الشخصي.");
  }
  const upstream = upstreamFor(pid, kind === "models" ? "models" : "chat");
  if (!upstream) return fail(res, 400, "midad_request", "مزوّد غير معروف أو لا يمرّ عبر الخادم.");
  if (!key) return fail(res, 401, "midad_auth", "لم يصل مفتاح المزوّد.");
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "x").toString().split(",")[0].trim();
  if (!rateOk(ip)) return fail(res, 429, "midad_rate", "طلبات كثيرة في وقت قصير.");

  let body = null;
  if (kind !== "models") {
    let raw;
    try { raw = await readBody(req); } catch (e) { return fail(res, 413, "midad_request", e.message === "too_large" ? "حجم الطلب يتجاوز ٦٤ ميجابايت." : "تعذرت قراءة الطلب."); }
    try { body = JSON.parse(raw); } catch { return fail(res, 400, "midad_request", "صيغة الطلب غير صحيحة."); }
    if (!body || typeof body !== "object" || !Array.isArray(body.messages)) return fail(res, 400, "midad_request", "الطلب يفتقد messages.");
    delete body.stream; delete body.metadata; delete body.temperature; delete body.top_p; delete body.top_k;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 280000);
  try {
    const up = await fetch(upstream, {
      method: kind === "models" ? "GET" : "POST",
      headers: kind === "models"
        ? { "Authorization": `Bearer ${key}` }
        : { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: kind === "models" ? undefined : JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await up.text();
    // ولو ردّده المزوّد في نصّ خطئه، لا يخرج المفتاح من هنا.
    send(res, up.status, scrub(text, key), up.headers.get("content-type") || "application/json; charset=utf-8");
  } catch (e) {
    fail(res, 502, "midad_upstream", e.name === "AbortError"
      ? `انتهت مهلة الانتظار من ${PROVIDERS[pid].label}. أعد المحاولة.`
      : `تعذر وصول الخادم إلى ${PROVIDERS[pid].label}: ${scrub(e.message, key)}`);
  } finally { clearTimeout(timer); }
}

async function handleApi(req, res, url) {
  const configured = KEY.startsWith("sk-ant-") && PASS.length >= 6;
  if (req.method === "GET") return json(res, 200, { ok: true, midad: true, configured, providers: PROVIDER_LIST });
  if (req.method !== "POST") return fail(res, 405, "midad_method", "الطريقة غير مسموحة.");
  const pid = String(req.headers["x-midad-provider"] || "").trim();
  if (pid && pid !== "anthropic") return handleRelay(req, res, pid);
  if (!KEY.startsWith("sk-ant-")) return fail(res, 500, "midad_config", "لم يُضبط ANTHROPIC_API_KEY في متغيرات البيئة.");
  if (PASS.length < 6) return fail(res, 500, "midad_config", "لم يُضبط ACCESS_PASSWORD (٦ أحرف على الأقل) في متغيرات البيئة.");
  const given = req.headers["x-midad-pass"] || "";
  if (!safeEqual(given, PASS)) return fail(res, 401, "midad_auth", "كلمة مرور الدخول غير صحيحة.");
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "x").toString().split(",")[0].trim();
  if (!rateOk(ip)) return fail(res, 429, "midad_rate", "طلبات كثيرة في وقت قصير.");

  let raw;
  try { raw = await readBody(req); } catch (e) { return fail(res, 413, "midad_request", e.message === "too_large" ? "حجم الطلب يتجاوز ٦٤ ميجابايت." : "تعذرت قراءة الطلب."); }
  let body;
  try { body = JSON.parse(raw); } catch { return fail(res, 400, "midad_request", "صيغة الطلب غير صحيحة."); }
  if (!body || typeof body !== "object" || !Array.isArray(body.messages)) return fail(res, 400, "midad_request", "الطلب يفتقد messages.");
  if (!ALLOWED.includes(body.model)) body.model = ALLOWED[0];
  // قيمة خارج المدى تُقصّ إلى السقف، وقيمة غير رقمية ترجع إلى الافتراضي.
  body.max_tokens = Math.min(Math.max(num(body.max_tokens, 4000, 1, 1e9), 256), MAX_TOKENS);
  delete body.stream; delete body.metadata;
  // معاملات المعاينة ألغتها النماذج الحديثة (Sonnet 5 وOpus 5 وFable 5.1) وترفض الطلب الذي يحملها.
  // تُحذف هنا دفاعيًا حتى لا يفشل متصفح بقي على نسخة قديمة من app.js في ذاكرته.
  delete body.temperature; delete body.top_p; delete body.top_k;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 280000);
  try {
    const up = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await up.text();
    send(res, up.status, text, up.headers.get("content-type") || "application/json; charset=utf-8");
  } catch (e) {
    fail(res, 502, "midad_upstream", e.name === "AbortError" ? "انتهت مهلة الانتظار من Anthropic. أعد المحاولة." : `تعذر وصول الخادم إلى Anthropic: ${e.message}`);
  } finally { clearTimeout(timer); }
}

function serveStatic(req, res, url) {
  const file = PUBLIC_FILES[url.pathname];
  if (!file) return send(res, 404, "not found", "text/plain; charset=utf-8");
  const full = path.join(__dirname, file);
  fs.readFile(full, (err, data) => {
    if (err) return send(res, 404, "not found", "text/plain; charset=utf-8");
    const ext = path.extname(file);
    const cache = "no-cache";
    // مكتبة الأنظمة تتجاوز ٢ ميجابايت؛ ضغطها يوفّر على جوال المستخدم كثيرًا.
    const extra = {};
    if (data.length > 64 * 1024 && /\bgzip\b/.test(String(req.headers["accept-encoding"] || ""))) {
      try { data = zlib.gzipSync(data); extra["Content-Encoding"] = "gzip"; } catch (e) { console.error("gzip:", e.message); }
    }
    send(res, 200, data, MIME[ext] || "application/octet-stream", {
      ...extra,
      "Cache-Control": cache,
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    });
  });
}

const server = http.createServer((req, res) => {
  let url;
  // مسار مشوّه في الطلب كان يرفع استثناءً غير ملتقط داخل معالج الطلبات.
  try { url = new URL(req.url, "http://localhost"); } catch { return send(res, 400, "bad request", "text/plain; charset=utf-8"); }
  if (url.pathname === "/api" || url.pathname === "/api.php") return handleApi(req, res, url).catch((e) => fail(res, 500, "midad_server", e.message));
  if (url.pathname === "/healthz") return send(res, 200, "ok", "text/plain; charset=utf-8");
  return serveStatic(req, res, url);
});
server.on("clientError", (err, socket) => { if (!socket.destroyed) socket.end("HTTP/1.1 400 Bad Request\r\n\r\n"); });
// خطأ في طلب واحد يجب ألا يُسقط الخدمة على Render ويقطع التحليل الجاري.
process.on("unhandledRejection", (e) => console.error("unhandledRejection:", (e && e.message) || e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", (e && e.stack) || e));
server.requestTimeout = 300000;
server.headersTimeout = 305000;
server.keepAliveTimeout = 65000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`midad listening on ${PORT} | key:${KEY.startsWith("sk-ant-") ? "set" : "MISSING"} | password:${PASS.length >= 6 ? "set" : "MISSING"} | models:${ALLOWED.join(",")}`);
});
