import { http } from './http';
import type { DocumentClause, DocumentKind, Finding } from './types';

// Legal RAG: bandlarni O‘zbekiston qonunchiligi (rasmiy matnlar) bilan solishtiradi.
// Har bir topilma manbasi `verified` bayrog‘i bilan qaytadi. Backend: POST /api/legal/verify
export const legalRagService = {
  verify(kind: DocumentKind, clauses: DocumentClause[]) {
    return http<{ findings: Finding[] }>('/api/legal/verify', { method: 'POST', body: JSON.stringify({ kind, clauses }) });
  },
};
