'use client';
import { SimplePage } from '@/components/landing/simple-page';
import { useT } from '@/i18n/provider';

export default function Page() {
  const t = useT();
  return (
    <SimplePage title={t.footer.terms}>
      <p>{t.footer.tagline}</p>
      <p className="rounded-xl border border-line p-4 text-sm">Ushbu sahifa matni tayyorlanmoqda. / Текст страницы готовится. / This page is being prepared.</p>
    </SimplePage>
  );
}
