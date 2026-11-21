import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Problem } from '@/components/landing/problem';
import { Features } from '@/components/landing/features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Showcase } from '@/components/landing/showcase';
import { Audiences } from '@/components/landing/audiences';
import { Pricing } from '@/components/landing/pricing';
import { Security } from '@/components/landing/security';
import { Faq } from '@/components/landing/faq';
import { FinalCta } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Showcase />
        <Audiences />
        <Pricing />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
