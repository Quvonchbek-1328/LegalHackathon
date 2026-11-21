import type { Analysis, DocumentRecord, PlanConfig } from '@/services/types';

// DIQQAT: quyidagi barcha ma’lumotlar NAMUNA (demo). Ular haqiqiy huquqiy tekshiruv natijasi emas.
// Manbalar `verified: false` — Legal RAG ulanmaguncha modda/band raqamlari ko‘rsatilmaydi.

export const DEMO_ANALYSIS: Analysis = {
  id: 'demo-1',
  documentId: 'doc-1',
  documentName: 'Ulushli_qurilish_shartnomasi_namuna.pdf',
  documentKind: 'contract',
  status: 'completed',
  createdAt: '2026-11-20T10:24:00.000Z',
  pages: 3,
  demo: true,
  summary:
    'Turar-joy binosini ulushli qurish shartnomasi (namuna). Quruvchining muddatni buzganlik uchun javobgarligi cheklangan, to‘lov jadvali va topshirish tartibi to‘liq ko‘rsatilmagan. Imzolashdan oldin 2 ta jiddiy va 3 ta qo‘shimcha tekshiruv talab qiladigan holat bor.',
  entities: [
    { label: 'Hujjat turi', value: 'Ulushli qurilish shartnomasi' },
    { label: 'Tomonlar', value: '«Namuna Qurilish» MChJ · [XARIDOR_1]' },
    { label: 'Obyekt', value: '2 xonali kvartira, 64 m²' },
    { label: 'Summa', value: '780 000 000 so‘m' },
    { label: 'Topshirish muddati', value: '2027-yil IV chorak' },
    { label: 'Sana', value: '15.11.2026' },
  ],
  clauses: [
    { id: 'c1', page: 1, heading: '1. Shartnoma predmeti', text: 'Quruvchi turar-joy binosini qurib bitkazish va Xaridorga 2 xonali kvartirani (64 m²) topshirish majburiyatini oladi.' },
    { id: 'c2', page: 1, heading: '2. Narx va to‘lov tartibi', text: 'Shartnoma bahosi 780 000 000 so‘m. To‘lov Quruvchi belgilagan jadval asosida amalga oshiriladi.' },
    { id: 'c3', page: 2, heading: '3. Topshirish muddati', text: 'Obyekt 2027-yilning IV choragida topshiriladi. Quruvchi muddatni bir tomonlama uzaytirish huquqiga ega.' },
    { id: 'c4', page: 2, heading: '4. Javobgarlik', text: 'Quruvchi obyektni belgilangan muddatda topshirmagan taqdirda javobgarlik olmaydi.' },
    { id: 'c5', page: 2, heading: '5. Xaridorning javobgarligi', text: 'To‘lov kechiktirilgan har bir kun uchun Xaridor shartnoma bahosining 1 foizi miqdorida penya to‘laydi.' },
    { id: 'c6', page: 3, heading: '6. Nizolarni hal qilish', text: 'Nizolar Quruvchi joylashgan yerdagi sudda ko‘rib chiqiladi.' },
    { id: 'c7', page: 3, heading: '7. Yakuniy qoidalar', text: 'Shartnoma imzolangan kundan kuchga kiradi.' },
  ],
  findings: [
    {
      id: 'f1', level: 'critical', category: 'risk', clauseId: 'c4',
      title: 'Quruvchining javobgarligi to‘liq istisno qilingan',
      explanation: 'Muddat buzilganda quruvchi hech qanday javobgarlik olmasligi Xaridorni himoyasiz qoldiradi. Majburiyatni bajarmaslik uchun javobgarlikni oldindan to‘liq istisno qiluvchi shartlar qonunchilikka zid bo‘lishi mumkin.',
      recommendation: 'Muddat buzilgan har bir kun uchun quruvchining penyasi va shartnomani bekor qilish huquqini bandga qo‘shishni talab qiling.',
      sources: [{ act: 'Fuqarolik kodeksi', verified: false }],
    },
    {
      id: 'f2', level: 'high', category: 'conflict', clauseId: 'c3',
      title: 'Muddatni bir tomonlama uzaytirish huquqi',
      explanation: '3-band muddatni belgilaydi, lekin quruvchiga uni bir tomonlama o‘zgartirish huquqini beradi. Bu muddat haqidagi kelishuvni amalda ma’nosiz qiladi.',
      recommendation: 'Muddat faqat tomonlarning yozma kelishuvi bilan o‘zgartirilishini va maksimal kechikish chegarasini yozing.',
      sources: [{ act: 'Fuqarolik kodeksi', verified: false }],
    },
    {
      id: 'f3', level: 'medium', category: 'missing', clauseId: 'c2',
      title: 'To‘lov jadvali shartnomada yo‘q',
      explanation: 'To‘lov «Quruvchi belgilagan jadval» asosida deyilgan, ammo jadval ilova qilinmagan. Summa va muddatlar keyinroq o‘zgartirilishi mumkin.',
      recommendation: 'Sanalar va summalar ko‘rsatilgan to‘lov jadvalini shartnomaning ajralmas ilovasi sifatida qo‘shing.',
      sources: [{ act: 'Fuqarolik kodeksi', verified: false }],
    },
    {
      id: 'f4', level: 'medium', category: 'risk', clauseId: 'c5',
      title: 'Tomonlar javobgarligi nomutanosib',
      explanation: 'Xaridor uchun kuniga 1% penya belgilangan, quruvchi uchun esa javobgarlik yo‘q. Penya miqdori juda yuqori.',
      recommendation: 'Penya miqdorini kamaytirish va ikki tomon uchun teng shartlar belgilashni so‘rang.',
      sources: [{ act: 'Fuqarolik kodeksi', verified: false }],
    },
    {
      id: 'f5', level: 'low', category: 'risk', clauseId: 'c6',
      title: 'Nizolar faqat quruvchi joylashgan sudda',
      explanation: 'Sudlovlilik quruvchi foydasiga belgilangan. Iste’molchi sifatida Xaridorning o‘z yashash joyidagi sudga murojaat qilish huquqi bo‘lishi mumkin.',
      recommendation: 'Yurist bilan sudlovlilik bandini tekshiring.',
      sources: [{ act: 'Iste’molchilarning huquqlarini himoya qilish to‘g‘risidagi qonun', verified: false }],
    },
    {
      id: 'f6', level: 'info', category: 'missing',
      title: 'Qurilishga ruxsatnoma ma’lumotlari ko‘rsatilmagan',
      explanation: 'Shartnomada qurilish ruxsatnomasi, yer uchastkasi huquqi va loyiha hujjatlariga havola yo‘q.',
      recommendation: 'Quruvchidan ruxsatnoma va yer uchastkasiga oid hujjatlar nusxasini so‘rang.',
      sources: [],
    },
  ],
};

export const DEMO_DOCUMENTS: DocumentRecord[] = [
  { id: 'doc-1', name: 'Ulushli_qurilish_shartnomasi_namuna.pdf', kind: 'contract', sizeBytes: 482_113, uploadedAt: '2026-11-20T10:24:00.000Z', status: 'completed', analysisId: 'demo-1', counts: { critical: 1, high: 1, medium: 2, low: 1, info: 1 } },
  { id: 'doc-2', name: 'Ijara_shartnomasi_namuna.docx', kind: 'contract', sizeBytes: 64_210, uploadedAt: '2026-11-18T15:02:00.000Z', status: 'completed', analysisId: 'demo-1', counts: { medium: 1, low: 2 } },
  { id: 'doc-3', name: 'Ishonchnoma_namuna.jpg', kind: 'notarial', sizeBytes: 1_204_551, uploadedAt: '2026-11-17T09:41:00.000Z', status: 'completed', analysisId: 'demo-1', counts: { high: 1, info: 1 } },
  { id: 'doc-4', name: 'Hokimiyatga_ariza_namuna.pdf', kind: 'application', sizeBytes: 220_004, uploadedAt: '2026-11-15T12:10:00.000Z', status: 'completed', analysisId: 'demo-1', counts: {} },
];

export const DEFAULT_PLANS: PlanConfig[] = [
  { id: 'free', priceUsd: 0, monthlyDocuments: 3, maxFileMb: 10, features: { advancedAnalysis: false, pdfExport: false, history: false, teamAccess: false, api: false, onPremise: false } },
  { id: 'pro', priceUsd: 29, monthlyDocuments: 100, maxFileMb: 25, recommended: true, features: { advancedAnalysis: true, pdfExport: true, history: true, teamAccess: false, api: false, onPremise: false } },
  { id: 'enterprise', priceUsd: null, monthlyDocuments: null, maxFileMb: 100, features: { advancedAnalysis: true, pdfExport: true, history: true, teamAccess: true, api: true, onPremise: true } },
];
