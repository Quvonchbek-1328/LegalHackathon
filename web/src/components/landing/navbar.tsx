'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useT } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const links = [
    { href: '#top', label: t.nav.home },
    { href: '#features', label: t.nav.features },
    { href: '#how', label: t.nav.how },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || open ? 'border-line bg-ink/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <LanguageSwitcher />
          <Link href="/login" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-fg md:block">
            {t.nav.login}
          </Link>
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/register">{t.nav.register}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/app/new">
              {t.nav.cta}
              <ArrowRight />
            </Link>
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-fg hover:bg-white/5 lg:hidden cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t.nav.menu}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-fg hover:bg-white/5">
                  {l.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline"><Link href="/login">{t.nav.login}</Link></Button>
                <Button asChild variant="secondary"><Link href="/register">{t.nav.register}</Link></Button>
              </div>
              <Button asChild className="mt-2"><Link href="/app/new">{t.nav.cta}</Link></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
