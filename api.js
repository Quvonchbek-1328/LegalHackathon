// LegalCheck AI frontend API client.
// Backend manzili: ?api=https://... , window.LEGALCHECK_API_BASE yoki config.js.
// Ko‘rsatilmasa, shu domendagi /api/health tekshiriladi; javob bo‘lmasa — namuna (mock) rejim.
// Shartnoma: API.md
import * as core from './legalcheck-core.js';
import { API_BASE as CONFIG_BASE } from './config.js';

let basePromise;

function explicitBase() {
  try { const q = new URLSearchParams(location.search).get('api'); if (q) return q.replace(/\/$/, ''); } catch (e) {}
  return (window.LEGALCHECK_API_BASE || CONFIG_BASE || '').replace(/\/$/, '');
}

function resolveBase() {
  if (basePromise) return basePromise;
  basePromise = (async () => {
    const ex = explicitBase();
    if (ex) return ex;
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 1500);
      const r = await fetch('/api/health', { signal: ctl.signal });
      clearTimeout(t);
      if (r.ok && (r.headers.get('content-type') || '').includes('json') && (await r.json()).ok) return '';
    } catch (e) {}
    console.info('[LegalCheck AI] Backend topilmadi — namuna rejim.');
    return null;
  })();
  return basePromise;
}

export async function getMode() { return (await resolveBase()) === null ? 'mock' : 'live'; }

export async function getHealth() {
  return (await req('/api/health')) ?? { ok: true, mode: 'mock', htr: 'mock' };
}

// files: File[]; meta: { situation, answers, handwritten, consent }
export async function checkDocuments(files, meta = {}) {
  const list = (files || []).filter((f) => f instanceof File);
  const form = new FormData();
  list.forEach((f) => form.append('files', f));
  form.append('situation', meta.situation || 'meros');
  form.append('answers', JSON.stringify(meta.answers || {}));
  form.append('handwritten', meta.handwritten ? '1' : '0');
  form.append('consent', meta.consent ? '1' : '0');
  const res = await req('/api/check', { method: 'POST', form });
  if (res !== undefined) return res;
  await wait(900);
  return core.mockCheck(meta.situation || 'meros', meta.answers || {}, list.map((f) => f.name), !!meta.handwritten);
}

function authHeaders() {
  const tg = window.Telegram && window.Telegram.WebApp;
  return tg && tg.initData ? { 'X-Telegram-Init-Data': tg.initData } : {};
}

async function req(path, { method = 'GET', body, form } = {}) {
  const base = await resolveBase();
  if (base === null) return undefined;
  const headers = { ...authHeaders() };
  if (body) headers['Content-Type'] = 'application/json';
  const r = await fetch(base + path, { method, headers, body: form || (body ? JSON.stringify(body) : undefined) });
  if (!r.ok) {
    let msg = `Server xatosi (${r.status})`;
    try { msg = (await r.json()).error?.message || msg; } catch (e) {}
    throw new Error(msg);
  }
  return r.json();
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getSituations() {
  return (await req('/api/situations')) ?? core.SITUATIONS;
}

export async function getQuestions(situationId) {
  return (await req(`/api/prep/${encodeURIComponent(situationId)}/questions`)) ?? core.QUESTIONS[situationId] ?? [];
}

export async function getPrepResult(situationId, answers) {
  return (await req(`/api/prep/${encodeURIComponent(situationId)}/result`, { method: 'POST', body: { answers } })) ?? core.buildPrepResult(situationId, answers);
}

// files: { kadastr?: File, mulk?: File, meros?: File, ishonchnoma?: File }
export async function analyzeRisk(files, meta = {}) {
  const form = new FormData();
  const slots = [];
  Object.entries(files || {}).forEach(([k, f]) => { if (f instanceof File) { form.append(k, f); slots.push(k); } });
  Object.entries(meta).forEach(([k, v]) => form.append(k, v));
  const res = await req('/api/risk/analyze', { method: 'POST', form });
  if (res !== undefined) return res;
  await wait(900);
  return core.mockRisk(slots);
}

export async function getNormChanges() {
  return (await req('/api/notary/changes')) ?? core.CHANGES;
}

export async function getSuggestions() {
  return (await req('/api/notary/suggestions')) ?? core.SUGGESTIONS;
}

export async function askNotary(question) {
  const res = await req('/api/notary/ask', { method: 'POST', body: { question } });
  if (res !== undefined) return res;
  await wait(600);
  return core.mockAnswer(question);
}
