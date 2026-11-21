'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useT } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { Reveal, Section, SectionHeader } from './section';

export function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="max-w-4xl">
      <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.title} center />
      <Reveal>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {t.faq.items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.q} className={cn('transition-colors', on && 'bg-white/[0.02]')}>
                <h3>
                  <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-medium md:px-6 md:text-base cursor-pointer">
                    {it.q}
                    <Plus className={cn('size-5 shrink-0 text-muted transition-transform duration-300', on && 'rotate-45 text-neon')} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted md:px-6">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
