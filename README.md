# LegalCheck AI

O‘zbekistondagi notarial bitimlarga tayyorgarlik va xavf tahlili.
Uch modul: **Tayyorgarlik** (fuqaro, Telegram Mini App), **Bitim xavfi** (xaridor, rieltor, bank), **Notarius kabineti**.

> Bu sun’iy intellekt tahlili, yuridik maslahat emas. Yakuniy qarorni notarius yoki yurist bilan tekshiring.

---

## Tez boshlash

Talab: **Node.js 20.6+** va internet (React, shriftlar va OCR til fayllari CDN’dan yuklanadi).

```bash
npm install
npm start
```

Brauzerda oching: **http://localhost:3000** — landing sahifa ochiladi.

Kalitlarsiz ham hammasi ishlaydi:

| Modul | Kalitsiz | `ANTHROPIC_API_KEY` bilan |
|---|---|---|
| Tayyorgarlik (5 vaziyat) | To‘liq ishlaydi (qoidalar asosida) | O‘zgarmaydi |
| Bitim xavfi | OCR + PII niqoblash ishlaydi, tahlil namuna | Haqiqiy AI tahlil |
| Notarius savollari | Normalar bazasidan qidiruv | AI iqtibosli javob |

AI ni yoqish:
```bash
cp .env.example .env     # ANTHROPIC_API_KEY ni yozing
npm run dev
```

> HTML fayllarni to‘g‘ridan-to‘g‘ri ikki marta bosib ochmang — brauzer `file://` da modullarni bloklaydi. Har doim `npm start` orqali oching.

---

## Sahifalar

| URL | Nima |
|---|---|
| `/LegalCheckLanding.dc.html` | Landing: motion, OCR → PII → AI jarayoni animatsiyasi, maxfiylik |
| `/LegalCheckMiniApp.dc.html` | Telegram Mini App: bosh sahifa → savol-javob → natija |
| `/LegalCheckKabinet.dc.html` | Bitim xavfi: yuklash (B1) va natija (B2) |
| `/LegalCheckKabinet.dc.html?screen=b3` | Notarius kabineti |
| `/LegalCheckKabinet.dc.html?screen=b4` | Hujjat va ariza tekshiruvi (desktop) |
| `/LegalCheckMiniApp.dc.html?screen=a4` | Hujjat va ariza tekshiruvi (telefon) |
| `/LegalCheckEkranlar.dc.html` | Barcha ekranlar bitta kanvasda (dizayn ko‘rinishi) |

---

## Tizim qanday ishlaydi

```
 ┌──────────── LegalCheck AI serveri (fayl faqat xotirada) ────────────┐
 │                                                                      │
 │  Hujjat ──► OCR ──► PII niqoblash ──── niqoblangan matn ────────────────►  AI model
 │                     (ism → [SHAXS_1])                                │     (tashqi)
 │  Natija ◄── Tiklash ◄───────────────── javob (tokenlar bilan) ◄─────────┘
 │             ([SHAXS_1] → ism)                                        │
 └──────────────────────────────────────────────────────────────────────┘
```

1. **Yuklash** — fayl `multer` orqali xotiraga olinadi, diskka yozilmaydi.
2. **OCR** — rasm `tesseract.js` bilan serverning o‘zida o‘qiladi (o‘zbek lotin/kirill, rus, ingliz). PDF’dan matn qatlami olinadi.
3. **PII niqoblash** — F.I.Sh., pasport, JSHSHIR, telefon, e-pochta, manzil `[SHAXS_1]`, `[PASPORT_1]` kabi tokenlarga almashtiriladi (`legalcheck-core.js` → `createMasker`).
4. **AI tahlil** — modelga faqat niqoblangan matn yuboriladi; asl fayl va rasm yuborilmaydi.
5. **Tiklash** — javobdagi tokenlar serverda asl qiymatga qaytariladi. Token xaritasi faqat shu so‘rov davomida xotirada turadi.
6. **Natija** — har bir qizil bayroqda daraja (ikon + yozuv), izoh, «nimani talab qiling» va manba. Javobda `privacy` maydoni nechta ma’lumot niqoblanganini ko‘rsatadi.

AI javobidagi manbalar normalar bazasi (`CORPUS`) bilan solishtiriladi: bazada yo‘q manba olib tashlanadi, manbasiz blok «amaliyot, manbada topilmagan» deb belgilanadi.

---

## Hujjat va ariza tekshiruvi

Fuqaro (Mini App) yoki notarius (kabinet) ariza va hujjatlarni yuklaydi. Har bir natijada: **talab — holat — asos (band)**.

1. **Hujjatlar to‘liqligi** — vaziyat bo‘yicha kerakli ro‘yxat (`buildPrepResult`) bilan solishtiriladi. Hujjat turi OCR matnidan aniqlanadi (`classifyDoc`).
2. **Ariza talablari** (`checkApplication`):
   - F.I.Sh. to‘liq, yashash joyi — Yo‘riqnoma 12-band
   - Summa so‘z bilan ham (summa bo‘lsa) — Qonun 35-m.; Yo‘riqnoma 12-band
   - Meros: maqsad (qabul / guvohnoma) — Qonun 50, 58-m.; merosxo‘rlar doirasi — 726-reglament, 5-ilova, 23-band; marhum va vafot sanasi — 726-reglament, 5-ilova; «voz kechish» so‘zi — FK 1147-m. (ogohlantirish)
   - Izohsiz tuzatish — Yo‘riqnoma 9, 14-band (qo‘lyozmada HTR model aniqlaydi)
   - Qalam, imzo — «notarius ko‘radi» (rasmdan ishonchli aniqlanmaydi)
3. **Qo‘lyozma (HTR)** — `server/htr.js`:
   - `HTR_BASE_URL` — o‘z serveringizdagi vision model (Ollama, vLLM). Masalan: `ollama pull qwen2.5vl:7b`, keyin `HTR_BASE_URL=http://localhost:11434/v1`. Rasm serverdan chiqmaydi.
   - aks holda `ANTHROPIC_API_KEY` — tashqi model, **faqat rozilik belgilansa** (UI so‘raydi, server `412` qaytaradi).
   - ikkalasi yo‘q — oddiy OCR, natija «noaniq» deb belgilanadi.

---

## Tuzilma

```
LegalCheck*.dc.html   frontend sahifalar (support.js — sahifa runtime’i)
api.js                frontend API klienti: backendni o‘zi topadi, bo‘lmasa namuna rejim
config.js             backend manzili (faqat frontend alohida joylansa)
index.html            bosh sahifa → landing
legalcheck-core.js    savollar, natija qoidalari, normalar bazasi, PII niqoblash (frontend + server)
server/
  server.js           Express: API + statik frontend
  ocr.js              tesseract.js (rasm) va pdf-parse (PDF)
  llm.js              Anthropic API: hujjat tahlili va iqtibosli javob
  htr.js              qo‘lyozmani o‘qish: lokal vision model yoki rozilik bilan AI
  telegram.js         Mini App initData tekshiruvi, bot menyu tugmasi
API.md                endpointlar va JSON formatlari
.env.example          muhit o‘zgaruvchilari namunasi
```

---

## Muhit o‘zgaruvchilari (`.env`)

| O‘zgaruvchi | Vazifasi |
|---|---|
| `PORT` | Server porti (standart 3000) |
| `ANTHROPIC_API_KEY` | AI tahlil. Bo‘sh bo‘lsa — namuna rejim |
| `LC_MODEL` | Model nomi |
| `TELEGRAM_BOT_TOKEN` | Mini App foydalanuvchisini HMAC bilan tekshirish |
| `PUBLIC_URL` | HTTPS manzil; berilsa bot menyusiga Mini App tugmasi qo‘yiladi |
| `REQUIRE_TELEGRAM` | `1` — API faqat Telegram ichidan |
| `CORS_ORIGIN` | Frontend boshqa domenda bo‘lsa |
| `MAX_FILE_MB` | Fayl hajmi chegarasi |
| `OCR_LANGS` | OCR tillari (`uzb+uzb_cyrl+rus+eng`) |
| `HTR_BASE_URL`, `HTR_MODEL`, `HTR_API_KEY` | Qo‘lyozma uchun lokal vision model (OpenAI-mos API) |

---

## Telegram Mini App

1. @BotFather → `/newbot` → tokenni `.env` ga `TELEGRAM_BOT_TOKEN` qilib yozing.
2. Serverni HTTPS bilan joylang. Lokal sinov: `npx ngrok http 3000`.
3. `PUBLIC_URL=https://...` qo‘ying va qayta ishga tushiring — menyu tugmasi o‘zi qo‘yiladi.
   Qo‘lda: BotFather → Bot Settings → Menu Button → `https://.../LegalCheckMiniApp.dc.html`.

## Joylash (deploy)

### A) Hammasi birga (tavsiya)
Har qanday Node hosting: Render, Railway, Fly.io yoki VPS.
Build: `npm install` · Start: `npm start`. `.env` qiymatlarini hosting sozlamalariga kiriting.
Frontend va API bitta domenda — qo‘shimcha sozlash kerak emas.

### B) Faqat frontend (statik hosting)
Vercel, Netlify yoki GitHub Pages — papkani o‘zini yuklang, build buyrug‘i kerak emas.

- **Backendsiz:** hech narsa sozlamang — sayt namuna rejimda to‘liq ishlaydi (tayyorgarlik moduli haqiqiy qoidalar bilan).
- **Backend boshqa joyda bo‘lsa:** `config.js` da manzilni yozing:
  ```js
  export const API_BASE = 'https://api.sizning-domen.uz';
  ```
  va backend `.env` ida `CORS_ORIGIN=https://frontend-domeningiz` qo‘ying.
- Sinov uchun manzilni URL orqali ham berish mumkin: `...?api=https://api.sizning-domen.uz`

GitHub Pages: repo → Settings → Pages → Branch: `main`, papka `/ (root)`. Bosh sahifa `index.html` landingga o‘tkazadi.

Backendni keyin o‘zingiz yozsangiz: [API.md](API.md) dagi formatni qaytarsa, frontend o‘zgarishsiz ishlaydi.

---

## Cheklovlar

- Skaner qilingan (matn qatlamisiz) PDF qabul qilinmaydi — sahifani JPG/PNG qilib yuklash so‘raladi.
- PII niqoblash qoidalarga asoslangan; noodatiy yozilgan ma’lumotni aniqlamasligi mumkin.
- Birinchi OCR so‘rovida til fayllari yuklab olinadi (bir martalik, foydalanuvchi ma’lumoti yuborilmaydi).
- Norma o‘zgarishlari (`CHANGES`) hozircha statik namuna — LexUZ monitoringiga ulash kerak.
- Namuna ma’lumotlar (ism, manzil, raqam) ataylab soxta: «Namuna», «Misol», nollar.

## Keyingi qadamlar

- `CHANGES` ni bazaga ulash (`GET /api/notary/changes`).
- `CORPUS` ni kengaytirish yoki vektor qidiruvga o‘tkazish.
- Skaner PDF uchun sahifalarni rasmga aylantirib OCR qilish.
- Foydalanuvchi tarixi kerak bo‘lsa, `req.tgUser.id` bo‘yicha saqlash.

API tafsilotlari: [API.md](API.md)
