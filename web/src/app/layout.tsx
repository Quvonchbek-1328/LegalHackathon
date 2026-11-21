import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { I18nProvider } from '@/i18n/provider';
import './globals.css';

const sans = Geist({ subsets: ['latin', 'cyrillic'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'LegalCheck AI — huquqiy hujjatlarni AI bilan tekshirish',
  description:
    'Shartnoma, ariza, notarial va boshqa huquqiy hujjatlarni O‘zbekiston qonunchiligi asosida AI yordamida tahlil qiling. Zako AI jamoasi.',
};

export const viewport: Viewport = { themeColor: '#050B0A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-ink">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
