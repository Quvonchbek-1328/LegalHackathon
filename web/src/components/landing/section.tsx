'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28 lg:px-8', className)}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={cn('mb-12 flex max-w-3xl flex-col gap-4 md:mb-16', center && 'mx-auto items-center text-center')}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl md:leading-[1.08]">{title}</h2>
      {sub && <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
    </Reveal>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </motion.div>
  );
}
