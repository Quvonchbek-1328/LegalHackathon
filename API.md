# LegalCheck AI — Backend API shartnomasi

Frontend `api.js` orqali ishlaydi. Tayyor server: `server/server.js` (README’ga qarang).

## Ulanish tartibi (frontend)
1. `?api=https://api.example.uz` URL parametri yoki `window.LEGALCHECK_API_BASE`
2. bo‘lmasa — shu domendagi `GET /api/health` (`{ "ok": true }` qaytarsa, shu server ishlatiladi)
3. bo‘lmasa — namuna rejim (`legalcheck-core.js` dagi ma’lumot)

- Telegram ichida har so‘rovga `X-Telegram-Init-Data` header qo‘shiladi; server HMAC bilan tekshiradi.
- Xato javob: `{ "error": { "message": "..." } }` + 4xx/5xx status. Xabar foydalanuvchiga ko‘rsatiladi.
- `sources` — satrlar massivi: `["Qonun 50-m.", "726-reglament, 5-ilova"]`.

## Umumiy
`GET /api/health` → `{ "ok": true, "llm": true, "telegram": true }`

## 1. Tayyorgarlik (fuqaro)
`GET /api/situations` → `[{ "id": "meros", "title": "Meros", "hint": "..." }]`
Vaziyatlar: `meros`, `uy-joy`, `avto`, `ishonchnoma`, `vasiyatnoma`.

`GET /api/prep/{id}/questions` →
```json
[{ "id": "deathDate", "type": "date|text|single|multi", "label": "Vafot sanasi",
   "title": "...", "hint": "...", "placeholder": "...", "options": ["..."], "sources": ["..."] }]
```

`POST /api/prep/{id}/result` body `{ "answers": { "deathDate": "2026-07-08", "heirs": ["Farzand"] } }` →
```json
{
  "deadline": { "label": "6 oylik muddat", "fromLabel": "Vafot", "from": "2026-07-08", "until": "2027-01-08",
                "note": "...", "sources": ["..."] },
  "notary":   { "rule": "...", "placeLabel": "Meros ochilgan joy", "place": "...", "office": "...", "address": "...", "sources": ["..."] },
  "documents": [{ "id": "d1", "title": "...", "note": "...", "sources": ["..."] }],
  "warnings":  [{ "id": "w1", "title": "...", "note": "...", "sources": ["..."] }]
}
```
`deadline` — `null` bo‘lishi mumkin (meros bo‘lmagan vaziyatlar). Sanalar ISO `YYYY-MM-DD`.

## 2. Bitim xavfi
`POST /api/risk/analyze` — `multipart/form-data`
- fayllar: `kadastr`, `mulk`, `meros`, `ishonchnoma` (PDF/JPG/PNG, har biri ≤ `MAX_FILE_MB`)
- maydon: `role` = `Xaridor | Rieltor | Bank`
- fayl yuborilmasa — namuna tahlil qaytadi («Namuna hujjatlar bilan ko‘rish» tugmasi)

→
```json
{
  "property": { "title": "...", "address": "...", "cadastre": "..." },
  "timeline": [{ "owner": "...", "basis": "...", "date": "20.03.2026", "doc": "...", "flag": "high|mid|low|null", "current": false }],
  "flags": [{ "id": "f1", "level": "high|mid|low", "title": "...", "note": "...", "demand": "...", "sources": ["..."] }]
}
```
`timeline` eskidan yangiga.

Server qo‘shimcha `privacy` maydonini qaytaradi:
```json
{ "privacy": { "masked": { "SHAXS": 2, "PASPORT": 1, "JSHSHIR": 1 }, "sentToAI": true, "filesStored": false } }
```
AI modelga faqat niqoblangan matn yuboriladi; `timeline` va `flags` dagi tokenlar javobdan oldin serverda tiklanadi.
Skaner PDF (matn qatlamisiz) → `422`.

## 3. Notarius kabineti
`GET /api/notary/changes` →
`[{ "id": "c1", "doc": "...", "clause": "22-band", "source": "Yo‘riqnoma 22-band", "date": "01.11.2026", "oldText": "...", "newText": "..." }]`

`GET /api/notary/suggestions` → `["Savol matni"]`

`POST /api/notary/ask` body `{ "question": "..." }` →
`{ "question": "...", "blocks": [{ "text": "...", "sources": ["..."], "practice": false }] }`
`practice: true` — manbada topilmagan, amaliyotdan kelgan ma’lumot (UI alohida belgilaydi).

## 4. Hujjat va ariza tekshiruvi
`POST /api/check` — `multipart/form-data`
- `files` — 10 tagacha PDF/JPG/PNG (ariza + hujjatlar)
- `situation` — `meros | uy-joy | avto | ishonchnoma | vasiyatnoma`
- `answers` — JSON satr (tayyorgarlik javoblari, ixtiyoriy)
- `handwritten` — `1 | 0`; `consent` — `1 | 0` (tashqi HTR uchun rozilik)
- fayl yuborilmasa — namuna ariza natijasi

→
```json
{
  "situation": "meros",
  "files": [{ "name": "ariza.jpg", "kind": "ariza", "kindTitle": "Ariza", "handwritten": true, "engine": "ocr|htr-local|htr-ai|ocr-qolyozma" }],
  "completeness": [{ "id": "d3", "title": "...", "status": "ok|fail|manual", "file": "...", "note": "...", "sources": ["..."] }],
  "checks": [{ "id": "fio", "title": "F.I.Sh. to‘liq yozilgan", "status": "ok|fail|warn|manual", "note": "...", "sources": ["Yo‘riqnoma 12-band"], "practice": false }],
  "notice": "",
  "privacy": { "masked": { "SHAXS": 2 }, "sentToAI": false, "filesStored": false }
}
```
`412` — qo‘lyozma tashqi modelga yuborilishi kerak, lekin rozilik yo‘q.

`GET /api/health` → `htr`: `local | ai | ocr`.
