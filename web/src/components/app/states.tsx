'use client';
import Link from 'next/link';
import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/provider';

export function LoadingState() {
  const t = useT();
  return <div className="flex min-h-60 items-center justify-center gap-2 text-sm text-muted"><Loader2 className="size-4 animate-spin" />{t.common.loading}</div>;
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const t = useT();
  return (
    <div role="alert" className="glass flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">
      <AlertCircle className="size-8 text-risk-critical" />
      <p className="max-w-sm text-sm text-muted">{message}</p>
      {onRetry && <Button variant="secondary" size="sm" onClick={onRetry}><RefreshCw />{t.common.retry}</Button>}
    </div>
  );
}

export function EmptyState({ message, cta = true }: { message: string; cta?: boolean }) {
  const t = useT();
  return (
    <div className="glass flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border-dashed p-8 text-center">
      <Inbox className="size-8 text-subtle" />
      <p className="max-w-sm text-sm text-muted">{message}</p>
      {cta && <Button asChild size="sm"><Link href="/app/new">{t.app.nav.new}</Link></Button>}
    </div>
  );
}

export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-muted">{sub}</p>}
      </div>
      {actions}
    </div>
  );
}
