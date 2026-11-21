import { DEMO_ANALYSIS } from '@/data/demo';
import { apiConfig } from './config';
import { delay, http } from './http';
import { storage } from './storage';
import type { Analysis, DocumentRecord, RiskLevel } from './types';

export type AnalysisStage = 'upload' | 'ocr' | 'understand' | 'verify' | 'report';
export const STAGES: AnalysisStage[] = ['upload', 'ocr', 'understand', 'verify', 'report'];

/**
 * Tahlil oqimi: yuklash → OCR → LLM tushunish → Legal RAG tekshiruv → hisobot.
 * Real rejimda butun oqim backendda bajariladi: POST /api/analyses { documentId } → Analysis,
 * holat GET /api/analyses/:id orqali kuzatiladi.
 */
export const analysisService = {
  async run(doc: DocumentRecord, onStage: (s: AnalysisStage) => void): Promise<Analysis> {
    if (apiConfig.demoMode) {
      for (const s of STAGES) {
        onStage(s);
        await delay(s === 'verify' ? 1500 : 1000);
      }
      // Demo: foydalanuvchi faylidan qat’i nazar namuna natija qaytariladi va aniq belgilanadi.
      const result: Analysis = { ...DEMO_ANALYSIS, id: `demo-${doc.id}`, documentId: doc.id, documentName: doc.name, documentKind: doc.kind, createdAt: new Date().toISOString() };
      storage.set('analyses', { ...storage.get<Record<string, Analysis>>('analyses', {}), [result.id]: result });
      return result;
    }
    onStage('upload');
    const created = await http<Analysis>('/api/analyses', { method: 'POST', body: JSON.stringify({ documentId: doc.id }) });
    let a = created;
    while (a.status === 'queued' || a.status === 'processing') {
      await delay(1500);
      a = await http<Analysis>(`/api/analyses/${created.id}`);
      onStage(a.status === 'queued' ? 'ocr' : 'verify');
    }
    onStage('report');
    return a;
  },

  async get(id: string): Promise<Analysis> {
    if (apiConfig.demoMode) {
      await delay(300);
      return storage.get<Record<string, Analysis>>('analyses', {})[id] || { ...DEMO_ANALYSIS, id };
    }
    return http<Analysis>(`/api/analyses/${id}`);
  },
};

export function countByLevel(a: Analysis): Partial<Record<RiskLevel, number>> {
  return a.findings.reduce<Partial<Record<RiskLevel, number>>>((acc, f) => {
    acc[f.level] = (acc[f.level] || 0) + 1;
    return acc;
  }, {});
}
