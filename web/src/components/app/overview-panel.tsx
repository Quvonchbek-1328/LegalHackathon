'use client';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ChevronRight, FileStack, FileText, TrendingUp } from 'lucide-react';
import { RiskBadge } from '@/components/ui/risk-badge';
import { useI18n } from '@/i18n/provider';
import { RISK_ORDER } from '@/lib/risk';
import { cn, formatDate } from '@/lib/utils';
import type { DocumentRecord } from '@/services/types';

export function StatusPill({ status }: { status: DocumentRecord['status'] }) {
  const { t } = useI18n();
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium',
      status === 'completed' ? 'text-emerald' : status === 'failed' ? 'text-risk-critical' : 'text-risk-medium')}>
      <span className={cn('size-1.5 rounded-full', status === 'completed' ? 'bg-emerald' : status === 'failed' ? 'bg-risk-critical' : 'bg-risk-medium animate-pulse')} />
      {t.app.status[status]}
    </span>
  );
}

export function TopRisk({ doc }: { doc: DocumentRecord }) {
  const top = RISK_ORDER.find((l) => (doc.counts?.[l] || 0) > 0 && l !== 'info');
  if (!top) return <span className="text-xs text-subtle">—</span>;
  return <RiskBadge level={top} />;
}

export function OverviewPanel({ docs, embedded = false, linkBase = '/app' }: { docs: DocumentRecord[]; embedded?: boolean; linkBase?: string }) {
  const { t, locale } = useI18n();
  const o = t.app.overview;
  const completed = docs.filter((d) => d.status === 'completed');
  const attention = docs.filter((d) => (d.counts?.critical || 0) + (d.counts?.high || 0) > 0);
  const stats = [
    { label: o.stats.total, value: docs.length, icon: FileStack, accent: 'text-neon' },
    { label: o.stats.completed, value: completed.length, icon: CheckCircle2, accent: 'text-emerald' },
    { label: o.stats.attention, value: attention.length, icon: AlertTriangle, accent: 'text-risk-high' },
    { label: o.stats.thisMonth, value: docs.filter((d) => d.uploadedAt.slice(0, 7) === new Date().toISOString().slice(0, 7)).length, icon: TrendingUp, accent: 'text-cyan' },
  ];

  // Oxirgi 8 hafta bo‘yicha tahlillar soni (tarix grafigi)
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = Date.now() - i * 7 * 864e5;
    return docs.filter((d) => { const ts = new Date(d.uploadedAt).getTime(); return ts <= end && ts > end - 7 * 864e5; }).length;
  }).reverse();
  const max = Math.max(1, ...weeks);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-muted">{s.label}</span>
              <s.icon className={cn('size-4', s.accent)} />
            </div>
            <span className="text-2xl font-semibold tracking-tight md:text-3xl">{s.value}</span>
          </div>
        ))}
      </div>

      <div className={cn('grid min-w-0 gap-4', !embedded && 'xl:grid-cols-[1.6fr_1fr]')}>
        <div className="glass min-w-0 rounded-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-sm font-semibold">{o.recent}</span>
            {!embedded && <Link href={`${linkBase}/documents`} className="flex items-center gap-1 text-xs font-medium text-muted hover:text-fg">{o.viewAll}<ChevronRight className="size-3.5" /></Link>}
          </div>
          {docs.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">{o.empty}</p>
          ) : (
            <ul className="divide-y divide-line">
              {docs.slice(0, embedded ? 4 : 6).map((d) => (
                <li key={d.id}>
                  <Link href={d.analysisId ? `${linkBase}/analysis/${d.analysisId}` : `${linkBase}/documents`}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.02]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted"><FileText className="size-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{d.name}</span>
                      <span className="block text-xs text-subtle">{t.app.kinds[d.kind]} · {formatDate(d.uploadedAt, locale)}</span>
                    </span>
                    <span className="hidden sm:block"><TopRisk doc={d} /></span>
                    <span className="hidden w-28 justify-end md:flex"><StatusPill status={d.status} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!embedded && (
          <div className="glass flex min-w-0 flex-col rounded-2xl p-4">
            <span className="mb-4 text-sm font-semibold">{o.history}</span>
            <div className="flex h-40 items-end gap-2" role="img" aria-label={o.history}>
              {weeks.map((n, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="font-mono text-[10px] text-subtle">{n || ''}</span>
                  <div className="w-full rounded-t-md bg-gradient-to-t from-emerald/40 to-neon/80" style={{ height: `${Math.max(4, (n / max) * 120)}px`, opacity: n ? 1 : 0.25 }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle"><span>−8w</span><span>now</span></div>
            <div className="mt-5 space-y-2">
              {RISK_ORDER.slice(0, 4).map((l) => {
                const n = docs.reduce((s, d) => s + (d.counts?.[l] || 0), 0);
                return (
                  <div key={l} className="flex items-center justify-between text-sm">
                    <RiskBadge level={l} />
                    <span className="font-mono text-muted">{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
