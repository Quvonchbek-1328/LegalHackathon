'use client';
import Link from 'next/link';
import { FileBarChart2, ChevronRight } from 'lucide-react';
import { TopRisk } from '@/components/app/overview-panel';
import { useAsync } from '@/components/app/use-async';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/app/states';
import { useI18n } from '@/i18n/provider';
import { formatDate } from '@/lib/utils';
import { documentsService } from '@/services/documents';

export default function ReportsPage() {
  const { t, locale } = useI18n();
  const { data, error, loading, reload } = useAsync(() => documentsService.list());
  const done = (data || []).filter((d) => d.status === 'completed' && d.analysisId);
  return (
    <>
      <PageHeader title={t.app.reports.title} sub={t.app.reports.sub} />
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : done.length === 0 ? <EmptyState message={t.app.reports.empty} /> : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {done.map((d) => (
            <Link key={d.id} href={`/app/analysis/${d.analysisId}`} className="glass group flex flex-col gap-4 rounded-2xl p-5 transition hover:border-emerald/40">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald/25 bg-emerald/10 text-neon"><FileBarChart2 className="size-5" /></span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{d.name}</span>
                  <span className="text-xs text-subtle">{t.app.kinds[d.kind]} · {formatDate(d.uploadedAt, locale)}</span>
                </span>
              </div>
              <div className="flex items-center justify-between"><TopRisk doc={d} /><ChevronRight className="size-4 text-subtle transition group-hover:translate-x-0.5 group-hover:text-fg" /></div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
