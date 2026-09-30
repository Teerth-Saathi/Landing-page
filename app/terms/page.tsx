import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Terms',
  alternates: { canonical: '/terms' },
};
export default function Terms() {
  return (
    <main id="main" className="container legal section">
      <p className="eyebrow">CLEAR FROM THE START</p>
      <h1>Terms of Use</h1>
      <p>Last updated: 29 September 2026</p>
      <h2>An expression of interest</h2>
      <p>
        This website gathers interest in planned TeerthSaathi journeys.
        Submitting a form does not reserve a seat, confirm a booking or require
        payment. The priority list is an enquiry list and does not guarantee
        availability.
      </p>
      <h2>Indicative journey details</h2>
      <p>
        The first planned journey is Delhi NCR to Mathura &amp; Vrindavan, 2
        Days / 1 Night. Expected around ₹5,000 per traveller is an estimate, not
        a confirmed price. Dates, group size, pickup points, accommodation,
        meals, transport, inclusions and exclusions will be finalized before
        bookings open.
      </p>
      <h2>Itineraries and access</h2>
      <p>
        Itineraries may change due to temple timings, queues, local conditions
        and traveller comfort. Priority darshan is not promised. Some walking
        and standing may be necessary; step-free access cannot be guaranteed.
      </p>
      <h2>Assistance and medical arrangements</h2>
      <p>
        Elder-friendly assistance and medical support are part of our planning.
        The scope and availability will be shared before bookings open. No
        medical outcomes are guaranteed. Travellers should seek personal medical
        advice about fitness to travel and discuss mobility or assistance needs
        before booking.
      </p>
      <h2>Future bookings</h2>
      <p>
        Payment, cancellation, refund and other booking conditions will be
        shared before any booking or payment is requested. No online payments
        are accepted through this MVP.
      </p>
      <h2>Contact</h2>
      <p>
        For questions, call <a href="tel:+918851155104">+91 8851155104</a> or
        email <a href="mailto:teerthsaathi@gmail.com">teerthsaathi@gmail.com</a>
        .
      </p>
    </main>
  );
}
