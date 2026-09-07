// شيم للاختبار فقط: يستبدل fetch قبل تحميل server.js ليسجّل ما أرسله الخادم إلى Anthropic،
// فنتأكد أن الوسيط لا يحذف حقولًا مثل cache_control. لا يُستخدم في التشغيل الحقيقي.
"use strict";
const fs = require("fs");
const OUT = process.env.MIDAD_CAPTURE || "/tmp/midad-upstream.json";
globalThis.fetch = async (url, init) => {
  fs.writeFileSync(OUT, JSON.stringify({ url: String(url), headers: init.headers, body: init.body }));
  return new Response(JSON.stringify({ content: [{ type: "text", text: "{}" }] }), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
};
