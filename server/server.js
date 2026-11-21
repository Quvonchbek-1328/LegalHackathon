import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as core from '../legalcheck-core.js';
import { verifyInitData, setMenuButton } from './telegram.js';
import { llmEnabled, askLLM, analyzeRiskLLM } from './llm.js';
import { extractText } from './ocr.js';
import { htrMode, readHandwriting } from './htr.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT || 3000);
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const REQUIRE_TG = process.env.REQUIRE_TELEGRAM === '1';
const PUBLIC_URL = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
const MAX_MB = Number(process.env.MAX_FILE_MB || 15);
const SLOTS = ['kadastr', 'mulk', 'meros', 'ishonchnoma'];
const SLOT_TITLES = { kadastr: 'Kadastr ko‘chirmasi', mulk: 'Mulk huquqi hujjati', meros: 'Meros guvohnomasi', ishonchnoma: 'Ishonchnoma' };
const MIME = new Set(['application/pdf', 'image/jpeg', 'image/png']);

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true }));
app.use(express.json({ limit: '1mb' }));

const fail = (res, status, message) => res.status(status).json({ error: { message } });

// Telegram Mini App autentifikatsiyasi
app.use('/api', (req, res, next) => {
  const init = req.get('X-Telegram-Init-Data');
  if (init && BOT_TOKEN) {
    const v = verifyInitData(init, BOT_TOKEN);
    if (!v) return fail(res, 401, 'Telegram autentifikatsiyasi tasdiqlanmadi');
    req.tgUser = v.user;
  } else if (REQUIRE_TG && req.path !== '/health') {
    return fail(res, 401, 'Faqat Telegram orqali ochiladi');
  }
  next();
});

app.get('/api/health', (req, res) => res.json({ ok: true, llm: llmEnabled(), telegram: !!BOT_TOKEN, htr: htrMode() }));

app.get('/api/situations', (req, res) => res.json(core.SITUATIONS));

app.get('/api/prep/:id/questions', (req, res) => {
  const q = core.QUESTIONS[req.params.id];
  if (!q) return fail(res, 404, 'Bunday vaziyat yo‘q');
  res.json(q);
});

app.post('/api/prep/:id/result', (req, res) => {
  const answers = req.body && typeof req.body.answers === 'object' ? req.body.answers : null;
  if (!answers) return fail(res, 400, '«answers» obyekti kerak');
  const r = core.buildPrepResult(req.params.id, answers);
  if (!r) return fail(res, 404, 'Bunday vaziyat yo‘q');
  res.json(r);
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024, files: SLOTS.length },
  fileFilter: (req, file, cb) => (MIME.has(file.mimetype) ? cb(null, true) : cb(Object.assign(new Error('Faqat PDF, JPG yoki PNG'), { status: 415 }))),
}).fields(SLOTS.map((name) => ({ name, maxCount: 1 })));

app.post('/api/risk/analyze', upload, async (req, res, next) => {
  try {
    const files = SLOTS.flatMap((k) => (req.files && req.files[k] ? [{ slot: k, title: SLOT_TITLES[k], ...req.files[k][0] }] : []));
    const role = ['Xaridor', 'Rieltor', 'Bank'].includes(req.body.role) ? req.body.role : 'Xaridor';
    if (!files.length) return res.json(core.mockRisk([]));
    // 1) OCR  2) PII niqoblash  3) AI faqat niqoblangan matnni ko‘radi  4) serverda tiklash
    const masker = core.createMasker();
    const docs = [];
    for (const f of files) {
      const text = await extractText(f);
      f.buffer = null;
      docs.push({ slot: f.slot, title: f.title, text: masker.mask(text) });
    }
    const privacy = { masked: { ...masker.counts }, sentToAI: llmEnabled(), filesStored: false };
    if (!llmEnabled()) return res.set('X-LC-Mock', '1').json({ ...core.mockRisk(files.map((f) => f.slot)), privacy });
    const raw = await analyzeRiskLLM(docs, role);
    res.json({ ...masker.unmask(raw), privacy });
  } catch (e) { next(e); }
});

// TODO: ishlab chiqarishda bazadan (LexUZ monitoringi) o‘qing

// Hujjat va ariza tekshiruvi: to‘liqlik + ariza talablari (band bo‘yicha)
const uploadCheck = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => (MIME.has(file.mimetype) ? cb(null, true) : cb(Object.assign(new Error('Faqat PDF, JPG yoki PNG'), { status: 415 }))),
}).array('files', 10);

app.post('/api/check', uploadCheck, async (req, res, next) => {
  try {
    const situation = core.QUESTIONS[req.body.situation] ? req.body.situation : 'meros';
    let answers = {};
    try { answers = JSON.parse(req.body.answers || '{}'); } catch (e) {}
    const handwritten = req.body.handwritten === '1';
    const consent = req.body.consent === '1';
    const files = req.files || [];
    if (!files.length) return res.json(core.mockCheck(situation, answers, [], handwritten));
    const masker = core.createMasker();
    const read = [];
    let sentToAI = false;
    for (const f of files) {
      const img = f.mimetype !== 'application/pdf';
      const file = { ...f, title: f.originalname };
      const r = handwritten && img ? await readHandwriting(file, { consent }) : { text: await extractText(file), engine: 'ocr' };
      if (r.external) sentToAI = true;
      masker.mask(r.text);
      read.push({ name: f.originalname, text: r.text, handwritten: handwritten && img, engine: r.engine, corrections: r.corrections });
      f.buffer = null;
    }
    res.json({ ...core.buildCheck({ situation, answers, files: read }), privacy: { masked: { ...masker.counts }, sentToAI, filesStored: false } });
  } catch (e) { next(e); }
});
app.get('/api/notary/changes', (req, res) => res.json(core.CHANGES));
app.get('/api/notary/suggestions', (req, res) => res.json(core.SUGGESTIONS));

app.post('/api/notary/ask', async (req, res, next) => {
  try {
    const question = String((req.body && req.body.question) || '').trim().slice(0, 2000);
    if (!question) return fail(res, 400, 'Savol matni bo‘sh');
    res.json(llmEnabled() ? await askLLM(question) : core.mockAnswer(question));
  } catch (e) { next(e); }
});

app.use('/api', (req, res) => fail(res, 404, 'Endpoint topilmadi'));

// Frontend (statik)
app.use((req, res, next) => {
  if (/^\/(server|node_modules|uploads)(\/|$)|^\/\.env|^\/package(-lock)?\.json$/.test(req.path)) return res.status(404).end();
  next();
});
app.get('/', (req, res) => res.redirect('/LegalCheckLanding.dc.html'));
app.use(express.static(ROOT, { extensions: ['html'] }));

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return fail(res, 413, `Fayl hajmi ${MAX_MB} MB dan oshmasin`);
  if (err.status) return fail(res, err.status, err.message);
  console.error(err);
  fail(res, 500, 'Ichki xatolik. Keyinroq urinib ko‘ring.');
});

app.listen(PORT, () => {
  console.log(`LegalCheck AI: http://localhost:${PORT}  (AI: ${llmEnabled() ? 'ulangan' : 'namuna rejim'}, Telegram: ${BOT_TOKEN ? 'ha' : 'yo‘q'})`);
  if (BOT_TOKEN && PUBLIC_URL) setMenuButton(BOT_TOKEN, `${PUBLIC_URL}/LegalCheckMiniApp.dc.html`).catch((e) => console.warn('Menu button:', e.message));
});
