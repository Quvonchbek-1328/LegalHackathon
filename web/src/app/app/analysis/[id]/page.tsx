'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisView } from '@/components/app/analysis-view';
import { useSession } from '@/components/app/session';
import { useAsync } from '@/components/app/use-async';
import { ErrorState, LoadingState } from '@/components/app/states';
import { useT } from '@/i18n/provider';
import { analysisService } from '@/services/analysis';

export default function AnalysisPage() {
  const t = useT();
  const { id } = useParams<{ id: string }>();
  const { plan } = useSession();
  const { data, error, loading, reload } = useAsync(() => analysisService.get(id), [id]);
  return (
    <div className="flex flex-col gap-5">
      <div className="no-print flex items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm"><Link href="/app/documents"><ArrowLeft />{t.common.back}</Link></Button>
        <Button asChild variant="secondary" size="sm"><Link href="/app/new"><Plus />{t.app.analysis.newAnalysis}</Link></Button>
      </div>
      <h1 className="hidden text-xl font-semibold print:block">{t.app.analysis.reportTitle} — LegalCheck AI</h1>
      {loading ? <LoadingState /> : error || !data ? <ErrorState message={error || t.app.notFound} onRetry={reload} /> : <AnalysisView analysis={data} canExport={plan.features.pdfExport} />}
    </div>
  );
}
