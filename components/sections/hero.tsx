import Image from 'next/image';
import { ArrowUpRight, MapPin, Sun, HeartHandshake } from 'lucide-react';
import { WhatsAppLink } from '../ui/whatsapp-link';
export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-line" /> FAITH IN THE JOURNEY. CARE IN EVERY
            STEP.
          </p>
          <h1>
            Teerth Yatra,
            <br />
            Ab Aur <em>Aasaan.</em>
          </h1>
          <p className="hero-description">
            Thoughtfully planned pilgrimage journeys with comfortable travel,
            quality stays and care throughout the journey.
          </p>
          <div className="hero-route">
            <MapPin size={18} />
            <span>
              Delhi NCR <span className="route-arrow">→</span> Mathura &amp;
              Vrindavan
              <small>
                2 Days <span>•</span> 1 Night <span>•</span> Dates coming soon
              </small>
            </span>
          </div>
          <div className="button-row">
            <a href="#interest" className="button button-saffron">
              I’m Interested <ArrowUpRight size={18} />
            </a>
            <WhatsAppLink />
          </div>
          <p className="hero-note">
            <HeartHandshake size={17} /> For every generation. With a little
            extra care.
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <Image
              src="/images/temple.jpg"
              alt="Ornate temple architecture in the sacred town of Vrindavan"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="image-shade" />
            <div className="image-caption">
              <span>OUR FOUNDING JOURNEY</span>
              <p>
                Where every lane
                <br />
                has a story.
              </p>
              <small>MATHURA &amp; VRINDAVAN</small>
            </div>
          </div>
          <div className="journey-seal">
            <Sun size={24} />
            <span>
              A meaningful
              <br />
              beginning
            </span>
          </div>
          <div className="hero-image-foot">
            <span>01 / THE FIRST OF MANY JOURNEYS</span>
            <span>बड़े सुकून की यात्रा</span>
          </div>
        </div>
      </div>
    </section>
  );
}
