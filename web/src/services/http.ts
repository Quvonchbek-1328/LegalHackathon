import { apiConfig } from './config';
import type { ApiError } from './types';

export class HttpError extends Error implements ApiError {
  constructor(message: string, public status: number) {
    super(message);
  }
}

let authToken: string | null = null;
export const setAuthToken = (t: string | null) => {
  authToken = t;
};

/** Barcha backend so‘rovlari shu yerdan o‘tadi: baza URL, token, timeout va xato formati. */
export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), apiConfig.timeoutMs);
  const headers = new Headers(init.headers);
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  try {
    const res = await fetch(`${apiConfig.baseUrl}${path}`, { ...init, headers, signal: ctrl.signal });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      // Backend formati: { error: { message } }
      throw new HttpError(data?.error?.message || `So‘rov bajarilmadi (${res.status})`, res.status);
    }
    return data as T;
  } catch (e) {
    if (e instanceof HttpError) throw e;
    if ((e as Error).name === 'AbortError') throw new HttpError('Server javob bermadi. Qayta urinib ko‘ring.', 408);
    throw new HttpError('Server bilan aloqa yo‘q. Internetni tekshiring.', 0);
  } finally {
    clearTimeout(timer);
  }
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
