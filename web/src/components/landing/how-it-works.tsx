'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { UploadCloud, BrainCircuit, Scale, FileCheck2 } from 'lucide-react';
import { useT } from '@/i18n/provider';
import { Section, SectionHeader, Reveal } from './section';
import { cn } from '@/lib/utils';

const ICONS = [UploadCloud, BrainCircuit, Scale, FileCheck2];

export function HowItWorks() {
  const t = useT();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [auto, reduce]);

  return (
    <Section id="how">
      <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} center />
      <Reveal>
        <div className="relative">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[42px] hidden h-px bg-line md:block">
            <motion.div className="h-full bg-gradient-to-r from-emerald to-neon" animate={{ width: `${(active / 3) * 100}%` }} transition={{ duration: 0.6 }} />
          </div>
          <ol className="grid gap-4 md:grid-cols-4">
            {t.how.steps.map((s, i) => {
              const Icon = ICONS[i];
              const on = i === active;
              const done = i < active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onMouseEnter={() => { setAuto(false); setActive(i); }}
                    onFocus={() => { setAuto(false); setActive(i); }}
                    onClick={() => { setAuto(false); setActive(i); }}
                    aria-current={on ? 'step' : undefined}
                    className={cn(
                      'glass flex h-full w-full flex-col items-start gap-4 rounded-2xl p-6 text-left transition duration-300 md:items-center md:text-center cursor-pointer',
                      on ? 'border-emerald/50 bg-moss shadow-[0_20px_60px_-30px_rgb(0_245_160/0.5)]' : 'hover:border-line-strong',
                    )}
                  >
                    <span className={cn('relative grid size-[52px] place-items-center rounded-2xl border transition-colors duration-300',
                      on ? 'border-neon/50 bg-neon/15 text-neon' : done ? 'border-emerald/40 bg-emerald/10 text-emerald' : 'border-line bg-ink text-muted')}>
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    <span className="text-lg font-semibold">{s.title}</span>
                    <span className="text-[15px] leading-relaxed text-muted">{s.desc}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
