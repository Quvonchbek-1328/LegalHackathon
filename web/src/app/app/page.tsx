'use client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/ui/demo-badge';
import { OverviewPanel } from '@/components/app/overview-panel';
import { useSession } from '@/components/app/session';
import { useAsync } from '@/components/app/use-async';
import { ErrorState, LoadingState, PageHeader } from '@/components/app/states';
import { useT } from '@/i18n/provider';
import { apiConfig } from '@/services/config';
import { documentsService } from '@/services/documents';

export default function OverviewPage() {
  const t = useT();
  const { user } = useSession();
  const { data, error, loading, reload } = useAsync(() => documentsService.list());
  return (
    <>
      <PageHeader
        title={user ? t.app.overview.greeting(user.name) : t.app.overview.title}
        actions={<Button asChild><Link href="/app/new"><Plus />{t.app.nav.new}</Link></Button>}
      />
      {apiConfig.demoMode && <div className="mb-5"><DemoBanner /></div>}
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : <OverviewPanel docs={data || []} />}
    </>
  );
}
