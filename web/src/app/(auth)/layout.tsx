'use client';
import { Logo } from '@/components/brand/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { RiskBadge } from '@/components/ui/risk-badge';
import { useT } from '@/i18n/provider';
import { CheckCircle2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = useT();
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <div className="flex items-center justify-between"><Logo /><LanguageSwitcher /></div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">{children}</div>
        <p className="text-center text-xs text-subtle">{t.common.disclaimer}</p>
      </div>
      <aside className="relative hidden overflow-hidden border-l border-line bg-forest lg:block">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -right-32 top-1/4 size-[520px] rounded-full bg-emerald/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center gap-8 p-14">
          <p className="max-w-md text-balance text-3xl font-semibold leading-tight tracking-tight">{t.hero.message}</p>
          <div className="glass max-w-md space-y-2.5 rounded-2xl p-5">
            {(['critical', 'high', 'medium'] as const).map((l, i) => (
              <div key={l} className="flex items-center gap-3 rounded-xl border border-line bg-ink/40 px-3 py-2.5">
                <RiskBadge level={l} /><span className="truncate text-sm">{t.hero.preview.findings[i]}</span>
              </div>
            ))}
          </div>
          <ul className="space-y-2 text-sm text-muted">
            {t.hero.trust.map((x) => <li key={x} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald" />{x}</li>)}
          </ul>
        </div>
      </aside>
    </div>
  );
}
