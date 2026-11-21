'use client';
import { Globe, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LOCALES, dictFor, useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className, align = 'right' }: { className?: string; align?: 'left' | 'right' }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.language}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-fg cursor-pointer"
      >
        <Globe className="size-4" />
        {t.meta.short}
      </button>
      {open && (
        <ul role="listbox" className={cn('glass absolute z-50 mt-2 w-40 overflow-hidden rounded-xl p-1 shadow-2xl', align === 'right' ? 'right-0' : 'left-0')}>
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => { setLocale(l); setOpen(false); }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-fg hover:bg-white/5 cursor-pointer"
              >
                {dictFor(l).meta.lang}
                {l === locale && <Check className="size-4 text-neon" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
