import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Check,
} from 'lucide-react';
import { journey } from '@/data/journey';
export function Journey() {
  return (
    <section id="journey" className="section journey-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A SPECIAL FIRST CHAPTER</p>
            <h2>Our First Journey</h2>
          </div>
          <p>
            A familiar calling.
            <br />A more thoughtful way to get there.
          </p>
        </div>
        <div className="journey-grid">
          <div className="journey-photo">
            <Image
              src="/images/ghat.jpg"
              alt="Historic riverside ghats and architecture beside the Yamuna in Mathura"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className="object-cover"
            />
            <span className="photo-tag">TEERTHSAATHI FOUNDING JOURNEY</span>
            <div className="photo-label">
              Two sacred towns.
              <br />
              <em>One beautiful journey.</em>
            </div>
          </div>
          <div className="journey-details">
            <p className="eyebrow">FROM DELHI NCR, WITH CARE</p>
            <h3>Mathura &amp; Vrindavan</h3>
            <div className="journey-meta">
              <span>
                <Clock3 size={16} />2 Days · 1 Night
              </span>
              <span>
                <CalendarDays size={16} />
                Coming soon
              </span>
            </div>
            <p>
              From the ghats of Mathura to the devotional lanes of Vrindavan.
              Make space for connection, reflection and moments that stay with
              you.
            </p>
            <h4>Places we’re planning to experience</h4>
            <ul className="places">
              {journey.places.map((p) => (
                <li key={p.name}>
                  <Check size={15} />
                  {p.name}
                </li>
              ))}
            </ul>
            <p className="fine-print">
              The final itinerary may change based on local conditions, temple
              timings and traveller comfort. No priority darshan is promised.
            </p>
            <div className="price-block">
              <div>
                <span>INDICATIVE LAUNCH PRICE</span>
                <p>
                  ~₹5,000 <small>/ traveller</small>
                </p>
                <small>Expected price · Final details before booking</small>
              </div>
              <span className="limited">
                <span />
                Limited founding group
              </span>
            </div>
            <a className="button button-green" href="#interest">
              Join Founding Journey <ArrowUpRight size={18} />
            </a>
            <Link className="text-link" href="/journeys/mathura-vrindavan">
              <MapPin size={15} /> Explore the journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
