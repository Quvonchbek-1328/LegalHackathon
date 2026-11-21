export const apiConfig = {
  /** Bo‘sh — shu domen (/api, next.config rewrites orqali Express backendga) */
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || '',
  /** Backend AI/RAG endpointlari tayyor bo‘lmaguncha demo adapter ishlatiladi */
  demoMode: (process.env.NEXT_PUBLIC_DEMO_MODE ?? '1') === '1',
  timeoutMs: 60_000,
};
