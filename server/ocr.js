// Hujjatdan matn olish. Fayl xotirada qayta ishlanadi, diskka yozilmaydi.
import { createWorker } from 'tesseract.js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const LANGS = (process.env.OCR_LANGS || 'uzb+uzb_cyrl+rus+eng').split('+');
let workerP;

function worker() {
  if (!workerP) workerP = createWorker(LANGS).catch((e) => { workerP = null; throw e; });
  return workerP;
}

export async function extractText(file) {
  if (file.mimetype === 'application/pdf') {
    const { text } = await pdfParse(file.buffer);
    if (String(text).replace(/\s/g, '').length < 40) {
      throw Object.assign(new Error(`«${file.title}»: skaner qilingan PDF. Sahifani JPG yoki PNG rasm qilib yuklang.`), { status: 422 });
    }
    return text;
  }
  const w = await worker();
  const { data } = await w.recognize(file.buffer);
  return data.text || '';
}
