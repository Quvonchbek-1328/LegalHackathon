'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, Plus, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SidebarNav } from '@/components/app/sidebar';
import { SessionProvider, useSession } from '@/components/app/session';
import { useT } from '@/i18n/provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Shell>{children}</Shell>
    </SessionProvider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  useEffect(() => setDrawer(false), [pathname]);

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="no-print sticky top-0 hidden h-dvh flex-col gap-6 border-r border-line bg-forest/40 p-4 lg:flex">
        <Logo href="/" className="px-2 pt-1" />
        <Button asChild className="w-full"><Link href="/app/new"><Plus />{t.app.nav.new}</Link></Button>
        <SidebarNav />
        <PlanCard />
      </aside>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-6 border-r border-line bg-forest p-4 lg:hidden"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }}>
              <div className="flex items-center justify-between"><Logo href="/" /><button type="button" className="grid size-9 place-items-center rounded-lg hover:bg-white/5 cursor-pointer" onClick={() => setDrawer(false)} aria-label={t.common.close}><X className="size-5" /></button></div>
              <SidebarNav onNavigate={() => setDrawer(false)} />
              <PlanCard />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-col">
        <TopBar onMenu={() => setDrawer(true)} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const t = useT();
  const { user, logout } = useSession();
  const router = useRouter();
  return (
    <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-ink/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button type="button" onClick={onMenu} className="grid size-10 place-items-center rounded-lg hover:bg-white/5 lg:hidden cursor-pointer" aria-label={t.nav.menu}><Menu className="size-5" /></button>
      <Logo href="/" compact className="hidden sm:flex lg:hidden" />
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        {user ? (
          <>
            <span className="hidden items-center gap-2.5 sm:flex">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan text-sm font-semibold text-ink">{user.name.slice(0, 1).toUpperCase()}</span>
              <span className="max-w-32 truncate text-sm font-medium">{user.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); router.push('/'); }} aria-label={t.app.nav.logout}><LogOut /><span className="hidden md:inline">{t.app.nav.logout}</span></Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link href="/login">{t.nav.login}</Link></Button>
            <Button asChild size="sm"><Link href="/register">{t.nav.register}</Link></Button>
          </>
        )}
      </div>
    </header>
  );
}

function PlanCard() {
  const t = useT();
  const { plan } = useSession();
  const used = 1;
  const pct = plan.monthlyDocuments ? Math.min(100, (used / plan.monthlyDocuments) * 100) : 8;
  return (
    <div className="glass mt-auto rounded-2xl p-4">
      <div className="mb-1 flex items-center justify-between text-xs text-muted"><span>{t.app.plan}</span><span className="font-semibold text-neon">{t.pricing.plans[plan.id].name}</span></div>
      <div className="mb-2 text-sm font-medium">{t.app.usage(used, plan.monthlyDocuments)}</div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-emerald to-neon" style={{ width: `${pct}%` }} /></div>
      {plan.id === 'free' && <Button asChild variant="secondary" size="sm" className="mt-3 w-full"><Link href="/register?plan=pro">{t.app.upgrade}</Link></Button>}
    </div>
  );
}
