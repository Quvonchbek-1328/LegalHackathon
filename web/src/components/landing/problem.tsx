'use client';
import { BookOpenText, Clock3, EyeOff, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useT } from '@/i18n/provider';
import { Reveal, Section, SectionHeader } from './section';
import { LogoMark } from '@/components/brand/logo';

const ICONS = [BookOpenText, Clock3, EyeOff];

export function Problem() {
  const t = useT();
  return (
    <Section id="problem">
      <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} />
      <div className="grid gap-4 md:grid-cols-3">
        {t.problem.items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={it.title} delay={i * 0.08}>
              <Card className="h-full p-6 md:p-7">
                <span className="mb-5 grid size-11 place-items-center rounded-xl border border-risk-high/25 bg-risk-high/10 text-risk-high"><Icon className="size-5" /></span>
                <h3 className="mb-3 text-lg font-semibold">{it.title}</h3>
                <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
                  {it.points.map((p) => <li key={p} className="flex gap-2.5"><span className="mt-2.5 size-1 shrink-0 rounded-full bg-subtle" />{p}</li>)}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-6 flex flex-col items-center gap-6">
        <ArrowDown className="size-5 text-subtle" />
        <Card glow className="flex w-full flex-col items-center gap-4 px-6 py-10 text-center md:py-12">
          <LogoMark className="size-11" />
          <span className="eyebrow">{t.problem.solutionEyebrow}</span>
          <p className="max-w-2xl text-balance text-2xl font-semibold tracking-tight md:text-3xl">{t.problem.solution}</p>
        </Card>
      </Reveal>
    </Section>
  );
}
