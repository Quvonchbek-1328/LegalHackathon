import { http } from './http';
import type { DocumentClause, DocumentKind, ExtractedEntity } from './types';

// LLM provayder qatlami. Server tomonda PII niqoblanadi, modelga faqat tokenlangan matn ketadi.
// Backend: POST /api/llm/understand
export interface UnderstandResult {
  kind: DocumentKind;
  summary: string;
  entities: ExtractedEntity[];
  clauses: DocumentClause[];
}

export const llmService = {
  understand(text: string) {
    return http<UnderstandResult>('/api/llm/understand', { method: 'POST', body: JSON.stringify({ text }) });
  },
};
