'use client';
import { BrainCircuit, ScanText, ShieldAlert, Landmark, FileBarChart2, Files } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useT } from '@/i18n/provider';
import { Reveal, Section, SectionHeader } from './section';

const ICONS = [BrainCircuit, ScanText, ShieldAlert, Landmark, FileBarChart2, Files];

export function Features() {
  const t = useT();
  return (
    <Section id="features">
      <SectionHeader eyebrow={t.features.eyebrow} title={t.features.title} sub={t.features.sub} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((f, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <Card className="group relative h-full overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald/40 md:p-7">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-emerald/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="mb-6 grid size-11 place-items-center rounded-xl border border-emerald/25 bg-emerald/10 text-neon"><Icon className="size-5" /></span>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{f.desc}</p>
                <span className="absolute right-6 top-6 font-mono text-xs text-subtle">0{i + 1}</span>
              </Card>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
        {t.features.kinds.map((k) => (
          <span key={k} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted">{k}</span>
        ))}
      </Reveal>
    </Section>
  );
}
