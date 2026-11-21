'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, FileText, Lightbulb, Lock, Printer, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBadge } from '@/components/ui/demo-badge';
import { RiskBadge } from '@/components/ui/risk-badge';
import { useI18n } from '@/i18n/provider';
import { RISK_ORDER, RISK_STYLE } from '@/lib/risk';
import { cn, formatDate } from '@/lib/utils';
import type { Analysis, Finding } from '@/services/types';

type Filter = 'all' | Finding['category'];

export function AnalysisView({ analysis, canExport = true, embedded = false }: { analysis: Analysis; canExport?: boolean; embedded?: boolean }) {
  const { t, locale } = useI18n();
  const a = t.app.analysis;
  const firstClause = analysis.findings.find((f) => f.clauseId)?.clauseId ?? null;
  const [page, setPage] = useState(() => analysis.clauses.find((c) => c.id === firstClause)?.page ?? 1);
  const [activeClause, setActiveClause] = useState<string | null>(firstClause);
  const [filter, setFilter] = useState<Filter>('all');

  const findings = useMemo(
    () => analysis.findings
      .filter((f) => filter === 'all' || f.category === filter)
      .sort((x, y) => RISK_ORDER.indexOf(x.level) - RISK_ORDER.indexOf(y.level)),
    [analysis.findings, filter],
  );
  const counts = RISK_ORDER.map((l) => ({ level: l, n: analysis.findings.filter((f) => f.level === l).length }));
  const clauseLevel = (id: string) => analysis.findings.find((f) => f.clauseId === id)?.level;
  const pageClauses = analysis.clauses.filter((c) => c.page === page);

  const focus = (f: Finding) => {
    if (!f.clauseId) return;
    const c = analysis.clauses.find((x) => x.id === f.clauseId);
    if (c) setPage(c.page);
    setActiveClause(f.clauseId);
  };

  const filters: Filter[] = ['all', 'risk', 'missing', 'conflict', 'info'];

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {/* sarlavha + amallar */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-emerald"><FileText className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold md:text-lg">{analysis.documentName}</h2>
            {analysis.demo && <DemoBadge />}
          </div>
          <p className="text-xs text-muted">{t.app.kinds[analysis.documentKind]} · {analysis.pages} {a.page.toLowerCase()} · {formatDate(analysis.createdAt, locale)}</p>
        </div>
        {!embedded && (
          <div className="no-print flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => window.print()}><Printer />{a.print}</Button>
            {canExport ? (
              <Button size="sm" onClick={() => window.print()}><Download />{a.download}</Button>
            ) : (
              <Button size="sm" variant="outline" disabled title={a.pdfLocked}><Lock />{a.download}</Button>
            )}
          </div>
        )}
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* chap: hujjat */}
        <div className="glass flex min-w-0 flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-subtle">{a.document}</span>
            <div className="flex items-center gap-1">
              <button type="button" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 disabled:opacity-30 cursor-pointer" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="←"><ChevronLeft className="size-4" /></button>
              <span className="min-w-16 text-center font-mono text-xs text-muted">{page} {a.of} {analysis.pages}</span>
              <button type="button" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 disabled:opacity-30 cursor-pointer" disabled={page >= analysis.pages} onClick={() => setPage((p) => p + 1)} aria-label="→"><ChevronRight className="size-4" /></button>
            </div>
          </div>
          <div className={cn('overflow-auto bg-black/20 p-4 md:p-6', embedded ? 'max-h-[440px]' : 'max-h-[70vh]')}>
            <AnimatePresence mode="wait">
              <motion.article
                key={page}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                className="print-area mx-auto max-w-[560px] rounded-md bg-[#f6f8f7] px-6 py-7 text-[#0f1c17] shadow-2xl md:px-9"
              >
                {page === 1 && (
                  <header className="mb-5 border-b border-black/10 pb-4 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50">Namuna hujjat</p>
                    <p className="mt-1 text-base font-bold">Turar-joy binosini ulushli qurish shartnomasi</p>
                  </header>
                )}
                <div className="space-y-4 text-[13px] leading-relaxed">
                  {pageClauses.map((c) => {
                    const lvl = clauseLevel(c.id);
                    const on = activeClause === c.id;
                    return (
                      <section
                        key={c.id}
                        id={`clause-${c.id}`}
                        className={cn('rounded-md px-2 py-1.5 transition-all duration-300',
                          lvl && 'border-l-[3px]',
                          lvl === 'critical' && 'border-risk-critical', lvl === 'high' && 'border-risk-high', lvl === 'medium' && 'border-risk-medium', lvl === 'low' && 'border-risk-low',
                          on && lvl && 'bg-[rgb(255_200_60/0.22)] ring-1 ring-black/10')}
                      >
                        {c.heading && <h4 className="mb-0.5 font-semibold">{c.heading}</h4>}
                        <p>{c.text}</p>
                      </section>
                    );
                  })}
                </div>
                <p className="mt-6 text-right font-mono text-[10px] text-black/40">— {page} —</p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* o‘ng: AI tahlil */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-neon" />{a.summary}</div>
            <p className="text-[14px] leading-relaxed text-muted">{analysis.summary}</p>
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {counts.map(({ level, n }) => (
                <div key={level} className={cn('flex flex-col items-center gap-0.5 rounded-lg border px-1 py-2', RISK_STYLE[level].border, RISK_STYLE[level].bg)}>
                  <span className={cn('text-lg font-semibold leading-none', RISK_STYLE[level].text)}>{n}</span>
                  <span className="truncate text-[10px] text-muted">{t.risk[level].label}</span>
                </div>
              ))}
            </div>
          </div>

          {!embedded && (
            <div className="glass rounded-2xl p-5">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">{a.entities}</div>
              <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                {analysis.entities.map((e) => (
                  <div key={e.label} className="flex min-w-0 flex-col">
                    <dt className="text-xs text-subtle">{e.label}</dt>
                    <dd className="truncate font-medium">{e.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="glass flex min-w-0 flex-col rounded-2xl">
            <div className="flex flex-wrap items-center gap-1.5 border-b border-line p-3">
              <span className="mr-1 px-1 text-xs font-semibold uppercase tracking-wider text-subtle">{a.findings}</span>
              {filters.map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)}
                  className={cn('rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer', filter === f ? 'bg-neon/15 text-neon' : 'text-muted hover:bg-white/5 hover:text-fg')}>
                  {a.filters[f]}
                </button>
              ))}
            </div>
            <ul className={cn('flex flex-col gap-2 overflow-auto p-3', embedded ? 'max-h-[300px]' : '')}>
              {findings.length === 0 && <li className="px-2 py-6 text-center text-sm text-muted">{a.noFindings}</li>}
              {findings.map((f) => (
                <li key={f.id}>
                  <button type="button" onClick={() => focus(f)}
                    className={cn('w-full rounded-xl border p-3.5 text-left transition cursor-pointer',
                      activeClause && f.clauseId === activeClause ? 'border-line-strong bg-white/[0.04]' : 'border-line hover:bg-white/[0.03]')}>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <RiskBadge level={f.level} />
                      <span className="font-mono text-[10px] text-subtle">{RISK_STYLE[f.level].code}</span>
                    </div>
                    <p className="text-[14px] font-semibold leading-snug">{f.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.explanation}</p>
                    <div className="mt-3 flex gap-2 rounded-lg bg-emerald/[0.07] p-2.5 text-[13px] leading-relaxed text-fg">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-neon" />
                      <span><span className="font-semibold">{a.recommendation}: </span>{f.recommendation}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {f.sources.length === 0 && <span className="text-[11px] text-subtle">{t.common.noSource}</span>}
                      {f.sources.map((s) => (
                        <span key={s.act} className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[11px] text-muted">
                          <Scale className="size-3 text-emerald" />
                          {s.act}{s.verified && s.article ? `, ${s.article}` : ''}
                          {s.verified
                            ? <span className="inline-flex items-center gap-0.5 text-emerald"><ShieldCheck className="size-3" />{t.common.sourceVerified}</span>
                            : <span className="text-risk-medium">· {t.common.sourceUnverified}</span>}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {!embedded && <p className="text-xs leading-relaxed text-subtle">{t.common.disclaimer}</p>}
        </div>
      </div>
    </div>
  );
}
