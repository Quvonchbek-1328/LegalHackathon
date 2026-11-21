// Frontend va kelajakdagi backend o‘rtasidagi domen turlari.
// Backend shu shakldagi JSON qaytarsa, UI o‘zgarishsiz ishlaydi.

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type DocumentKind =
  | 'contract'
  | 'notarial'
  | 'application'
  | 'property'
  | 'corporate'
  | 'policy'
  | 'other';

export type AnalysisStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface LegalSource {
  /** Normativ hujjat nomi, masalan: "Fuqarolik kodeksi" */
  act: string;
  /** Modda yoki band — faqat tekshirilgan bo‘lsa ko‘rsatiladi */
  article?: string;
  /** Manba Legal RAG tomonidan rasmiy matn bilan tasdiqlanganmi */
  verified: boolean;
  url?: string;
}

export interface Finding {
  id: string;
  level: RiskLevel;
  title: string;
  explanation: string;
  recommendation: string;
  /** Hujjatdagi tegishli band identifikatori (preview’da ajratib ko‘rsatish uchun) */
  clauseId?: string;
  sources: LegalSource[];
  category: 'risk' | 'missing' | 'conflict' | 'info';
}

export interface DocumentClause {
  id: string;
  page: number;
  heading?: string;
  text: string;
}

export interface ExtractedEntity {
  label: string;
  value: string;
}

export interface Analysis {
  id: string;
  documentId: string;
  documentName: string;
  documentKind: DocumentKind;
  status: AnalysisStatus;
  createdAt: string;
  pages: number;
  summary: string;
  entities: ExtractedEntity[];
  clauses: DocumentClause[];
  findings: Finding[];
  /** true — bu demo ma’lumot, haqiqiy huquqiy tekshiruv emas */
  demo: boolean;
}

export interface DocumentRecord {
  id: string;
  name: string;
  kind: DocumentKind;
  sizeBytes: number;
  uploadedAt: string;
  status: AnalysisStatus;
  analysisId?: string;
  counts?: Partial<Record<RiskLevel, number>>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanId;
}

export type PlanId = 'free' | 'pro' | 'enterprise';

export interface PlanConfig {
  id: PlanId;
  /** null — maxsus narx */
  priceUsd: number | null;
  /** null — cheklanmagan / kelishiladi */
  monthlyDocuments: number | null;
  maxFileMb: number;
  features: {
    advancedAnalysis: boolean;
    pdfExport: boolean;
    history: boolean;
    teamAccess: boolean;
    api: boolean;
    onPremise: boolean;
  };
  recommended?: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}
