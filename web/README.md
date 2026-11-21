# LegalCheck AI — Web (Next.js)

O‘zbekiston uchun AI huquqiy hujjat platformasining frontendi. Zako AI jamoasi.

Stek: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide · shadcn/ui uslubidagi komponentlar.

## Ishga tushirish

```bash
cd web
npm install
npm run dev          # http://localhost:3001
```

`/api/*` so‘rovlari `BACKEND_URL` ga (standart: `http://localhost:3000`, ya’ni `../server`) proksi qilinadi.

| Buyruq | Vazifa |
|---|---|
| `npm run dev` | Dev server (3001-port) |
| `npm run build` / `npm start` | Production build va server |
| `npm run typecheck` | TypeScript tekshiruvi |

## Sahifalar

| Yo‘l | Nima |
|---|---|
| `/` | Landing: hero, muammo/yechim, imkoniyatlar, qanday ishlaydi, mahsulot ko‘rinishi, auditoriya, tariflar, xavfsizlik, FAQ |
| `/login`, `/register` | Autentifikatsiya UI (`?plan=pro` — tanlangan tarif) |
| `/app` | Umumiy ko‘rinish: statistika, so‘nggi hujjatlar, tahlillar tarixi |
| `/app/new` | Drag-and-drop yuklash, PDF/DOCX/rasm preview, tahlil bosqichlari |
| `/app/analysis/[id]` | Tahlil: hujjat (sahifalar, ajratilgan bandlar) + AI xulosa, xavflar, manbalar, tavsiyalar, PDF/chop etish |
| `/app/documents`, `/app/reports`, `/app/settings` | Hujjatlar, hisobotlar, sozlamalar |
| `/app/admin` | Tarif narxi, limitlari va imkoniyatlarini boshqarish |

Til: o‘zbek (lotin, standart), rus, ingliz — `src/i18n/`.

## Demo rejim va backend integratsiyasi

`NEXT_PUBLIC_DEMO_MODE=1` (standart) — barcha servislar namuna ma’lumot qaytaradi va UI’da **«Demo ma’lumot»** deb aniq belgilanadi. Haqiqiy huquqiy tekshiruv simulyatsiya qilinmaydi: demo manbalar `verified: false`, modda raqami ko‘rsatilmaydi.

Servis qatlami (`src/services/`) — backend tayyor bo‘lganda faqat `NEXT_PUBLIC_DEMO_MODE=0` qilinadi:

| Fayl | Backend endpoint |
|---|---|
| `auth.ts` | `POST /api/auth/login`, `POST /api/auth/register` |
| `documents.ts` | `GET/POST /api/documents` |
| `analysis.ts` | `POST /api/analyses`, `GET /api/analyses/:id` |
| `ocr.ts` | `POST /api/ocr` |
| `llm.ts` | `POST /api/llm/understand` |
| `legal-rag.ts` | `POST /api/legal/verify` |
| `plans.ts` | `GET /api/plans`, `PUT /api/admin/plans` |

Domen turlari: `src/services/types.ts`. Xato formati mavjud backend bilan bir xil: `{ "error": { "message": "..." } }`.
