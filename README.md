# مِداد القاضي — نسخة Render

خادم Node واحد بلا اعتماديات: يقدّم الصفحة ويعمل وسيطًا يحمل مفتاح API.

## الملفات
- `server.js` الخادم والوسيط
- `package.json`
- `index.html` و `app.js` التطبيق

## متغيرات البيئة (تُضبط في Render، لا في الكود)
| المتغير | القيمة |
|---|---|
| `ANTHROPIC_API_KEY` | المفتاح من console.anthropic.com (يبدأ بـ `sk-ant-`) |
| `ACCESS_PASSWORD` | كلمة مرور الدخول للموقع، ٦ أحرف على الأقل |
| `ALLOWED_MODELS` | اختياري. افتراضيًا: `claude-sonnet-5,claude-opus-5,claude-fable-5-1,claude-haiku-4-5-20251001,claude-sonnet-4-6` |
| `MAX_TOKENS` | اختياري. افتراضيًا 8000 |
| `RATE_LIMIT_PER_MINUTE` | اختياري. افتراضيًا 30 |

## أوامر Render
- Build: `npm install`
- Start: `node server.js`
- Runtime: Node

## التحقق
`https://اسم-الخدمة.onrender.com/api` يجب أن يعرض `{"ok":true,"midad":true,"configured":true}`.

## ملاحظات
- الخطة المجانية تُطفئ الخدمة بعد ١٥ دقيقة خمول، فأول طلب بعدها يتأخر نحو دقيقة. خطة Starter تلغي هذا.
- القضايا تُحفظ في متصفح المستخدم فقط، لا في الخادم.
- بيانات وهمية فقط.
