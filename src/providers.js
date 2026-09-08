/* مزوّدو النماذج — مصدر واحد لا غير.
   يقرأ منه التطبيق (يُدمج في app.js بـ esbuild) والخادم (require مباشر)، فلا يفترقان.
   محوّلان اثنان يغطّيان الجميع:
     anthropic     — صيغة Messages API كما هي، بلا تغيير.
     openai_compat — صيغة /chat/completions، وتغطي OpenAI وDeepSeek وOpenRouter
                     وGemini عبر نقطته المتوافقة، وأي واجهة متوافقة أخرى.
   لإضافة مزوّد جديد: أضف سطره في PROVIDERS بـ baseUrl وadapter وقدراته، فيدخل
   القائمة البيضاء في الخادم وقائمة الإعدادات في التطبيق تلقائيًا. */

/* الكتل داخليًا بصيغة Anthropic، وكل محوّل يترجمها:
   { type:"text", text }
   { type:"document", source:{ type:"text",   media_type:"text/plain",     data }, title }
   { type:"document", source:{ type:"base64", media_type:"application/pdf", data }, title }
   { type:"image",    source:{ type:"base64", media_type, data } }                          */

const PROVIDERS = {
  anthropic: {
    id: "anthropic", label: "Anthropic (كلود)", adapter: "anthropic",
    baseUrl: "https://api.anthropic.com", path: "/v1/messages",
    direct: true,                       // الوحيد الذي يسمح بالنداء من المتصفح
    supportsImages: true, supportsPdfNative: true, contextTokens: 200000,
    keyRe: /^sk-ant-/, keyHint: "sk-ant-...", console: "console.anthropic.com ← Get API key",
    defaultModels: ["claude-sonnet-5", "claude-opus-5", "claude-fable-5-1", "claude-haiku-4-5-20251001"],
    fallbacks: ["claude-sonnet-5", "claude-sonnet-4-6", "claude-sonnet-4-5-20250929", "claude-haiku-4-5-20251001"],
  },
  openai: {
    id: "openai", label: "OpenAI", adapter: "openai_compat",
    baseUrl: "https://api.openai.com/v1", path: "/chat/completions",
    supportsImages: true, supportsPdfNative: false, contextTokens: 400000,
    keyRe: /^sk-(?!ant-)/, keyHint: "sk-proj-... أو sk-...", console: "platform.openai.com ← API keys",
    defaultModels: ["gpt-5.5", "gpt-5.4", "gpt-5.4-mini"],
  },
  gemini: {
    id: "gemini", label: "Google Gemini", adapter: "openai_compat",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai", path: "/chat/completions",
    supportsImages: true, supportsPdfNative: false, contextTokens: 1000000,
    keyRe: /^AIza/, keyHint: "AIza...", console: "aistudio.google.com ← Get API key",
    defaultModels: ["gemini-3-flash", "gemini-2.5-pro", "gemini-2.5-flash"],
  },
  deepseek: {
    id: "deepseek", label: "DeepSeek", adapter: "openai_compat",
    baseUrl: "https://api.deepseek.com/v1", path: "/chat/completions",
    supportsImages: false, supportsPdfNative: false, contextTokens: 128000,
    keyRe: null,                        // مفاتيحه تبدأ بـ sk- كذلك فلا تُميَّز: تُختار باليد
    keyHint: "sk-...", console: "platform.deepseek.com ← API keys",
    defaultModels: ["deepseek-chat", "deepseek-reasoner"],
  },
  openrouter: {
    id: "openrouter", label: "OpenRouter (يوصلك بعدة نماذج)", adapter: "openai_compat",
    baseUrl: "https://openrouter.ai/api/v1", path: "/chat/completions",
    supportsImages: true, supportsPdfNative: false, contextTokens: 128000,
    keyRe: /^sk-or-/, keyHint: "sk-or-v1-...", console: "openrouter.ai ← Keys",
    defaultModels: ["anthropic/claude-sonnet-5", "openai/gpt-5.5", "google/gemini-3-flash", "deepseek/deepseek-chat"],
  },
};
const PROVIDER_LIST = ["anthropic", "openai", "gemini", "deepseek", "openrouter"];
/* القائمة البيضاء التي يقبلها الخادم. لا يُمرَّر طلب إلى عنوان خارجها مهما جاء في الترويسة. */
const ALLOWED_BASES = PROVIDER_LIST.map((id) => PROVIDERS[id].baseUrl);

/* ───────── بناء الطلب ───────── */
const docHead = (b) => `──── المستند: «${b.title || "مستند"}» ────`;
const NO_IMG = (p) => `لا يقرأ ${p} الملفات المصوّرة. استخدم Anthropic أو Gemini أو OpenAI، أو ارفع نسخة نصية من المستند.`;

function openaiParts(content) {
  const parts = [];
  for (const b of content || []) {
    if (b.type === "text") parts.push({ type: "text", text: b.text });
    else if (b.type === "image") parts.push({ type: "image_url", image_url: { url: `data:${b.source.media_type};base64,${b.source.data}` } });
    else if (b.type === "document") parts.push({ type: "text", text: `${docHead(b)}\n${b.source.data}` });
  }
  return parts;
}
function buildRequest(providerId, { system, content, maxTokens, model }) {
  const p = PROVIDERS[providerId];
  if (!p) throw new Error(`مزوّد غير معروف: ${providerId}`);
  // لا تُرسل temperature: ألغتها نماذج حديثة وترد «temperature is deprecated for this model».
  if (p.adapter === "anthropic") return { model, max_tokens: maxTokens, system, messages: [{ role: "user", content }] };
  return { model, max_tokens: maxTokens, messages: [{ role: "system", content: system }, { role: "user", content: openaiParts(content) }] };
}
function parseResponse(providerId, json) {
  const p = PROVIDERS[providerId];
  if (p && p.adapter === "anthropic") return (json.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const m = ((json.choices || [])[0] || {}).message || {};
  return typeof m.content === "string" ? m.content
    : Array.isArray(m.content) ? m.content.filter((x) => typeof x.text === "string").map((x) => x.text).join("\n") : "";
}
function readError(providerId, json) {
  const p = PROVIDERS[providerId];
  if (p && p.adapter === "anthropic" && (json.error || json.type === "error")) {
    const e = json.error || {};
    return { type: e.type || "error", message: e.message || JSON.stringify(e) };
  }
  if (json && json.error) {
    const e = typeof json.error === "string" ? { message: json.error } : json.error;
    return { type: e.type || e.code || e.status || "error", message: e.message || JSON.stringify(e) };
  }
  return null;
}

/* ───────── توحيد الأخطاء ───────── */
function classify(status, err) {
  const t = `${(err && err.type) || ""} ${(err && err.code) || ""}`.toLowerCase();
  const m = String((err && err.message) || "").toLowerCase();
  const has = (re) => re.test(t) || re.test(m);
  if (status === 402 || has(/credit|billing|balance|insufficient|quota|payment/)) return "credit";
  if (status === 401 || status === 403 || has(/authentication|unauthenticated|permission_denied|invalid_api_key|incorrect api key|api key not valid|invalid x-api-key/)) return "auth";
  if (status === 413 || has(/too large|context length|maximum context|payload too large|token limit/)) return "size";
  if (has(/model/) && (status === 404 || has(/not_found|not found|does not exist|unsupported|invalid model/))) return "model";
  if (status === 429 || has(/rate_limit|resource_exhausted|too many requests/)) return "rate";
  if (status === 529 || status === 503 || has(/overloaded|unavailable/)) return "busy";
  if (status >= 500 || has(/^api_error |internal/)) return "server";
  return "other";
}
/* لا يظهر مفتاح في رسالة خطأ أبدًا، ولو ردّده المزوّد في نصّه. */
function scrub(text, key) {
  let out = String(text == null ? "" : text);
  const k = String(key || "").trim();
  if (k.length >= 8) out = out.split(k).join("«المفتاح»");
  return out.replace(/\b(sk-[A-Za-z0-9_\-]{6,}|AIza[A-Za-z0-9_\-]{10,})\b/g, "«المفتاح»");
}

/* ───────── حراسة قبل الإرسال ───────── */
/* الأخصّ أولًا: مفتاح OpenRouter يبدأ بـ sk- كذلك، فلو فُحص OpenAI قبله لالتقطه. */
const DETECT_ORDER = ["anthropic", "openrouter", "gemini", "openai"];
function detectProvider(key) {
  const k = String(key || "").trim();
  if (!k) return null;
  for (const id of DETECT_ORDER) { const p = PROVIDERS[id]; if (p && p.keyRe && p.keyRe.test(k)) return id; }
  return null;
}
function keyMismatch(providerId, key) {
  const p = PROVIDERS[providerId];
  if (!p || !p.keyRe) return null;
  const k = String(key || "").trim();
  if (!k || p.keyRe.test(k)) return null;
  const guess = detectProvider(k);
  return `هذا المفتاح لا يوافق ${p.label}. مفاتيحه تبدأ بـ ${p.keyHint}.`
    + (guess && guess !== providerId ? ` يبدو أنه مفتاح ${PROVIDERS[guess].label}؛ اختره من قائمة المزوّد.` : "");
}
/* كتلة مصوّرة عند مزوّد لا يقرأ الصور: يُقال قبل التحليل لا بعد رفض المزوّد. */
function unsupported(providerId, content) {
  const p = PROVIDERS[providerId];
  if (!p) return null;
  for (const b of content || []) {
    const img = b.type === "image" || (b.type === "document" && b.source && b.source.type === "base64");
    if (img && !p.supportsImages) return NO_IMG(p.label);
  }
  return null;
}
/* تقدير الحجم: حرف عربي ≈ ثلث رمز عند أغلب المرمِّزات، فالقسمة على ٣ تقدير محافظ. */
function estimateTokens(system, content) {
  let chars = String(system || "").length;
  for (const b of content || []) {
    if (b.type === "text") chars += (b.text || "").length;
    else if (b.type === "document") chars += String(b.source.data || "").length;
    else if (b.type === "image") chars += 4000;   // الصورة تقارب ألف رمز
  }
  return Math.ceil(chars / 3);
}
function tooBig(providerId, system, content, maxTokens = 0) {
  const p = PROVIDERS[providerId];
  if (!p) return null;
  const need = estimateTokens(system, content) + Number(maxTokens || 0);
  if (need <= p.contextTokens) return null;
  const k = (n) => `${Math.round(n / 1000)} ألف`;
  return `حجم الطلب نحو ${k(need)} رمز، وحدّ ${p.label} ${k(p.contextTokens)}. قلّل عدد المستندات أو حجمها، أو اختر مزوّدًا أوسع سياقًا.`;
}

module.exports = {
  PROVIDERS, PROVIDER_LIST, ALLOWED_BASES,
  buildRequest, parseResponse, readError, classify, scrub,
  detectProvider, keyMismatch, unsupported, estimateTokens, tooBig, NO_IMG,
};
