'use client';
import { RISK_STYLE } from '@/lib/risk';
import { useT } from '@/i18n/provider';
import type { RiskLevel } from '@/services/types';
import { cn } from '@/lib/utils';

export function RiskBadge({ level, className, withCode }: { level: RiskLevel; className?: string; withCode?: boolean }) {
  const t = useT();
  const s = RISK_STYLE[level];
  const Icon = s.icon;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold', s.text, s.bg, s.border, className)}>
      <Icon className="size-3.5" />
      {withCode ? s.code : t.risk[level].label}
    </span>
  );
}
