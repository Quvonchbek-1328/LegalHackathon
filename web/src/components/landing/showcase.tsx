'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBadge } from '@/components/ui/demo-badge';
import { RiskBadge } from '@/components/ui/risk-badge';
import { SidebarMock } from '@/components/app/sidebar';
import { OverviewPanel } from '@/components/app/overview-panel';
import { AnalysisView } from '@/components/app/analysis-view';
import { LogoMark } from '@/components/brand/logo';
import { DEMO_ANALYSIS, DEMO_DOCUMENTS } from '@/data/demo';
import { useT } from '@/i18n/provider';
import { RISK_ORDER } from '@/lib/risk';
import { cn } from '@/lib/utils';
import { Reveal, Section, SectionHeader } from './section';

export function Showcase() {
  const t = useT();
  const [tab, setTab] = useState<'overview' | 'analysis'>('analysis');
  return (
    <Section id="product">
      <SectionHeader eyebrow={t.showcase.eyebrow} title={t.showcase.title} sub={t.showcase.sub} />
      <Reveal>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" className="glass inline-flex rounded-xl p-1">
            {(['analysis', 'overview'] as const).map((k) => (
              <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)}
                className={cn('rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer', tab === k ? 'bg-neon/15 text-neon' : 'text-muted hover:text-fg')}>
                {t.showcase.tabs[k]}
              </button>
            ))}
          </div>
          <Button asChild variant="secondary" size="sm"><Link href="/app">{t.showcase.open}<ArrowRight /></Link></Button>
        </div>
        <div className="glow-border glass rounded-[22px] p-2 shadow-[0_50px_140px_-50px_rgb(0_245_160/0.3)]">
          <div className="flex min-h-[560px] overflow-hidden rounded-2xl border border-line bg-ink/85">
            <aside className="hidden w-52 shrink-0 flex-col gap-6 border-r border-line p-3 md:flex">
              <div className="flex items-center gap-2 px-1.5 pt-1"><LogoMark className="size-7" /><span className="text-sm font-semibold">LegalCheck AI</span></div>
              <SidebarMock active={tab === 'overview' ? 'overview' : 'reports'} />
            </aside>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <div className="flex h-8 flex-1 items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 text-xs text-subtle md:max-w-xs"><Search className="size-3.5" />{t.app.documents.search}</div>
                <DemoBadge />
              </div>
              <div className="p-4 md:p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    {tab === 'overview' ? <OverviewPanel docs={DEMO_DOCUMENTS} embedded /> : <AnalysisView analysis={DEMO_ANALYSIS} embedded />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-10">
        <div className="mb-4 text-sm font-semibold">{t.risk.title}</div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {RISK_ORDER.map((l) => (
            <div key={l} className="glass flex flex-col gap-2 rounded-xl p-4">
              <RiskBadge level={l} withCode className="self-start" />
              <span className="text-sm text-muted">{t.risk[l].desc}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
