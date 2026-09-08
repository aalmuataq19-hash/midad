// شيم للاختبار فقط: يستبدل fetch قبل تحميل server.js ليسجّل ما أرسله الخادم إلى Anthropic،
// فنتأكد أن الوسيط لا يحذف حقولًا مثل cache_control. لا يُستخدم في التشغيل الحقيقي.
"use strict";
const fs = require("fs");
const OUT = process.env.MIDAD_CAPTURE || "/tmp/midad-upstream.json";
globalThis.fetch = async (url, init) => {
  fs.writeFileSync(OUT, JSON.stringify({ url: String(url), headers: init.headers, body: init.body }));
  // يحاكي مزوّدًا يردّد المفتاح في نص خطئه، للتأكد أن الخادم ينقّيه قبل العرض
  const auth = String((init.headers || {}).Authorization || "").replace("Bearer ", "");
  if (/LEAKME/.test(auth)) {
    return new Response(JSON.stringify({ error: { message: `Incorrect API key provided: ${auth}`, code: "invalid_api_key" } }), {
      status: 401, headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ content: [{ type: "text", text: "{}" }], choices: [{ message: { content: "{}" } }] }), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
};
