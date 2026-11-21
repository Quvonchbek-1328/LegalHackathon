'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusPill, TopRisk } from '@/components/app/overview-panel';
import { useAsync } from '@/components/app/use-async';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/app/states';
import { useI18n } from '@/i18n/provider';
import { formatBytes, formatDate } from '@/lib/utils';
import { documentsService } from '@/services/documents';

export default function DocumentsPage() {
  const { t, locale } = useI18n();
  const d = t.app.documents;
  const [q, setQ] = useState('');
  const { data, error, loading, reload } = useAsync(() => documentsService.list());
  const rows = (data || []).filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title={d.title} />
      <div className="relative mb-4 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-subtle" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={d.search} className="pl-10" aria-label={d.search} />
      </div>
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : rows.length === 0 ? <EmptyState message={data?.length ? d.empty : t.app.overview.empty} cta={!data?.length} /> : (
        <div className="glass overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-subtle">
                <th className="px-4 py-3 font-semibold">{d.name}</th>
                <th className="px-4 py-3 font-semibold">{d.kind}</th>
                <th className="px-4 py-3 font-semibold">{d.date}</th>
                <th className="px-4 py-3 font-semibold">{d.risks}</th>
                <th className="px-4 py-3 font-semibold">{d.status}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="transition hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3">
                      <FileText className="size-4 shrink-0 text-muted" />
                      <span className="min-w-0"><span className="block max-w-72 truncate font-medium">{r.name}</span><span className="font-mono text-xs text-subtle">{formatBytes(r.sizeBytes)}</span></span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{t.app.kinds[r.kind]}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(r.uploadedAt, locale)}</td>
                  <td className="px-4 py-3"><TopRisk doc={r} /></td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                  <td className="px-4 py-3 text-right">
                    {r.analysisId && <Link href={`/app/analysis/${r.analysisId}`} className="font-medium text-neon hover:underline">{d.open}</Link>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
