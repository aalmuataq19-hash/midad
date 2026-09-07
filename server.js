// مِداد القاضي — خادم Render
// يقدّم صفحة التطبيق، ويعمل وسيطًا بين المتصفح و Anthropic API بحيث يبقى المفتاح في الخادم.
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = parseInt(process.env.PORT || "10000", 10);
const KEY = (process.env.ANTHROPIC_API_KEY || "").trim();
const PASS = (process.env.ACCESS_PASSWORD || "").trim();
const ALLOWED = (process.env.ALLOWED_MODELS || "claude-sonnet-5,claude-opus-5,claude-fable-5-1,claude-haiku-4-5-20251001,claude-sonnet-4-6")
  .split(",").map((s) => s.trim()).filter(Boolean);
const MAX_TOKENS = parseInt(process.env.MAX_TOKENS || "8000", 10);
const RATE = parseInt(process.env.RATE_LIMIT_PER_MINUTE || "30", 10);
const MAX_BODY = 64 * 1024 * 1024;
const UPSTREAM = "https://api.anthropic.com/v1/messages";

// الملفات العامة المسموح بتقديمها فقط (البقية، مثل server.js، لا تُعرض)
const PUBLIC_FILES = { "/": "index.html", "/index.html": "index.html", "/app.js": "app.js" };
const MIME = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8" };

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
  res.writeHead(code, { "Content-Type": type, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store", ...extra });
  res.end(body);
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

async function handleApi(req, res, url) {
  const configured = KEY.startsWith("sk-ant-") && PASS.length >= 6;
  if (req.method === "GET") return json(res, 200, { ok: true, midad: true, configured });
  if (req.method !== "POST") return fail(res, 405, "midad_method", "الطريقة غير مسموحة.");
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
  body.max_tokens = Math.max(256, Math.min(parseInt(body.max_tokens || 4000, 10) || 4000, MAX_TOKENS));
  delete body.stream; delete body.metadata;

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
    send(res, 200, data, MIME[ext] || "application/octet-stream", {
      "Cache-Control": cache,
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    });
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api" || url.pathname === "/api.php") return handleApi(req, res, url).catch((e) => fail(res, 500, "midad_server", e.message));
  if (url.pathname === "/healthz") return send(res, 200, "ok", "text/plain; charset=utf-8");
  return serveStatic(req, res, url);
});
server.requestTimeout = 300000;
server.headersTimeout = 305000;
server.keepAliveTimeout = 65000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`midad listening on ${PORT} | key:${KEY.startsWith("sk-ant-") ? "set" : "MISSING"} | password:${PASS.length >= 6 ? "set" : "MISSING"} | models:${ALLOWED.join(",")}`);
});
