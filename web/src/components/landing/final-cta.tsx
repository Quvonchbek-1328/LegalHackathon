'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/provider';
import { Reveal, Section } from './section';

export function FinalCta() {
  const t = useT();
  return (
    <Section className="pb-24">
      <Reveal>
        <div className="glow-border relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-moss via-forest to-ink px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{t.cta.title}</h2>
            <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{t.cta.sub}</p>
            <Button asChild size="lg"><Link href="/app/new">{t.cta.button}<ArrowRight /></Link></Button>
            <p className="text-sm text-subtle">{t.hero.message}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
