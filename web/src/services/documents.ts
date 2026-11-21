import { DEMO_DOCUMENTS } from '@/data/demo';
import { apiConfig } from './config';
import { delay, http } from './http';
import { storage } from './storage';
import type { DocumentKind, DocumentRecord } from './types';

// Hujjatlar servisi. Backend: GET /api/documents, POST /api/documents (multipart), DELETE /api/documents/:id
export const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
} as const;

export const ACCEPT_ATTR = Object.values(ACCEPTED_TYPES).flat().join(',');

export function isAcceptedFile(f: File) {
  const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
  return Object.values(ACCEPTED_TYPES).some((exts) => (exts as readonly string[]).includes(ext));
}

export const documentsService = {
  async list(): Promise<DocumentRecord[]> {
    if (apiConfig.demoMode) {
      await delay(250);
      return [...storage.get<DocumentRecord[]>('documents', []), ...DEMO_DOCUMENTS];
    }
    return http<DocumentRecord[]>('/api/documents');
  },

  async upload(file: File, kind: DocumentKind): Promise<DocumentRecord> {
    if (apiConfig.demoMode) {
      await delay(400);
      const rec: DocumentRecord = {
        id: `doc-${Date.now()}`, name: file.name, kind, sizeBytes: file.size,
        uploadedAt: new Date().toISOString(), status: 'processing',
      };
      storage.set('documents', [rec, ...storage.get<DocumentRecord[]>('documents', [])]);
      return rec;
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('kind', kind);
    return http<DocumentRecord>('/api/documents', { method: 'POST', body: fd });
  },

  markCompleted(id: string, analysisId: string, counts: DocumentRecord['counts']) {
    if (!apiConfig.demoMode) return;
    const docs = storage.get<DocumentRecord[]>('documents', []).map((d) =>
      d.id === id ? { ...d, status: 'completed' as const, analysisId, counts } : d,
    );
    storage.set('documents', docs);
  },
};
