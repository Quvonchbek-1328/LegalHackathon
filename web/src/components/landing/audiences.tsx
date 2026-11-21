'use client';
import { User, Building2, Briefcase, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useT } from '@/i18n/provider';
import { Reveal, Section, SectionHeader } from './section';

const ICONS = [User, Building2, Briefcase];
const TAGS = ['B2C', 'B2B', 'PRO'];

export function Audiences() {
  const t = useT();
  return (
    <Section id="audiences">
      <SectionHeader eyebrow={t.audiences.eyebrow} title={t.audiences.title} />
      <div className="grid gap-4 md:grid-cols-3">
        {t.audiences.groups.map((g, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={g.title} delay={i * 0.08}>
              <Card className="h-full p-6 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan"><Icon className="size-5" /></span>
                  <span className="font-mono text-xs text-subtle">{TAGS[i]}</span>
                </div>
                <h3 className="mb-4 text-xl font-semibold tracking-tight">{g.title}</h3>
                <ul className="space-y-2.5">
                  {g.items.map((x) => <li key={x} className="flex items-center gap-2.5 text-[15px] text-muted"><Check className="size-4 shrink-0 text-emerald" />{x}</li>)}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
