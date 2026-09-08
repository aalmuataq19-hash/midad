// جودة النص المستخرج من PDF.
// وحدة مستقلة عن الواجهة حتى تُختبر بـ node --test، ويضمّها esbuild في app.js.
//
// كثير من ملفات PDF العربية تُخرج عناصر النص بترتيب لا يطابق ترتيب القراءة، فيصير
// النص مبعثرًا: «هـ الساعة /1445 /4 25في يوم الخميس». وهو أسوأ من غياب النص، لأنه
// يُرسل كأنه سليم فيُبنى عليه التحليل. هذا كشف بسيط لا يدّعي الكمال، والغلط فيه
// يميل إلى الاحتياط: عند الشك يُهمل النص ويُرسل الملف نفسه ليقرأه النموذج بصريًا.
"use strict";

const AR_LETTER = /[ء-غف-ي]/;
const AR_ONLY = /[^ء-ي]/g;
const DIGIT = "0-9٠-٩";

function mangleScore(text) {
  const t = String(text == null ? "" : text);
  const words = t.split(/\s+/).filter((w) => AR_LETTER.test(w));
  // نص قصير لا يُحكم عليه: العيّنة أصغر من أن تدل
  if (words.length < 40) return 0;
  // شظايا الكلمات: كلمة عربية من حرف أو حرفين نادرة في النص السليم («و» و«في» وأشباهها
  // قليلة)، وكثرتها علامة تقطّع الكلمات على عناصر منفصلة
  const frags = words.filter((w) => w.replace(AR_ONLY, "").length <= 2).length / words.length;
  // التصاق رقم بحرف عربي بلا فاصل («1445في») علامة انقلاب مواضع الأرقام
  const glued = (t.match(new RegExp(`[${DIGIT}][ء-ي]|[ء-ي][${DIGIT}]`, "g")) || []).length;
  return Math.max(frags, (glued / words.length) * 3);
}
const MANGLED_AT = 0.25;
const isMangled = (text) => mangleScore(text) > MANGLED_AT;

module.exports = { mangleScore, isMangled, MANGLED_AT };
