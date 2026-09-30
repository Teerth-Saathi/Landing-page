import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy' },
};
export default function Privacy() {
  return (
    <main id="main" className="container legal section">
      <p className="eyebrow">YOUR TRUST MATTERS</p>
      <h1>Privacy Policy</h1>
      <p>Last updated: 29 September 2026</p>
      <h2>What we collect</h2>
      <p>
        When you register interest, we collect your name, phone number, city,
        group size, travel preferences, budget, interest level, optional message
        and contact consent. Please do not submit medical records or sensitive
        health information.
      </p>
      <h2>How we use your details</h2>
      <p>
        We use this information to respond to your enquiry, contact you by phone
        or WhatsApp about your interest, and understand demand when planning
        journeys. Registering interest does not create a booking. We do not sell
        your personal information.
      </p>
      <h2>Storage and service providers</h2>
      <p>
        Lead information is stored in Supabase. The site may be hosted on
        Vercel. These providers process data to operate the website and storage,
        potentially outside India. Access to leads is restricted to authorized
        administrators. External WhatsApp and Instagram links are governed by
        those services’ own privacy terms.
      </p>
      <h2>Retention and your choices</h2>
      <p>
        We retain enquiry details only as needed to respond and plan relevant
        journeys, unless legal obligations require longer retention. You may
        request access, correction, deletion or withdrawal of contact consent by
        emailing{' '}
        <a href="mailto:teerthsaathi@gmail.com">teerthsaathi@gmail.com</a> or
        calling <a href="tel:+918851155104">+91 8851155104</a>. Withdrawing
        consent will not affect processing already completed.
      </p>
      <h2>Cookies and children</h2>
      <p>
        This MVP does not use advertising trackers or optional analytics
        cookies. Hosting services may process technical request information for
        security and operation. The interest form is intended for adults; a
        parent or guardian should enquire on behalf of children.
      </p>
      <h2>Questions or updates</h2>
      <p>
        Contact teerthsaathi@gmail.com for privacy questions. Changes to this
        policy will appear on this page with an updated date.
      </p>
    </main>
  );
}
