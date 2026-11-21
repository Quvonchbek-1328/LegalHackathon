'use client';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted">{children}</div>
      </main>
      <Footer />
    </>
  );
}
