'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Loader2, Scale, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBadge } from '@/components/ui/demo-badge';
import { RiskBadge } from '@/components/ui/risk-badge';
import { useT } from '@/i18n/provider';
import type { RiskLevel } from '@/services/types';
import { cn } from '@/lib/utils';

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(16_185_129/0.22),transparent)] blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-28">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-neon/60" /><span className="relative inline-flex size-2 rounded-full bg-neon" /></span>
            {t.hero.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          >
            {t.hero.title1}{' '}
            <span className="text-gradient">{t.hero.title2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24, ease }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/app/new">{t.hero.cta}<ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#how">{t.hero.cta2}</a>
            </Button>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
          >
            {t.hero.trust.map((x) => (
              <li key={x} className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-emerald" />{x}</li>
            ))}
          </motion.ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }}
          className="min-w-0"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}

const RISKS: RiskLevel[] = ['critical', 'high', 'medium'];
const REFS = ['Fuqarolik kodeksi', 'Iste’molchilar huquqlari to‘g‘risidagi qonun'];

function HeroPreview() {
  const t = useT();
  const p = t.hero.preview;
  const reduce = useReducedMotion();
  // 0 skan, 1 ma’lumot, 2 xavflar, 3 tayyor
  const [phase, setPhase] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((x) => (x + 1) % 5), 1800);
    return () => clearInterval(id);
  }, [reduce]);
  const ph = Math.min(phase, 3);

  return (
    <div className="glow-border glass relative rounded-[22px] p-2 shadow-[0_40px_120px_-40px_rgb(0_245_160/0.35)]">
      <div className="overflow-hidden rounded-2xl border border-line bg-ink/80">
        {/* oyna sarlavhasi */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-white/10" /><span className="size-2.5 rounded-full bg-white/10" /><span className="size-2.5 rounded-full bg-white/10" /></div>
          <span className="truncate font-mono text-xs text-muted">{p.file}</span>
          <span className="ml-auto flex shrink-0 items-center gap-2"><DemoBadge /></span>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1fr_1.1fr]">
          {/* hujjat sahifasi */}
          <div className="relative hidden overflow-hidden border-r border-line p-5 sm:block">
            <div className="relative rounded-lg bg-[#f4f7f5] p-4 text-[#0d1a15] shadow-xl">
              <div className="mb-3 flex items-center gap-2 border-b border-black/10 pb-2">
                <FileText className="size-3.5 text-emerald" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-black/60">Shartnoma № 147</span>
              </div>
              <div className="space-y-1.5">
                {[92, 80, 88, 60].map((w, i) => <div key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${w}%` }} />)}
                <div className={cn('my-2 rounded px-1.5 py-1 text-[10px] leading-snug transition-colors duration-500', ph >= 2 ? 'bg-risk-critical/20 ring-1 ring-risk-critical/60' : 'bg-transparent')}>
                  4. Quruvchi obyektni muddatida topshirmagan taqdirda javobgarlik olmaydi.
                </div>
                {[85, 70, 95].map((w, i) => <div key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${w}%` }} />)}
                <div className={cn('my-2 rounded px-1.5 py-1 text-[10px] leading-snug transition-colors duration-500', ph >= 2 ? 'bg-risk-high/20 ring-1 ring-risk-high/60' : 'bg-transparent')}>
                  3. Quruvchi muddatni bir tomonlama uzaytirishi mumkin.
                </div>
                {[78, 64, 90, 40].map((w, i) => <div key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${w}%` }} />)}
              </div>
              {ph === 0 && <div aria-hidden className="animate-scan absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent to-neon/25 border-b-2 border-neon" />}
            </div>
          </div>
          {/* AI paneli */}
          <div className="flex min-h-[340px] flex-col gap-4 p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              {ph < 3 ? <Loader2 className="size-4 animate-spin text-neon" /> : <CheckCircle2 className="size-4 text-neon" />}
              <span>{ph < 3 ? p.scanning : p.done}</span>
              <span className="ml-auto font-mono text-xs text-subtle">{[18, 46, 82, 100][ph]}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/5">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald via-neon to-cyan" animate={{ width: `${[18, 46, 82, 100][ph]}%` }} transition={{ duration: 0.8, ease }} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">{p.extracted}</span>
              <div className="grid gap-1.5">
                {p.fields.map(([k, v], i) => (
                  <motion.div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-xs"
                    animate={{ opacity: ph >= 1 ? 1 : 0.25 }} transition={{ delay: ph >= 1 ? i * 0.12 : 0 }}>
                    <span className="text-muted">{k}</span><span className="truncate font-medium text-fg">{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">{p.risks}</span>
              <div className="grid gap-1.5">
                <AnimatePresence>
                  {ph >= 2 && p.findings.map((f, i) => (
                    <motion.div key={f} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.15, ease }}
                      className="flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.02] px-3 py-2">
                      <RiskBadge level={RISKS[i]} className="shrink-0" />
                      <span className="truncate text-xs text-fg">{f}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {REFS.map((r) => (
                <span key={r} className={cn('inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[10px] text-muted transition-opacity duration-500', ph >= 3 ? 'opacity-100' : 'opacity-30')}>
                  <Scale className="size-3 text-emerald" />{r}
                </span>
              ))}
              <span className={cn('ml-auto inline-flex items-center gap-1.5 rounded-lg bg-neon/10 px-2.5 py-1.5 text-xs font-semibold text-neon transition-opacity duration-500', ph >= 3 ? 'opacity-100' : 'opacity-0')}>
                <Sparkles className="size-3.5" />{p.report}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
