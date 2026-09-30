import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Journey } from '@/components/sections/journey';
import { Why } from '@/components/sections/why';
import { Community, HowItWorks } from '@/components/sections/community';
import { InterestForm } from '@/components/sections/interest-form';
import { Contact, About, FAQs } from '@/components/sections/about-faq';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <Journey />
      <Why />
      <Community />
      <HowItWorks />
      <InterestForm />
      <Contact />
      <About />
      <FAQs />
    </main>
  );
}
