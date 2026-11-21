// Qo‘lyozmani o‘qish (HTR).
// HTR_BASE_URL berilsa — o‘z serveringizdagi vision model (Ollama, vLLM: OpenAI-mos API), rasm tashqariga chiqmaydi.
// Aks holda ANTHROPIC_API_KEY bo‘lsa — foydalanuvchi roziligi bilan tashqi AI modeli.
// Ikkalasi ham bo‘lmasa — oddiy OCR (qo‘lyozmada noaniq).
import { extractText } from './ocr.js';

const BASE = (process.env.HTR_BASE_URL || '').replace(/\/$/, '');
const MODEL = process.env.HTR_MODEL || 'qwen2.5vl:7b';
const AKEY = process.env.ANTHROPIC_API_KEY || '';
const AMODEL = process.env.LC_MODEL || 'claude-sonnet-4-5';

export const htrMode = () => (BASE ? 'local' : AKEY ? 'ai' : 'ocr');

const PROMPT = `Rasmda qo‘lda yozilgan hujjat. Matnni so‘zma-so‘z, qanday yozilgan bo‘lsa shunday ko‘chir (o‘zbek lotin, kirill yoki rus). Tuzatma, tarjima qilma, qo‘shimcha izoh yozma.
Faqat JSON qaytar: {"text":"...","corrections":true|false}
corrections — matnda o‘chirilgan, ustidan yozilgan yoki chizib tashlangan joy bormi.`;

function parse(out) {
  const s = out.indexOf('{'), e = out.lastIndexOf('}');
  if (s < 0 || e < s) return { text: out, corrections: undefined };
  try { const j = JSON.parse(out.slice(s, e + 1)); return { text: String(j.text || ''), corrections: typeof j.corrections === 'boolean' ? j.corrections : undefined }; }
  catch (err) { return { text: out, corrections: undefined }; }
}

export async function readHandwriting(file, { consent }) {
  const mode = htrMode();
  const b64 = file.buffer.toString('base64');
  if (mode === 'local') {
    const r = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(process.env.HTR_API_KEY ? { authorization: `Bearer ${process.env.HTR_API_KEY}` } : {}) },
      body: JSON.stringify({ model: MODEL, temperature: 0, messages: [{ role: 'user', content: [{ type: 'text', text: PROMPT }, { type: 'image_url', image_url: { url: `data:${file.mimetype};base64,${b64}` } }] }] }),
    });
    if (!r.ok) throw Object.assign(new Error(`HTR model javob bermadi (${r.status})`), { status: 502 });
    const j = await r.json();
    return { ...parse(j.choices?.[0]?.message?.content || ''), engine: 'htr-local', external: false };
  }
  if (mode === 'ai') {
    if (!consent) throw Object.assign(new Error('Qo‘lyozmani AI modeliga yuborish uchun rozilik kerak'), { status: 412 });
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': AKEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: AMODEL, max_tokens: 2000, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: file.mimetype, data: b64 } }, { type: 'text', text: PROMPT }] }] }),
    });
    if (!r.ok) throw Object.assign(new Error(`AI xizmati javob bermadi (${r.status})`), { status: 502 });
    const j = await r.json();
    return { ...parse((j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('')), engine: 'htr-ai', external: true };
  }
  return { text: await extractText(file), corrections: undefined, engine: 'ocr-qolyozma', external: false };
}
