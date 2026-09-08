
const { useState, useEffect, useRef, useMemo } = React;
const mk = (d) => ({ size = 16, className = "", style }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} dangerouslySetInnerHTML={{ __html: d }} />;
const Plus = mk('<path d="M5 12h14"/><path d="M12 5v14"/>');
const Search = mk('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
const Upload = mk('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>');
const FileText = mk('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>');
const X = mk('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const ChevronRight = mk('<path d="m9 18 6-6-6-6"/>');
const ChevronLeft = mk('<path d="m15 18-6-6 6-6"/>');
const AlertTriangle = mk('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>');
const CheckCircle2 = mk('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>');
const Circle = mk('<circle cx="12" cy="12" r="10"/>');
const BookOpen = mk('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>');
const Sparkles = mk('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>');
const Trash2 = mk('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>');
const Download = mk('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>');
const Eye = mk('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>');
const Loader2 = mk('<path d="M21 12a9 9 0 1 1-6.219-8.56"/>');
const ListChecks = mk('<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>');
const RefreshCw = mk('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>');
const Link2 = mk('<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>');
const Files = mk('<path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l5 5v9a2 2 0 0 1-2 2Z"/><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"/>');
const Scale = mk('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>');
const Clock = mk('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>');
const StickyNote = mk('<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>');
const Send = mk('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>');
const LayoutGrid = mk('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>');
const MessageSquare = mk('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
const Columns = mk('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>');
const History = mk('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>');
const ScrollText = mk('<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>');
const ArrowRight = mk('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
const Settings = mk('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>');
const KeyRound = mk('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>');

/* ───────────────────────── الألوان والثوابت ───────────────────────── */
const C = {
  bg: "#FAF9F6", card: "#FFFFFF", ink: "#1A1A1A", mute: "#8A8378", line: "#E8E4DD",
  acc: "#1F4D3D", accSoft: "#E9F0ED", amber: "#B8860B", amberSoft: "#FBF3DF",
  copper: "#A0522D", copperSoft: "#F7ECE6", hl: "#FFF3C4", note: "#FBF8EF", grey: "#F1EFEA",
};
const SECTIONS = [
  ["overview", "النظرة العامة", LayoutGrid], ["facts", "الوقائع", FileText],
  ["timeline", "الخط الزمني", Clock], ["requests", "الطلبات", Scale],
  ["defenses", "الدفوع", MessageSquare], ["evidence", "الأدلة والمستندات", Files],
  ["issues", "المسائل محل النظر", Sparkles], ["laws", "النصوص النظامية", BookOpen],
  ["notes", "ملاحظاتي", StickyNote], ["memo", "مذكرة الدراسة", ScrollText],
];
const { CASE_TYPES, NOT_FOUND, SYS, STAGES, lastPart, stagePrompt } = require("./src/prompts.js");
const { PROVIDERS, PROVIDER_LIST, buildRequest, parseResponse, readError, classify, scrub, detectProvider, keyMismatch, unsupported, estimateTokens, tooBig } = require("./src/providers.js");
const ORD = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة", "السابعة", "الثامنة"];

const uid = () => Math.random().toString(36).slice(2, 9);
const arNum = (n) => Number(n ?? 0).toLocaleString("ar-EG");

/* ───────────────────────── التخزين ───────────────────────── */
const DB = (() => {
  let p = null;
  // الوعد الفاشل كان يُخزَّن، فيبقى الفتح مرفوضًا إلى آخر الجلسة ولو زال سببه.
  // ولأن sget/sset يبتلعان الخطأ، كان التطبيق يعمل ويبدو سليمًا وكل شيء يُكتب في الفراغ.
  const open = () => p || (p = new Promise((res, rej) => {
    let r; try { r = indexedDB.open("midad-al-qadi", 1); } catch (e) { return rej(e); }
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.onblocked = () => rej(new Error("blocked"));
  }).catch((e) => { p = null; throw e; }));
  const tx = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => { const t = db.transaction("kv", mode); const req = fn(t.objectStore("kv")); t.oncomplete = () => res(req && req.result); t.onerror = () => rej(t.error); }); };
  return { get: (k) => tx("readonly", (st) => st.get(k)), set: (k, v) => tx("readwrite", (st) => st.put(v, k)), del: (k) => tx("readwrite", (st) => st.delete(k)), keys: () => tx("readonly", (st) => st.getAllKeys()) };
})();
/* تعذّر التخزين ليس تفصيلًا تقنيًا: القضايا كلها في هذا المتصفح، فإن سقط التخزين
   وجب أن يُقال للقاضي صراحةً بدل أن يعمل ويظن أن عمله محفوظ. */
const storage = { broken: false, why: "", onBreak: null };
function markBroken(e) {
  const msg = String((e && e.name) || (e && e.message) || e || "");
  storage.why = /Quota|quota/.test(msg) ? "ذاكرة المتصفح ممتلئة." : "متصفحك يمنع التخزين المحلي (قد تكون نافذة تصفح خاص).";
  if (!storage.broken) { storage.broken = true; if (storage.onBreak) storage.onBreak(); }
}
const sget = async (k) => { try { const v = await DB.get(k); return v === undefined ? null : v; } catch (e) { markBroken(e); return null; } };
const sset = async (k, v) => { try { await DB.set(k, JSON.parse(JSON.stringify(v))); return true; } catch (e) { console.error(e); markBroken(e); return false; } };
const sdel = async (k) => { try { await DB.del(k); return true; } catch { return false; } };
const skeys = async () => { try { return (await DB.keys()) || []; } catch { return []; } };
const ls = { get: (k) => { try { return localStorage.getItem(k) || ""; } catch { return window.__ls?.[k] || ""; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch { (window.__ls ||= {})[k] = v; } } };
const getKey = () => ls.get("midad:key").trim();
const getPass = () => ls.get("midad:pass").trim();
const API = { mode: "direct", proxy: (typeof window !== "undefined" && window.MIDAD_API) || "api", available: false };
async function detectProxy() {
  try {
    const r = await fetch(`${API.proxy}?ping=1`, { cache: "no-store" });
    if (!r.ok) return false;
    const j = await r.json();
    if (j && j.ok && j.midad) { API.available = true; API.mode = ls.get("midad:forceDirect") === "1" ? "direct" : "proxy"; return true; }
  } catch { }
  API.available = false; API.mode = "direct"; return false;
}
const isReady = () => API.mode === "proxy" ? !!getPass() : !!getKey();
const getProvider = () => { const v = ls.get("midad:provider"); return PROVIDER_LIST.includes(v) ? v : "anthropic"; };
const getModel = () => ls.get("midad:model").trim() || PROVIDERS[getProvider()].defaultModels[0];

/* ───────────────────────── التاريخ الهجري والميلادي ───────────────────────── */
function dual(iso, fallback) {
  if (!iso) return fallback || "";
  const d = new Date(iso);
  if (isNaN(d)) return fallback || iso;
  try {
    const g = new Intl.DateTimeFormat("ar-EG", { calendar: "gregory", day: "numeric", month: "long", year: "numeric" }).format(d);
    const h = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" }).format(d);
    return `${g} — ${h}`;
  } catch { return fallback || iso; }
}

/* ───────────────────────── الاتصال بالنموذج ───────────────────────── */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const REQ_TIMEOUT = 300000;   // خمس دقائق: أطول من أي طلب حقيقي، وتمنع انتظارًا بلا نهاية
/* خادم الموقع يحمل مفتاح Anthropic وحده، فوضع «كلمة مرور الموقع» يبقى عليها.
   والمفتاح الشخصي يذهب من المتصفح مباشرة إلى المزوّد الذي اختاره صاحبه. */
async function llm(system, content, maxTokens = 4000) {
  const proxy = API.mode === "proxy";
  const key = getKey(), pass = getPass();
  const pid = proxy ? "anthropic" : getProvider();
  const P = PROVIDERS[pid] || PROVIDERS.anthropic;
  if (proxy && !pass) throw new Error("لم تُدخل كلمة مرور الدخول بعد. افتح الإعدادات (رمز الترس في الصفحة الرئيسية).");
  if (!proxy && !key) throw new Error("لم يُدخل مفتاح API بعد. افتح الإعدادات (رمز الترس في الصفحة الرئيسية) وأدخله.");
  if (!proxy) {
    for (const bad of [keyMismatch(pid, key), unsupported(pid, content), tooBig(pid, system, content, maxTokens)]) {
      if (bad) throw Object.assign(new Error(bad), { final: true });
    }
  }
  // مزوّد غير Anthropic يمرّ عبر خادم الموقع: أغلبهم يمنع النداء من صفحة ويب.
  const viaServer = proxy || !P.direct;
  const pref = getModel();
  const models = [pref, ...(P.fallbacks || []).filter((m) => m !== pref)];
  let lastErr = null, retried = false;
  for (let mi = 0; mi < models.length; mi++) {
    const model = models[mi];
    try {
      const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = ctl ? setTimeout(() => ctl.abort(), REQ_TIMEOUT) : null;
      let res;
      try {
        res = await fetch(viaServer ? API.proxy : P.baseUrl + P.path, {
          method: "POST",
          signal: ctl ? ctl.signal : undefined,
          headers: proxy ? { "Content-Type": "application/json", "x-midad-pass": pass }
            : viaServer ? { "Content-Type": "application/json", "x-midad-provider": pid, "x-midad-key": key, ...(pass ? { "x-midad-pass": pass } : {}) }
              : { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
          body: JSON.stringify(buildRequest(proxy ? "anthropic" : pid, { model, system, content, maxTokens })),
        });
      } catch (e) {
        if (e && e.name === "AbortError") throw Object.assign(new Error("لم يردّ النموذج خلال خمس دقائق. أعد المحاولة، وإن تكرر فقلّل عدد المستندات أو حجمها."), { final: true });
        throw e;
      } finally { if (timer) clearTimeout(timer); }
      const raw = await res.text();
      let data; try { data = JSON.parse(raw); } catch { throw Object.assign(new Error(`استجابة غير مفهومة (${res.status}): ${scrub(raw, key).slice(0, 120)}`), { final: true }); }
      // أخطاء خادم الموقع تخصّ مِداد نفسه، فتُقرأ قبل أخطاء المزوّد
      const mid = data.error && String(data.error.type || "").startsWith("midad_") ? data.error : null;
      if (mid) {
        const msg = scrub(mid.message || "", key);
        if (mid.type === "midad_auth" && proxy) throw Object.assign(new Error("كلمة مرور الدخول غير صحيحة."), { final: true });
        if (mid.type === "midad_config") throw Object.assign(new Error(`إعداد الخادم غير مكتمل: ${msg}`), { final: true });
        if (mid.type === "midad_rate") throw Object.assign(new Error("طلبات كثيرة في وقت قصير. انتظر دقيقة ثم أعد المحاولة."), { final: true });
        throw Object.assign(new Error(msg || "خطأ في خادم الموقع."), { final: true });
      }
      const er = readError(proxy ? "anthropic" : pid, data) || (res.ok ? null : { type: String(res.status), message: scrub(raw, key).slice(0, 160) });
      if (er) {
        er.message = scrub(er.message, key);
        const kind = classify(res.status, er);
        if (kind === "auth") throw Object.assign(new Error(proxy
          ? "مفتاح API المضبوط في الخادم غير صحيح. راجع متغير ANTHROPIC_API_KEY في إعدادات الخادم."
          : `المفتاح غير صحيح أو غير مفعّل عند ${P.label}. تأكد من نسخه كاملًا من ${P.console}.`), { final: true });
        if (kind === "credit") throw Object.assign(new Error(`الرصيد غير كافٍ في حسابك عند ${P.label}. أضف رصيدًا ثم أعد المحاولة.`), { final: true });
        if (kind === "size") throw Object.assign(new Error(`الطلب أكبر مما يقبله ${P.label}. قلّل عدد المستندات أو حجمها، أو اختر مزوّدًا أوسع سياقًا.`), { final: true });
        if (kind === "model") { lastErr = new Error(`النموذج «${model}» غير متاح لحسابك عند ${P.label}. اكتب اسمه كما هو في لوحة حسابك.`); continue; }
        if ((kind === "rate" || kind === "busy" || kind === "server") && !retried) { retried = true; await sleep(2500); mi--; continue; }
        throw Object.assign(new Error(`${er.message} (${er.type || res.status})`), { final: true });
      }
      const out = parseResponse(proxy ? "anthropic" : pid, data);
      if (!String(out || "").trim()) throw Object.assign(new Error(`ردّ ${P.label} بلا نص. جرّب نموذجًا آخر أو أعد المحاولة.`), { final: true });
      return out;
    } catch (e) {
      if (e.final) throw e;
      lastErr = e;
      if (/Failed to fetch|NetworkError|Load failed/i.test(e.message || "")) throw new Error(viaServer
        ? "تعذر الوصول إلى خادم الموقع. أعد تحميل الصفحة، وإن استمر فتأكد أن الخدمة تعمل."
        : "تعذر الوصول إلى api.anthropic.com. تأكد من الاتصال بالإنترنت، وأن الصفحة مفتوحة في متصفح حديث.");
    }
  }
  throw lastErr || new Error("تعذر الاتصال بالنموذج");
}
/* قائمة النماذج من المزوّد نفسه: أدقّ من أي قائمة أكتبها هنا، لأنها من حسابه لحظتها. */
async function fetchModels() {
  const pid = getProvider(), P = PROVIDERS[pid], key = getKey();
  if (!key) throw new Error("أدخل المفتاح أولًا.");
  const bad = keyMismatch(pid, key);
  if (bad) throw new Error(bad);
  if (P.direct) return P.defaultModels;
  const res = await fetch(API.proxy, { method: "POST", headers: { "x-midad-provider": pid, "x-midad-key": key, "x-midad-kind": "models", ...(getPass() ? { "x-midad-pass": getPass() } : {}) } });
  const raw = await res.text();
  let d; try { d = JSON.parse(raw); } catch { throw new Error("لم تُفهم قائمة النماذج من المزوّد."); }
  const er = d.error ? scrub(d.error.message || "", key) : (res.ok ? null : `تعذر جلب القائمة (${res.status}).`);
  if (er) throw new Error(er);
  const ids = (d.data || d.models || []).map((m) => m.id || m.name).filter(Boolean).map((x) => String(x).replace(/^models\//, ""));
  if (!ids.length) throw new Error("لم يرجع المزوّد أي نموذج.");
  return ids.sort();
}
async function testConnection() {
  const t0 = Date.now();
  const txt = await llm("أجب بكلمة واحدة فقط بلا أي إضافة.", [{ type: "text", text: "اكتب الكلمة: جاهز" }]);
  return { ok: true, ms: Date.now() - t0, txt: txt.trim().slice(0, 30) };
}
const { repairJSON, pj, createPjOrFix } = require("./src/json-repair.js");
const { isMangled } = require("./src/pdf-quality.js");
const FIX_SYS = "أنت مصلح JSON. تستلم نصًا يُفترض أنه JSON لكنه غير صالح، فتعيده JSON صالحًا تمامًا بنفس المحتوى والمفاتيح، بلا أي نص قبله أو بعده وبلا markdown. إن كان مقطوعًا فأغلقه بأقل تعديل ممكن دون اختراع بيانات.";
const pjOrFix = createPjOrFix((text) => llm(FIX_SYS, [{ type: "text", text: `أصلح هذا النص ليكون JSON صالحًا فقط:\n\n${text}` }], 6000));
/* استيراد تحليل أُنتج خارج الموقع (أمر /midad-analyze في Claude Code).
   يُتحقق من البنية قبل قبوله، ويوسَم بـ imported ليعرف التطبيق أن لا ملفات وراءه. */
const A_ARRAYS = ["parties", "issues", "facts", "pl", "df", "defenses", "evidence", "conflicts", "gaps"];
function readAnalysis(raw) {
  let j;
  try { j = JSON.parse(String(raw).replace(/^\ufeff/, "")); } catch { throw new Error("الملف ليس JSON صالحًا. اختر ملف analysis.json الذي أنتجه أمر التحليل."); }
  if (!j || typeof j !== "object" || Array.isArray(j)) throw new Error("محتوى الملف ليس تحليل قضية.");
  const has = A_ARRAYS.filter((k) => Array.isArray(j[k])).length;
  if (!j.summary && has < 3) throw new Error("لا يبدو أن الملف تحليل مِداد: ينقصه summary وأغلب الأقسام.");
  const a = { errors: j.errors && typeof j.errors === "object" ? j.errors : {} };
  a.summary = j.summary && typeof j.summary === "object" ? j.summary : {};
  a.meta = j.meta && typeof j.meta === "object" ? j.meta : {};
  for (const k of A_ARRAYS) a[k] = Array.isArray(j[k]) ? j[k] : [];
  a.issues = a.issues.filter((x) => x && x.title).map((x) => ({ ...x, laws: Array.isArray(x.laws) ? x.laws : [] }));
  if (j.lawPick) a.lawPick = j.lawPick;
  a.done = true;
  a.at = typeof j.at === "number" ? j.at : Date.now();
  a.imported = true;
  a.source = j.source || "ملف مستورد";
  // نصوص المستندات إن رافقت التحليل: تُنقل عند الاستيراد إلى ملفات القضية ثم تُحذف من هنا،
  // فلا يُخزَّن النص مرتين، ويعمل «اسأل ملف القضية» وعارض المستندات بلا رفع جديد.
  a.docs = Array.isArray(j.docs)
    ? j.docs.filter((d) => d && typeof d.name === "string" && d.name.trim() && typeof d.text === "string" && d.text.trim())
        .map((d) => ({ name: d.name.trim(), text: d.text }))
    : [];
  return a;
}
const NEW_CASE = { number: "", court: "", circuit: "", type: "تجارية", plaintiff: "", defendant: "", subject: "", systems: [] };
/* بناء قضية من نص ملف تحليل. نصوص المستندات المرافقة تُحفظ ملفاتٍ للقضية،
   فتعمل الأسئلة وعارض المستندات، ولا يبقى النص مخزَّنًا مرتين. */
async function importedCase(raw, base = NEW_CASE) {
  const a = readAnalysis(raw);
  const docs = a.docs || [];
  delete a.docs;
  const meta = a.meta || {};
  const pOf = (r) => (a.parties || []).filter((p) => (p.role || "").includes(r)).map((p) => p.name).filter(Boolean).join("، ");
  const id = uid();
  const recs = docs.map((d) => ({ id: uid(), name: d.name, kind: "text", mime: "text/plain", data: d.text, size: d.text.length }));
  const unsaved = [];
  for (const fl of recs) { if (!(await sset(`midad:file:${id}:${fl.id}`, fl))) unsaved.push(fl.name); }
  if (unsaved.length) {
    for (const fl of recs) await sdel(`midad:file:${id}:${fl.id}`);
    throw new Error(`تعذر حفظ نصوص المستندات (${unsaved.join("، ")}) في ذاكرة المتصفح. احذف قضية قديمة ثم أعد الاستيراد.`);
  }
  return {
    ...NEW_CASE, ...base, id,
    number: base.number || meta.number || "", court: base.court || meta.court || "", circuit: base.circuit || meta.circuit || "", subject: base.subject || meta.subject || "",
    plaintiff: base.plaintiff || pOf("مدعي") || "", defendant: base.defendant || pOf("مدعى عليه") || "",
    sendRaw: false, files: recs.map(({ id: fid, name, kind, size }) => ({ id: fid, name, kind, size })), createdAt: Date.now(), updatedAt: Date.now(), analysis: a,
    notes: {}, freeNotes: [], sessionLog: {}, direction: "", memoVersions: [], visited: [], chosenQ: {}, linked: {}, chat: [], whatsNew: null, systems: [],
    docCount: recs.length,
  };
}
/* الملف قد يصل الجوال من تطبيق محادثة بامتداد أو نوعٍ غير متوقَّع، فيُخفيه منتقي
   الملفات إن قُيّد بـ accept. نقبل أي ملف ونردّ برسالة واضحة إن لم يكن تحليلًا. */
async function readImport(file) {
  if (!file) throw new Error("لم يُختر ملف.");
  if (file.size > 24 * 1024 * 1024) throw new Error("الملف أكبر من ٢٤ ميجابايت.");
  if (!file.size) throw new Error(`الملف «${file.name}» فارغ.`);
  return await file.text();
}
function fileBlocks(files, sendRaw = false, cache = true, pid = null) {
  const P = PROVIDERS[pid || (API.mode === "proxy" ? "anthropic" : getProvider())] || PROVIDERS.anthropic;
  const out = [];
  for (const f of files) {
    // مستند بلا نص مستخرج يرفضه الـ API ويُفشل كل المراحل، فيُستبدل بسطر يوضح حاله.
    if (f.kind === "text" && !String(f.data || "").trim()) { out.push({ type: "text", text: `المستند «${f.name}» مرفوع لكن لم يُستخرج منه نص (قد يكون صورًا داخل ملف Word). لا تستخرج منه شيئًا.` }); continue; }
    if (f.kind === "pdf" && !f.data && !String(f.text || "").trim()) { out.push({ type: "text", text: `المستند «${f.name}» تعذرت قراءته.` }); continue; }
    if (f.kind === "pdf") {
      // النص المستخرج فيه علامات [صفحة N]، فهو أدق في الإحالة وأخفّ من الملف نفسه.
      // ومن لا يقبل PDF أصلًا لا يُرسل إليه إلا النص، أو صفحاته صورًا إن رُسّمت.
      const hasText = f.text && f.text.length > 300;
      if (!P.supportsPdfNative) {
        if (hasText) out.push({ type: "document", source: { type: "text", media_type: "text/plain", data: f.text }, title: f.name });
        else if (Array.isArray(f.shots) && f.shots.length) {
          out.push({ type: "text", text: `الصور التالية صفحات المستند: «${f.name}»` });
          for (const b64 of f.shots) out.push({ type: "image", source: { type: "base64", media_type: "image/png", data: b64 } });
        } else out.push({ type: "image", source: { type: "base64", media_type: "application/pdf", data: f.data } });  // حارس unsupported يوقفه برسالة
        continue;
      }
      if (!sendRaw && hasText) out.push({ type: "document", source: { type: "text", media_type: "text/plain", data: f.text }, title: f.name });
      else out.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: f.data }, title: f.name });
    }
    else if (f.kind === "image") { out.push({ type: "text", text: `الصورة التالية هي المستند: «${f.name}»` }); out.push({ type: "image", source: { type: "base64", media_type: f.mime, data: f.data } }); }
    else out.push({ type: "document", source: { type: "text", media_type: "text/plain", data: f.data }, title: f.name });
  }
  // نقطة تخزين مؤقت على آخر كتلة قبل نص المرحلة: تُخزَّن الملفات مرة واحدة في المرحلة الأولى
  // ثم تُقرأ في المراحل الخمس الباقية وفي أسئلة الملف من الذاكرة بدل إعادة إرسالها كاملة.
  // النظام والملفات ثابتة في كل الطلبات، والمتغير الوحيد هو نص المرحلة بعد هذه النقطة.
  if (cache && out.length) out[out.length - 1] = { ...out[out.length - 1], cache_control: { type: "ephemeral" } };
  return out;
}
/* الفهرسة على مرحلتين: يُعرض على النموذج فهرسٌ بأرقام المواد وأبوابها بلا متون، فيسمّي
   المرشّح منها، ثم تُرسل متون المختارة وحدها إلى مرحلة المسائل. مكتبة بـ٨٥٠ مادة تنزل
   بذلك من نحو ٣٤٧ ألف حرف في كل تحليل إلى نحو ٦٤ ألفًا. */
const IDX_MIN = 60;        // دون هذا العدد لا يستحق الأمر طلبًا إضافيًا
const IDX_MAX_PICKS = 40;
async function pickStatutes(statutes, brief) {
  if (statutes.length <= IDX_MIN) return { picked: statutes, indexed: false, from: statutes.length };
  const index = statutes.map((x, i) => `${i + 1}. ${x.ref} — ${x.system}${lastPart(x.path) ? ` — ${lastPart(x.path)}` : ""}`).join("\n");
  const text = `هذه مسائل قضية وما ورد فيها من طلبات ودفوع:
${JSON.stringify(brief)}

وهذا فهرس النصوص النظامية التي أضافها القاضي واعتمدها في هذه القضية، بأرقامها وأبوابها بلا متونها:
${index}

اختر أرقام المواد التي قد ترتبط بمسائل هذه القضية، ورتّبها من الأقرب صلة، ولا تتجاوز ${IDX_MAX_PICKS} رقمًا.
اختر من هذا الفهرس وحده، ولا تذكر رقمًا ليس فيه. هذا اختيارٌ لما يُعرض على القاضي، وليس ترجيحًا ولا حكمًا ولا تقييمًا.
إن لم يظهر لك ارتباط فأعد مصفوفة فارغة، ولا تملأها بالتخمين.
أعد JSON بهذا الشكل بالضبط: {"picks":[1,2,3]}`;
  const out = await pjOrFix(await llm(SYS, [{ type: "text", text, cache_control: { type: "ephemeral" } }], 4000));
  const nums = (out.picks || []).map((v) => parseInt(v, 10)).filter((v) => Number.isFinite(v) && v >= 1 && v <= statutes.length);
  return { picked: [...new Set(nums)].slice(0, IDX_MAX_PICKS).map((v) => statutes[v - 1]), indexed: true, from: statutes.length };
}
const EXTRA_LABELS = { lawpick: "اختيار النصوص النظامية المرتبطة" };
const stageLabel = (k) => ((STAGES.find((x) => x[0] === k) || [])[1]) || EXTRA_LABELS[k] || k;

/* ───────────────────────── قراءة الملفات ───────────────────────── */
const toB64 = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = () => rej(new Error("تعذرت قراءة الملف")); r.readAsDataURL(file); });
let pdfjsP = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsP) return pdfjsP;
  pdfjsP = new Promise((res, rej) => {
    const sc = document.createElement("script");
    sc.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    sc.onload = () => { try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; res(window.pdfjsLib); } catch (e) { rej(e); } };
    sc.onerror = () => rej(new Error("pdfjs"));
    document.head.appendChild(sc);
  });
  return pdfjsP;
}
/* PDF مصوّر بلا نص عند مزوّد لا يقبل PDF: تُرسَّم صفحاته صورًا ليقرأها.
   لا يُفعل هذا مع كلود لأنه يقرأ الملف نفسه، ولا مع من لا يقرأ الصور. */
const MAX_SHOTS = 12;
async function pdfShots(b64) {
  const pdfjs = await loadPdfJs();
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const shots = [];
  for (let n = 1; n <= Math.min(doc.numPages, MAX_SHOTS); n++) {
    const page = await doc.getPage(n);
    const vp = page.getViewport({ scale: 1.6 });
    const cv = document.createElement("canvas");
    cv.width = Math.min(1600, Math.round(vp.width)); cv.height = Math.round(vp.height * (cv.width / vp.width));
    await page.render({ canvasContext: cv.getContext("2d"), viewport: page.getViewport({ scale: 1.6 * (cv.width / vp.width) }) }).promise;
    shots.push(cv.toDataURL("image/png").split(",")[1]);
  }
  return shots;
}
/* تُستدعى قبل التحليل: تملأ shots لكل PDF يحتاجها عند المزوّد الحالي. */
async function prepareForProvider(files, pid) {
  const P = PROVIDERS[pid] || PROVIDERS.anthropic;
  if (P.supportsPdfNative || !P.supportsImages) return files;
  for (const f of files) {
    if (f.kind !== "pdf" || (f.text && f.text.length > 300) || (f.shots && f.shots.length)) continue;
    try { f.shots = await pdfShots(f.data); } catch (e) { console.warn("pdf shots", e); }
  }
  return files;
}
async function extractPdfText(buf) {
  const pdfjs = await loadPdfJs();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  let out = "", chars = 0;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const t = tc.items.map((i) => i.str).join(" ").replace(/\s+/g, " ").trim();
    chars += t.length; out += `\n\n[صفحة ${p}]\n${t}`;
  }
  const text = out.trim();
  return { text, pages: doc.numPages, chars, mangled: isMangled(text) };
}
const IMG_MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" };
async function readFile(file) {
  const name = file.name, lower = name.toLowerCase();
  if (!file.size) throw new Error(`الملف «${name}» فارغ.`);
  if (file.size > 6 * 1024 * 1024) throw new Error(`الملف «${name}» حجمه ${fmtSize(file.size)}، والحد المسموح 6 ميجابايت. قسّمه أو اضغطه ثم أعد رفعه.`);
  if (lower.endsWith(".pdf")) {
    const data = await toB64(file);
    let text = "", pages = 0, mangled = false;
    try {
      const r = await extractPdfText(await file.arrayBuffer());
      pages = r.pages; mangled = r.mangled;
      // نصٌّ مبعثر أسوأ من لا نص: يُهمل فيُرسل الملف نفسه ويقرأه النموذج بصريًا
      if (r.chars / Math.max(1, r.pages) > 120 && !r.mangled) text = r.text;
    } catch (e) {
      const m = String((e && e.name) || (e && e.message) || "");
      if (/Password|password/.test(m)) throw new Error(`الملف «${name}» محمي بكلمة مرور، فتعذّرت قراءته. افتحه واحفظ نسخة بلا حماية ثم ارفعها.`);
      if (/Invalid|corrupt/i.test(m)) throw new Error(`الملف «${name}» تالف أو ليس PDF سليمًا. افتحه للتأكد ثم أعد حفظه.`);
      console.warn("pdf text", e);
    }
    return { id: uid(), name, kind: "pdf", mime: "application/pdf", data, text, pages, mangled, size: file.size };
  }
  const ext = (lower.match(/\.(png|jpe?g|webp|gif)$/) || [])[1];
  if (ext) return { id: uid(), name, kind: "image", mime: IMG_MIME[ext] || "image/jpeg", data: await toB64(file), size: file.size };
  if (lower.endsWith(".docx")) { if (!window.mammoth) throw new Error("مكتبة قراءة Word لم تُحمَّل. تأكد من الاتصال بالإنترنت وأعد تحميل الصفحة."); const ab = await file.arrayBuffer(); const r = await window.mammoth.extractRawText({ arrayBuffer: ab }); if (!String(r.value || "").trim()) throw new Error(`الملف «${name}» لم يُستخرج منه نص. إن كان صورًا داخل Word فاحفظه PDF أو ارفع الصور نفسها.`); return { id: uid(), name, kind: "text", mime: "text/plain", data: r.value, size: file.size }; }
  if (lower.endsWith(".txt") || lower.endsWith(".md")) { const t = await file.text(); if (!t.trim()) throw new Error(`الملف «${name}» فارغ.`); return { id: uid(), name, kind: "text", mime: "text/plain", data: t, size: file.size }; }
  throw new Error(`صيغة غير مدعومة: «${name}». المدعوم: PDF، Word (docx)، صور، نص.`);
}
const fmtSize = (b) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} م.ب` : `${Math.round(b / 1024)} ك.ب`;

/* ───────────────────────── عناصر واجهة صغيرة ───────────────────────── */
const Tag = ({ children, tone = "grey" }) => {
  const m = { grey: [C.grey, C.mute], amber: [C.amberSoft, C.amber], copper: [C.copperSoft, C.copper], acc: [C.accSoft, C.acc] }[tone];
  return <span className="inline-block text-xs px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: m[0], color: m[1] }}>{children}</span>;
};
const Conf = ({ v }) => v === "low" ? <Tag tone="amber">يحتاج مراجعة</Tag> : <Tag>مؤكد</Tag>;
const Card = ({ children, className = "", style = {} }) => (
  <div className={`rounded-xl p-5 ${className}`} style={{ background: C.card, border: `1px solid ${C.line}`, ...style }}>{children}</div>
);
const H = ({ children, sub }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold" style={{ color: C.ink }}>{children}</h2>
    {sub && <p className="text-sm mt-1" style={{ color: C.mute }}>{sub}</p>}
  </div>
);
const Btn = ({ children, onClick, kind = "primary", small, disabled, title, type = "button" }) => {
  const base = "inline-flex items-center gap-2 rounded-lg font-medium transition disabled:opacity-50 " + (small ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm");
  const st = kind === "primary" ? { background: C.acc, color: "#fff" } : kind === "ghost" ? { background: "transparent", color: C.acc, border: `1px solid ${C.line}` } : { background: C.grey, color: C.ink };
  return <button type={type} title={title} disabled={disabled} onClick={onClick} className={base} style={st}>{children}</button>;
};
const Src = ({ src, onOpen }) => {
  if (!src || !src.doc) return null;
  return (
    <button onClick={() => onOpen(src)} className="text-xs underline decoration-dotted underline-offset-4 text-right" style={{ color: C.mute }}>
      المصدر: {src.doc}{src.page ? ` — الصفحة ${arNum(src.page)}` : ""}
    </button>
  );
};
const Quote = ({ text, label = "النص الأصلي" }) => text ? (
  <div className="rounded-lg p-3 mt-3 text-sm leading-7" style={{ background: C.grey, color: C.ink }}>
    <div className="text-xs mb-1" style={{ color: C.mute }}>{label}</div>
    <span style={{ background: C.hl }}>{text}</span>
  </div>
) : null;
const JudgeNote = ({ value, onChange, label = "ملاحظة القاضي", rows = 3 }) => (
  <div className="mt-4 rounded-lg p-3" style={{ background: C.note, border: `1.5px dotted ${C.mute}` }}>
    <div className="text-xs mb-1 font-medium" style={{ color: C.acc }}>{label}</div>
    <textarea rows={rows} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="يكتبها القاضي بنفسه"
      className="w-full bg-transparent outline-none text-sm leading-7 resize-y" style={{ color: C.ink }} />
  </div>
);
const Empty = ({ children }) => <div className="text-sm py-8 text-center" style={{ color: C.mute }}>{children}</div>;
const Modal = ({ title, onClose, children, wide }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(26,26,26,0.25)" }} onClick={onClose}>
    <div className={`w-full ${wide ? "max-w-5xl" : "max-w-2xl"} rounded-2xl overflow-hidden flex flex-col`} style={{ background: C.bg, maxHeight: "88vh" }} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onClose} className="p-1 rounded-md" style={{ color: C.mute }}><X size={18} /></button>
      </div>
      <div className="p-5 overflow-y-auto">{children}</div>
    </div>
  </div>
);
const Field = ({ label, value, onChange, placeholder, textarea, rows = 3 }) => (
  <label className="block">
    <span className="text-sm block mb-1" style={{ color: C.mute }}>{label}</span>
    {textarea
      ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg px-3 py-2 text-sm outline-none leading-7" style={{ background: C.card, border: `1px solid ${C.line}` }} />
      : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }} />}
  </label>
);

/* ───────────────────────── التطبيق ───────────────────────── */
function SettingsScreen({ onClose, first }) {
  const [key, setKey] = useState(getKey());
  const [pass, setPass] = useState(getPass());
  const [mode, setMode] = useState(API.mode);
  const [prov, setProv] = useState(getProvider());
  const [model, setModel] = useState(getModel());
  const [show, setShow] = useState(false);
  const [test, setTest] = useState(null);
  const P = PROVIDERS[mode === "proxy" ? "anthropic" : prov];
  const [models, setModels] = useState(null);
  const [mBusy, setMBusy] = useState(false);
  const [mErr, setMErr] = useState("");
  const save = () => { ls.set("midad:key", key.trim()); ls.set("midad:pass", pass.trim()); ls.set("midad:provider", prov); ls.set("midad:model", model.trim()); ls.set("midad:forceDirect", API.available && mode === "direct" ? "1" : "0"); API.mode = API.available ? mode : "direct"; };
  // تغيير المزوّد ينقل النموذج إلى أول نماذجه، فلا يُرسل اسم نموذج لا يعرفه
  const pickProvider = (id) => { setProv(id); setModel(PROVIDERS[id].defaultModels[0]); setTest(null); setModels(null); setMErr(""); };
  const loadModels = async () => {
    setMBusy(true); setMErr("");
    save();
    try { setModels(await fetchModels()); } catch (e) { setMErr((e && e.message) || "تعذر جلب القائمة."); }
    setMBusy(false);
  };
  // شكل المفتاح يدلّ على مزوّده، فيُنقل الاختيار وحده بدل رسالة خطأ
  const onKey = (v) => {
    setKey(v); setTest(null);
    const guess = detectProvider(v);
    if (guess && guess !== prov && !(prov === "deepseek" && guess === "openai")) pickProvider(guess);
  };
  const badKey = mode !== "proxy" && key.trim() ? keyMismatch(prov, key) : null;
  const canTest = mode === "proxy" ? !!pass.trim() : !!key.trim() && !badKey && !!model.trim();
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!test?.busy) return;
    setSecs(0);
    const t = setInterval(() => setSecs((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [test?.busy]);
  const runTest = async () => { save(); setTest({ busy: true }); try { const r = await testConnection(); setTest({ ok: true, msg: `الاتصال يعمل (${arNum(r.ms)} مللي ثانية).` }); } catch (e) { setTest({ ok: false, msg: e.message }); } };
  return (
    <div className="max-w-lg mx-auto px-6 pt-16 pb-24 fade">
      {!first && <button onClick={onClose} className="text-sm mb-6 inline-flex items-center gap-1" style={{ color: C.mute }}><ChevronRight size={16} /> رجوع</button>}
      {first && <div className="text-center mb-10"><div className="font-bold" style={{ fontSize: 56, lineHeight: 1 }}>مِداد</div><div className="text-sm mt-3" style={{ color: C.mute }}>إعداد لأول مرة</div></div>}
      <h1 className="text-2xl font-bold mb-2">الاتصال بالنموذج</h1>
      {API.available ? (
        <>
          <p className="text-sm leading-7 mb-4" style={{ color: C.mute }}>هذا الموقع مجهّز بخادم يحمل مفتاح API. تدخل بكلمة مرور الموقع، أو تستخدم مفتاحك الشخصي إن أردت.</p>
          <div className="flex gap-1 mb-6 rounded-lg p-1 w-fit" style={{ background: C.grey }}>
            {[["proxy", "كلمة مرور الموقع"], ["direct", "مفتاح API شخصي"]].map(([k, l]) => <button key={k} onClick={() => { setMode(k); setTest(null); }} className="px-4 py-1.5 rounded-md text-sm" style={{ background: mode === k ? C.card : "transparent", fontWeight: mode === k ? 600 : 400 }}>{l}</button>)}
          </div>
        </>
      ) : (
        <p className="text-sm leading-7 mb-6" style={{ color: C.mute }}>يعمل التطبيق بمفتاح API خاص بك من المزوّد الذي تختاره. يُحفظ المفتاح في هذا المتصفح فقط ولا يُرسل إلا إلى مزوّده.</p>
      )}
      <div className="space-y-4">
        {mode === "proxy" && API.available && (
          <label className="block">
            <span className="text-sm block mb-1" style={{ color: C.mute }}>كلمة مرور الدخول</span>
            <div className="flex items-center gap-2 rounded-lg px-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <KeyRound size={15} style={{ color: C.mute }} />
              <input type={show ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="كلمة المرور التي ضبطها مدير الموقع" className="flex-1 bg-transparent outline-none py-2.5 text-sm" />
              <button onClick={() => setShow(!show)} className="text-xs" style={{ color: C.mute }}>{show ? "أخفِ" : "أظهر"}</button>
            </div>
            <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>تُحفظ في هذا المتصفح فقط. مفتاح API نفسه لا يصل إلى المتصفح أبدًا.</span>
          </label>
        )}
        {(mode === "direct" || !API.available) && <>
          <label className="block">
            <span className="text-sm block mb-1" style={{ color: C.mute }}>المزوّد</span>
            <select value={prov} onChange={(e) => pickProvider(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {PROVIDER_LIST.map((id) => <option key={id} value={id}>{PROVIDERS[id].label}</option>)}
            </select>
            <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>
              {P.supportsImages ? "يقرأ النصوص والصور." : "يقرأ النصوص فقط؛ الملفات المصوّرة لا تعمل معه."}
              {" "}{P.direct ? "يُنادى من جوالك مباشرة." : "يمرّ عبر خادم الموقع لأن مزوّده يمنع النداء من صفحة ويب؛ ومفتاحك يُستعمل في الطلب وحده ولا يُخزَّن."}
              {" "}قواعد مِداد اللغوية كُتبت على كلود، وغيره قد يلتزم بها أقل.
            </span>
          </label>
          <label className="block">
            <span className="text-sm block mb-1" style={{ color: C.mute }}>مفتاح API</span>
            <div className="flex items-center gap-2 rounded-lg px-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <KeyRound size={15} style={{ color: C.mute }} />
              <input dir="ltr" type={show ? "text" : "password"} value={key} onChange={(e) => onKey(e.target.value)} placeholder={P.keyHint} className="flex-1 bg-transparent outline-none py-2.5 text-sm" style={{ fontFamily: "monospace" }} />
              <button onClick={() => setShow(!show)} className="text-xs" style={{ color: C.mute }}>{show ? "أخفِ" : "أظهر"}</button>
            </div>
            {badKey
              ? <span className="text-xs block mt-1 leading-6" style={{ color: C.copper }}>{badKey}</span>
              : <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>من {P.console}. انسخه كاملًا؛ يُحفظ في هذا المتصفح ولا يُرسل إلا إلى {P.label}.</span>}
          </label>
        </>}
        <label className="block">
          <span className="text-sm block mb-1" style={{ color: C.mute }}>النموذج</span>
          <input dir="ltr" list="midad-models" value={model} onChange={(e) => setModel(e.target.value)} placeholder={P.defaultModels[0]}
            className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}`, fontFamily: "monospace" }} />
          <datalist id="midad-models">{(models || P.defaultModels).map((m) => <option key={m} value={m} />)}</datalist>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {(models || P.defaultModels).slice(0, 4).map((m) => (
              <button key={m} onClick={() => setModel(m)} className="text-xs px-2 py-1 rounded-full" dir="ltr"
                style={{ background: model === m ? C.accSoft : C.grey, color: model === m ? C.acc : C.mute }}>{m}</button>
            ))}
            {!P.direct && mode !== "proxy" && (
              <button onClick={loadModels} disabled={mBusy || !key.trim()} className="text-xs underline decoration-dotted" style={{ color: C.acc }}>
                {mBusy ? "يجلب…" : "اجلب النماذج المتاحة في حسابي"}
              </button>
            )}
          </div>
          {mErr && <span className="text-xs block mt-1 leading-6" style={{ color: C.copper }}>{mErr}</span>}
          {models && <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>{arNum(models.length)} نموذجًا متاحًا في حسابك.</span>}
          <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>
            {P.fallbacks ? "إن لم يكن النموذج المختار متاحًا لحسابك ينتقل التطبيق تلقائيًا إلى نموذج بديل."
              : `الأسماء أعلاه اقتراحات، وأسماء النماذج تتغيّر. اكتب الاسم كما هو في لوحة حسابك عند ${P.label}.`}
          </span>
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Btn onClick={runTest} disabled={!canTest}><Sparkles size={15} /> احفظ واختبر الاتصال</Btn>
          {!first && <Btn kind="ghost" onClick={() => { save(); onClose(); }}>احفظ وارجع</Btn>}
        </div>
        {test?.busy && <div className="text-sm inline-flex items-center gap-2" style={{ color: C.mute }}><Loader2 size={14} className="animate-spin" /> يختبر… {arNum(secs)} ثانية{secs > 20 ? " — الخادم المجاني يستيقظ من السكون، امنحه دقيقة" : ""}</div>}
        {test && !test.busy && (
          <div className="text-sm rounded-lg p-3 leading-7" style={{ background: test.ok ? C.accSoft : C.copperSoft, color: test.ok ? C.acc : C.copper }}>
            {test.msg}
            {test.ok && <div className="mt-2"><Btn small onClick={onClose}>ابدأ العمل <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /></Btn></div>}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState("home");
  const [cases, setCases] = useState([]);
  const [library, setLibrary] = useState({ statutes: [], principles: [] });
  const [activeId, setActiveId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);
  const [broken, setBroken] = useState(storage.broken);
  useEffect(() => { storage.onBreak = () => setBroken(true); return () => { storage.onBreak = null; }; }, []);
  const saveT = useRef(), saveL = useRef();

  useEffect(() => {
    const l = document.createElement("link"); l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
    (async () => {
      await detectProxy();
      const cs = await sget("midad:cases"); const lb = await sget("midad:library");
      if (Array.isArray(cs)) setCases(cs);
      if (lb) setLibrary({ statutes: lb.statutes || [], principles: lb.principles || [] });
      setView(isReady() ? "home" : "setup");
      setLoaded(true);
    })();
    return () => l.remove();
  }, []);
  useEffect(() => { if (!loaded) return; clearTimeout(saveT.current); saveT.current = setTimeout(() => sset("midad:cases", cases), 600); }, [cases, loaded]);
  useEffect(() => { if (!loaded) return; clearTimeout(saveL.current); saveL.current = setTimeout(() => sset("midad:library", library), 600); }, [library, loaded]);
  // الحفظ مؤجَّل ٦٠٠ مللي ثانية. وسفاري الجوال يجمّد المؤقّتات لحظة الخروج من التبويب،
  // فآخر ما كتبه القاضي كان يضيع. هنا يُفرَّغ فورًا قبل أن تُخفى الصفحة أو تُغلق.
  const latest = useRef({ cases, library });
  latest.current = { cases, library };
  useEffect(() => {
    if (!loaded) return;
    const flush = () => {
      clearTimeout(saveT.current); clearTimeout(saveL.current);
      sset("midad:cases", latest.current.cases);
      sset("midad:library", latest.current.library);
    };
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => { window.removeEventListener("pagehide", flush); document.removeEventListener("visibilitychange", onHide); };
  }, [loaded]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const updateCase = (id, fn) => setCases((cs) => cs.map((c) => c.id === id ? { ...(typeof fn === "function" ? fn(c) : { ...c, ...fn }), updatedAt: Date.now() } : c));
  const active = cases.find((c) => c.id === activeId);

  const loadFiles = async (c) => {
    const out = [];
    for (const m of c.files) { const d = await sget(`midad:file:${c.id}:${m.id}`); if (d) out.push(d); }
    return out;
  };
  const deleteCase = async (c) => {
    // بالبادئة لا بالقائمة: يضمن حذف أي ملف حُفظ ثم تعثّر تسجيله في القضية.
    const prefix = `midad:file:${c.id}:`;
    const all = await skeys();
    const hit = all.filter((k) => typeof k === "string" && k.startsWith(prefix));
    const targets = hit.length ? hit : (c.files || []).map((m) => `${prefix}${m.id}`);
    let failed = 0;
    for (const k of targets) { if (!(await sdel(k))) failed++; }
    setCases((cs) => cs.filter((x) => x.id !== c.id));
    setActiveId(null); setView("home");
    setToast(failed ? `حُذفت القضية، وتعذر حذف ${arNum(failed)} ملف من ذاكرة المتصفح.` : "حُذفت القضية وملفاتها نهائيًا.");
  };

  return (
    <div dir="rtl" className="min-h-screen midad" style={{ background: C.bg, color: C.ink, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <style>{`
        .midad, .midad * { font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif; }
        .midad button:focus-visible, .midad input:focus-visible, .midad textarea:focus-visible { outline: 2px solid ${C.acc}; outline-offset: 2px; }
        .midad ::selection { background: ${C.hl}; }
        .midad .fade { animation: fade .22s ease; }
        @keyframes fade { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: none;} }
        @media (prefers-reduced-motion: reduce) { .midad * { transition: none !important; animation: none !important; } }
        .midad table td, .midad table th { padding: 10px 12px; }
      `}</style>
      {!loaded ? (
        <div className="min-h-screen flex items-center justify-center" style={{ color: C.mute }}><Loader2 className="animate-spin" /></div>
      ) : view === "setup" ? (
        <SettingsScreen first onClose={() => setView("home")} />
      ) : view === "settings" ? (
        <SettingsScreen onClose={() => setView("home")} />
      ) : view === "home" ? (
        <Home cases={cases} onNew={() => setView("new")} onOpen={(id) => { setActiveId(id); setView("case"); }} onSettings={() => setView("settings")} setToast={setToast}
          onImport={(c) => { setCases((cs) => [c, ...cs]); setActiveId(c.id); setView("case"); }} />
      ) : view === "new" ? (
        <NewCase library={library} onCancel={() => setView("home")} onCreated={(c) => { setCases((cs) => [c, ...cs]); setActiveId(c.id); setView("case"); }} updateCase={updateCase} setToast={setToast} />
      ) : active ? (
        <Workspace c={active} library={library} setLibrary={setLibrary} update={(fn) => updateCase(active.id, fn)} loadFiles={loadFiles}
          onHome={() => setView("home")} onDelete={() => deleteCase(active)} setToast={setToast} />
      ) : null}
      {broken && (
        <div className="fixed top-0 left-0 right-0 z-[60] px-4 py-2 text-sm leading-6 text-center" style={{ background: C.copper, color: "#fff" }}>
          لا يستطيع مِداد الحفظ في هذا المتصفح: {storage.why} عملك الآن <b>لن يُحفظ</b>. أغلق نافذة التصفح الخاص، أو أفرغ مساحة، ثم أعد تحميل الصفحة.
        </div>
      )}
      {toast && <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-sm fade" style={{ background: C.ink, color: "#fff" }}>{toast}</div>}
    </div>
  );
}

/* ───────────────────────── الصفحة الرئيسية ───────────────────────── */
function completion(c) {
  let p = 0;
  if (c.files?.length) p += 15;
  if (c.analysis?.done) p += 35;
  p += Math.min(50, (c.visited?.length || 0) * 5);
  return Math.min(100, p);
}
function Home({ cases, onNew, onOpen, onSettings, onImport, setToast }) {
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [paste, setPaste] = useState(null);
  const impRef = useRef();
  const list = cases.filter((c) => !q || [c.number, c.type, c.plaintiff, c.defendant, c.subject].join(" ").includes(q));
  const doImport = async (raw) => {
    setErr("");
    try {
      const c = await importedCase(raw);
      onImport(c);
      setToast(c.docCount
        ? `استُورد التحليل ومعه نص ${arNum(c.docCount)} من المستندات، فيعمل «اسأل ملف القضية» مباشرة.`
        : "استُورد التحليل. نصوص المستندات ليست معه، فأضفها إن أردت السؤال عنها.");
    } catch (e) { setErr((e && e.message) || "تعذر استيراد الملف."); }
  };
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 fade relative">
      <button onClick={onSettings} title="الإعدادات" className="absolute top-6 left-6 p-2 rounded-lg" style={{ color: C.mute, border: `1px solid ${C.line}` }}><Settings size={16} /></button>
      <div className="text-center mb-12">
        <div className="font-bold" style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.01em" }}>مِداد</div>
        <div className="text-lg mt-3 font-medium">مساحة العمل القضائية الذكية</div>
        <div className="text-sm mt-2" style={{ color: C.mute }}>من ملف القضية إلى صورة واضحة للمسائل محل النظر.</div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Btn onClick={onNew}><Plus size={16} /> قضية جديدة</Btn>
          <Btn kind="ghost" onClick={() => impRef.current && impRef.current.click()}><Upload size={16} /> استيراد تحليل</Btn>
          <input ref={impRef} type="file" className="hidden" onChange={async (e) => {
            const fl = e.target.files && e.target.files[0]; e.target.value = "";
            if (!fl) return;
            try { await doImport(await readImport(fl)); } catch (x) { setErr((x && x.message) || "تعذر قراءة الملف."); }
          }} />
        </div>
        {err && <div className="text-sm rounded-lg p-3 mt-4 max-w-md mx-auto text-right" style={{ background: C.copperSoft, color: C.copper }}>{err}</div>}
        <div className="mt-4 max-w-md mx-auto text-right"><PasteImport value={paste} setValue={setPaste} onImport={doImport} /></div>
      </div>
      <div className="relative max-w-md mx-auto mb-10">
        <Search size={16} className="absolute top-3 right-3" style={{ color: C.mute }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في القضايا…" className="w-full rounded-lg pr-10 pl-3 py-2.5 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }} />
      </div>
      {list.length === 0 ? (
        <Empty>{cases.length === 0 ? "لا توجد قضايا بعد. أنشئ قضيتك الأولى وارفع ملفاتها." : "لا نتائج لهذا البحث."}</Empty>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => {
            const p = completion(c);
            return (
              <button key={c.id} onClick={() => onOpen(c.id)} className="text-right rounded-xl p-5 transition hover:shadow-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{c.number || "بدون رقم"}</span>
                  <Tag tone="acc">{c.type}</Tag>
                </div>
                <div className="text-sm leading-6 mb-4" style={{ color: C.ink }}>{c.plaintiff || "—"} <span style={{ color: C.mute }}>ضد</span> {c.defendant || "—"}</div>
                <div className="text-xs mb-2" style={{ color: C.mute }}>آخر تحديث: {new Intl.DateTimeFormat("ar-EG", { calendar: "gregory", dateStyle: "medium", timeStyle: "short" }).format(new Date(c.updatedAt))}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full" style={{ background: C.grey }}><div className="h-1 rounded-full" style={{ width: `${p}%`, background: C.acc }} /></div>
                  <span className="text-xs" style={{ color: C.mute }}>اكتمال تنظيم الدراسة {arNum(p)}٪</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── محرك التحليل ───────────────────────── */
async function runStages(files, statutes, onStage, prev = {}, sendRaw = false, caseType = "") {
  const pid = API.mode === "proxy" ? "anthropic" : getProvider();
  await prepareForProvider(files, pid);
  const blocks = fileBlocks(files, sendRaw, true, pid);
  // دفاع أخير: لا تُرسل ولا طلبًا واحدًا إن لم يصل مستند. الفشل هنا أرخص من ست مراحل فارغة.
  if (!blocks.length) throw new Error("لا توجد مستندات في هذه القضية، فلم يُرسل أي طلب. ارفع ملفات القضية أولًا من «أضف ملفات إلى القضية».");
  const a = { ...prev, errors: {} };
  for (let i = 0; i < STAGES.length; i++) {
    const [key] = STAGES[i];
    onStage(i, "run");
    try {
      let use = statutes;
      if (key === "issues" && statutes.length) {
        const brief = {
          مسائل: (a.issues || []).map((x) => x.title),
          دفوع: (a.defenses || []).map((x) => x.text),
          "طلبات المدعي": (a.pl || []).map((x) => x.text),
          "طلبات المدعى عليه": (a.df || []).map((x) => x.text),
        };
        try {
          const r = await pickStatutes(statutes, brief);
          use = r.picked;
          a.lawPick = { from: r.from, to: use.length, indexed: r.indexed, at: Date.now() };
        } catch (e) {
          // لا تُرسل المكتبة كاملة عند الفشل: تكلفة مفاجئة بلا إذن. تُترك فارغة ويُعلن السبب.
          a.errors.lawpick = (e && e.message) || String(e);
          use = [];
          a.lawPick = { from: statutes.length, to: 0, indexed: true, failed: true, at: Date.now() };
        }
      }
      const ctx = { issues: (a.issues || []).map((x) => x.title), statutes: use, caseType };
      const out = await pjOrFix(await llm(SYS, [...blocks, { type: "text", text: stagePrompt(key, ctx) }], 8000));
      if (key === "overview") { a.summary = out.summary; a.parties = out.parties || []; a.issues = (out.issues || []).map((x) => ({ title: x.title })); a.meta = out.meta || {}; }
      else if (key === "facts") a.facts = out.facts || [];
      else if (key === "reqdef") { a.pl = out.pl || []; a.df = out.df || []; a.defenses = out.defenses || []; }
      else if (key === "evidence") a.evidence = out.evidence || [];
      else if (key === "issues") { const det = out.issues || []; a.issues = (a.issues || []).map((x, j) => ({ ...x, ...(det[j] || {}), title: x.title })); }
      else if (key === "review") { a.conflicts = out.conflicts || []; a.gaps = out.gaps || []; }
      onStage(i, "ok");
    } catch (e) { const m = (e && e.message) || String(e) || "خطأ غير معروف"; a.errors[key] = m; onStage(i, "err", m); }
  }
  a.done = true; a.at = Date.now();
  return a;
}
function compact(a) {
  if (!a) return {};
  return {
    facts: (a.facts || []).map((f) => `${f.date_text || f.date}: ${f.text}`),
    pl: (a.pl || []).map((x) => x.text), df: (a.df || []).map((x) => x.text),
    defenses: (a.defenses || []).map((x) => x.text), issues: (a.issues || []).map((x) => x.title),
    conflicts: (a.conflicts || []).map((x) => `${x.type}: ${x.a?.text} / ${x.b?.text}`),
    gaps: (a.gaps || []).map((x) => x.text),
  };
}
function Progress({ status, errs = {} }) {
  return (
    <div className="rounded-xl p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="font-semibold mb-4">يعمل مِداد على ترتيب الملف…</div>
      <ol className="space-y-3">
        {STAGES.map(([k, label], i) => {
          const st = status[i];
          return (
            <li key={k} className="flex items-center gap-3 text-sm" style={{ color: st ? C.ink : C.mute }}>
              {st === "run" ? <Loader2 size={16} className="animate-spin shrink-0" style={{ color: C.acc }} /> : st === "ok" ? <CheckCircle2 size={16} className="shrink-0" style={{ color: C.acc }} /> : st === "err" ? <AlertTriangle size={16} className="shrink-0" style={{ color: C.copper }} /> : <Circle size={16} className="shrink-0" />}
              <span>{label}{st === "err" && errs[i] && <span className="block text-xs mt-0.5 leading-5" style={{ color: C.copper }}>{errs[i]}</span>}</span>
            </li>
          );
        })}
      </ol>
      <div className="text-xs mt-4" style={{ color: C.mute }}>الملفات تُرسل للتحليل الآن مباشرة إلى Anthropic API. استخدم بيانات وهمية فقط.</div>
    </div>
  );
}

/* ───────────────────────── إنشاء قضية ───────────────────────── */
function NewCase({ library, onCancel, onCreated, updateCase, setToast }) {
  const [f, setF] = useState({ number: "", court: "", circuit: "", type: "تجارية", plaintiff: "", defendant: "", subject: "", systems: [] });
  const [files, setFiles] = useState([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState([]);
  const [errs, setErrs] = useState({});
  const [drag, setDrag] = useState(false);
  const [sendRaw, setSendRaw] = useState(false);
  const [conn, setConn] = useState(null);
  const runTest = async () => { setConn({ busy: true }); try { const r = await testConnection(); setConn({ ok: true, msg: `الاتصال يعمل (${arNum(r.ms)} مللي ثانية).` }); } catch (e) { setConn({ ok: false, msg: e.message }); } };
  const inp = useRef();
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const addFiles = async (list) => {
    setErr("");
    for (const file of Array.from(list)) { try { const r = await readFile(file); setFiles((fs) => [...fs, r]); } catch (e) { setErr(e.message); } }
  };
  const impRef = useRef();
  const [paste, setPaste] = useState(null);
  const doImport = async (raw) => {
    setErr("");
    try {
      const c = await importedCase(raw, f);
      onCreated(c);
      setToast(c.docCount
        ? `استُورد التحليل ومعه نص ${arNum(c.docCount)} من المستندات، فيعمل «اسأل ملف القضية» مباشرة.`
        : "استُورد التحليل. نصوص المستندات ليست معه، فأضفها إن أردت السؤال عنها.");
    } catch (e) { setErr((e && e.message) || "تعذر استيراد الملف."); }
  };
  const importAnalysis = async (file) => {
    if (!file) return;
    setErr("");
    try { await doImport(await readImport(file)); }
    catch (e) { setErr((e && e.message) || "تعذر قراءة الملف."); }
  };
  const start = async () => {
    if (!files.length) { setErr("ارفع ملفًا واحدًا على الأقل قبل بدء التحليل."); return; }
    setErr(""); setBusy(true);
    const id = uid();
    const c = { id, ...f, sendRaw, files: files.map(({ id: fid, name, kind, size }) => ({ id: fid, name, kind, size })), createdAt: Date.now(), updatedAt: Date.now(), analysis: null, notes: {}, freeNotes: [], sessionLog: {}, direction: "", memoVersions: [], visited: [], chosenQ: {}, linked: {}, chat: [], whatsNew: null };
    try {
      const unsaved = [];
      for (const fl of files) { if (!(await sset(`midad:file:${id}:${fl.id}`, fl))) unsaved.push(fl.name); }
      if (unsaved.length) { setBusy(false); setErr(`تعذر حفظ: ${unsaved.join("، ")} في ذاكرة المتصفح (قد تكون ممتلئة). احذف قضية قديمة أو قلّل حجم الملفات ثم أعد المحاولة.`); for (const fl of files) await sdel(`midad:file:${id}:${fl.id}`); return; }
      const st = [];
      const er = {};
        const a = await runStages(files, caseStatutes(f, library), (i, s, m) => { st[i] = s; if (m) er[i] = m; setStatus([...st]); setErrs({ ...er }); }, {}, sendRaw, f.type);
      const meta = a.meta || {};
      const merged = { ...c, number: c.number || meta.number || "", court: c.court || meta.court || "", circuit: c.circuit || meta.circuit || "", subject: c.subject || meta.subject || "", analysis: a };
      onCreated(merged);
      const failed = Object.keys(a.errors || {}).length;
      setToast(failed ? `اكتمل التحليل مع ${arNum(failed)} قسم تعذر. يمكنك إعادته من داخل القضية.` : "اكتمل ترتيب الملف.");
    } catch (e) {
      // القضية تُفتح على كل حال حتى لا تضيع الملفات المحفوظة ويمكن حذفها أو إعادة تحليلها.
      onCreated({ ...c, analysis: { done: false, errors: { overview: (e && e.message) || String(e) } } });
      setToast("تعذر بدء التحليل. فُتحت القضية بملفاتها، وتقدر تعيد التحليل من داخلها.");
    } finally { setBusy(false); }
  };
  if (busy) return <div className="max-w-xl mx-auto px-6 pt-24"><Progress status={status} errs={errs} /></div>;
  return (
    <div className="max-w-xl mx-auto px-6 pt-12 pb-24 fade">
      <button onClick={onCancel} className="text-sm mb-6 inline-flex items-center gap-1" style={{ color: C.mute }}><ChevronRight size={16} /> الرئيسية</button>
      <h1 className="text-2xl font-bold mb-8">قضية جديدة</h1>
      <div className="space-y-4">
        <div className="text-sm font-semibold">بيانات القضية</div>
        <Field label="رقم القضية" value={f.number} onChange={set("number")} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="المحكمة" value={f.court} onChange={set("court")} />
          <Field label="الدائرة" value={f.circuit} onChange={set("circuit")} />
        </div>
        <label className="block">
          <span className="text-sm block mb-1" style={{ color: C.mute }}>نوع الدعوى</span>
          <select value={f.type} onChange={(e) => set("type")(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            {Object.keys(CASE_TYPES).map((t) => <option key={t}>{t}</option>)}
          </select>
          <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>ستُوجَّه الدراسة نحو: {CASE_TYPES[f.type]}</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Field label="المدعي" value={f.plaintiff} onChange={set("plaintiff")} />
          <Field label="المدعى عليه" value={f.defendant} onChange={set("defendant")} />
        </div>
        <Field label="موضوع الدعوى" value={f.subject} onChange={set("subject")} />
        <div className="text-xs" style={{ color: C.mute }}>ما تتركه فارغًا يحاول مِداد استخراجه من الملف.</div>
        {bySystem(library.statutes).length > 0 && (
          <div>
            <span className="text-sm block mb-2" style={{ color: C.mute }}>الأنظمة المعتمدة في هذه القضية</span>
            <div className="space-y-1">
              {bySystem(library.statutes).map(({ system, items }) => (
                <label key={system} className="flex items-start gap-2 text-sm cursor-pointer rounded-lg px-3 py-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <input type="checkbox" checked={f.systems.includes(system)} onChange={() => setF((x) => ({ ...x, systems: x.systems.includes(system) ? x.systems.filter((v) => v !== system) : [...x.systems, system] }))} className="mt-1.5" />
                  <span className="leading-7">{system} <span className="text-xs" style={{ color: C.mute }}>({arNum(items.length)} مادة)</span></span>
                </label>
              ))}
            </div>
            <span className="text-xs block mt-1 leading-6" style={{ color: C.mute }}>لن يُرسل إلى النموذج إلا ما تؤشّر عليه هنا. تقدر تغيّره لاحقًا من قسم النصوص النظامية.</span>
          </div>
        )}

        <div className="text-sm font-semibold pt-4">ملفات القضية</div>
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inp.current.click()} role="button" tabIndex={0}
          className="rounded-xl p-10 text-center cursor-pointer transition" style={{ border: `1.5px dashed ${drag ? C.acc : C.mute}`, background: drag ? C.accSoft : C.card }}>
          <Upload size={22} className="mx-auto mb-3" style={{ color: C.acc }} />
          <div className="font-medium">ارفع ملف القضية</div>
          <div className="text-xs mt-1" style={{ color: C.mute }}>PDF، Word (docx)، صور المستندات. يمكن رفع عدة ملفات، كل ملف حتى 6 ميجابايت.</div>
          <input ref={inp} type="file" multiple accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif" className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        </div>
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((fl) => (
              <li key={fl.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <span className="flex items-center gap-2 truncate"><FileText size={15} style={{ color: C.mute }} /> {fl.name} <span className="text-xs" style={{ color: C.mute }}>{fmtSize(fl.size)}</span></span>
                <button onClick={() => setFiles((fs) => fs.filter((x) => x.id !== fl.id))} style={{ color: C.mute }}><X size={15} /></button>
              </li>
            ))}
          </ul>
        )}
        {files.some((x) => x.kind === "pdf") && (
          <>
            {files.some((x) => x.mangled) && (
              <div className="text-xs rounded-lg p-3 leading-6" style={{ background: C.amberSoft, color: C.amber }}>
                خرج نص {files.filter((x) => x.mangled).map((x) => `«${x.name}»`).join("، ")} مبعثرًا عند الاستخراج، وهو أمر شائع في ملفات PDF العربية.
                فلن يُرسل النص المبعثر؛ سيُرسل الملف نفسه ليقرأه النموذج بصريًا. النتيجة أدق، لكن أرقام الصفحات في المصادر قد تكون أقل ضبطًا.
              </div>
            )}
            <label className="flex items-start gap-2 text-xs leading-6 cursor-pointer" style={{ color: C.mute }}>
              <input type="checkbox" checked={sendRaw} onChange={(e) => setSendRaw(e.target.checked)} className="mt-1.5" />
              <span>أرسل ملفات PDF كما هي بدل النص المستخرج منها. {files.filter((x) => x.kind === "pdf").every((x) => x.text) ? "استُخرج النص من كل ملفات PDF بنجاح؛ الإرسال كنص أخف وأدق في أرقام الصفحات." : "بعض الملفات لا نص فيها أو نصها مبعثر، وستُرسل كما هي على كل حال."}</span>
            </label>
          </>
        )}
        {err && <div className="text-sm rounded-lg p-3" style={{ background: C.copperSoft, color: C.copper }}>{err}</div>}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={runTest} className="underline decoration-dotted" style={{ color: C.acc }}>اختبر الاتصال بالنموذج</button>
          {conn?.busy && <span className="inline-flex items-center gap-1" style={{ color: C.mute }}><Loader2 size={12} className="animate-spin" /> يختبر…</span>}
          {conn && !conn.busy && <span style={{ color: conn.ok ? C.acc : C.copper }}>{conn.msg}</span>}
        </div>
        <div className="text-xs rounded-lg p-3 leading-6" style={{ background: C.amberSoft, color: C.amber }}>تُرسل الملفات مباشرة من متصفحك إلى Anthropic API بمفتاحك، وتُخزن القضايا داخل هذا المتصفح فقط. لا ترفع ملف قضية حقيقية. استخدم بيانات وهمية فقط.</div>
        <div className="pt-2 flex flex-wrap gap-3">
          <Btn onClick={start}><Sparkles size={16} /> ابدأ التحليل</Btn>
          <Btn kind="ghost" onClick={() => impRef.current && impRef.current.click()}><Upload size={16} /> استيراد تحليل</Btn>
          <Btn kind="ghost" onClick={onCancel}>إلغاء</Btn>
          <input ref={impRef} type="file" className="hidden" onChange={(e) => { importAnalysis(e.target.files && e.target.files[0]); e.target.value = ""; }} />
        </div>
        <div className="text-xs leading-6" style={{ color: C.mute }}>«استيراد تحليل» يفتح ملف analysis.json المُنتَج بأمر التحليل في Claude Code، ويعرضه في الأقسام العشرة بلا أي اتصال بالنموذج ولا استهلاك رصيد.</div>
        <PasteImport value={paste} setValue={setPaste} onImport={doImport} />
      </div>
    </div>
  );
}

/* منتقي الملفات في الجوال قد يرفض ملف التحليل إن وصل من تطبيق محادثة،
   فهذا طريق ثانٍ لا يحتاج ملفًا: يُفتح النص ويُلصق هنا. */
function PasteImport({ value, setValue, onImport }) {
  if (value === null) return (
    <button onClick={() => setValue("")} className="text-xs underline decoration-dotted" style={{ color: C.acc }}>
      لم يظهر الملف في جوالك؟ الصق نص التحليل بدلًا منه
    </button>
  );
  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="text-sm font-semibold">الصق نص التحليل</div>
      <div className="text-xs leading-6" style={{ color: C.mute }}>افتح ملف analysis.json، انسخ محتواه كاملًا، والصقه هنا. يبدأ بقوس {"{"} وينتهي بقوس {"}"}.</div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} dir="ltr"
        placeholder='{"summary": …}'
        className="w-full rounded-lg p-3 text-xs outline-none" style={{ background: C.bg, border: `1px solid ${C.line}`, fontFamily: "monospace" }} />
      <div className="flex flex-wrap gap-3">
        <Btn small onClick={() => value.trim() && onImport(value)}><Upload size={14} /> استورد النص</Btn>
        <Btn small kind="ghost" onClick={() => setValue(null)}>إخفاء</Btn>
      </div>
    </div>
  );
}

/* ───────────────────────── مساحة الدراسة ───────────────────────── */
function Workspace({ c, library, setLibrary, update, loadFiles, onHome, onDelete, setToast }) {
  const [sec, setSec] = useState("overview");
  const [viewer, setViewer] = useState(null); // {srcs:[src,src]}
  const [panel, setPanel] = useState(null);   // conflicts | gaps | new
  const [session, setSession] = useState(false);
  const [reanalyzing, setReanalyzing] = useState(null); // status array
  const [reErrs, setReErrs] = useState({});
  const [conn, setConn] = useState(null);
  const runTest = async () => { setConn({ busy: true }); try { const r = await testConnection(); setConn({ ok: true, msg: `الاتصال يعمل (${arNum(r.ms)} مللي ثانية). المشكلة إذًا في الملفات نفسها.` }); } catch (e) { setConn({ ok: false, msg: e.message }); } };
  const [confirmDel, setConfirmDel] = useState(false);
  const a = c.analysis || {};
  const addInp = useRef();
  const impInp = useRef();
  const importAnalysis = async (file) => {
    if (!file) return;
    try {
      const parsed = readAnalysis(await readImport(file));
      const docs = parsed.docs || [];
      delete parsed.docs;
      // نصوص المستندات المرافقة تُضاف ملفاتٍ لهذه القضية، ولا تُترك داخل التحليل
      const recs = [];
      for (const d of docs) {
        const fl = { id: uid(), name: d.name, kind: "text", mime: "text/plain", data: d.text, size: d.text.length };
        if (await sset(`midad:file:${c.id}:${fl.id}`, fl)) recs.push(fl);
      }
      const pOf = (r) => (parsed.parties || []).filter((p) => (p.role || "").includes(r)).map((p) => p.name).filter(Boolean).join("، ");
      update((x) => ({ ...x, analysis: parsed, prevAnalysis: x.analysis || null,
        files: [...(x.files || []), ...recs.map(({ id: fid, name, kind, size }) => ({ id: fid, name, kind, size }))],
        number: x.number || (parsed.meta || {}).number || "", court: x.court || (parsed.meta || {}).court || "", circuit: x.circuit || (parsed.meta || {}).circuit || "",
        plaintiff: x.plaintiff || pOf("مدعي") || "", defendant: x.defendant || pOf("مدعى عليه") || "" }));
      setToast(recs.length
        ? `استُبدل التحليل، وأُضيف نص ${arNum(recs.length)} من المستندات إلى القضية.`
        : "استُبدل تحليل هذه القضية بالتحليل المستورد.");
    } catch (e) { setToast((e && e.message) || "تعذر استيراد الملف."); }
  };

  useEffect(() => { if (!c.visited?.includes(sec)) update((x) => ({ ...x, visited: [...(x.visited || []), sec] })); }, [sec]);

  const openSrc = (src) => setViewer({ srcs: [src] });
  const openPair = (s1, s2) => setViewer({ srcs: [s1, s2] });

  const [confirmRe, setConfirmRe] = useState(null);
  // تحليل بلا مستندات يرسل طلبات فارغة من ملفات القضية: تكلفة بلا فائدة، ويمحو دراسة مستوردة.
  const reanalyze = async (newFiles = []) => {
    if (reanalyzing) return;
    const willHave = (c.files || []).length + newFiles.length;
    if (!willHave) { setConfirmRe({ kind: "nofiles" }); return; }
    if (!newFiles.length && a.imported) { setConfirmRe({ kind: "imported" }); return; }
    doReanalyze(newFiles);
  };
  const doReanalyze = async (newFiles = []) => {
    if (reanalyzing) return;
    setConfirmRe(null);
    const st = []; setReanalyzing([...st]); setReErrs({});
    try {
    const all = [...(await loadFiles(c)), ...newFiles];
    const unsaved = [];
    for (const fl of newFiles) { if (!(await sset(`midad:file:${c.id}:${fl.id}`, fl))) unsaved.push(fl.name); }
    // تُسجَّل الملفات الجديدة في القضية فورًا حتى لا تبقى في ذاكرة المتصفح بلا مالك لو تعثر التحليل.
    if (newFiles.length) update((x) => ({ ...x, files: [...(x.files || []), ...newFiles.filter((fl) => !unsaved.includes(fl.name)).map(({ id, name, kind, size }) => ({ id, name, kind, size }))] }));
    if (unsaved.length) setToast(`تعذر حفظ: ${unsaved.join("، ")} في ذاكرة المتصفح.`);
    const prevA = c.analysis;
    const er = {};
    const res = await runStages(all, caseStatutes(c, library), (i, s, m) => { st[i] = s; if (m) er[i] = m; setReanalyzing([...st]); setReErrs({ ...er }); }, {}, c.sendRaw, c.type);
    let whatsNew = c.whatsNew;
    if (prevA?.done && prevA.summary && newFiles.length) {
      try {
        const txt = await llm(SYS, [{ type: "text", text: `قارن دراسة سابقة بدراسة جديدة لنفس القضية بعد إضافة ${arNum(newFiles.length)} ملف جديد (${newFiles.map((x) => x.name).join("، ")}). اذكر ما الجديد الذي قد يغير الدراسة فقط: دفع جديد، طلب جديد، تغير مبلغ، تاريخ جديد يتعارض مع سابق، مستند جديد مرتبط بمسألة، رد ظهر على مسألة أو دفع، وما بقي بلا تغيير. لا ترجيح ولا نتيجة. target يحدد القسم: facts|requests|defenses|issues|conflicts|gaps.
الدراسة السابقة: ${JSON.stringify(compact(prevA))}
الدراسة الجديدة: ${JSON.stringify(compact(res))}
أعد JSON بهذا الشكل بالضبط: {"changes":[{"text":"","target":"facts"}],"unchanged":"جملة عما لم يتغير"}` }]);
        whatsNew = { ...(await pjOrFix(txt)), at: Date.now(), files: newFiles.map((x) => x.name) };
      } catch (e) { whatsNew = { changes: [], unchanged: "", error: e.message, at: Date.now() }; }
    }
    update((x) => ({ ...x, analysis: res, prevAnalysis: prevA, whatsNew, memoVersions: x.memoVersions }));
    setToast(newFiles.length ? "أُضيفت الملفات وأُعيد ترتيب الدراسة." : "أُعيد ترتيب الدراسة.");
    if (newFiles.length && prevA?.done && prevA.summary) setPanel("new");
    } catch (e) {
      setToast(`تعذر إعادة التحليل: ${(e && e.message) || e}`);
    } finally { setReanalyzing(null); }
  };
  const addMore = async (list) => {
    const out = [];
    for (const file of Array.from(list)) { try { out.push(await readFile(file)); } catch (e) { setToast(e.message); } }
    if (out.length) reanalyze(out);
  };

  const setNote = (k, v) => update((x) => ({ ...x, notes: { ...x.notes, [k]: v } }));
  const props = { c, a, update, openSrc, openPair, setNote, library, setLibrary, setToast, setSession, reanalyze };
  const nConf = (a.conflicts || []).length, nGaps = (a.gaps || []).length;

  return (
    <div className="min-h-screen flex">
      {/* القائمة الجانبية */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 min-h-screen sticky top-0 self-start" style={{ borderLeft: `1px solid ${C.line}` }}>
        <div className="p-5" style={{ borderBottom: `1px solid ${C.line}` }}>
          <button onClick={onHome} className="text-xs inline-flex items-center gap-1 mb-3" style={{ color: C.mute }}><ChevronRight size={14} /> الرئيسية</button>
          <div className="font-bold">{c.number || "قضية"}</div>
          <div className="text-xs mt-1 leading-5" style={{ color: C.mute }}>{c.plaintiff} ضد {c.defendant}</div>
          <div className="text-xs mt-2" style={{ color: C.mute }}>اكتمال تنظيم الدراسة {arNum(completion(c))}٪</div>
        </div>
        <nav className="p-3 flex-1">
          {SECTIONS.map(([k, label, Icon]) => (
            <button key={k} onClick={() => setSec(k)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 text-right transition" style={{ background: sec === k ? C.accSoft : "transparent", color: sec === k ? C.acc : C.ink, fontWeight: sec === k ? 600 : 400 }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="p-3 space-y-1" style={{ borderTop: `1px solid ${C.line}` }}>
          <button onClick={() => addInp.current.click()} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-right" style={{ color: C.ink }}><Upload size={15} /> أضف ملفات إلى القضية</button>
          <button onClick={() => reanalyze([])} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-right" style={{ color: C.ink }}><RefreshCw size={15} /> أعد التحليل</button>
          <button onClick={() => impInp.current && impInp.current.click()} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-right" style={{ color: C.ink }}><Download size={15} /> استيراد تحليل</button>
          <button onClick={() => setConfirmDel(true)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-right" style={{ color: C.copper }}><Trash2 size={15} /> احذف القضية نهائيًا</button>
        </div>
      </aside>
      <input ref={addInp} type="file" multiple accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif" className="hidden" onChange={(e) => { addMore(e.target.files); e.target.value = ""; }} />
      <input ref={impInp} type="file" className="hidden" onChange={(e) => { importAnalysis(e.target.files && e.target.files[0]); e.target.value = ""; }} />

      {/* المحتوى */}
      <main className="flex-1 min-w-0 pb-40">
        <div className="sticky top-0 z-20 px-4 md:px-8 py-3 flex flex-wrap items-center gap-2" style={{ background: C.bg, borderBottom: `1px solid ${C.line}` }}>
          <button onClick={onHome} className="md:hidden text-xs inline-flex items-center gap-1 ml-2" style={{ color: C.mute }}><ChevronRight size={14} /> الرئيسية</button>
          <Btn kind="ghost" small onClick={() => setPanel("conflicts")}><AlertTriangle size={14} style={{ color: C.copper }} /> اكتشف التعارضات {nConf ? <span className="text-xs" style={{ color: C.copper }}>{arNum(nConf)}</span> : null}</Btn>
          <Btn kind="ghost" small onClick={() => setPanel("gaps")}><Eye size={14} /> ما الذي يحتاج إلى تحقق؟ {nGaps ? <span className="text-xs" style={{ color: C.amber }}>{arNum(nGaps)}</span> : null}</Btn>
          <Btn kind="ghost" small onClick={() => setPanel("new")}><History size={14} /> ما الجديد؟</Btn>
          <div className="md:hidden flex gap-1 mr-auto">
            <button onClick={() => addInp.current.click()} title="أضف ملفات" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}><Upload size={15} /></button>
            <button onClick={() => impInp.current && impInp.current.click()} title="استيراد تحليل" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}><Download size={15} /></button>
            <button onClick={() => setConfirmDel(true)} className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}`, color: C.copper }}><Trash2 size={15} /></button>
          </div>
        </div>
        <div className="md:hidden flex gap-1 overflow-x-auto px-4 py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
          {SECTIONS.map(([k, label]) => <button key={k} onClick={() => setSec(k)} className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap" style={{ background: sec === k ? C.acc : C.card, color: sec === k ? "#fff" : C.ink, border: `1px solid ${C.line}` }}>{label}</button>)}
        </div>

        <div className="px-4 md:px-8 py-8 max-w-4xl fade" key={sec}>
          {reanalyzing ? <Progress status={reanalyzing} errs={reErrs} /> : !a.done ? (
            <Empty>لم يُحلَّل الملف بعد. <button className="underline" onClick={() => reanalyze([])}>ابدأ التحليل</button></Empty>
          ) : (
            <>
              {a.imported && (
                <div className="rounded-lg p-4 mb-6 text-sm leading-7" style={{ background: C.accSoft, color: C.acc }}>
                  هذه دراسة <b>مستوردة</b> من ملف تحليل، لا من تحليل جرى داخل الموقع. تُعرض كاملة في الأقسام العشرة، وتقدر تكتب ملاحظاتك وتنشئ مذكرة الدراسة منها.
                  {!(c.files || []).length && <span className="block mt-1">نصوص المستندات ليست مع هذا التحليل، فلا يعمل «اسأل ملف القضية» ولا عارض المستندات حتى ترفع الملفات من «أضف ملفات إلى القضية».</span>}
                </div>
              )}
              {a.errors && Object.keys(a.errors).length > 0 && (
                <div className="rounded-lg p-4 mb-6 text-sm" style={{ background: C.amberSoft, color: C.amber }}>
                  <div className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" /><div className="leading-7">تعذر إكمال: {Object.keys(a.errors).map((k) => stageLabel(k)).join("، ")}.</div></div>
                  <div className="text-xs mt-2 leading-6 rounded p-2" style={{ background: "rgba(255,255,255,0.6)", color: C.copper }}>سبب الخطأ: {Object.values(a.errors)[0]}</div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                    <button className="underline" onClick={() => reanalyze([])}>أعد التحليل</button>
                    <button className="underline" onClick={runTest}>اختبر الاتصال</button>
                    {(c.files || []).some((x) => x.kind === "pdf") && <button className="underline" onClick={() => update((x) => ({ ...x, sendRaw: !x.sendRaw }))}>{c.sendRaw ? "أرسل PDF كنص مستخرج" : "أرسل PDF كما هو"}</button>}
                    {conn?.busy && <span className="inline-flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> يختبر…</span>}
                    {conn && !conn.busy && <span style={{ color: conn.ok ? C.acc : C.copper }}>{conn.msg}</span>}
                  </div>
                </div>
              )}
              {sec === "overview" && <Overview {...props} />}
              {sec === "facts" && <Facts {...props} />}
              {sec === "timeline" && <Timeline {...props} />}
              {sec === "requests" && <Requests {...props} />}
              {sec === "defenses" && <Defenses {...props} />}
              {sec === "evidence" && <Evidence {...props} />}
              {sec === "issues" && <Issues {...props} />}
              {sec === "laws" && <Laws {...props} />}
              {sec === "notes" && <Notes {...props} />}
              {sec === "memo" && <Memo {...props} />}
            </>
          )}
        </div>
      </main>

      <AskBar c={c} loadFiles={loadFiles} update={update} openSrc={openSrc} />
      {viewer && <Viewer c={c} srcs={viewer.srcs} loadFiles={loadFiles} onClose={() => setViewer(null)} onAddPair={() => setViewer((v) => ({ srcs: [v.srcs[0], null] }))} />}
      {panel === "conflicts" && <Modal title="تعارضات محتملة" onClose={() => setPanel(null)}><ConflictsPanel a={a} openPair={openPair} /></Modal>}
      {panel === "gaps" && <Modal title="ما الذي يحتاج إلى تحقق؟" onClose={() => setPanel(null)}><GapsPanel a={a} update={update} setToast={setToast} /></Modal>}
      {panel === "new" && <Modal title="ما الجديد منذ آخر مراجعة؟" onClose={() => setPanel(null)}><WhatsNew c={c} go={(t) => { setSec(t === "requests" || t === "defenses" ? t : t === "conflicts" || t === "gaps" ? "overview" : t); setPanel(t === "conflicts" ? "conflicts" : t === "gaps" ? "gaps" : null); }} /></Modal>}
      {session && <Session c={c} a={a} update={update} onClose={() => setSession(false)} setToast={setToast} openSrc={openSrc} />}
      {confirmRe && (
        <Modal title={confirmRe.kind === "nofiles" ? "لا يمكن التحليل" : "استبدال الدراسة المستوردة"} onClose={() => setConfirmRe(null)}>
          {confirmRe.kind === "nofiles" ? (
            <>
              <p className="text-sm leading-7 mb-4">لا توجد ملفات مرفوعة في هذه القضية، والتحليل يقرأ من ملفات القضية نفسها. لو بدأ الآن لأرسل طلبات بلا مستندات، فاستهلك من رصيدك بلا فائدة.</p>
              <p className="text-sm leading-7 mb-4" style={{ color: C.mute }}>ارفع ملفات القضية من «أضف ملفات إلى القضية» ثم أعد المحاولة. وإن كانت دراستك مستوردة من ملف تحليل فهي معروضة كاملة ولا تحتاج تحليلًا.</p>
              <Btn onClick={() => setConfirmRe(null)}>فهمت</Btn>
            </>
          ) : (
            <>
              <p className="text-sm leading-7 mb-4">هذه الدراسة <b>مستوردة</b> من ملف تحليل. وإعادة التحليل ستستهلك من رصيدك <b>وتستبدل الدراسة المستوردة بنتيجة جديدة</b>.</p>
              <p className="text-sm leading-7 mb-4" style={{ color: C.mute }}>إن أردت النصوص النظامية فقط فأعد استيراد الملف بعدها، أو صدّر نسخة قبل المتابعة.</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => doReanalyze([])} className="px-4 py-2 rounded-lg text-sm text-white" style={{ background: C.copper }}>تابع وأعد التحليل</button>
                <Btn kind="ghost" onClick={() => setConfirmRe(null)}>إلغاء</Btn>
              </div>
            </>
          )}
        </Modal>
      )}
      {confirmDel && (
        <Modal title="حذف القضية" onClose={() => setConfirmDel(false)}>
          <p className="text-sm leading-7 mb-4">سيُحذف ملف القضية وكل المستندات المرفوعة وكل ملاحظاتك نهائيًا، ولا يمكن استرجاعها.</p>
          <div className="flex gap-3"><button onClick={onDelete} className="px-4 py-2 rounded-lg text-sm text-white" style={{ background: C.copper }}>احذف نهائيًا</button><Btn kind="ghost" onClick={() => setConfirmDel(false)}>إلغاء</Btn></div>
        </Modal>
      )}
    </div>
  );
}

/* ───────────────────────── ١. النظرة العامة ───────────────────────── */
function Overview({ c, a, update }) {
  const s = a.summary || {};
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newT, setNewT] = useState("");
  const setIssues = (issues) => update((x) => ({ ...x, analysis: { ...x.analysis, issues } }));
  const parties = a.parties?.length ? a.parties : [{ name: c.plaintiff, role: "مدعي" }, { name: c.defendant, role: "مدعى عليه" }];
  return (
    <div className="space-y-8">
      <Card className="p-7">
        <h2 className="text-xl font-bold mb-5">صورة القضية</h2>
        {[["ما الدعوى؟", s.claim], ["ماذا يطلب المدعي؟", s.asks], ["ماذا يجيب المدعى عليه؟", s.reply], ["ما جوهر النزاع؟", s.core]].map(([q, t]) => (
          <div key={q} className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 py-3" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="text-sm font-medium" style={{ color: C.mute }}>{q}</div>
            <div className="sm:col-span-3 text-sm leading-7">{t || <span style={{ color: C.mute }}>لم يظهر في الملف.</span>}</div>
          </div>
        ))}
      </Card>
      <Card>
        <h3 className="font-bold mb-4">خريطة الأطراف</h3>
        <div className="flex flex-wrap items-center gap-3">
          {parties.map((p, i) => (
            <React.Fragment key={i}>
              <div className="rounded-lg px-4 py-3 text-sm" style={{ border: `1px solid ${C.line}`, background: C.bg }}>
                <div className="font-medium">{p.name || "—"}</div>
                <div className="text-xs mt-0.5" style={{ color: C.mute }}>{p.role}{p.agent ? ` — الوكيل: ${p.agent}` : ""}</div>
              </div>
              {i < parties.length - 1 && <div className="text-xs px-2" style={{ color: C.mute }}>{c.subject || "النزاع"}</div>}
            </React.Fragment>
          ))}
        </div>
      </Card>
      <div>
        <h3 className="font-bold mb-4">المسائل الرئيسية</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(a.issues || []).map((it, i) => (
            <div key={i} className="rounded-xl p-4 text-sm leading-7 group relative" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {editing === i ? (
                <input autoFocus defaultValue={it.title} onBlur={(e) => { const v = e.target.value.trim(); setIssues(a.issues.map((x, j) => j === i ? { ...x, title: v || x.title } : x)); setEditing(null); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} className="w-full bg-transparent outline-none" />
              ) : <span>{it.title}</span>}
              <div className="absolute top-2 left-2 hidden group-hover:flex gap-1">
                <button onClick={() => setEditing(i)} className="text-xs px-2 py-0.5 rounded" style={{ background: C.grey }}>تعديل</button>
                <button onClick={() => setIssues(a.issues.filter((_, j) => j !== i))} className="text-xs px-2 py-0.5 rounded" style={{ background: C.grey, color: C.copper }}>حذف</button>
              </div>
            </div>
          ))}
          {adding ? (
            <div className="rounded-xl p-3 text-sm flex items-center gap-2" style={{ border: `1.5px dashed ${C.acc}`, background: C.card }}>
              <input autoFocus value={newT} onChange={(e) => setNewT(e.target.value)} placeholder="هل …؟" onKeyDown={(e) => { if (e.key === "Enter" && newT.trim()) { setIssues([...(a.issues || []), { title: newT.trim(), pl: "", df: "", evidence: [], laws: [], questions: [] }]); setNewT(""); setAdding(false); } if (e.key === "Escape") setAdding(false); }} className="flex-1 bg-transparent outline-none" />
              <button onClick={() => { if (newT.trim()) { setIssues([...(a.issues || []), { title: newT.trim(), pl: "", df: "", evidence: [], laws: [], questions: [] }]); setNewT(""); } setAdding(false); }} className="text-xs px-2 py-1 rounded" style={{ background: C.acc, color: "#fff" }}>أضف</button>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} className="rounded-xl p-4 text-sm flex items-center justify-center gap-2" style={{ border: `1.5px dashed ${C.line}`, color: C.mute }}><Plus size={16} /> أضف مسألة</button>
          )}
        </div>
        <div className="text-xs mt-3" style={{ color: C.mute }}>صياغة المسائل أداة تنظيم، وليست حكمًا مسبقًا. عدّل أو احذف أو أضف ما تراه.</div>
      </div>
    </div>
  );
}

/* ───────────────────────── ٢. الوقائع ───────────────────────── */
function Facts({ a, openSrc }) {
  const [open, setOpen] = useState(null);
  const facts = a.facts || [];
  const kindLabel = { document: "وردت في مستند", claimed: "ادعاها أحد الأطراف", disputed: "نازع فيها الطرف الآخر" };
  return (
    <div>
      <H sub="كل واقعة في بطاقة مستقلة، ولها مصدرها. اضغط البطاقة لرؤية النص الأصلي.">الوقائع</H>
      {facts.length === 0 ? <Empty>لم تُستخرج وقائع من الملف.</Empty> : (
        <div className="space-y-3">
          {facts.map((f, i) => (
            <div key={i} role="button" tabIndex={0} onClick={() => setOpen(open === i ? null : i)} onKeyDown={(e) => e.key === "Enter" && setOpen(open === i ? null : i)} className="w-full text-right rounded-xl p-5 transition cursor-pointer" style={{ background: C.card, border: `1px solid ${open === i ? C.acc : C.line}` }}>
              <div className="text-sm font-semibold mb-1">{dual(f.date, f.date_text) || "بدون تاريخ"}</div>
              <div className="text-sm leading-7">{f.text}</div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Tag tone={f.kind === "disputed" ? "copper" : f.kind === "claimed" ? "grey" : "acc"}>{kindLabel[f.kind] || "وردت في الملف"}</Tag>
                <Conf v={f.conf} />
                <span className="mr-auto" onClick={(e) => e.stopPropagation()}><Src src={f.src} onOpen={openSrc} /></span>
              </div>
              {open === i && <Quote text={f.src?.quote} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── ٣. الخط الزمني ───────────────────────── */
function Timeline({ a, openSrc, openPair }) {
  const [hide, setHide] = useState({});
  const facts = (a.facts || []).filter((f) => !hide[f.kind]);
  const dateConf = (a.conflicts || []).filter((x) => (x.type || "").includes("تاريخ"));
  const kinds = [["document", "المستندات"], ["claimed", "ما ادعاه طرف"], ["disputed", "ما نُوزع فيه"]];
  return (
    <div>
      <H sub="الأحداث والعقود والمراسلات والمطالبات كما وردت في الملف.">الخط الزمني</H>
      <div className="flex flex-wrap gap-2 mb-6">{kinds.map(([k, l]) => <button key={k} onClick={() => setHide((h) => ({ ...h, [k]: !h[k] }))} className="text-xs px-3 py-1.5 rounded-full" style={{ background: hide[k] ? C.grey : C.accSoft, color: hide[k] ? C.mute : C.acc, textDecoration: hide[k] ? "line-through" : "none" }}>{l}</button>)}</div>
      {dateConf.map((x, i) => (
        <div key={i} className="rounded-lg p-4 mb-4 text-sm" style={{ background: C.copperSoft, border: `1px solid ${C.copper}22` }}>
          <div className="font-medium mb-1" style={{ color: C.copper }}>تعارض محتمل في التاريخ</div>
          <div className="leading-7">{x.a?.text} <span style={{ color: C.mute }}>|</span> {x.b?.text}</div>
          <button onClick={() => openPair(x.a?.src, x.b?.src)} className="text-xs underline mt-1" style={{ color: C.copper }}>عرض المصدرين</button>
        </div>
      ))}
      <div className="relative pr-6" style={{ borderRight: `1.5px solid ${C.line}` }}>
        {facts.length === 0 ? <Empty>لا أحداث ظاهرة.</Empty> : facts.map((f, i) => (
          <div key={i} className="relative mb-6">
            <span className="absolute w-3 h-3 rounded-full" style={{ right: -31, top: 8, background: f.kind === "disputed" ? C.copper : C.acc, border: `2px solid ${C.bg}` }} />
            <div className="text-sm font-semibold">{dual(f.date, f.date_text) || "بدون تاريخ"}</div>
            <div className="text-sm leading-7 mt-0.5">{f.text}</div>
            <Src src={f.src} onOpen={openSrc} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── ٤. الطلبات ───────────────────────── */
function Requests({ a, c, openSrc, setNote }) {
  const [cmp, setCmp] = useState(false);
  const renderCol = (title, items, side) => (
    <div>
      <h3 className="font-bold mb-4">{title}</h3>
      {items.length === 0 ? <Empty>لم تُستخرج طلبات.</Empty> : items.map((r, i) => <ReqCard key={`${side}-${i}`} r={r} k={`${side}-${i}`} note={c.notes?.[`${side}-${i}`]} setNote={setNote} openSrc={openSrc} />)}
    </div>
  );
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <H sub="طلبات كل طرف، وسندها كما ورد في مذكرته.">الطلبات</H>
        <Btn kind="ghost" small onClick={() => setCmp(true)}><Columns size={14} /> قارن المذكرات</Btn>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderCol("طلبات المدعي", a.pl || [], "pl")}
        {renderCol("طلبات المدعى عليه", a.df || [], "df")}
      </div>
      {cmp && (
        <Modal wide title="مقارنة المذكرات" onClose={() => setCmp(false)}>
          <div className="text-xs mb-4 leading-6" style={{ color: C.mute }}>التظليل يبين ما ظهر عليه رد في الملف وما لم يظهر عليه رد صريح، ولا يترتب عليه أي أثر قضائي.</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold mb-3">ما ورد من المدعي</div>
              {(a.pl || []).map((r, i) => (
                <div key={i} className="rounded-lg p-3 mb-2 text-sm leading-6" style={{ background: r.replied === "yes" ? C.accSoft : r.replied === "no" ? C.grey : C.card, border: `1px solid ${C.line}` }}>
                  {r.text}
                  <div className="mt-1"><Tag tone={r.replied === "yes" ? "acc" : "grey"}>{r.replied === "yes" ? "ظهر عليه رد" : r.replied === "no" ? "لم يظهر رد صريح" : "غير واضح"}</Tag></div>
                </div>
              ))}
            </div>
            <div>
              <div className="font-semibold mb-3">ما ورد من المدعى عليه</div>
              {[...(a.df || []).map((x) => ({ ...x, tag: "طلب" })), ...(a.defenses || []).filter((d) => (d.by || "").includes("عليه")).map((x) => ({ ...x, tag: "دفع" }))].map((r, i) => (
                <div key={i} className="rounded-lg p-3 mb-2 text-sm leading-6" style={{ background: C.card, border: `1px solid ${C.line}` }}><Tag>{r.tag}</Tag> <span className="mr-1">{r.text}</span></div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
function ReqCard({ r, k, note, setNote, openSrc }) {
  const [q, setQ] = useState(false);
  return (
    <Card className="mb-4">
      <div className="text-sm font-semibold leading-7">{r.text}</div>
      <div className="mt-3 text-sm leading-7"><span style={{ color: C.mute }}>سنده بحسب ما ورد في الملف: </span>{r.basis || "لم يذكر."}</div>
      {r.docs?.filter(Boolean).length > 0 && <div className="flex flex-wrap gap-1.5 mt-3">{r.docs.filter(Boolean).map((d, i) => <button key={i} onClick={() => openSrc({ doc: d, page: 0, quote: "" })}><Tag>{d}</Tag></button>)}</div>}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Conf v={r.conf} />
        <button onClick={() => setQ(!q)} className="text-xs underline decoration-dotted" style={{ color: C.mute }}>{q ? "أخفِ النص الأصلي" : "النص الأصلي"}</button>
        <span className="mr-auto"><Src src={r.src} onOpen={openSrc} /></span>
      </div>
      {q && <Quote text={r.src?.quote} />}
      <JudgeNote value={note} onChange={(v) => setNote(k, v)} />
    </Card>
  );
}

/* ───────────────────────── ٥. الدفوع ───────────────────────── */
function Defenses({ a, c, openSrc, setNote }) {
  const ds = a.defenses || [];
  return (
    <div>
      <H sub="الدفوع مستقلة عن الطلبات: اعتراض إجرائي أو موضوعي كما ورد في المذكرة.">الدفوع</H>
      {ds.length === 0 ? <Empty>لم تُستخرج دفوع من الملف.</Empty> : ds.map((d, i) => (
        <Card key={i} className="mb-4">
          {[["الدفع", d.text], ["صاحب الدفع", d.by], ["الأساس المذكور في المذكرة", d.basis], ["المستند المرتبط", d.src?.doc ? `${d.src.doc}${d.src.page ? ` — الصفحة ${arNum(d.src.page)}` : ""}` : ""]].map(([l, v]) => (
            <div key={l} className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3 py-2 text-sm" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div style={{ color: C.mute }}>{l}</div><div className="sm:col-span-3 leading-7">{v || <span style={{ color: C.mute }}>—</span>}</div>
            </div>
          ))}
          <Quote text={d.src?.quote} label="النص الأصلي المستخرج" />
          <div className="flex items-center gap-2 mt-3"><Conf v={d.conf} /><span className="mr-auto"><Src src={d.src} onOpen={openSrc} /></span></div>
          <JudgeNote value={c.notes?.[`def-${i}`]} onChange={(v) => setNote(`def-${i}`, v)} />
        </Card>
      ))}
    </div>
  );
}

/* ───────────────────────── ٦. الأدلة ───────────────────────── */
function Evidence({ a, openSrc }) {
  const [sort, setSort] = useState("doc");
  const rows = [...(a.evidence || [])].filter(Boolean).sort((x, y) => String(x[sort] ?? "").localeCompare(String(y[sort] ?? ""), "ar"));
  const cols = [["doc", "المستند"], ["by", "مقدم المستند"], ["purpose", "ما الذي يراد إثباته بحسب مقدم المستند"], ["issue", "المسألة المرتبطة"]];
  return (
    <div>
      <H sub="اضغط رأس العمود للفرز، واسم المستند لفتحه.">الأدلة والمستندات</H>
      {rows.length === 0 ? <Empty>لم تُستخرج مستندات.</Empty> : (
        <div className="rounded-xl overflow-x-auto" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.line}` }}>{cols.map(([k, l]) => <th key={k} className="text-right font-semibold cursor-pointer" onClick={() => setSort(k)} style={{ color: sort === k ? C.acc : C.ink }}>{l}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <td><button className="underline decoration-dotted text-right" onClick={() => openSrc({ doc: r.doc, page: 0, quote: "" })}>{r.doc}</button></td>
                <td>{r.by}</td><td className="leading-6">{r.purpose}</td><td style={{ color: C.mute }}>{r.issue}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── ٧. المسائل ───────────────────────── */
function IssueSec({ title, children }) {
  const [o, setO] = useState(true);
  return (
    <div className="py-3" style={{ borderTop: `1px solid ${C.line}` }}>
      <button onClick={() => setO(!o)} className="w-full flex items-center justify-between text-sm font-semibold"><span>{title}</span><ChevronLeft size={15} style={{ transform: o ? "rotate(-90deg)" : "none", transition: "transform .2s", color: C.mute }} /></button>
      {o && <div className="mt-2 text-sm leading-7">{children}</div>}
    </div>
  );
}
function Issues({ a, c, update, openSrc, library, setNote, setToast }) {
  const [both, setBoth] = useState(false);
  const [picker, setPicker] = useState(null); // issue index
  const [pq, setPq] = useState("");
  const issues = a.issues || [];
  const toggleQ = (i, qi) => update((x) => { const cur = new Set(x.chosenQ?.[i] || []); cur.has(qi) ? cur.delete(qi) : cur.add(qi); return { ...x, chosenQ: { ...x.chosenQ, [i]: [...cur] } }; });
  const link = (i, pid) => { update((x) => ({ ...x, linked: { ...x.linked, [i]: [...new Set([...(x.linked?.[i] || []), pid])] } })); setPicker(null); setToast("رُبط المبدأ بالمسألة."); };
  const unlink = (i, pid) => update((x) => ({ ...x, linked: { ...x.linked, [i]: (x.linked?.[i] || []).filter((p) => p !== pid) } }));
  const Sec = IssueSec;
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <H sub="قلب النظام: كل مسألة تجمع ما تفرق في الملف عنها.">المسائل محل النظر</H>
        <Btn kind="ghost" small onClick={() => setBoth(!both)}><Columns size={14} /> {both ? "العرض المفصّل" : "عرض الطرفين"}</Btn>
      </div>
      {issues.length === 0 ? <Empty>لم تُحدَّد مسائل بعد. أضفها من النظرة العامة.</Empty> : both ? (
        <div className="space-y-4">
          {issues.map((it, i) => (
            <Card key={i}>
              <div className="font-bold mb-4">المسألة {ORD[i] || arNum(i + 1)} — {it.title}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm leading-7">
                {[["ما ورد من جهة المدعي", it.pl], ["ما ورد من جهة المدعى عليه", it.df], ["ما ورد في المستندات نصًا", (it.evidence || []).filter(Boolean).join("، ")]].map(([l, v]) => (
                  <div key={l} className="rounded-lg p-3" style={{ background: C.bg, border: `1px solid ${C.line}` }}><div className="text-xs mb-1" style={{ color: C.mute }}>{l}</div>{v || <span style={{ color: C.mute }}>لم يظهر في الملف.</span>}</div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : issues.map((it, i) => (
        <Card key={i} className="mb-5">
          <div className="text-xs mb-1" style={{ color: C.mute }}>المسألة {ORD[i] || arNum(i + 1)}</div>
          <div className="text-lg font-bold leading-8 mb-3">{it.title}</div>
          <Sec title="ما يستند إليه المدعي">{it.pl || <span style={{ color: C.mute }}>لم يظهر في الملف.</span>}</Sec>
          <Sec title="ما يستند إليه المدعى عليه">{it.df || <span style={{ color: C.mute }}>لم يظهر في الملف.</span>}</Sec>
          <Sec title="الأدلة المرتبطة بالمسألة">{(it.evidence || []).filter(Boolean).length ? <div className="flex flex-wrap gap-1.5">{it.evidence.filter(Boolean).map((d, j) => <button key={j} onClick={() => openSrc({ doc: d, page: 0, quote: "" })}><Tag>{d}</Tag></button>)}</div> : <span style={{ color: C.mute }}>لم تُربط مستندات.</span>}</Sec>
          <Sec title="النصوص النظامية المرتبطة">
            {(it.laws || []).length ? it.laws.map((l, j) => (
              <div key={j} className="mb-2">
                <div className="rounded-lg p-3 text-sm" style={{ background: C.grey, borderRight: `3px solid ${C.acc}` }}><div className="font-medium">{l.ref}</div><div className="text-xs mt-1" style={{ color: C.mute }}>{findStatute(library.statutes, l.ref)?.text || ""}</div></div>
                <div className="text-xs mt-1 px-1" style={{ color: C.mute }}>تحليل مِداد: {l.why}</div>
              </div>
            )) : <span style={{ color: C.mute }}>{library.statutes.length ? "لم يرتبط بالمسألة نص من النصوص المضافة." : "لا نصوص نظامية مضافة. أضفها من قسم النصوص النظامية ثم أعد التحليل."}</span>}
          </Sec>
          <Sec title="أسئلة مقترحة للأطراف">
            {(it.questions || []).filter(Boolean).length ? (
              <>
                {it.questions.filter(Boolean).map((q, qi) => (
                  <label key={qi} className="flex items-start gap-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={(c.chosenQ?.[i] || []).includes(qi)} onChange={() => toggleQ(i, qi)} className="mt-1.5" />
                    <span>{q}</span>
                  </label>
                ))}
                <div className="text-xs mt-2" style={{ color: C.mute }}>الأسئلة المختارة تظهر في وضع الجلسة.</div>
              </>
            ) : <span style={{ color: C.mute }}>لا أسئلة مقترحة.</span>}
          </Sec>
          <div className="py-3" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="flex flex-wrap items-center gap-2">
              <Btn kind="ghost" small onClick={() => { setPq(""); setPicker(i); }}><Link2 size={14} /> اربط مبدأ</Btn>
              <span className="text-xs" style={{ color: C.mute }}>النظام لا يقترح المبادئ ولا يربطها. الربط من القاضي وحده.</span>
            </div>
            {(c.linked?.[i] || []).map((pid) => { const p = library.principles.find((x) => x.id === pid); return p ? (
              <div key={pid} className="mt-2 rounded-lg p-3 text-sm" style={{ background: C.note, border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between"><span className="text-xs" style={{ color: C.acc }}>مبدأ ربطه القاضي</span><button onClick={() => unlink(i, pid)} style={{ color: C.mute }}><X size={14} /></button></div>
                <div className="font-medium mt-1">{p.title}</div><div className="text-xs mt-1 leading-6" style={{ color: C.mute }}>{p.source}</div>
              </div>) : null; })}
          </div>
          <JudgeNote value={c.notes?.[`iss-${i}`]} onChange={(v) => setNote(`iss-${i}`, v)} rows={4} />
        </Card>
      ))}
      {picker !== null && (
        <Modal title="اربط مبدأ من مكتبتك الشخصية" onClose={() => setPicker(null)}>
          <input autoFocus value={pq} onChange={(e) => setPq(e.target.value)} placeholder="ابحث في مبادئك…" className="w-full rounded-lg px-3 py-2 text-sm outline-none mb-4" style={{ background: C.card, border: `1px solid ${C.line}` }} />
          {library.principles.length === 0 ? <Empty>مكتبتك فارغة. أضف مبادئك من قسم النصوص النظامية ← مكتبتي الشخصية.</Empty> : library.principles.filter((p) => !pq || `${p.title} ${p.text} ${p.source} ${p.cat}`.includes(pq)).map((p) => (
            <button key={p.id} onClick={() => link(picker, p.id)} className="w-full text-right rounded-lg p-3 mb-2 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="font-medium">{p.title}</div><div className="text-xs mt-1" style={{ color: C.mute }}>{p.cat} — {p.source}</div>
            </button>
          ))}
        </Modal>
      )}
    </div>
  );
}

/* ───────────────────────── ٨. النصوص النظامية ───────────────────────── */
// تجميع المواد بحسب النظام: مكتبة بمئات المواد لا تُعرض بطاقةً بطاقة.
function bySystem(statutes) {
  const m = new Map();
  for (const s of statutes || []) {
    const k = String(s.system || "بلا نظام").trim();
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(s);
  }
  return [...m.entries()].map(([system, items]) => ({ system, items }));
}
// لا يُرسل إلى النموذج إلا ما اعتمده القاضي في هذه القضية. الافتراضي: لا شيء.
function caseStatutes(c, library) {
  const picked = c && Array.isArray(c.systems) ? c.systems : [];
  if (!picked.length) return [];
  return (library && library.statutes || []).filter((s) => picked.includes(String(s.system || "بلا نظام").trim()));
}
// «المادة (66) — نظام الإثبات» كانت تُطابق المادة (66) من أول نظام في المكتبة،
// و«المادة (6)» تُطابق «المادة (66)». المطابقة الآن على الرقم كاملًا وعلى اسم النظام معًا.
const refNum = (r) => { const m = String(r || "").match(/\(([^)]+)\)/); return m ? m[1].trim() : String(r || "").trim(); };
function findStatute(statutes, lawRef) {
  const want = refNum(lawRef);
  const cands = (statutes || []).filter((s) => refNum(s.ref) === want);
  if (cands.length < 2) return cands[0] || null;
  return cands.find((s) => String(lawRef).includes(s.system)) || null;
}
const LIB_HELP = "الملف بصيغة JSON، وكل مادة فيه: ref (المادة) وsystem (النظام) وtext (النص)، ويمكن معها version وeffective.";

function StatutesTab({ c, update, library, setLibrary, a, reanalyze, setToast }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState({});
  const [add, setAdd] = useState(false);
  const [form, setForm] = useState({});
  const [confirmDel, setConfirmDel] = useState(null);
  const impRef = useRef();
  const groups = bySystem(library.statutes);
  const picked = Array.isArray(c.systems) ? c.systems : [];
  const sent = caseStatutes(c, library);
  const sentCount = sent.length;
  // حجم ما يُرسل فعلًا مع كل تحليل: النص الكامل لكل مادة معتمدة، ولا يشمله التخزين المؤقت.
  const sentChars = sent.reduce((t, x) => t + (x.text || "").length + String(x.path || "").split(">").pop().trim().length, 0);
  const heavy = sentChars > 60000;
  const usedIn = (st) => (a.issues || []).filter((it) => (it.laws || []).some((l) => findStatute([st], l.ref))).map((it) => it.title);

  const toggleSystem = (sys) => update((x) => {
    const cur = Array.isArray(x.systems) ? x.systems : [];
    return { ...x, systems: cur.includes(sys) ? cur.filter((v) => v !== sys) : [...cur, sys] };
  });

  const saveOne = () => {
    if (!form.ref || !form.system || !form.text) { setToast("أكمل المادة والنظام والنص."); return; }
    setLibrary((l) => ({ ...l, statutes: [...(l.statutes || []), { id: uid(), ...form }] }));
    setAdd(false); setForm({});
    setToast("أُضيفت المادة. اعتمد نظامها في هذه القضية ثم أعد التحليل.");
  };

  const exportLib = () => {
    const data = JSON.stringify({ midad: "library", version: 1, at: Date.now(), statutes: library.statutes || [], principles: library.principles || [] }, null, 1);
    const blob = new Blob(["\ufeff", data], { type: "application/json;charset=utf-8" });
    const u = URL.createObjectURL(blob); const el = document.createElement("a");
    el.href = u; el.download = `مكتبة-مداد-${new Date().toISOString().slice(0, 10)}.json`; el.click(); URL.revokeObjectURL(u);
    setToast("نُزّلت نسخة من مكتبتك.");
  };

  const merge = (j) => {
      const inSt = Array.isArray(j) ? j : (j && j.statutes) || [];
      const inPr = Array.isArray(j) ? [] : (j && j.principles) || [];
      const clean = inSt.filter((x) => x && x.ref && x.system && x.text).map((x) => ({
        id: uid(), ref: String(x.ref).trim(), system: String(x.system).trim(), text: String(x.text).trim(),
        path: String(x.path || "").trim(), version: String(x.version || "").trim(), effective: String(x.effective || "").trim(),
      }));
      if (!clean.length) throw new Error("لم يُعثر في الملف على مواد. " + LIB_HELP);
      const have = new Set((library.statutes || []).map((x) => `${x.system}|${x.ref}`));
      const fresh = clean.filter((x) => !have.has(`${x.system}|${x.ref}`));
      const prHave = new Set((library.principles || []).map((x) => x.title));
      const prFresh = inPr.filter((p) => p && p.title && p.text && !prHave.has(p.title))
        .map((p) => ({ id: uid(), title: String(p.title), text: String(p.text), source: String(p.source || ""), cat: String(p.cat || "إثبات") }));
      if (!fresh.length && !prFresh.length) { setToast("كل ما في الملف موجود في مكتبتك أصلًا."); return; }
      setLibrary((l) => ({ statutes: [...(l.statutes || []), ...fresh], principles: [...(l.principles || []), ...prFresh] }));
      const skipped = clean.length - fresh.length;
      setToast(`استُوردت ${arNum(fresh.length)} مادة${prFresh.length ? ` و${arNum(prFresh.length)} مبدأ` : ""}${skipped ? `، وتُخطّيت ${arNum(skipped)} موجودة` : ""}. اعتمد ما يخص هذه القضية ثم أعد التحليل.`);
  };
  const importLib = async (file) => {
    if (!file) return;
    try {
      if (file.size > 24 * 1024 * 1024) throw new Error("الملف أكبر من ٢٤ ميجابايت.");
      let j; try { j = JSON.parse((await file.text()).replace(/^\ufeff/, "")); } catch { throw new Error("الملف ليس JSON صالحًا. " + LIB_HELP); }
      merge(j);
    } catch (e) { setToast((e && e.message) || "تعذر استيراد الملف."); }
  };
  // المكتبة المرفقة بالموقع: الأنظمة التي حوّلها القاضي من ملفاته الخام.
  const [fetching, setFetching] = useState(false);
  const importBundled = async () => {
    setFetching(true);
    try {
      const r = await fetch("library/anzima.json", { cache: "no-store" });
      if (!r.ok) throw new Error(`تعذر جلب المكتبة من الموقع (${r.status}).`);
      merge(await r.json());
    } catch (e) { setToast((e && e.message) || "تعذر جلب المكتبة من الموقع."); }
    setFetching(false);
  };

  const deleteSystem = (sys) => {
    setLibrary((l) => ({ ...l, statutes: (l.statutes || []).filter((x) => String(x.system || "بلا نظام").trim() !== sys) }));
    update((x) => ({ ...x, systems: (x.systems || []).filter((v) => v !== sys) }));
    setConfirmDel(null);
    setToast(`حُذف «${sys}» من مكتبتك.`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Btn small onClick={importBundled} disabled={fetching}>{fetching ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} {fetching ? "يجلب…" : "استورد الأنظمة المرفقة"}</Btn>
        <Btn small kind="ghost" onClick={() => impRef.current && impRef.current.click()}><Upload size={14} /> استورد من ملف</Btn>
        <Btn small kind="ghost" onClick={exportLib} disabled={!(library.statutes || []).length && !(library.principles || []).length}><Download size={14} /> صدّر مكتبتي</Btn>
        <Btn small onClick={() => { setForm({}); setAdd(true); }}><Plus size={14} /> أضف مادة</Btn>
        <input ref={impRef} type="file" className="hidden" onChange={(e) => { importLib(e.target.files && e.target.files[0]); e.target.value = ""; }} />
      </div>

      {groups.length === 0 ? (
        <Empty>مكتبتك فارغة. اضغط «استورد الأنظمة المرفقة» لإدخال الأنظمة المرفوعة مع الموقع، أو استورد ملفًا من جهازك، أو أضف مادة يدويًا. ولن يستشهد مِداد بأي مادة لم تضعها أنت.</Empty>
      ) : (
        <>
          <div className="rounded-lg p-3 mb-4 text-sm leading-7" style={{ background: !sentCount || heavy ? C.amberSoft : C.accSoft, color: !sentCount || heavy ? C.amber : C.acc }}>
            {!sentCount
              ? "لم تعتمد أي نظام في هذه القضية بعد، فلن تُرسل أي مادة إلى النموذج وسيبقى قسم النصوص في المسائل فارغًا. أشّر على ما يخص هذه القضية أدناه."
              : <>
                  المعتمد في هذه القضية: {arNum(picked.length)} نظام، {arNum(sentCount)} مادة، نحو {arNum(Math.round(sentChars / 1000))} ألف حرف تُرسل مع كل تحليل. لن يُرسل غيرها.
                  {heavy && !a.lawPick && <span className="block mt-1">هذا حجم كبير: يرفع تكلفة كل تحليل ويصعّب على النموذج تمييز المادة المناسبة. اعتمد ما يخص هذه القضية وحدها.</span>}
                </>}
          </div>
          {a.lawPick && (
            <div className="rounded-lg p-3 mb-4 text-sm leading-7" style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink }}>
              {a.lawPick.failed
                ? <span style={{ color: C.copper }}>تعذر اختيار النصوص في آخر تحليل، فلم تُرسل أي مادة وبقي قسم النصوص في المسائل فارغًا. أعد التحليل.</span>
                : a.lawPick.indexed
                  ? <>في آخر تحليل عُرض على مِداد فهرس <b>{arNum(a.lawPick.from)}</b> مادة بأرقامها وأبوابها بلا متونها، فاختار منها <b>{arNum(a.lawPick.to)}</b> وأُرسلت متونها وحدها. ما لم يُختر لم يُرسل ولم يُستشهد به.</>
                  : <>مكتبة هذه القضية {arNum(a.lawPick.from)} مادة، وهي أقل من أن تحتاج فهرسة، فأُرسلت كاملة.</>}
            </div>
          )}
          <div className="relative mb-4">
            <Search size={14} className="absolute top-2.5 right-3" style={{ color: C.mute }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في نص المواد وأبوابها وأرقامها…" className="w-full rounded-lg pr-9 pl-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }} />
          </div>
          {groups.map(({ system, items }) => {
            const hits = q ? items.filter((x) => `${x.ref} ${x.text} ${x.path || ""}`.includes(q)) : items;
            if (q && !hits.length) return null;
            const isOpen = q ? true : !!open[system];
            const shown = hits.slice(0, 40);
            const on = picked.includes(system);
            return (
              <Card key={system} className="mb-3">
                <div className="flex items-start justify-between gap-3">
                  <label className="flex items-start gap-2 cursor-pointer flex-1">
                    <input type="checkbox" checked={on} onChange={() => toggleSystem(system)} className="mt-1.5" />
                    <span>
                      <span className="font-semibold block leading-7">{system}</span>
                      <span className="text-xs" style={{ color: C.mute }}>
                        {arNum(items.length)} مادة{q ? ` — ${arNum(hits.length)} مطابقة للبحث` : ""} — {on ? "معتمد في هذه القضية" : "غير معتمد"}
                      </span>
                    </span>
                  </label>
                  <button onClick={() => setConfirmDel(system)} title="احذف هذا النظام من مكتبتك" style={{ color: C.mute }}><Trash2 size={15} /></button>
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <button onClick={() => setOpen((o) => ({ ...o, [system]: !o[system] }))} className="underline decoration-dotted" style={{ color: C.acc }}>
                    {isOpen ? "أخفِ المواد" : "اعرض المواد"}
                  </button>
                  {isOpen && hits.length > shown.length && <span style={{ color: C.mute }}>يُعرض {arNum(shown.length)} من {arNum(hits.length)} — استخدم البحث للوصول إلى البقية.</span>}
                </div>
                {isOpen && shown.map((st) => (
                  <div key={st.id} className="mt-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium">{st.ref}</div>
                      <button onClick={() => setLibrary((l) => ({ ...l, statutes: (l.statutes || []).filter((x) => x.id !== st.id) }))} style={{ color: C.mute }}><X size={13} /></button>
                    </div>
                    {st.path && <div className="text-xs leading-6" style={{ color: C.mute }}>{st.path}</div>}
                    {(st.version || st.effective) && <div className="text-xs" style={{ color: C.mute }}>{st.version ? `النسخة: ${st.version}` : ""}{st.effective ? ` — النفاذ: ${st.effective}` : ""}</div>}
                    <div className="rounded-lg p-3 mt-1 text-sm leading-7" style={{ background: C.grey, borderRight: `3px solid ${C.acc}` }}>{st.text}</div>
                    {usedIn(st).length > 0 && <div className="text-xs mt-1 px-1" style={{ color: C.mute }}>ورد ارتباطه في: {usedIn(st).join("، ")}</div>}
                  </div>
                ))}
              </Card>
            );
          })}
          <Btn kind="ghost" small onClick={() => reanalyze([])}><RefreshCw size={14} /> أعد التحليل بالأنظمة المعتمدة</Btn>
        </>
      )}

      {add && (
        <Modal title="أضف مادة" onClose={() => setAdd(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3"><Field label="المادة" value={form.ref || ""} onChange={(v) => setForm({ ...form, ref: v })} placeholder="المادة (٤١)" /><Field label="النظام" value={form.system || ""} onChange={(v) => setForm({ ...form, system: v })} placeholder="نظام المعاملات المدنية" /></div>
            <div className="grid grid-cols-2 gap-3"><Field label="النسخة" value={form.version || ""} onChange={(v) => setForm({ ...form, version: v })} /><Field label="تاريخ النفاذ" value={form.effective || ""} onChange={(v) => setForm({ ...form, effective: v })} placeholder="١٤٤٤/٠٦/١٩" /></div>
            <Field textarea rows={5} label="نص المادة" value={form.text || ""} onChange={(v) => setForm({ ...form, text: v })} />
            <div className="flex gap-3 pt-2"><Btn onClick={saveOne}>حفظ</Btn><Btn kind="ghost" onClick={() => setAdd(false)}>إلغاء</Btn></div>
          </div>
        </Modal>
      )}
      {confirmDel && (
        <Modal title="حذف نظام من المكتبة" onClose={() => setConfirmDel(null)}>
          <p className="text-sm leading-7 mb-4">سيُحذف «{confirmDel}» بكل مواده ({arNum(bySystem(library.statutes).find((g) => g.system === confirmDel)?.items.length || 0)} مادة) من مكتبتك في هذا المتصفح، ومن كل قضاياك. لا يمكن التراجع، فصدّر مكتبتك أولًا إن أردت نسخة.</p>
          <div className="flex gap-3">
            <button onClick={() => deleteSystem(confirmDel)} className="px-4 py-2 rounded-lg text-sm text-white" style={{ background: C.copper }}>احذف نهائيًا</button>
            <Btn kind="ghost" onClick={() => setConfirmDel(null)}>إلغاء</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Laws({ c, update, library, setLibrary, a, reanalyze, setToast }) {
  const [tab, setTab] = useState("statutes");
  const [add, setAdd] = useState(false);
  const [form, setForm] = useState({});
  const [q, setQ] = useState(""); const [cat, setCat] = useState("");
  const cats = ["إثبات", "إجراءات", "عقود", "عقوبات"];
  const savePrinciple = () => {
    if (!form.title || !form.text) { setToast("أكمل العنوان والنص."); return; }
    setLibrary((l) => ({ ...l, principles: [...(l.principles || []), { id: uid(), cat: form.cat || cats[0], ...form }] }));
    setAdd(false); setForm({});
  };
  return (
    <div>
      <H sub="لا يستخدم مِداد في التحليل إلا النصوص التي تضيفها هنا وتعتمدها في هذه القضية.">النصوص النظامية</H>
      <div className="flex gap-1 mb-6 rounded-lg p-1 w-fit" style={{ background: C.grey }}>
        {[["statutes", "الأنظمة"], ["principles", "مكتبتي الشخصية"]].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className="px-4 py-1.5 rounded-md text-sm" style={{ background: tab === k ? C.card : "transparent", fontWeight: tab === k ? 600 : 400 }}>{l}</button>)}
      </div>
      {tab === "statutes" ? (
        <StatutesTab c={c} update={update} library={library} setLibrary={setLibrary} a={a} reanalyze={reanalyze} setToast={setToast} />
      ) : (
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative flex-1" style={{ minWidth: 192 }}><Search size={14} className="absolute top-2.5 right-3" style={{ color: C.mute }} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في مبادئك…" className="w-full rounded-lg pr-9 pl-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }} /></div>
            {["", ...cats].map((k) => <button key={k} onClick={() => setCat(k)} className="text-xs px-3 py-1.5 rounded-full" style={{ background: cat === k ? C.acc : C.grey, color: cat === k ? "#fff" : C.mute }}>{k || "الكل"}</button>)}
            <Btn small onClick={() => { setForm({ cat: cats[0] }); setAdd(true); }}><Plus size={14} /> إضافة مبدأ</Btn>
          </div>
          <div className="text-xs mb-4" style={{ color: C.mute }}>مكتبة خاصة بك، مستقلة عن القضايا، تبقى معك في كل ملف.</div>
          {library.principles.filter((p) => (!cat || p.cat === cat) && (!q || `${p.title} ${p.text} ${p.source}`.includes(q))).map((p) => (
            <Card key={p.id} className="mb-3">
              <div className="flex items-start justify-between gap-3"><div className="font-semibold leading-7">{p.title}</div><button onClick={() => setLibrary((l) => ({ ...l, principles: l.principles.filter((x) => x.id !== p.id) }))} style={{ color: C.mute }}><Trash2 size={15} /></button></div>
              <div className="text-sm leading-7 mt-2">{p.text}</div>
              <div className="flex items-center gap-2 mt-3"><Tag>{p.cat}</Tag><span className="text-xs" style={{ color: C.mute }}>{p.source}</span></div>
            </Card>
          ))}
          {library.principles.length === 0 && <Empty>لم تضف مبادئ بعد.</Empty>}
        </div>
      )}
      {add && (
        <Modal title="إضافة مبدأ" onClose={() => setAdd(false)}>
          <div className="space-y-3">
            <Field label="عنوان المبدأ" value={form.title || ""} onChange={(v) => setForm({ ...form, title: v })} />
            <Field textarea rows={4} label="نص المبدأ أو ملخص الحكم" value={form.text || ""} onChange={(v) => setForm({ ...form, text: v })} />
            <Field label="المصدر" value={form.source || ""} onChange={(v) => setForm({ ...form, source: v })} placeholder="رقم الحكم — المحكمة — السنة" />
            <label className="block"><span className="text-sm block mb-1" style={{ color: C.mute }}>التصنيف</span><select value={form.cat || cats[0]} onChange={(e) => setForm({ ...form, cat: e.target.value })} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }}>{cats.map((k) => <option key={k}>{k}</option>)}</select></label>
            <div className="flex gap-3 pt-2"><Btn onClick={savePrinciple}>حفظ</Btn><Btn kind="ghost" onClick={() => setAdd(false)}>إلغاء</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ───────────────────────── ٩. ملاحظاتي ───────────────────────── */
function Notes({ c, update, setSession }) {
  const [t, setT] = useState("");
  const notes = c.freeNotes || [];
  const add = () => { if (!t.trim()) return; update((x) => ({ ...x, freeNotes: [...(x.freeNotes || []), { id: uid(), text: t.trim(), task: false, done: false, at: Date.now() }] })); setT(""); };
  const setN = (fn) => update((x) => ({ ...x, freeNotes: fn(x.freeNotes || []) }));
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <H sub="اكتب أثناء الجلسة أو الدراسة. سريع وبسيط.">ملاحظاتي</H>
        <Btn small onClick={() => setSession(true)}><Eye size={14} /> وضع الجلسة</Btn>
      </div>
      <div className="flex gap-2 mb-6">
        <input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="التحقق من المرفق رقم… / مطالبة المدعي بتوضيح…" className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: C.card, border: `1px solid ${C.line}` }} />
        <Btn onClick={add}><Plus size={16} /></Btn>
      </div>
      {notes.length > 0 && <div className="mb-4"><Btn kind="ghost" small onClick={() => setN((ns) => ns.map((n) => ({ ...n, task: true })))}><ListChecks size={14} /> حوّل الملاحظات إلى قائمة متابعة</Btn></div>}
      {notes.length === 0 ? <Empty>لا ملاحظات بعد.</Empty> : notes.map((n) => (
        <div key={n.id} className="flex items-start gap-3 rounded-lg px-4 py-3 mb-2 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          {n.task ? <button onClick={() => setN((ns) => ns.map((x) => x.id === n.id ? { ...x, done: !x.done } : x))} className="mt-0.5" style={{ color: n.done ? C.acc : C.mute }}>{n.done ? <CheckCircle2 size={18} /> : <Circle size={18} />}</button> : <StickyNote size={16} className="mt-1" style={{ color: C.mute }} />}
          <span className="flex-1 leading-7" style={{ textDecoration: n.done ? "line-through" : "none", color: n.done ? C.mute : C.ink }}>{n.text}</span>
          <button onClick={() => setN((ns) => ns.filter((x) => x.id !== n.id))} style={{ color: C.mute }}><X size={15} /></button>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── وضع الجلسة ───────────────────────── */
function Session({ c, a, update, onClose, setToast, openSrc }) {
  const [i, setI] = useState(0);
  const issues = a.issues || [];
  const it = issues[i];
  const log = c.sessionLog?.[i] || {};
  const setLog = (k, v) => update((x) => ({ ...x, sessionLog: { ...x.sessionLog, [i]: { ...(x.sessionLog?.[i] || {}), [k]: v } } }));
  const gap = (a.gaps || []).find((g) => it && it.title && g.text && it.title.split(" ").some((w) => w.length > 3 && g.text.includes(w)));
  const chosen = (c.chosenQ?.[i] || []).map((qi) => (it?.questions || [])[qi]).filter(Boolean);
  const [flash, setFlash] = useState(false);
  const onBlur = () => { setFlash(true); setToast(`أضيفت معلومة جديدة مرتبطة بالمسألة ${ORD[i] || arNum(i + 1)}.`); setTimeout(() => setFlash(false), 1500); };
  if (!it) return <Modal title="وضع الجلسة" onClose={onClose}><Empty>لا مسائل محددة. أضفها من النظرة العامة.</Empty></Modal>;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto fade" style={{ background: C.bg }}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="text-sm" style={{ color: C.mute }}>وضع الجلسة — {c.number}</div>
          <button onClick={onClose} className="inline-flex items-center gap-1 text-sm" style={{ color: C.mute }}><X size={16} /> خروج</button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button disabled={i === 0} onClick={() => setI(i - 1)} className="p-2 rounded-lg disabled:opacity-30" style={{ border: `1px solid ${C.line}` }}><ChevronRight size={18} /></button>
          <div className="text-sm" style={{ color: C.mute }}>المسألة {ORD[i] || arNum(i + 1)} من {arNum(issues.length)}</div>
          <button disabled={i === issues.length - 1} onClick={() => setI(i + 1)} className="p-2 rounded-lg disabled:opacity-30" style={{ border: `1px solid ${C.line}` }}><ChevronLeft size={18} /></button>
        </div>
        <h2 className="text-3xl font-bold leading-snug mb-10">{it.title}</h2>
        <div className="space-y-8 text-base leading-8">
          <div><div className="text-sm font-semibold mb-1" style={{ color: C.mute }}>قول المدعي</div>{it.pl || "—"}</div>
          <div><div className="text-sm font-semibold mb-1" style={{ color: C.mute }}>قول المدعى عليه</div>{it.df || "—"}</div>
          <div><div className="text-sm font-semibold mb-2" style={{ color: C.mute }}>المستندات المرتبطة</div><div className="flex flex-wrap gap-2">{(it.evidence || []).filter(Boolean).map((d, j) => <button key={j} onClick={() => openSrc({ doc: d, page: 0, quote: "" })}><Tag>{d}</Tag></button>)}{!(it.evidence || []).filter(Boolean).length && "—"}</div></div>
          <div><div className="text-sm font-semibold mb-1" style={{ color: C.mute }}>النقطة غير الواضحة</div>{gap?.text || <span style={{ color: C.mute }}>لم يُسجَّل شيء يخص هذه المسألة.</span>}</div>
          <div><div className="text-sm font-semibold mb-1" style={{ color: C.mute }}>الأسئلة التي اخترتها</div>{chosen.length ? <ul className="list-disc pr-5">{chosen.map((q, j) => <li key={j}>{q}</li>)}</ul> : <span style={{ color: C.mute }}>لم تختر أسئلة لهذه المسألة.</span>}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
            {[["pl", "ما قاله المدعي في الجلسة"], ["df", "ما قاله المدعى عليه في الجلسة"]].map(([k, l]) => (
              <div key={k} className="rounded-lg p-3" style={{ background: C.note, border: `1.5px dotted ${flash ? C.acc : C.mute}` }}>
                <div className="text-xs mb-1 font-medium" style={{ color: C.acc }}>{l}</div>
                <textarea rows={5} value={log[k] || ""} onChange={(e) => setLog(k, e.target.value)} onBlur={() => log[k] && onBlur()} className="w-full bg-transparent outline-none text-base leading-8 resize-y" />
              </div>
            ))}
          </div>
          <div className="text-xs" style={{ color: C.mute }}>يسجّل مِداد ما تكتبه ولا يحلل أثره أثناء الجلسة.</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── ١٠. مذكرة الدراسة ───────────────────────── */
function buildMemo(c, a, library) {
  const L = (arr) => arr.filter(Boolean);
  const notes = c.notes || {};
  const secs = [
    ["بيانات القضية", L([`رقم القضية: ${c.number || "—"}`, `المحكمة: ${c.court || "—"}`, `الدائرة: ${c.circuit || "—"}`, `نوع الدعوى: ${c.type}`, `المدعي: ${c.plaintiff || "—"}`, `المدعى عليه: ${c.defendant || "—"}`])],
    ["موضوع الدعوى", L([c.subject, a.summary?.claim])],
    ["طلبات الأطراف", L([...(a.pl || []).map((r) => `المدعي: ${r.text}`), ...(a.df || []).map((r) => `المدعى عليه: ${r.text}`)])],
    ["إجابات الأطراف", L([a.summary?.reply, ...(a.defenses || []).map((d) => `دفع (${d.by}): ${d.text}`)])],
    ["الوقائع الجوهرية", L((a.facts || []).map((f) => `${dual(f.date, f.date_text)}: ${f.text} [${f.src?.doc || ""}${f.src?.page ? ` ص${f.src.page}` : ""}]`))],
    ["المسائل محل النظر", L((a.issues || []).map((it, i) => `المسألة ${ORD[i] || i + 1}: ${it.title}`))],
    ["الأدلة المتعلقة بكل مسألة", L((a.issues || []).map((it) => `${it.title}: ${(it.evidence || []).filter(Boolean).join("، ") || "—"}`))],
    ["النصوص النظامية ذات العلاقة", L((a.issues || []).flatMap((it) => (it.laws || []).map((l) => `${l.ref} — ${it.title}`)))],
    ["النقاط التي تحتاج إلى تحقق", L((a.gaps || []).map((g) => g.text))],
    ["ملاحظات القاضي", L([...Object.entries(notes).filter(([, v]) => v?.trim()).map(([k, v]) => v), ...(c.freeNotes || []).map((n) => n.text)])],
  ];
  return secs;
}
function Memo({ c, a, update, library, setToast }) {
  const [doc, setDoc] = useState(null);
  const [cmpV, setCmpV] = useState(null);
  const create = () => {
    const secs = buildMemo(c, a, library);
    const text = secs.map(([t, ls]) => `${t}\n${ls.join("\n")}`).join("\n\n");
    setDoc(secs);
    update((x) => ({ ...x, memoVersions: [...(x.memoVersions || []), { id: uid(), at: Date.now(), text }] }));
    setToast("أُنشئت مذكرة الدراسة.");
  };
  const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const exportWord = () => {
    const secs = doc || buildMemo(c, a, library);
    const html = `<html dir="rtl"><head><meta charset="utf-8"><style>body{font-family:Arial;line-height:1.8} h1{font-size:20pt} h2{font-size:14pt;margin-top:18pt} p{margin:4pt 0}</style></head><body><h1>مذكرة دراسة — ${esc(c.number)}</h1>${secs.map(([t, ls]) => `<h2>${esc(t)}</h2>${ls.length ? ls.map((l) => `<p>${esc(l)}</p>`).join("") : "<p>—</p>"}`).join("")}<h2>اتجاه الدراسة</h2><p>${esc(c.direction).replace(/\n/g, "<br/>") || "&nbsp;"}</p></body></html>`;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const u = URL.createObjectURL(blob); const el = document.createElement("a"); el.href = u; el.download = `مذكرة-الدراسة-${c.number || "قضية"}.doc`; el.click(); URL.revokeObjectURL(u);
  };
  const versions = c.memoVersions || [];
  const diff = (oldT, newT) => { const A = oldT.split("\n"), B = newT.split("\n"), sa = new Set(A), sb = new Set(B); return { added: B.filter((l) => l.trim() && !sa.has(l)), removed: A.filter((l) => l.trim() && !sb.has(l)) }; };
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <H sub="يجمع مِداد محتوى الدراسة في وثيقة، ولا يضع نتيجة قضائية.">مذكرة الدراسة</H>
        <div className="flex gap-2"><Btn onClick={create}><ScrollText size={15} /> إنشاء مذكرة دراسة</Btn><Btn kind="ghost" onClick={exportWord}><Download size={15} /> تصدير Word</Btn></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {!doc ? <Empty>اضغط "إنشاء مذكرة دراسة" لتجميع محتوى القضية.</Empty> : (
            <Card className="p-7">
              {doc.map(([t, ls], i) => (
                <div key={t} className="mb-6">
                  <h3 className="font-bold mb-2">{arNum(i + 1)}. {t}</h3>
                  {ls.length ? ls.map((l, j) => <p key={j} className="text-sm leading-7">{l}</p>) : <p className="text-sm" style={{ color: C.mute }}>—</p>}
                </div>
              ))}
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${C.line}` }}>
                <h3 className="font-bold mb-1">اتجاه الدراسة</h3>
                <div className="text-xs mb-2" style={{ color: C.mute }}>يكتبه القاضي بنفسه.</div>
                <textarea rows={8} value={c.direction || ""} onChange={(e) => update((x) => ({ ...x, direction: e.target.value }))} className="w-full rounded-lg p-3 text-sm leading-7 outline-none resize-y" style={{ background: C.note, border: `1.5px dotted ${C.mute}` }} />
              </div>
            </Card>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold mb-3 flex items-center gap-2"><History size={15} /> سجل النسخ</div>
          {versions.length === 0 ? <div className="text-xs" style={{ color: C.mute }}>لا نسخ سابقة.</div> : [...versions].reverse().map((v, i) => (
            <button key={v.id} onClick={() => setCmpV(v)} className="w-full text-right rounded-lg px-3 py-2 mb-2 text-xs" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="font-medium">النسخة {arNum(versions.length - i)}</div>
              <div style={{ color: C.mute }}>{new Intl.DateTimeFormat("ar-EG", { calendar: "gregory", dateStyle: "medium", timeStyle: "short" }).format(new Date(v.at))}</div>
            </button>
          ))}
        </div>
      </div>
      {cmpV && (
        <Modal title="مقارنة مع النسخة الحالية" onClose={() => setCmpV(null)}>
          {(() => { const cur = buildMemo(c, a, library).map(([t, ls]) => `${t}\n${ls.join("\n")}`).join("\n\n"); const d = diff(cmpV.text, cur); return (
            <div className="text-sm space-y-4">
              <div><div className="font-semibold mb-2" style={{ color: C.acc }}>أُضيف منذ تلك النسخة</div>{d.added.length ? d.added.map((l, i) => <p key={i} className="leading-7 px-2 rounded" style={{ background: C.accSoft }}>{l}</p>) : <span style={{ color: C.mute }}>لا إضافات.</span>}</div>
              <div><div className="font-semibold mb-2" style={{ color: C.copper }}>حُذف منذ تلك النسخة</div>{d.removed.length ? d.removed.map((l, i) => <p key={i} className="leading-7 px-2 line-through" style={{ color: C.mute }}>{l}</p>) : <span style={{ color: C.mute }}>لا محذوفات.</span>}</div>
            </div>); })()}
        </Modal>
      )}
    </div>
  );
}

/* ───────────────────────── التعارضات / التحقق / الجديد ───────────────────────── */
function ConflictsPanel({ a, openPair }) {
  const cs = a.conflicts || [];
  return (
    <div>
      {cs.length === 0 ? <Empty>لم يظهر في الملف تعارض مما يبحث عنه النظام: تواريخ، مبالغ، أقوال الطرف الواحد، مستندات، طلبات.</Empty> : cs.map((x, i) => (
        <div key={i} className="rounded-xl p-4 mb-3" style={{ background: C.copperSoft, border: `1px solid ${C.copper}33` }}>
          <div className="font-semibold text-sm mb-3" style={{ color: C.copper }}>تعارض محتمل — في {x.type}</div>
          {[x.a, x.b].map((s, j) => s && (
            <div key={j} className="text-sm leading-7 mb-2"><span className="font-medium">{s.src?.doc || "موضع"}:</span> {s.text}</div>
          ))}
          <button onClick={() => openPair(x.a?.src, x.b?.src)} className="text-xs underline mt-1" style={{ color: C.copper }}>عرض المصدرين</button>
        </div>
      ))}
      <div className="text-xs mt-4" style={{ color: C.mute }}>يعرض النظام التعارض كما ظهر في الملف، دون استنتاج قضائي.</div>
    </div>
  );
}
function GapsPanel({ a, update, setToast }) {
  const gs = a.gaps || [];
  const add = (t) => { update((x) => ({ ...x, freeNotes: [...(x.freeNotes || []), { id: uid(), text: t, task: true, done: false, at: Date.now() }] })); setToast("أُضيفت إلى ملاحظاتي كمهمة."); };
  return (
    <div>
      {gs.length === 0 ? <Empty>لم يُسجَّل ما يحتاج إلى تحقق.</Empty> : gs.map((g, i) => (
        <div key={i} className="flex items-start justify-between gap-3 rounded-lg p-3 mb-2 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <span className="leading-7">{g.text}</span>
          <button onClick={() => add(g.text)} className="text-xs whitespace-nowrap px-2 py-1 rounded" style={{ background: C.grey, color: C.acc }}>أضفها إلى ملاحظاتي</button>
        </div>
      ))}
    </div>
  );
}
function WhatsNew({ c, go }) {
  const w = c.whatsNew;
  if (!w) return <Empty>لم تُضف ملفات جديدة بعد التحليل الأول. حين تضيف مذكرة جديدة سيعرض مِداد هنا ما تغيّر فقط.</Empty>;
  return (
    <div>
      <div className="text-sm mb-4" style={{ color: C.mute }}>أُضيف: {(w.files || []).join("، ")} — {new Intl.DateTimeFormat("ar-EG", { calendar: "gregory", dateStyle: "medium", timeStyle: "short" }).format(new Date(w.at))}</div>
      {w.error && <div className="text-sm rounded-lg p-3 mb-3" style={{ background: C.copperSoft, color: C.copper }}>تعذرت المقارنة: {w.error}</div>}
      {(w.changes || []).map((ch, i) => (
        <button key={i} onClick={() => go(ch.target)} className="w-full text-right flex items-center justify-between gap-3 rounded-lg p-3 mb-2 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <span className="leading-7">{ch.text}</span><ArrowRight size={15} style={{ color: C.mute, transform: "rotate(180deg)" }} />
        </button>
      ))}
      {w.unchanged && <div className="text-sm mt-3 leading-7" style={{ color: C.mute }}>{w.unchanged}</div>}
    </div>
  );
}

/* ───────────────────────── اسأل ملف القضية ───────────────────────── */
function AskBar({ c, loadFiles, update, openSrc }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [literal, setLiteral] = useState(false);
  const [busy, setBusy] = useState(false);
  const chat = c.chat || [];
  const presets = ["أين ذكر المدعى عليه أنه قام بالسداد؟", "ما المستندات المتعلقة بالتسليم؟", "هل يوجد اختلاف بين مبلغ المطالبة في صحيفة الدعوى والمذكرة؟", "لخص أقوال المدعى عليه المتعلقة بمسألة التسليم فقط."];
  const hasFiles = (c.files || []).length > 0;
  const ready = isReady();
  const blocked = !hasFiles ? "لا توجد ملفات مرفوعة في هذه القضية. الدراسة معروضة من ملف تحليل مستورد، والسؤال يحتاج ملفات القضية نفسها: ارفعها من «أضف ملفات إلى القضية»."
    : !ready ? (API.available
        ? "السؤال يحتاج اتصالًا بالنموذج. أدخل كلمة مرور الموقع من الإعدادات (رمز الترس في الصفحة الرئيسية)."
        : "السؤال يحتاج اتصالًا بالنموذج. أدخل مفتاح API من الإعدادات (رمز الترس في الصفحة الرئيسية).")
    : "";
  const send = async (text) => {
    if (blocked) { setOpen(true); return; }
    const question = (text || q).trim(); if (!question || busy) return;
    setQ(""); setBusy(true); setOpen(true);
    update((x) => ({ ...x, chat: [...(x.chat || []), { role: "q", text: question, literal }] }));
    try {
      const files = await loadFiles(c);
      const prompt = literal
        ? `السؤال: ${question}\nوضع "الحرفي فقط" مفعّل: لا تلخّص ولا تعد الصياغة ولا تستنتج. أعد فقط المقاطع الأصلية ذات الصلة كما هي حرفيًا، كل مقطع مع مصدره. إن لم تجد شيئًا، اجعل notFound صحيحًا.
أعد JSON بهذا الشكل بالضبط: {"answer":"","items":[{"text":"المقطع حرفيًا","src":{"doc":"","page":0,"quote":""}}],"notFound":false}`
        : `السؤال: ${question}\nأجب من ملفات القضية المرفقة حصرًا. answer فقرة قصيرة واضحة. items: كل معلومة في الإجابة مع مصدرها الدقيق ومقتبس حرفي قصير. إن لم تجد الإجابة في الملفات فاجعل notFound صحيحًا وanswer فارغًا، ولا تخمّن.
أعد JSON بهذا الشكل بالضبط: {"answer":"","items":[{"text":"","src":{"doc":"","page":0,"quote":""}}],"notFound":false}`;
      const typed = CASE_TYPES[c.type] ? `${prompt}

نوع الدعوى بحسب تسجيل القاضي: ${c.type}. لا تضف ما ليس في الملف لأجل هذا النوع.` : prompt;
      const out = await pjOrFix(await llm(SYS, [...fileBlocks(files, c.sendRaw), { type: "text", text: typed }], 4000));
      update((x) => ({ ...x, chat: [...(x.chat || []), { role: "a", ...out, literal }] }));
    } catch (e) { update((x) => ({ ...x, chat: [...(x.chat || []), { role: "a", error: e.message }] })); }
    setBusy(false);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:right-60" style={{ background: C.bg, borderTop: `1px solid ${C.line}` }}>
      {open && (
        <div className="max-w-4xl mx-auto px-4 pt-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">اسأل ملف القضية</div>
            <div className="flex items-center gap-3">
              {chat.length > 0 && <button onClick={() => update((x) => ({ ...x, chat: [] }))} className="text-xs" style={{ color: C.mute }}>امسح</button>}
              <button onClick={() => setOpen(false)} style={{ color: C.mute }}><X size={16} /></button>
            </div>
          </div>
          {blocked && <div className="rounded-lg p-3 mb-4 text-sm leading-7" style={{ background: C.amberSoft, color: C.amber }}>{blocked}</div>}
          {!blocked && chat.length === 0 && <div className="flex flex-wrap gap-2 mb-4">{presets.map((p) => <button key={p} onClick={() => send(p)} className="text-xs px-3 py-1.5 rounded-full text-right" style={{ background: C.card, border: `1px solid ${C.line}` }}>{p}</button>)}</div>}
          {chat.map((m, i) => m.role === "q" ? (
            <div key={i} className="flex justify-start mb-3"><div className="rounded-xl px-4 py-2 text-sm max-w-xl" style={{ background: C.accSoft, color: C.acc }}>{m.text}{m.literal && <span className="text-xs mr-2 opacity-70">(حرفي)</span>}</div></div>
          ) : (
            <div key={i} className="mb-4 rounded-xl p-4 text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {m.error ? <span style={{ color: C.copper }}>تعذر الحصول على إجابة: {m.error}</span> : m.notFound ? <span className="leading-7">{NOT_FOUND}</span> : (
                <>
                  {!m.literal && m.answer && <p className="leading-7 mb-3">{m.answer}</p>}
                  {(m.items || []).map((it, j) => (
                    <div key={j} className="py-2" style={{ borderTop: `1px solid ${C.line}` }}>
                      {m.literal ? <div className="leading-7 px-2 rounded" style={{ background: C.hl }}>{it.text}</div> : <div className="leading-7">{it.text}</div>}
                      <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: C.mute }}><Src src={it.src} onOpen={openSrc} />{!m.literal && it.src?.quote && <span className="truncate">«{it.src.quote}»</span>}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          {busy && <div className="flex items-center gap-2 text-sm mb-4" style={{ color: C.mute }}><Loader2 size={15} className="animate-spin" /> يبحث في الملف…</div>}
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-xl px-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <MessageSquare size={16} style={{ color: C.mute }} />
          <input value={q} onFocus={() => setOpen(true)} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={blocked ? "السؤال غير متاح — اضغط لمعرفة السبب" : "اسأل عن هذه القضية…"} className="flex-1 bg-transparent outline-none py-2.5 text-sm" />
          <button onClick={() => setLiteral(!literal)} className="text-xs px-2 py-1 rounded-md whitespace-nowrap" style={{ background: literal ? C.acc : C.grey, color: literal ? "#fff" : C.mute }} title="اعرض المقاطع الأصلية فقط دون تلخيص">الحرفي فقط</button>
        </div>
        <button onClick={() => send()} disabled={busy} className="p-2.5 rounded-xl disabled:opacity-50" style={{ background: C.acc, color: "#fff" }}><Send size={16} style={{ transform: "rotate(180deg)" }} /></button>
      </div>
    </div>
  );
}

/* ───────────────────────── عارض المستندات ───────────────────────── */
function findFile(files, src) {
  if (!src?.doc || !files) return null;
  const n = src.doc.trim();
  return files.find((f) => f.name === n) || files.find((f) => f.name.includes(n) || n.includes(f.name.replace(/\.[^.]+$/, ""))) || null;
}
function Pane({ src, files, onPick }) {
  const [rawPdf, setRawPdf] = useState(false);
  if (!src) return (
    <div className="p-4 text-sm h-full flex flex-col overflow-auto">
      <div className="mb-3 font-medium">اختر مستندًا لعرضه بجانب الأول</div>
      {(files || []).map((f) => <button key={f.id} onClick={() => onPick({ doc: f.name, page: 0, quote: "" })} className="text-right rounded-lg px-3 py-2 mb-1" style={{ background: C.card, border: `1px solid ${C.line}` }}>{f.name}</button>)}
    </div>
  );
  const f = findFile(files, src);
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 text-sm" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="font-semibold truncate">{src.doc}</div>
        <div className="text-xs" style={{ color: C.mute }}>{src.page ? `الصفحة ${arNum(src.page)}` : "الصفحة غير محددة"}{files && !f ? " — لم يُطابق اسم المستند ملفًا مرفوعًا" : ""}</div>
      </div>
      {src.quote && <div className="px-4 py-3 text-sm leading-7" style={{ borderBottom: `1px solid ${C.line}` }}><div className="text-xs mb-1" style={{ color: C.mute }}>الموضع المقصود</div><span style={{ background: C.hl }}>{src.quote}</span></div>}
      <div className="flex-1 overflow-auto" style={{ background: C.grey }}>
        {!files ? <div className="p-6 text-sm" style={{ color: C.mute }}>يحمّل المستند…</div>
          : !f ? <div className="p-6 text-sm leading-7" style={{ color: C.mute }}>الملف المرفوع الذي يطابق «{src.doc}» غير موجود. قد يكون النموذج سمّاه بعنوانه الداخلي لا باسم الملف. الملفات المرفوعة: {files.map((x) => x.name).join("، ")}</div>
          : f.kind === "pdf" && f.text && !rawPdf ? (
            <div>
              <div className="px-4 pt-3 flex items-center justify-between text-xs" style={{ color: C.mute }}><span>النص المستخرج من الملف{f.pages ? ` — ${arNum(f.pages)} صفحة` : ""}</span><button onClick={() => setRawPdf(true)} className="underline">افتح PDF الأصلي</button></div>
              <pre className="p-4 text-sm whitespace-pre-wrap leading-7" style={{ fontFamily: "inherit" }}>{highlightPage(f.text, src.quote, src.page)}</pre>
            </div>
          ) : f.kind === "pdf" ? (
            <div className="h-full flex flex-col">
              {f.text && <div className="px-4 pt-2 text-xs"><button onClick={() => setRawPdf(false)} className="underline" style={{ color: C.mute }}>اعرض النص المستخرج</button></div>}
              <iframe title={f.name} className="w-full flex-1" style={{ minHeight: 480, border: 0 }} src={`data:application/pdf;base64,${f.data}#page=${src.page || 1}`} />
            </div>
          )
          : f.kind === "image" ? <img alt={f.name} src={`data:${f.mime};base64,${f.data}`} className="w-full" />
          : <pre className="p-4 text-sm whitespace-pre-wrap leading-7" style={{ fontFamily: "inherit" }}>{highlight(f.data, src.quote)}</pre>}
      </div>
    </div>
  );
}
function Viewer({ c, srcs, loadFiles, onClose, onAddPair }) {
  const [files, setFiles] = useState(null);
  const [list, setList] = useState(srcs);
  useEffect(() => { let live = true; loadFiles(c).then((fs) => live && setFiles(fs)).catch(() => live && setFiles([])); return () => { live = false; }; }, [c.id]);
  useEffect(() => { setList(srcs); }, [srcs]);
  const two = list.length === 2;
  return (
    <div className="fixed inset-y-0 left-0 z-40 w-full md:w-7/12 lg:w-1/2 flex flex-col fade" style={{ background: C.bg, borderRight: `1px solid ${C.line}`, boxShadow: "0 0 40px rgba(26,26,26,0.08)" }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="text-sm font-semibold flex items-center gap-2"><FileText size={15} /> عارض المستندات</div>
        <div className="flex items-center gap-2">
          {!two && <button onClick={onAddPair} className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: C.grey }}><Columns size={13} /> افتح مصدرًا آخر بجانبه</button>}
          <button onClick={onClose} style={{ color: C.mute }}><X size={18} /></button>
        </div>
      </div>
      <div className={`flex-1 min-h-0 grid ${two ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {list.map((s, i) => (
          <div key={i} className="min-h-0 overflow-hidden" style={{ borderRight: i === 1 ? `1px solid ${C.line}` : "none" }}>
            <Pane src={s} files={files} onPick={(src) => setList((l) => l.map((x, j) => j === i ? src : x))} />
          </div>
        ))}
      </div>
    </div>
  );
}
function highlightPage(text, q, page) {
  if (!page || !text) return highlight(text, q);
  const marker = `[صفحة ${page}]`;
  const i = text.indexOf(marker);
  if (i < 0) return highlight(text, q);
  const j = text.indexOf("[صفحة ", i + marker.length);
  const before = text.slice(0, i), seg = text.slice(i, j < 0 ? undefined : j), after = j < 0 ? "" : text.slice(j);
  return <>{before}<span style={{ background: "#F3EFE3", display: "block", borderRight: `3px solid ${C.acc}`, paddingRight: 8, marginRight: -8 }}>{highlight(seg, q)}</span>{after}</>;
}
function highlight(text, q) {
  if (!q || !text) return text;
  const i = text.indexOf(q.slice(0, 40));
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark style={{ background: C.hl }}>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

/* خطأ تصيير واحد كان يترك صفحة بيضاء بلا رسالة ولا مخرج، والقضايا كلها في المتصفح.
   React لا يمرّر هذه الأخطاء إلى window.onerror، فلا بد من حاجز صريح. */
class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { console.error("midad render error:", err, info); }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-6" style={{ background: C.bg, color: C.ink, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div className="max-w-md w-full rounded-xl p-6 text-center" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <AlertTriangle size={28} className="mx-auto mb-3" style={{ color: C.copper }} />
          <div className="font-bold text-lg mb-2">تعطّلت الشاشة</div>
          <p className="text-sm leading-7 mb-4" style={{ color: C.mute }}>
            حدث خلل في عرض هذه الشاشة. <b>قضاياك وملاحظاتك محفوظة في هذا المتصفح ولم تُمس.</b> أعد تحميل الصفحة، وإن تكرر الخلل فارجع إلى الرئيسية وافتح قضية أخرى.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Btn onClick={() => location.reload()}><RefreshCw size={15} /> أعد تحميل الصفحة</Btn>
            <Btn kind="ghost" onClick={() => { try { location.hash = ""; } catch {} location.reload(); }}>ارجع إلى الرئيسية</Btn>
          </div>
          <details className="mt-4 text-right">
            <summary className="text-xs cursor-pointer" style={{ color: C.mute }}>تفاصيل تقنية</summary>
            <pre dir="ltr" className="text-xs mt-2 p-2 rounded overflow-auto" style={{ background: C.grey, maxHeight: 160 }}>{String(this.state.err && (this.state.err.stack || this.state.err.message) || this.state.err)}</pre>
          </details>
        </div>
      </div>
    );
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(<ErrorBoundary><App /></ErrorBoundary>);
