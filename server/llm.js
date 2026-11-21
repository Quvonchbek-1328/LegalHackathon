// AI qatlami. Modelga faqat niqoblangan matn yuboriladi (asl fayl yoki rasm emas).
// ANTHROPIC_API_KEY bo‘lmasa, server namuna rejimda ishlaydi.
import { CORPUS, createMasker } from '../legalcheck-core.js';

const KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.LC_MODEL || 'claude-sonnet-4-5';
const LEVELS = new Set(['high', 'mid', 'low']);
const MAX_DOC_CHARS = 15000;

export const llmEnabled = () => !!KEY;

const CORPUS_TXT = CORPUS.map((r, i) => `[${i + 1}] ${r.text}\n    manba: ${r.sources.map((s) => `"${s}"`).join(', ')}`).join('\n');
const ALLOWED = new Set(CORPUS.flatMap((r) => r.sources));
const cleanSources = (arr) => (Array.isArray(arr) ? arr.filter((s) => typeof s === 'string' && ALLOWED.has(s)) : []);
const str = (v, max = 600) => String(v ?? '').trim().slice(0, max);

const BASE_RULES = `Sen LegalCheck AI — O‘zbekiston notariat amaliyoti bo‘yicha tahlil yordamchisisan.
Qoidalar:
- Faqat o‘zbek tilida (lotin yozuvi) yoz.
- Faqat quyidagi normalar bazasiga tayan. "sources" maydoniga bazadagi manba satrini AYNAN ko‘chir.
- Bazada yo‘q, amaliyotdan ma’lum ma’lumotni "practice": true bilan belgila va manba qo‘yma.
- Foiz, ehtimollik, statistika yoki o‘ylab topilgan raqam yozma.
- Matnda [SHAXS_1], [PASPORT_1] kabi tokenlar bor — bu niqoblangan shaxsiy ma’lumot. Tokenni o‘zgartirmasdan ko‘chir, asl qiymatini taxmin qilma.
- Faqat JSON qaytar, boshqa matn yozma.

NORMALAR BAZASI:
${CORPUS_TXT}`;

async function call(system, text, maxTokens = 2500) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: 'user', content: [{ type: 'text', text }] }] }),
  });
  if (!r.ok) throw Object.assign(new Error(`AI xizmati javob bermadi (${r.status})`), { status: 502 });
  const j = await r.json();
  const out = (j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  const s = out.indexOf('{'), e = out.lastIndexOf('}');
  if (s < 0 || e < s) throw Object.assign(new Error('AI javobini o‘qib bo‘lmadi'), { status: 502 });
  return JSON.parse(out.slice(s, e + 1));
}

export async function askLLM(question) {
  const m = createMasker();
  const out = await call(
    `${BASE_RULES}\n\nJavob formati: {"blocks":[{"text":"...","sources":["..."],"practice":false}]} — 2–5 ta qisqa blok, har biri bitta da’vo.`,
    `Notariusning savoli: ${m.mask(question)}`,
    1500
  );
  const blocks = (Array.isArray(out.blocks) ? out.blocks : []).slice(0, 6).map((b) => {
    const sources = cleanSources(b.sources);
    return { text: m.unmask(str(b.text, 800)), sources, practice: !!b.practice || !sources.length };
  }).filter((b) => b.text);
  if (!blocks.length) blocks.push({ text: 'Bu savol bo‘yicha bazadagi normalardan aniq javob topilmadi.', sources: [], practice: false });
  return { question, blocks };
}

// docs: [{ title, text }] — text allaqachon niqoblangan
export async function analyzeRiskLLM(docs, role) {
  const today = new Date().toISOString().slice(0, 10);
  const body = docs.map((d) => `=== ${d.title} ===\n${String(d.text).slice(0, MAX_DOC_CHARS)}`).join('\n\n');
  const out = await call(BASE_RULES, `Quyida OCR orqali o‘qilgan va niqoblangan hujjatlar matni.
Tekshiruvchi: ${role}. Bugungi sana: ${today}.

${body}

Vazifa:
1) Mulk ma’lumoti: nomi (masalan "3 xonali kvartira"), manzil, kadastr raqami — matnda bo‘lmasa "—".
2) Mulk tarixi: egalar ketma-ketligi eskidan yangiga; har birida ega, o‘tish asosi, sana (KK.OO.YYYY), qaysi hujjatdan olingani. Oxirgisiga "current": true.
3) Qizil bayroqlar: level "high" | "mid" | "low", qisqa sarlavha, izoh, "demand" — xaridor nimani talab qilishi kerak, sources — faqat bazadan.
Bayroqqa bog‘liq tarix yozuviga "flag" maydonida o‘sha darajani qo‘y.
Format: {"property":{"title":"","address":"","cadastre":""},"timeline":[{"owner":"","basis":"","date":"","doc":"","flag":null,"current":false}],"flags":[{"level":"","title":"","note":"","demand":"","sources":[]}]}`, 3000);

  const p = out.property || {};
  return {
    property: { title: str(p.title, 120) || 'Mulk', address: str(p.address, 200) || '—', cadastre: str(p.cadastre, 60) || '—' },
    timeline: (Array.isArray(out.timeline) ? out.timeline : []).slice(0, 20).map((t) => ({
      owner: str(t.owner, 120), basis: str(t.basis, 120), date: str(t.date, 20), doc: str(t.doc, 80),
      flag: LEVELS.has(t.flag) ? t.flag : null, current: !!t.current,
    })),
    flags: (Array.isArray(out.flags) ? out.flags : []).filter((f) => LEVELS.has(f.level)).slice(0, 12).map((f, i) => ({
      id: `f${i + 1}`, level: f.level, title: str(f.title, 160), note: str(f.note), demand: str(f.demand), sources: cleanSources(f.sources),
    })),
  };
}
