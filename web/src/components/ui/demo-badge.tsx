'use client';
import { FlaskConical } from 'lucide-react';
import { useT } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function DemoBadge({ className }: { className?: string }) {
  const t = useT();
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan', className)}>
      <FlaskConical className="size-3" />
      {t.common.demoData}
    </span>
  );
}

export function DemoBanner() {
  const t = useT();
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-cyan/25 bg-cyan/[0.06] px-3.5 py-2.5 text-sm text-cyan">
      <FlaskConical className="mt-0.5 size-4 shrink-0" />
      <span>{t.common.demoNote}</span>
    </div>
  );
}
