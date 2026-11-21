'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useT } from '@/i18n/provider';
import { DEFAULT_PLANS } from '@/data/demo';
import { plansService } from '@/services/plans';
import type { PlanConfig } from '@/services/types';
import { cn } from '@/lib/utils';
import { Reveal, Section, SectionHeader } from './section';

export function Pricing() {
  const t = useT();
  const p = t.pricing;
  const [plans, setPlans] = useState<PlanConfig[]>(DEFAULT_PLANS);
  useEffect(() => { plansService.list().then(setPlans).catch(() => {}); }, []);

  return (
    <Section id="pricing">
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} center />
      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const copy = p.plans[plan.id];
          const rec = plan.recommended;
          const limit = plan.monthlyDocuments === null ? p.unlimitedDocs : p.docsPerMonth(plan.monthlyDocuments);
          const href = `/register?plan=${plan.id}`;
          return (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <Card glow={rec} className={cn('relative flex h-full flex-col p-7', rec && 'bg-moss/80 shadow-[0_30px_90px_-40px_rgb(0_245_160/0.5)]')}>
                {rec && <span className="absolute -top-3 left-7 rounded-full bg-neon px-3 py-1 text-xs font-semibold text-ink">{p.recommended}</span>}
                <h3 className="text-lg font-semibold">{copy.name}</h3>
                <p className="mt-1 text-sm text-muted">{copy.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {plan.priceUsd === null ? (
                    <span className="text-4xl font-semibold tracking-tight">{p.custom}</span>
                  ) : (
                    <><span className="text-5xl font-semibold tracking-tight">${plan.priceUsd}</span><span className="text-muted">{p.perMonth}</span></>
                  )}
                </div>
                <ul className="mt-7 flex-1 space-y-3 text-[15px]">
                  <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-neon" /><span className="font-medium">{limit}</span></li>
                  {copy.features.map((f) => <li key={f} className="flex gap-2.5 text-muted"><Check className="mt-0.5 size-4 shrink-0 text-emerald" />{f}</li>)}
                </ul>
                <Button asChild variant={rec ? 'primary' : 'secondary'} className="mt-8 w-full">
                  <Link href={href}>{copy.cta}</Link>
                </Button>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
