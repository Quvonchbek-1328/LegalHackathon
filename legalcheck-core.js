// LegalCheck AI umumiy mantiq: frontend (namuna rejim) va backend bir xil faylni ishlatadi.
// Manbalar: «Notariat to‘g‘risida»gi Qonun, Yo‘riqnoma (ro‘yxat № 3113), VMQ 726, FK.

export const SITUATIONS = [
  { id: 'meros', title: 'Meros', hint: 'Merosni qabul qilish, guvohnoma' },
  { id: 'uy-joy', title: 'Uy-joy oldi-sotdisi', hint: 'Kvartira, uy, yer uchastkasi' },
  { id: 'avto', title: 'Avtomobil', hint: 'Sotish, hadya qilish' },
  { id: 'ishonchnoma', title: 'Ishonchnoma', hint: 'Boshqa shaxsga vakolat berish' },
  { id: 'vasiyatnoma', title: 'Vasiyatnoma', hint: 'Oddiy yoki yopiq vasiyatnoma' },
];

const YHB = ['Ha', 'Yo‘q', 'Bilmayman'];

export const QUESTIONS = {
  meros: [
    { id: 'deathDate', type: 'date', label: 'Vafot sanasi', title: 'Marhum qachon vafot etgan?', hint: 'O‘lim guvohnomasidagi sana. 6 oylik muddat shu kundan hisoblanadi.', sources: ['726-reglament, 5-ilova, 18-band'] },
    { id: 'place', type: 'text', label: 'Manzil', title: 'Marhumning oxirgi doimiy yashash joyi qayer edi?', hint: 'Meros ishi faqat shu joydagi notariusda yuritiladi.', placeholder: 'Viloyat, tuman yoki shahar', sources: ['Qonun 50, 59-m.'] },
    { id: 'heirs', type: 'multi', title: 'Merosxo‘rlar kimlar?', hint: 'Barcha mos variantlarni belgilang.', options: ['Turmush o‘rtog‘i', 'Farzand', 'Voyaga yetmagan farzand', 'Ota-ona', 'Aka-uka yoki opa-singil', 'Boshqa'], sources: [] },
    { id: 'will', type: 'single', title: 'Vasiyatnoma bormi?', hint: 'Notarius vasiyatnoma bor-yo‘qligini Tizim orqali ham tekshiradi.', options: YHB, sources: ['726-reglament, 5-ilova, 23-band'] },
    { id: 'estate', type: 'multi', title: 'Meros tarkibida nimalar bor?', hint: 'Har bir mulk turi uchun alohida hujjat kerak bo‘ladi.', options: ['Uy-joy', 'Yer uchastkasi', 'Avtomobil', 'Bank omonati', 'Qimmatli qog‘oz yoki ulush'], sources: ['726-reglament, 5-ilova, 33-band'] },
  ],
  'uy-joy': [
    { id: 'role', type: 'single', title: 'Bitimda kim sifatida qatnashasiz?', hint: 'Hujjatlar ro‘yxati tarafga qarab farq qiladi.', options: ['Sotuvchi', 'Xaridor'], sources: [] },
    { id: 'deal', type: 'single', title: 'Bitim turi qanday?', hint: 'Oldi-sotdi, hadya va ayirboshlash bir reglament bilan tartibga solinadi.', options: ['Oldi-sotdi', 'Hadya', 'Ayirboshlash'], sources: ['726-reglament, 1-ilova'] },
    { id: 'propType', type: 'single', title: 'Mulk turi qanday?', hint: 'Ko‘p kvartirali uydagi xonadon uchun kadastr xulosasi alohida talab qilinadi.', options: ['Ko‘p kvartirali uydagi xonadon', 'Hovli uy', 'Yer uchastkasi bilan uy'], sources: ['726-reglament, 1-ilova'] },
    { id: 'married', type: 'single', title: 'Mulk sotuvchining nikohi davrida olinganmi?', hint: 'Er-xotin umumiy mulki uchun ikkinchi turmush o‘rtog‘ining roziligi kerak.', options: YHB, sources: ['Yo‘riqnoma 29-band'] },
    { id: 'special', type: 'multi', title: 'Quyidagilardan qaysi biri to‘g‘ri keladi?', hint: 'Mos kelmasa, «Hech biri»ni tanlang.', options: ['Mulk garovda (ipotekada)', 'Mulk ulushli', 'Egalardan biri voyaga yetmagan', 'Taraflardan biri vakil orqali qatnashadi', 'Hech biri'], sources: [] },
  ],
  avto: [
    { id: 'role', type: 'single', title: 'Bitimda kim sifatida qatnashasiz?', hint: 'Hujjatlar ro‘yxati tarafga qarab farq qiladi.', options: ['Sotuvchi', 'Xaridor'], sources: [] },
    { id: 'deal', type: 'single', title: 'Bitim turi qanday?', hint: 'Avtomobilni o‘tkazish alohida reglament bilan tartibga solinadi.', options: ['Oldi-sotdi', 'Hadya'], sources: ['726-reglament, 2-ilova'] },
    { id: 'married', type: 'single', title: 'Avtomobil sotuvchining nikohi davrida olinganmi?', hint: 'Er-xotin umumiy mulki uchun turmush o‘rtog‘ining notarial roziligi kerak.', options: YHB, sources: ['Yo‘riqnoma 29-band'] },
    { id: 'pledge', type: 'single', title: 'Avtomobil garovdami yoki kreditdami?', hint: 'Garovdagi mulkni o‘tkazish uchun garovga oluvchining roziligi kerak.', options: YHB, sources: ['726-reglament, 2-ilova'] },
    { id: 'proxy', type: 'single', title: 'Sotuvchi notariusga o‘zi boradimi?', hint: 'Vakil orqali bo‘lsa, ishonchnoma holati Tizimda tekshiriladi.', options: ['Ha, shaxsan', 'Yo‘q, vakil orqali'], sources: [] },
  ],
  ishonchnoma: [
    { id: 'purpose', type: 'single', title: 'Ishonchnoma nima uchun kerak?', hint: 'Vakolat hajmi aniq yozilishi kerak.', options: ['Ko‘chmas mulkni sotish', 'Avtomobilni boshqarish yoki sotish', 'Merosni qabul qilish', 'Davlat idoralarida vakillik', 'Boshqa'], sources: ['Qonun 47-m.'] },
    { id: 'who', type: 'single', title: 'Siz kimsiz?', hint: 'Ishonchnomani ishonch beruvchining o‘zi rasmiylashtiradi.', options: ['Ishonch beruvchi', 'Vakil (ishonchnoma olaman)'], sources: [] },
    { id: 'sub', type: 'single', title: 'Vakil vakolatni boshqa shaxsga o‘tkazishi kerakmi?', hint: 'Qayta ishonchnoma asosiy ishonchnomadagi hajm va muddatdan oshmaydi.', options: ['Yo‘q', 'Ha'], sources: ['Qonun 47-m.'] },
    { id: 'abroad', type: 'single', title: 'Ishonchnoma xorijda ishlatiladimi?', hint: 'Xorijda apostil yoki konsullik legalizatsiyasi kerak bo‘lishi mumkin.', options: ['Yo‘q', 'Ha'], sources: ['Qonun 88–93-m.'] },
  ],
  vasiyatnoma: [
    { id: 'kind', type: 'single', title: 'Qanday vasiyatnoma rasmiylashtirmoqchisiz?', hint: 'Yopiq vasiyatnomaning mazmuni notariusga ham ma’lum bo‘lmaydi.', options: ['Oddiy', 'Yopiq', 'Bilmayman'], sources: ['Yo‘riqnoma 87, 90-band'] },
    { id: 'visit', type: 'single', title: 'Notarial idoraga o‘zingiz bora olasizmi?', hint: 'Og‘ir kasal bo‘lsangiz, notarius uyga yoki kasalxonaga keladi.', options: ['Ha', 'Yo‘q, kasalman yoki harakatlanish qiyin'], sources: ['Qonun 21, 30-m.'] },
    { id: 'sign', type: 'single', title: 'O‘z qo‘lingiz bilan imzolay olasizmi?', hint: 'Oddiy vasiyatnoma vasiyat qiluvchining o‘z qo‘li bilan imzolanadi.', options: ['Ha', 'Yo‘q'], sources: ['Yo‘riqnoma 87-band'] },
    { id: 'property', type: 'single', title: 'Vasiyat qilinadigan mulk hozir sizning nomingizdami?', hint: 'Kelajakda olinadigan mulkni ham vasiyat qilish mumkin.', options: ['Ha', 'Qisman', 'Yo‘q, kelajakda olinadi'], sources: ['Qonun 45-m.'] },
  ],
};

const has = (arr, v) => Array.isArray(arr) && arr.includes(v);

function addMonths(iso, m) {
  const d = new Date(iso + 'T00:00:00Z');
  if (isNaN(d)) return null;
  d.setUTCMonth(d.getUTCMonth() + m);
  return d.toISOString().slice(0, 10);
}

const ANY_NOTARY = {
  placeLabel: 'Qaysi notarius',
  place: 'Istalgan notarius',
  office: 'Davlat yoki xususiy notarius',
  address: 'Ikkalasi tasdiqlagan hujjat bir xil kuchga ega',
};

const SIGN_WARNING = { id: 'w-sign', title: 'Hujjatni uyda oldindan imzolab kelmang', note: 'Imzo faqat notarius ishtirokida qo‘yiladi va kamida ikki barmoq izi skanerlanadi.', sources: ['Yo‘riqnoma 8-band'] };
const FORM_WARNING = { id: 'w-form', title: 'Summa va sana so‘z bilan ham yoziladi', note: 'Qalamda yozilgan, o‘chirilgan yoki izohsiz tuzatilgan hujjat qabul qilinmaydi.', sources: ['Qonun 35-m.', 'Yo‘riqnoma 9, 12-band'] };

function meros(a) {
  const docs = [
    { id: 'd1', kind: 'ariza', title: 'Merosni qabul qilish to‘g‘risida yozma ariza', note: 'Og‘zaki murojaat meros ishini ochmaydi', sources: ['Qonun 50, 58-m.'] },
    { id: 'd2', kind: 'pasport', title: 'Merosxo‘rning pasporti yoki ID-kartasi', sources: ['726-reglament, 5-ilova, 29-band'] },
    { id: 'd3', kind: 'olim', title: 'O‘lim guvohnomasi yoki FHDY ko‘chirmasi', note: 'QR-kodli tibbiy ma’lumotnoma ham qabul qilinadi', sources: ['726-reglament, 5-ilova, 29-band'] },
    { id: 'd4', kind: 'royxat', title: 'Oxirgi yashash joyi bo‘yicha ro‘yxat ma’lumotnomasi', note: 'Yoki uy daftaridan ko‘chirma', sources: ['726-reglament, 5-ilova, 29-band'] },
    { id: 'd5', kind: 'qarindosh', title: 'Qarindoshlikni tasdiqlovchi hujjatlar', note: 'Familiya o‘zgargan bo‘lsa, nikoh guvohnomalari zanjiri bilan', sources: ['726-reglament, 5-ilova, 29-band'] },
  ];
  const e = a.estate || [];
  if (has(e, 'Uy-joy') || has(e, 'Yer uchastkasi')) docs.push({ id: 'd6', kind: 'kadastr', title: 'Kadastr ma’lumotnomasi', sources: ['726-reglament, 5-ilova, 33-band'] });
  if (has(e, 'Avtomobil')) docs.push({ id: 'd7', kind: 'texpasport', title: 'Avtomobil texnik pasporti', sources: ['726-reglament, 5-ilova, 33-band'] });
  if (has(e, 'Bank omonati') || has(e, 'Qimmatli qog‘oz yoki ulush')) docs.push({ id: 'd8', kind: 'bank', title: 'Bankdan omonat yoki qimmatli qog‘oz bo‘yicha ma’lumotnoma', sources: ['726-reglament, 5-ilova, 33-band'] });
  if (String(a.will || '').startsWith('Ha')) docs.push({ id: 'd9', kind: 'vasiyat', title: 'Vasiyatnoma (bo‘lsa, asl nusxasi)', note: 'Notarius uning bekor qilinmaganini Tizimda tekshiradi', sources: ['Qonun 61-m.'] });

  const warnings = [
    { id: 'w1', title: 'Merosdan voz kechish qaytarib olinmaydi', note: 'Voz kechish arizasi notarial tasdiqlanadi; qisman yoki shart qo‘yib voz kechib bo‘lmaydi.', sources: ['FK 1147-m.', '726-reglament, 5-ilova'] },
  ];
  if (has(a.heirs, 'Turmush o‘rtog‘i')) warnings.push({ id: 'w2', title: 'Er-xotin ulushi uchun alohida ariza bering', note: 'Ariza berilmasa, ulush ajratilmaydi va butun umumiy mulk merosga kiradi.', sources: ['Qonun 62–63-m.', 'Yo‘riqnoma 148-band'] });
  if (has(a.heirs, 'Voyaga yetmagan farzand')) warnings.push({ id: 'w3', title: 'Voyaga yetmagan merosxo‘r bor', note: 'Notarius vasiylik va homiylik organini xabardor qiladi.', sources: ['Qonun 59-m.'] });
  warnings.push({ id: 'w4', title: 'Mulkda taqiq yoki xatlov bo‘lsa, guvohnoma berilmaydi', note: 'Masalan, marhumning soliq qarzi bo‘lsa, avval taqiqni yechish kerak.', sources: ['726-reglament, 5-ilova, 34-band'] });

  return {
    deadline: a.deathDate ? { label: '6 oylik muddat', fromLabel: 'Vafot', from: a.deathDate, until: addMonths(a.deathDate, 6), note: 'Muddat gazetadagi e’londan emas, vafot kunidan hisoblanadi.', sources: ['726-reglament, 5-ilova, 18-band'] } : null,
    notary: {
      rule: 'Meros ishi faqat meros ochilgan joydagi, ya’ni marhumning oxirgi doimiy yashash joyidagi notariusda yuritiladi. Boshqa okrugdagi notarius arizani rad etadi.',
      placeLabel: 'Meros ochilgan joy',
      place: a.place || 'Ko‘rsatilmagan',
      office: 'Shu hududdagi davlat yoki xususiy notarius',
      address: 'E-notarius.uz’da hudud bo‘yicha qidiring',
      sources: ['Qonun 50, 59-m.', 'Qonun 16-m.'],
    },
    documents: docs,
    warnings,
  };
}

function uyjoy(a) {
  const seller = a.role !== 'Xaridor';
  const sp = a.special || [];
  const docs = [{ id: 'd1', kind: 'pasport', title: 'Taraflarning pasporti yoki ID-kartasi', sources: ['726-reglament, 1-ilova'] }];
  if (seller) {
    docs.push({ id: 'd2', kind: 'mulk', title: 'Mulk huquqini tasdiqlovchi hujjat', note: 'Oldingi shartnoma, meros guvohnomasi yoki sud qarori', sources: ['726-reglament, 1-ilova'] });
    docs.push({ id: 'd3', kind: 'kadastr', title: 'Kadastr ma’lumotnomasi', sources: ['726-reglament, 1-ilova'] });
    if (a.propType === 'Ko‘p kvartirali uydagi xonadon') docs.push({ id: 'd4', kind: 'kadastr', title: 'Xonadon uchun kadastr xulosasi', note: 'Bo‘lmasa, bitim to‘xtatiladi', sources: ['726-reglament, 1-ilova'] });
    docs.push({ id: 'd5', kind: 'royxat', title: 'Yashash joyi bo‘yicha ro‘yxat ma’lumotnomasi', sources: ['726-reglament, 1-ilova'] });
    docs.push({ id: 'd6', title: 'Soliq, kommunal va MIB qarzi yo‘qligi', note: 'Ko‘pincha Tizimda tekshiriladi', sources: ['Yo‘riqnoma 28-band'] });
    if (a.married !== 'Yo‘q') docs.push({ id: 'd7', title: 'Turmush o‘rtog‘ining notarial tasdiqlangan roziligi', note: 'Nikoh shartnomasi yoki sud bo‘lishi bo‘lsa, kerak emas', sources: ['Yo‘riqnoma 29-band'] });
    if (has(sp, 'Mulk garovda (ipotekada)')) docs.push({ id: 'd8', title: 'Garovga oluvchining (bankning) roziligi', sources: ['Qonun 44-m.', 'Yo‘riqnoma 27-band'] });
    if (has(sp, 'Mulk ulushli')) docs.push({ id: 'd9', title: 'Ulushdorlarni yozma xabardor qilganlik isboti', sources: ['Yo‘riqnoma 30–35-band'] });
    if (has(sp, 'Egalardan biri voyaga yetmagan')) docs.push({ id: 'd10', title: 'Ota-ona yoki vasiylik organi roziligi', sources: ['Yo‘riqnoma 26-band'] });
  }
  if (has(sp, 'Taraflardan biri vakil orqali qatnashadi')) docs.push({ id: 'd11', kind: 'ishonchnoma', title: 'Notarial ishonchnoma (asl nusxasi)', note: 'Bekor qilinmaganligi Tizimda tekshiriladi', sources: ['Qonun 47-m.', '726-reglament, 4-ilova'] });

  const warnings = [
    { id: 'w1', title: 'Taqiq, xatlov yoki qarz bo‘lsa, bitim to‘xtatiladi', note: 'Notarius taqiq, garov va MIB qarzini Tizimda tekshiradi.', sources: ['Qonun 44-m.', 'Yo‘riqnoma 27–28-band'] },
    SIGN_WARNING,
    FORM_WARNING,
  ];
  if (has(sp, 'Mulk ulushli')) warnings.push({ id: 'w2', title: 'Ulushdorlar 1 oy ichida sotib olish huquqiga ega', note: 'Ular voz kechmaguncha yoki muddat o‘tmaguncha ulushni boshqaga sotib bo‘lmaydi.', sources: ['Yo‘riqnoma 30–35-band'] });
  if (!seller) warnings.push({ id: 'w3', title: 'Pulni to‘lash tartibini shartnomada yozing', note: 'To‘lov keyinroq bo‘lsa, shartnomadagi muddatgacha mulk boshqaga o‘tkazilmaydi.', sources: ['Yo‘riqnoma 28-band'] });

  return {
    deadline: null,
    notary: { rule: 'Ko‘chmas mulk bitimini istalgan notariusda tasdiqlatish mumkin. Shartnoma kamida 2 nusxada tuziladi, biri idorada qoladi.', ...ANY_NOTARY, sources: ['Qonun 16-m.', 'Qonun 48-m.'] },
    documents: docs,
    warnings,
  };
}

function avto(a) {
  const seller = a.role !== 'Xaridor';
  const docs = [{ id: 'd1', kind: 'pasport', title: 'Taraflarning pasporti yoki ID-kartasi', sources: ['726-reglament, 2-ilova'] }];
  if (seller) {
    docs.push({ id: 'd2', kind: 'texpasport', title: 'Texnik pasport (qayd etish guvohnomasi)', sources: ['726-reglament, 2-ilova'] });
    if (a.married !== 'Yo‘q') docs.push({ id: 'd3', title: 'Turmush o‘rtog‘ining notarial tasdiqlangan roziligi', sources: ['Yo‘riqnoma 29-band'] });
    if (a.pledge !== 'Yo‘q') docs.push({ id: 'd4', title: 'Garovga oluvchining roziligi', note: 'Garov bo‘lmasa, kerak emas', sources: ['726-reglament, 2-ilova'] });
  }
  if (a.proxy === 'Yo‘q, vakil orqali') docs.push({ id: 'd5', kind: 'ishonchnoma', title: 'Notarial ishonchnoma (asl nusxasi)', note: 'Sotish vakolati aniq yozilgan bo‘lsin', sources: ['Qonun 47-m.'] });
  return {
    deadline: null,
    notary: { rule: 'Avtomobil shartnomasini istalgan notariusda tasdiqlatish mumkin. Keyin avtomobil YHXX’da qayta ro‘yxatdan o‘tkaziladi.', ...ANY_NOTARY, sources: ['Qonun 16-m.', '726-reglament, 2-ilova'] },
    documents: docs,
    warnings: [
      { id: 'w1', title: 'Taqiq yoki MIB qarzi bo‘lsa, bitim tasdiqlanmaydi', note: 'Notarius taqiq, xatlov va ijro qarzini Tizimda tekshiradi.', sources: ['Yo‘riqnoma 27–28-band'] },
      SIGN_WARNING,
    ],
  };
}

function ishonchnoma(a) {
  const docs = [
    { id: 'd1', kind: 'pasport', title: 'Ishonch beruvchining pasporti yoki ID-kartasi', note: 'Ishonch beruvchi shaxsan keladi', sources: ['726-reglament, 4-ilova'] },
    { id: 'd2', title: 'Vakilning to‘liq F.I.Sh. va pasport ma’lumotlari', sources: ['Yo‘riqnoma 12-band'] },
  ];
  if (a.purpose === 'Ko‘chmas mulkni sotish') docs.push({ id: 'd3', kind: 'mulk', title: 'Mulk huquqi hujjati va kadastr ma’lumotlari', sources: ['726-reglament, 4-ilova'] });
  if (a.purpose === 'Avtomobilni boshqarish yoki sotish') docs.push({ id: 'd4', kind: 'texpasport', title: 'Avtomobil texnik pasporti', sources: ['726-reglament, 4-ilova'] });
  if (a.sub === 'Ha') docs.push({ id: 'd5', kind: 'ishonchnoma', title: 'Asosiy ishonchnoma (qayta ishonchnoma uchun)', sources: ['Qonun 47-m.'] });

  const warnings = [
    { id: 'w1', title: 'Bekor qilingan ishonchnoma bilan bitim qilinmaydi', note: 'Ishonchnoma holati Vakolat.uz va Tizimda ko‘rinadi.', sources: ['726-reglament, 4-ilova'] },
    { id: 'w2', title: 'Dublikat olish vakolatini alohida yozing', note: 'Aks holda vakil hujjat dublikatini ololmaydi.', sources: ['Yo‘riqnoma 18-band'] },
  ];
  if (a.purpose === 'Ko‘chmas mulkni sotish') warnings.unshift({ id: 'w3', title: 'Mulkni o‘tkazish uchun ishonchnoma elektron emas', note: 'U notarial tartibda tasdiqlanadi.', sources: ['Qonun 72-2-m.'] });
  if (a.purpose === 'Merosni qabul qilish') warnings.unshift({ id: 'w4', title: '«Merosni qabul qilish» vakolati alohida yozilsin', note: 'Bu vakolat yozilmasa, meros ishi bo‘yicha ishonchnoma qabul qilinmaydi.', sources: ['726-reglament, 5-ilova'] });
  if (a.abroad === 'Ha') warnings.push({ id: 'w5', title: 'Xorij uchun apostil yoki legalizatsiya kerak bo‘lishi mumkin', note: 'Tarjima ham talab qilinishi mumkin; qabul qiluvchi davlat talabini oldindan bilib oling.', sources: ['Qonun 88–93-m.'] });

  return {
    deadline: null,
    notary: { rule: 'Ishonchnomani istalgan notarius tasdiqlaydi. Hujjatlar to‘liq bo‘lsa, loyiha 30 daqiqada, tasdiqlash 15 daqiqada bajariladi.', ...ANY_NOTARY, sources: ['Qonun 16-m.', '726-reglament, 4-ilova'] },
    documents: docs,
    warnings,
  };
}

function vasiyatnoma(a) {
  const closed = a.kind === 'Yopiq';
  const docs = [{ id: 'd1', kind: 'pasport', title: 'Vasiyat qiluvchining pasporti yoki ID-kartasi', note: 'Faqat shaxsan, vakil orqali mumkin emas', sources: ['Qonun 45–46-m.'] }];
  if (closed) docs.push({ id: 'd2', title: 'O‘z qo‘lingiz bilan yozilgan va imzolangan vasiyat matni', note: 'Yopiq vasiyatnomada qo‘lda yozish majburiy', sources: ['Yo‘riqnoma 90-band'] });
  else docs.push({ id: 'd3', title: 'Vasiyat mazmuni: kimga va qaysi mulk', note: 'Matnni o‘zingiz yozasiz yoki notariusga aytib turasiz', sources: ['Yo‘riqnoma 87-band'] });
  docs.push({ id: 'd4', title: 'Guvohlar (xohishingizga ko‘ra)', sources: ['Yo‘riqnoma 89-band'] });

  const warnings = [
    { id: 'w1', title: 'Imzolash audio-video bilan yozib olinadi', note: 'Bu majburiy tartib.', sources: ['Yo‘riqnoma 88-band'] },
    { id: 'w2', title: 'Majburiy ulush huquqiga ega merosxo‘rlar ulush oladi', note: 'Vasiyatnomada ko‘rsatilmagan bo‘lsa ham.', sources: ['Qonun 61-m.'] },
    { id: 'w3', title: 'Vasiyatnomani keyin o‘zgartirish mumkin', note: 'Ariza beriladi, imzo notarial shahodatlanadi, reyestrga belgi qo‘yiladi.', sources: ['Qonun 46-m.'] },
  ];
  if (a.sign === 'Yo‘q') warnings.unshift({ id: 'w4', title: 'Imzolay olmasangiz, notariusga oldindan ayting', note: 'Topshirig‘ingiz bilan boshqa fuqaro imzolaydi; sabab hujjatda ko‘rsatiladi.', sources: ['Qonun 34-m.', 'Yo‘riqnoma 8-band'] });
  if (a.property === 'Yo‘q, kelajakda olinadi') warnings.push({ id: 'w5', title: 'Mulkka egalikni isbotlash shart emas', note: 'Kelajakda olinadigan mulkni ham vasiyat qilish mumkin.', sources: ['Qonun 45-m.'] });

  const home = String(a.visit || '').startsWith('Yo‘q');
  return {
    deadline: null,
    notary: home
      ? { rule: 'Og‘ir kasal yoki harakatlanishi qiyin shaxs uchun notarius uyga yoki kasalxonaga keladi. Yo‘l xarajatlari alohida to‘lanadi.', placeLabel: 'Qayerda', place: 'Uyda yoki kasalxonada', office: 'Istalgan notarius', address: 'Chaqiruvni oldindan kelishib oling', sources: ['Qonun 21, 30-m.'] }
      : { rule: 'Vasiyatnomani istalgan notarius tasdiqlaydi. U kamida 2 nusxada tuziladi, biri idorada saqlanadi.', ...ANY_NOTARY, sources: ['Qonun 16-m.', 'Qonun 48-m.'] },
    documents: docs,
    warnings,
  };
}

const BUILDERS = { meros, 'uy-joy': uyjoy, avto, ishonchnoma, vasiyatnoma };

export function buildPrepResult(situationId, answers = {}) {
  const b = BUILDERS[situationId];
  if (!b) return null;
  return b(answers || {});
}

// ---------- Bitim xavfi ----------

const RISK_FLAGS = {
  f1: { id: 'f1', level: 'high', title: 'Mulk 8 oy oldin meros orqali o‘tgan', note: 'Meros ishi yaqinda yopilgan. Ro‘yxatga kirmagan boshqa merosxo‘rlar keyinchalik ulush talab qilishi mumkin.', demand: 'Meros ishi raqami va barcha merosxo‘rlar ro‘yxatini so‘rang; ishni yuritgan notariusdan tasdiq oling.', sources: ['Qonun 50-m.', '726-reglament, 5-ilova'] },
  f2: { id: 'f2', level: 'mid', title: 'Sotuvchi ishonchnoma orqali harakat qilmoqda', note: 'Ishonchnoma bekor qilingan, muddati o‘tgan yoki sotish vakolatini bermasligi mumkin.', demand: 'Ishonchnoma asl nusxasini va uning Tizimdagi amaldaligini tekshiring; sotish va pul olish vakolati aniq yozilganini ko‘ring.', sources: ['726-reglament, 4-ilova'] },
  f3: { id: 'f3', level: 'mid', title: 'Egasi chet elda', note: 'Egasining o‘zi bitimda qatnashmaydi, uning irodasini bevosita tasdiqlash qiyin.', demand: 'Egasi bilan videokonferensaloqa orqali tasdiqlashni yoki konsullikda rasmiylashtirilgan hujjatni talab qiling.', sources: ['Yo‘riqnoma 81–82-band'] },
  f4: { id: 'f4', level: 'low', title: 'Turmush o‘rtog‘i roziligi kerak bo‘lishi mumkin', note: 'Mulk nikoh davrida olingan bo‘lsa, u er-xotinning umumiy mulki hisoblanadi.', demand: 'Sotuvchi turmush o‘rtog‘ining notarial tasdiqlangan yozma roziligini so‘rang.', sources: ['Yo‘riqnoma 29-band'] },
};

export function mockRisk(slots = []) {
  const sample = !slots.length;
  const timeline = [
    { owner: 'Namuna Egasi-1', basis: 'Oldi-sotdi shartnomasi', date: '12.03.2009', doc: 'Mulk huquqi hujjati' },
    { owner: 'Namuna Egasi-2', basis: 'Hadya shartnomasi', date: '05.07.2018', doc: 'Kadastr ko‘chirmasi' },
    { owner: 'Namuna Egasi-3', basis: 'Meros guvohnomasi', date: '20.03.2026', doc: 'Meros guvohnomasi', flag: 'high' },
    { owner: 'Namuna Vakil (sotuvchi nomidan)', basis: 'Ishonchnoma', date: '02.10.2026', doc: 'Ishonchnoma', flag: 'mid', current: true },
  ];
  const ids = sample ? ['f1', 'f2', 'f3', 'f4'] : [
    ...(slots.includes('meros') ? ['f1'] : []),
    ...(slots.includes('ishonchnoma') ? ['f2', 'f3'] : []),
    'f4',
  ];
  return {
    property: sample
      ? { title: 'Namuna kvartira', address: 'Namuna shahri, Misol ko‘chasi, 00-uy, 00-xonadon', cadastre: '00:00:00:00:00:0000 (namuna)' }
      : { title: 'Namuna tahlil (AI ulanmagan)', address: 'Yuklangan fayllar o‘qilmadi — natija namuna', cadastre: '—' },
    timeline: sample ? timeline : timeline.filter((t) => (t.flag === 'high' ? slots.includes('meros') : t.flag === 'mid' ? slots.includes('ishonchnoma') : true)),
    flags: ids.map((id) => RISK_FLAGS[id]),
    privacy: sample ? samplePrivacy() : null,
  };
}

function samplePrivacy() {
  const m = createMasker();
  m.mask(SAMPLE_DOC_TEXT);
  return { masked: { ...m.counts }, sentToAI: false, filesStored: false };
}

// ---------- Notarius kabineti ----------

export const CHANGES = [
  { id: 'c1', doc: 'Notarial harakatlar tartibi to‘g‘risida Yo‘riqnoma', clause: '22-band', source: 'Yo‘riqnoma 22-band', date: '01.11.2026 (namuna)', oldText: 'To‘lov kvitansiyasi notariusga taqdim etiladi.', newText: 'To‘lovdan keyin telefonga SMS-kod yuboriladi; harakat kod notariusga aytilgach bajariladi.' },
  { id: 'c2', doc: '726-son qaror, 5-ilova (meros guvohnomasi reglamenti)', clause: '23-band', source: '726-reglament, 5-ilova, 23-band', date: '15.10.2026 (namuna)', oldText: 'Ariza shaxsan topshiriladi.', newText: 'Ariza shaxsan yoki pochta orqali topshirilishi mumkin.' },
  { id: 'c3', doc: '«Notariat to‘g‘risida»gi Qonun', clause: '31-modda', source: 'Qonun 31-m.', date: '02.09.2026 (namuna)', oldText: 'Harakat manfaatdor shaxs arizasi bilan kechiktiriladi.', newText: 'Manfaatdor shaxs e’tirozi bo‘yicha harakat ko‘pi bilan bir oyga kechiktiriladi.' },
];

export const SUGGESTIONS = [
  'Merosxo‘r chet elda yashasa, ariza pochta orqali qabul qilinadimi?',
  'Merosxo‘rlardan biri voyaga yetmagan bo‘lsa, nima qilinadi?',
  'Sotuvchi og‘ir kasal bo‘lsa, harakat uyda bajariladimi?',
];

// Qisqa huquqiy baza: namuna rejimdagi qidiruv va LLM uchun kontekst.
export const CORPUS = [
  { text: 'Merosni qabul qilish va guvohnoma olish arizasi faqat yozma shaklda beriladi; og‘zaki murojaat meros ishini ochmaydi.', sources: ['Qonun 50, 58-m.'] },
  { text: 'Meros ishida merosni qabul qilish arizasi pochta orqali ham qabul qilinadi.', sources: ['726-reglament, 5-ilova, 23-band'] },
  { text: 'Meros ishi faqat meros ochilgan joydagi, ya’ni marhumning oxirgi doimiy yashash joyidagi notariusda yuritiladi.', sources: ['Qonun 50, 59-m.', 'Qonun 16-m.'] },
  { text: 'Meros guvohnomasi qoida tariqasida vafotdan 6 oy o‘tgach beriladi; 6 oy vafot kunidan hisoblanadi.', sources: ['726-reglament, 5-ilova, 18-band'] },
  { text: 'Merosdan voz kechish arizasi notarial tasdiqlanadi va keyin qaytarib olinmaydi; qisman yoki shart bilan voz kechib bo‘lmaydi.', sources: ['FK 1147-m.', '726-reglament, 5-ilova'] },
  { text: 'Merosxo‘rlar orasida voyaga yetmagan bo‘lsa, notarius vasiylik va homiylik organini xabardor qiladi.', sources: ['Qonun 59-m.'] },
  { text: 'Tirik qolgan turmush o‘rtog‘i yozma ariza bilan umumiy mulkning yarmiga egalik guvohnomasini oladi; ariza berilmasa ulush ajratilmaydi.', sources: ['Qonun 62–63-m.', 'Yo‘riqnoma 148-band'] },
  { text: 'Mulkda taqiq yoki xatlov bo‘lsa, ular olib tashlanmaguncha meros guvohnomasi berilmaydi.', sources: ['726-reglament, 5-ilova, 34-band'] },
  { text: 'Imzo faqat notarius ishtirokida qo‘yiladi va kamida ikki barmoq izi skanerlanadi.', sources: ['Yo‘riqnoma 8-band'] },
  { text: 'Imzolay olmaydigan shaxs topshirig‘i bilan boshqa fuqaro imzolaydi; sabab hujjatda ko‘rsatiladi va jarayon audio-video yozib olinadi.', sources: ['Qonun 34-m.', 'Yo‘riqnoma 8-band'] },
  { text: 'Og‘ir kasal yoki nogironligi bor shaxs uchun notarial harakat idoradan tashqarida — uyda yoki kasalxonada bajariladi; yo‘l xarajatlari alohida to‘lanadi.', sources: ['Qonun 21, 30-m.'] },
  { text: 'Er-xotinning umumiy ko‘chmas mulki yoki avtomobilini sotish uchun ikkinchi turmush o‘rtog‘ining notarial tasdiqlangan yozma roziligi kerak.', sources: ['Yo‘riqnoma 29-band'] },
  { text: 'Qalamda yozilgan, o‘chirilgan, izohsiz tuzatilgan, tikilmagan yoki raqamlanmagan hujjat qabul qilinmaydi.', sources: ['Qonun 35-m.', 'Yo‘riqnoma 9-band'] },
  { text: 'Summa va muddatlar raqam va so‘z bilan yoziladi; bo‘sh joylarga chiziq tortiladi.', sources: ['Yo‘riqnoma 12, 16-band'] },
  { text: 'Rad etish 3 kun ichida yozma qaror bilan beriladi va qarordan sudga shikoyat qilinadi.', sources: ['Qonun 38–39-m.', 'Yo‘riqnoma 21-band'] },
  { text: 'Manfaatdor shaxs e’tirozi bo‘yicha harakat ko‘pi bilan 1 oyga, sudga da’vo berish uchun bir marta 10 kungacha kechiktiriladi.', sources: ['Qonun 31-m.'] },
  { text: 'To‘lovdan keyin telefonga SMS-kod keladi; notarial harakat kod notariusga aytilgandan keyin bajariladi.', sources: ['Yo‘riqnoma 22-band'] },
  { text: 'Ishonchnoma bekor qilinmaganini notarius Vakolat.uz va Tizim orqali tekshiradi; vakolat beruvchi vafot etmaganini FHDY arxivida ko‘radi.', sources: ['726-reglament, 4-ilova'] },
  { text: 'Qayta ishonchnoma asosiy ishonchnoma taqdim etilganda beriladi va undagi vakolat hajmi va muddatidan oshmaydi.', sources: ['Qonun 47-m.'] },
  { text: 'Xorijda berilgan ishonchnoma bekor qilinguncha amal qiladi; apostil yoki konsullik legalizatsiyasi va tarjima kerak bo‘lishi mumkin.', sources: ['Qonun 88–93-m.'] },
  { text: 'Ayrim harakatlarda taraflar videokonferensaloqa orqali masofadan qatnashadi; har bir taraf imzosi va barmoq izini tizimda qayd etadi.', sources: ['Yo‘riqnoma 81–82-band'] },
  { text: 'Mulkda taqiq, xatlov yoki garov bo‘lsa, ko‘chmas mulk bitimi faqat kreditor roziligi bilan tasdiqlanadi.', sources: ['Qonun 44-m.', 'Yo‘riqnoma 27-band'] },
  { text: 'Ulushli mulkda ulushni sotishdan oldin boshqa ulushdorlar yozma xabardor qilinadi; ular 1 oy ichida sotib olmasa, boshqaga sotish mumkin.', sources: ['Yo‘riqnoma 30–35-band'] },
  { text: '14 yoshgacha bo‘lgan shaxs nomidan bitimni faqat ota-ona, farzandlikka oluvchi yoki vasiy qiladi; 14–18 yoshda o‘zi, ota-onaning yozma roziligi bilan.', sources: ['Yo‘riqnoma 26-band'] },
  { text: 'Vasiyatnoma faqat vasiyat qiluvchining o‘zi tomonidan rasmiylashtiriladi, vakil orqali mumkin emas; imzolash audio-video bilan yoziladi.', sources: ['Qonun 45–46-m.', 'Yo‘riqnoma 88-band'] },
  { text: 'Yopiq vasiyatnomani vasiyat qiluvchi o‘z qo‘li bilan yozishi va imzolashi shart.', sources: ['Yo‘riqnoma 90-band'] },
];

const stem = (w) => w.toLowerCase().replace(/[‘’'`ʻʼ]/g, '').slice(0, 5);
const tokens = (s) => String(s).toLowerCase().split(/[^a-zа-яё0-9‘’'ʻʼ]+/i).filter((w) => w.length > 3).map(stem);

// ---------- Shaxsiy ma’lumotni niqoblash (PII) ----------
// AI modelga yuborishdan oldin matndagi shaxsiy ma’lumot tokenga almashtiriladi,
// javob kelgach server tokenlarni asl qiymatga qaytaradi. Xarita saqlanmaydi.

export const SAMPLE_DOC_TEXT = `KADASTR KO‘CHIRMASI (NAMUNA)
Mulk egasi: Namunova Misol Namunovna
Pasport: AA0000000
JSHSHIR: 00000000000000
Telefon: +998 00 000 00 00
Kadastr raqami: 00:00:00:00:00:0000
O‘tish asosi: Meros guvohnomasi
Ro‘yxatga olingan sana: 20.03.2026
Cheklovlar: taqiq qayd etilmagan`;

export const PII_LABELS = { SHAXS: 'ism', PASPORT: 'pasport raqami', JSHSHIR: 'JSHSHIR', TELEFON: 'telefon', EMAIL: 'e-pochta', MANZIL: 'manzil' };

const AP = "[‘’'ʻʼ`]";
const UP = 'A-ZА-ЯЁЎҚҒҲ';
const LO = 'a-zа-яёўқғҳ';
const WORD = `[${UP}][${LO}]+(?:${AP}[${LO}]+)?`;
const SURN = `[${UP}][${LO}]+(?:ova|eva|yeva|ov|ev|yev|ова|ева|ина|ов|ев|ин)`;
const PATRO = `(?:\\s+(?:o${AP}g${AP}li|qizi|ўғли|қизи))`;
const PII_RULES = [
  { type: 'EMAIL', re: /[\w.+-]+@[\w-]+\.[\w.]+/gu },
  { type: 'SHAXS', label: true, re: new RegExp(`(F\\.?\\s?I\\.?\\s?Sh\\.?|Mulk egasi|Egasi|Sotuvchi|Xaridor|Merosxo${AP}r|Vakil|Ishonch beruvchi|Ishonchli vakil|Vasiyat qiluvchi|Familiyasi,? ismi(?:,? otasining ismi)?)(\\s*[:\\-–]\\s*)([^\\n;,]{3,80})`, 'giu') },
  { type: 'MANZIL', label: true, re: new RegExp(`(Manzil|Yashash joyi|Ro${AP}yxatda turgan joyi|Адрес)(\\s*[:\\-–]\\s*)([^\\n;]{5,120})`, 'giu') },
  { type: 'PASPORT', re: /(?<![A-Z0-9])[A-Z]{2}\s?\d{7}(?!\d)/gu },
  { type: 'JSHSHIR', re: /(?<!\d)\d{14}(?!\d)/gu },
  { type: 'TELEFON', re: /\+?998[\s-]?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)/gu },
  { type: 'SHAXS', re: new RegExp(`(?<!\\p{L})(?:${SURN}(?:\\s+${WORD}){1,2}${PATRO}?|${WORD}\\s+${WORD}${PATRO})(?!\\p{L})`, 'gu') },
];
const TOKEN_RE = /\[(SHAXS|PASPORT|JSHSHIR|TELEFON|EMAIL|MANZIL)_\d+\]/g;

export function createMasker() {
  const map = {}, rev = new Map(), counts = {};
  const tok = (type, value) => {
    const v = String(value).trim();
    if (!v || TOKEN_RE.test(v)) { TOKEN_RE.lastIndex = 0; return value; }
    if (rev.has(v)) return rev.get(v);
    counts[type] = (counts[type] || 0) + 1;
    const t = `[${type}_${counts[type]}]`;
    rev.set(v, t); map[t] = v;
    return t;
  };
  const mask = (text) => {
    let s = String(text || '');
    for (const r of PII_RULES) {
      s = r.label ? s.replace(r.re, (m, l, sep, v) => `${l}${sep}${tok(r.type, v)}`) : s.replace(r.re, (m) => tok(r.type, m));
    }
    return s;
  };
  const unmask = (x) => {
    if (typeof x === 'string') return x.replace(TOKEN_RE, (t) => map[t] ?? t);
    if (Array.isArray(x)) return x.map(unmask);
    if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, unmask(v)]));
    return x;
  };
  return { mask, unmask, counts };
}

export function privacySummary(p) {
  if (!p) return '';
  const parts = Object.entries(p.masked || {}).filter(([, n]) => n > 0).map(([k, n]) => `${n} ta ${PII_LABELS[k] || k}`);
  return parts.length ? `Niqoblandi: ${parts.join(', ')}.` : 'Hujjatlarda shaxsiy ma’lumot aniqlanmadi.';
}

// ---------- Hujjat va ariza tekshiruvi ----------

export const DOC_KINDS = [
  { kind: 'ariza', title: 'Ariza', re: /(?<![\p{L}])ariza(?![\p{L}])|заявлени/iu },
  { kind: 'kadastr', title: 'Kadastr hujjati', re: /kadastr|кадастр/iu },
  { kind: 'texpasport', title: 'Texnik pasport', re: /texnik pasport|texpasport|qayd etish guvohnomasi|техпаспорт/iu },
  { kind: 'olim', title: 'O‘lim guvohnomasi', re: /o[‘’'ʻ]?lim|vafot etganlik|смерти/iu },
  { kind: 'qarindosh', title: 'Tug‘ilganlik yoki nikoh guvohnomasi', re: /tug[‘’'ʻ]?ilganlik|nikoh|рождении|браке/iu },
  { kind: 'royxat', title: 'Ro‘yxat ma’lumotnomasi', re: /ro[‘’'ʻ]?yxat|uy daftari|прописк/iu },
  { kind: 'bank', title: 'Bank ma’lumotnomasi', re: /omonat|bank|вклад/iu },
  { kind: 'vasiyat', title: 'Vasiyatnoma', re: /vasiyat|завещани/iu },
  { kind: 'ishonchnoma', title: 'Ishonchnoma', re: /ishonchnoma|доверенност/iu },
  { kind: 'mulk', title: 'Mulk huquqi hujjati', re: /oldi-sotdi|hadya|meros guvohnoma|mulk huquqi/iu },
  { kind: 'pasport', title: 'Pasport yoki ID-karta', re: /pasport|id-karta|паспорт/iu },
];
const KIND_TITLE = Object.fromEntries(DOC_KINDS.map((d) => [d.kind, d.title]));

export function classifyDoc(text = '', name = '') {
  const head = String(text).slice(0, 400);
  const byText = DOC_KINDS.find((d) => d.re.test(head));
  if (byText) return byText.kind;
  const byName = DOC_KINDS.find((d) => d.re.test(String(name).replace(/[_.-]+/g, ' ')));
  return byName ? byName.kind : null;
}

const FIO_RE = new RegExp(`${SURN}\\s+${WORD}\\s+${WORD}|${WORD}\\s+${WORD}${PATRO}`, 'u');

// opts: { handwritten, corrections, engine }
export function checkApplication(text, situation, opts = {}) {
  const t = String(text || '');
  const out = [];
  const add = (id, title, status, note, sources = [], practice = false) => out.push({ id, title, status, note, sources, practice });
  if (t.replace(/\s/g, '').length < 60) {
    add('read', 'Matn o‘qildi', 'fail', 'Matn deyarli o‘qilmadi. Yorug‘ joyda, to‘g‘ri burchakda qayta suratga oling.');
  } else {
    const fio = FIO_RE.test(t);
    add('fio', 'F.I.Sh. to‘liq yozilgan', fio ? 'ok' : 'fail', fio ? 'Familiya, ism va otasining ismi topildi.' : 'Familiya, ism va otasining ismi to‘liq yozilmagan. Qisqartmasdan yozing.', ['Yo‘riqnoma 12-band']);
    const addr = /yashash joyi|manzil|ko[‘’'ʻ]chasi|mahalla|tumani|shahri|улиц|адрес/iu.test(t);
    add('addr', 'Yashash joyi ko‘rsatilgan', addr ? 'ok' : 'fail', addr ? 'Manzil topildi.' : 'Yashash joyingizni to‘liq yozing.', ['Yo‘riqnoma 12-band']);
    if (/\d[\d\s]{2,}\s*(so[‘’'ʻ]m|сум)/iu.test(t)) {
      const words = /(ming|million|milliard|yuz)\s/iu.test(t);
      add('sum', 'Summa so‘z bilan ham yozilgan', words ? 'ok' : 'fail', words ? 'Summa so‘z bilan takrorlangan.' : 'Summa faqat raqamda. Qavs ichida so‘z bilan ham yozing.', ['Qonun 35-m.', 'Yo‘riqnoma 12-band']);
    }
    if (situation === 'meros') {
      const goal = /meros\S*\s+qabul|guvohnoma\s+ber/iu.test(t);
      add('goal', 'Ariza maqsadi aniq yozilgan', goal ? 'ok' : 'fail', goal ? 'Merosni qabul qilish yoki guvohnoma so‘ralgan.' : '«Merosni qabul qilaman» yoki «guvohnoma berishingizni so‘rayman» deb aniq yozing.', ['Qonun 50, 58-m.']);
      const heirs = /merosxo[‘’'ʻ]?r/iu.test(t) && /farzand|o[‘’'ʻ]?g[‘’'ʻ]?li|qizi|turmush o[‘’'ʻ]?rtog|otasi|onasi|aka|uka|opa|singil/iu.test(t);
      add('heirs', 'Merosxo‘rlar doirasi ko‘rsatilgan', heirs ? 'ok' : 'fail', heirs ? 'Merosxo‘rlar va qarindoshlik darajasi topildi.' : 'Barcha merosxo‘rlarni va ularning marhumga qarindoshligini yozing.', ['Qonun 50, 58-m.', '726-reglament, 5-ilova, 23-band']);
      const death = /vafot|marhum|умер/iu.test(t) && /\d{1,2}[./]\d{1,2}[./]\d{4}/.test(t);
      add('death', 'Marhum va vafot sanasi ko‘rsatilgan', death ? 'ok' : 'fail', death ? 'Vafot fakti va sana topildi.' : 'Marhumning F.I.Sh. va vafot sanasini yozing.', ['726-reglament, 5-ilova']);
      if (/voz\s*kech/iu.test(t)) add('refuse', 'Arizada «voz kechish» bor', 'warn', 'Voz kechish notarial tasdiqlanadi va qaytarib olinmaydi. Niyatingiz shu ekanini tekshiring.', ['FK 1147-m.']);
    }
  }
  if (opts.engine === 'ocr-qolyozma') add('htr', 'Qo‘lyozma oddiy OCR bilan o‘qildi', 'manual', 'Qo‘lyozma uchun HTR model ulanmagan, natija noaniq bo‘lishi mumkin.');
  if (opts.handwritten && opts.corrections === true) add('fix', 'Izohsiz tuzatish yo‘q', 'fail', 'Matnda o‘chirilgan yoki ustidan yozilgan joy ko‘rindi. Izohsiz tuzatish qabul qilinmaydi — qayta yozing.', ['Yo‘riqnoma 9, 14-band']);
  else if (opts.handwritten && opts.corrections === false) add('fix', 'Izohsiz tuzatish yo‘q', 'ok', 'Tuzatish belgisi ko‘rinmadi. Notarius baribir ko‘zdan kechiradi.', ['Yo‘riqnoma 9, 14-band']);
  else add('fix', 'Izohsiz tuzatish yo‘q', 'manual', 'Avtomatik aniqlanmadi — notarius ko‘zdan kechiradi.', ['Yo‘riqnoma 9, 14-band']);
  add('pen', 'Qalam bilan yozilmagan', 'manual', 'Ruchka bilan yozing: qalamdagi hujjat qabul qilinmaydi.', ['Qonun 35-m.', 'Yo‘riqnoma 9-band']);
  add('sign', 'Imzo o‘z qo‘lingiz bilan', 'manual', 'Imzo notarius ishtirokida qo‘yiladi — oldindan imzolamang.', ['726-reglament, 5-ilova, 12-band', 'Yo‘riqnoma 8-band']);
  if (situation === 'meros' && !opts.handwritten) add('hand', 'Arizani qo‘lda yozish', 'manual', 'Ko‘p idoralar meros arizasini o‘z qo‘lingiz bilan yozdiradi. Bu idora amaliyoti, oldindan so‘rang.', [], true);
  return out;
}

// files: [{ name, text, handwritten, engine, corrections }]
export function buildCheck({ situation = 'meros', answers = {}, files = [] }) {
  const required = (buildPrepResult(situation, answers) || { documents: [] }).documents;
  const detected = files.map((f) => ({ name: f.name, kind: classifyDoc(f.text, f.name), handwritten: !!f.handwritten, engine: f.engine || 'ocr' }));
  const completeness = required.map((d) => {
    if (!d.kind) return { id: d.id, title: d.title, status: 'manual', file: '', note: 'Avtomatik aniqlanmaydi — notarius tekshiradi.', sources: d.sources || [] };
    const hit = detected.find((x) => x.kind === d.kind);
    return { id: d.id, title: d.title, status: hit ? 'ok' : 'fail', file: hit ? hit.name : '', note: hit ? '' : 'Yuklanmagan', sources: d.sources || [] };
  });
  const ai = detected.findIndex((d) => d.kind === 'ariza');
  const checks = ai >= 0 ? checkApplication(files[ai].text, situation, files[ai]) : [];
  return {
    situation,
    files: detected.map((d) => ({ ...d, kindTitle: KIND_TITLE[d.kind] || 'Turi aniqlanmadi' })),
    completeness,
    checks,
    notice: ai >= 0 ? '' : 'Ariza yuklanmadi — faqat hujjatlar to‘liqligi tekshirildi.',
  };
}

export const SAMPLE_ARIZA_TEXT = `Namuna tumani notariusiga
Namunova Misol Namunovnadan
yashash joyi: Namuna shahri, Misol ko‘chasi, 00-uy

ARIZA
Men, Namunova Misol Namunovna, 08.07.2026 da vafot etgan turmush o‘rtog‘im Namunov Sinov Misolovich ortidan qolgan merosni qabul qilaman va meros huquqi to‘g‘risida guvohnoma berishingizni so‘rayman.
Merosxo‘rlar: turmush o‘rtog‘i — Namunova Misol Namunovna; o‘g‘li — Namunov Tajriba Sinovovich.
21.11.2026`;

export function mockCheck(situation = 'meros', answers = {}, fileNames = [], handwritten = true) {
  if (fileNames.length) {
    const r = buildCheck({ situation, answers, files: fileNames.map((name) => ({ name, text: '', engine: 'namuna' })) });
    return { ...r, checks: [], notice: 'Server ulanmagan: hujjat turi fayl nomidan aniqlandi, ariza matni tekshirilmadi.', privacy: null };
  }
  const files = [
    { name: 'ariza_namuna.jpg', text: SAMPLE_ARIZA_TEXT, handwritten, engine: 'namuna', corrections: handwritten ? true : undefined },
    { name: 'olim_guvohnomasi_namuna.jpg', text: 'O‘LIM HAQIDA GUVOHNOMA (namuna)', engine: 'namuna' },
    { name: 'pasport_namuna.jpg', text: 'PASPORT (namuna)', engine: 'namuna' },
  ];
  const m = createMasker();
  files.forEach((f) => m.mask(f.text));
  return { ...buildCheck({ situation, answers, files }), sample: true, privacy: { masked: { ...m.counts }, sentToAI: false, filesStored: false } };
}

export function mockAnswer(question) {
  const q = new Set(tokens(question));
  const scored = CORPUS.map((r) => ({ r, s: tokens(r.text).filter((t) => q.has(t)).length })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  const top = scored.length ? scored[0].s : 0;
  scored.splice(0, scored.length, ...scored.filter((x) => x.s >= Math.max(1, top * 0.6)).slice(0, 3));
  if (!scored.length) {
    return { question, blocks: [{ text: 'Bu savol bo‘yicha bazadagi normalardan aniq javob topilmadi. Savolni boshqacha yozib ko‘ring yoki notarial palata bilan aniqlashtiring.', sources: [], practice: false }] };
  }
  return { question, blocks: scored.map(({ r }) => ({ text: r.text, sources: r.sources, practice: false })) };
}
