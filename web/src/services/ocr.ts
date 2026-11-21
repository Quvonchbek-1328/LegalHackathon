import { http } from './http';

// OCR servisi: bosma matn (tesseract) va qo‘lyozma (HTR). Backend: POST /api/ocr (multipart)
export interface OcrResult {
  text: string;
  pages: number;
  engine: 'ocr' | 'htr-local' | 'htr-ai';
  handwritten: boolean;
}

export const ocrService = {
  extract(file: File, opts: { handwritten?: boolean; consent?: boolean } = {}) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('handwritten', opts.handwritten ? '1' : '0');
    fd.append('consent', opts.consent ? '1' : '0');
    return http<OcrResult>('/api/ocr', { method: 'POST', body: fd });
  },
};
