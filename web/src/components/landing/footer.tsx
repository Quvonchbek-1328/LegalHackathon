'use client';
import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useT } from '@/i18n/provider';

export function Footer() {
  const t = useT();
  const cols = [
    { title: t.footer.product, links: [{ href: '/#features', label: t.nav.features }, { href: '/#how', label: t.nav.how }, { href: '/#pricing', label: t.nav.pricing }, { href: '/#faq', label: t.nav.faq }] },
    { title: t.footer.company, links: [{ href: '/#top', label: 'Zako AI' }, { href: '/contact', label: t.footer.contact }] },
    { title: t.footer.legal, links: [{ href: '/privacy', label: t.footer.privacy }, { href: '/terms', label: t.footer.terms }] },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          <p className="text-xs text-subtle">{t.footer.by}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-3">
            <span className="text-sm font-semibold">{c.title}</span>
            {c.links.map((l) => <Link key={l.label} href={l.href} className="text-sm text-muted transition hover:text-fg">{l.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-line px-4 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} Zako AI · LegalCheck AI. {t.footer.rights}</span>
        <span className="max-w-xl">{t.common.disclaimer}</span>
        <LanguageSwitcher align="right" />
      </div>
    </footer>
  );
}
