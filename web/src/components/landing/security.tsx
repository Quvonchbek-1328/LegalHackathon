'use client';
import { Lock, Users, Database, ScrollText, Timer, UserCheck, Info } from 'lucide-react';
import { useT } from '@/i18n/provider';
import { Reveal, Section, SectionHeader } from './section';

const ICONS = [Lock, Users, Database, ScrollText, Timer, UserCheck];

export function Security() {
  const t = useT();
  return (
    <Section id="security">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow={t.security.eyebrow} title={t.security.title} sub={t.security.sub} />
          <Reveal>
            <p className="flex gap-2.5 rounded-xl border border-line p-4 text-sm leading-relaxed text-muted"><Info className="mt-0.5 size-4 shrink-0 text-cyan" />{t.security.note}</p>
          </Reveal>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.security.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={it.title} delay={(i % 2) * 0.06}>
                <div className="glass flex h-full flex-col gap-3 rounded-2xl p-6">
                  <Icon className="size-5 text-neon" />
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{it.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
