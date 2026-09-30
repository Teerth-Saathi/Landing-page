import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { journey } from '@/data/journey';
import { Journey } from '@/components/sections/journey';
import { InterestForm } from '@/components/sections/interest-form';
import { FAQs } from '@/components/sections/about-faq';
export function generateStaticParams() {
  return [{ slug: journey.slug }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== journey.slug) return {};
  const title = 'Mathura & Vrindavan Founding Journey';
  const description =
    'A planned 2-day, 1-night pilgrimage from Delhi NCR to Mathura and Vrindavan. Expected around ₹5,000 per traveller. Dates coming soon. Register your interest.';
  return {
    title,
    description,
    alternates: { canonical: `/journeys/${slug}` },
    openGraph: {
      title,
      description,
      url: `/journeys/${slug}`,
      images: ['/opengraph-image'],
    },
  };
}
export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if ((await params).slug !== journey.slug) notFound();
  return (
    <main id="main">
      <div className="container journey-page-heading">
        <Link className="text-link" href="/">
          ← Back to home
        </Link>
        <p className="eyebrow">JOURNEYS WITH CARE</p>
        <h1>Our founding journey</h1>
        <p>Delhi NCR → Mathura &amp; Vrindavan · 2 Days / 1 Night</p>
      </div>
      <Journey />
      <section className="container itinerary section">
        <p className="eyebrow">THE PLACES CALLING US</p>
        <h2>A thoughtful route, taking shape.</h2>
        <p>
          These are our expected experiences, not a confirmed daily schedule.
          Temple queues and local access can affect the route. We will share
          timings, rest breaks, walking requirements and inclusions before
          bookings open.
        </p>
        <div className="community-grid">
          {journey.places.map((p, i) => (
            <article key={p.name}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{p.name}</h3>
              <p>{p.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <InterestForm />
      <FAQs />
    </main>
  );
}
