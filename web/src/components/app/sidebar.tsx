'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FilePlus2, FileStack, FileBarChart2, LayoutDashboard, Settings, SlidersHorizontal } from 'lucide-react';
import { useT } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export type NavKey = 'overview' | 'documents' | 'new' | 'reports' | 'settings' | 'admin';

export const NAV_ITEMS: { key: NavKey; href: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', href: '/app', icon: LayoutDashboard },
  { key: 'documents', href: '/app/documents', icon: FileStack },
  { key: 'new', href: '/app/new', icon: FilePlus2 },
  { key: 'reports', href: '/app/reports', icon: FileBarChart2 },
  { key: 'settings', href: '/app/settings', icon: Settings },
];

export function activeKey(pathname: string): NavKey {
  if (pathname.startsWith('/app/admin')) return 'admin';
  const hit = [...NAV_ITEMS].reverse().find((n) => n.href !== '/app' && pathname.startsWith(n.href));
  if (hit) return hit.key;
  if (pathname.startsWith('/app/analysis')) return 'reports';
  return 'overview';
}

export function SidebarNav({ onNavigate, showAdmin = true }: { onNavigate?: () => void; showAdmin?: boolean }) {
  const t = useT();
  const pathname = usePathname();
  const active = activeKey(pathname);
  const items = showAdmin ? [...NAV_ITEMS, { key: 'admin' as const, href: '/app/admin', icon: SlidersHorizontal }] : NAV_ITEMS;
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map(({ key, href, icon: Icon }) => (
        <Link key={key} href={href} onClick={onNavigate} aria-current={active === key ? 'page' : undefined}
          className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
            active === key ? 'bg-white/[0.06] text-fg shadow-[inset_0_0_0_1px_rgb(167_184_177/0.12)]' : 'text-muted hover:bg-white/[0.03] hover:text-fg',
            key === 'admin' && 'mt-3')}>
          <Icon className={cn('size-[18px]', active === key ? 'text-neon' : '')} />
          {t.app.nav[key]}
        </Link>
      ))}
    </nav>
  );
}

/** Landing’dagi preview uchun statik sidebar */
export function SidebarMock({ active }: { active: NavKey }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-0.5">
      {NAV_ITEMS.map(({ key, icon: Icon }) => (
        <span key={key} className={cn('flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium',
          active === key ? 'bg-white/[0.06] text-fg' : 'text-muted')}>
          <Icon className={cn('size-4', active === key && 'text-neon')} />
          <span className="truncate">{t.app.nav[key]}</span>
        </span>
      ))}
    </div>
  );
}
