import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn('relative grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-neon to-emerald text-ink shadow-[0_0_24px_-4px_rgb(0_245_160/0.6)]', className)}>
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 3.5h7l4.5 4.5V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" strokeWidth={2} />
        <path d="m9.5 13.5 2 2 3.5-4" />
      </svg>
    </span>
  );
}

export function Logo({ href = '/', className, compact }: { href?: string; className?: string; compact?: boolean }) {
  return (
    <Link href={href} className={cn('flex items-center gap-2.5 text-fg', className)} aria-label="LegalCheck AI">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">LegalCheck AI</span>
        {!compact && <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-subtle">by Zako AI</span>}
      </span>
    </Link>
  );
}
