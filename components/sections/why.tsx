import { ArrowUpRight, Coffee, Footprints, HeartHandshake } from 'lucide-react';
const reasons = [
  {
    icon: Footprints,
    title: 'A gentler pace. A fuller experience.',
    text: 'Thoughtful routes and time to pause. Meaningful places, with comfort guiding the plan.',
  },
  {
    icon: HeartHandshake,
    title: 'A helping hand, when you need one.',
    text: 'A dedicated coordinator and elder-friendly assistance, so every generation feels included.',
  },
  {
    icon: Coffee,
    title: 'The little things, thoughtfully considered.',
    text: 'Comfortable travel, hygienic food, rest breaks and family communication are part of our planning.',
  },
];
export function Why() {
  return (
    <section id="why" className="why-section section">
      <div className="container why-grid">
        <div>
          <p className="eyebrow">THE TEERTHSAATHI DIFFERENCE</p>
          <h2>
            More than places.
            <br />
            <em>Peace of mind.</em>
          </h2>
          <p>
            A pilgrimage is more than getting from one temple to the next. It’s
            how you feel along the way.
          </p>
          <p>
            Travel packages often start with transport and sightseeing. We start
            with the whole experience — for you, and the people you travel with.
          </p>
          <a href="#interest" className="text-link">
            Find your next meaningful journey <ArrowUpRight size={17} />
          </a>
          <div className="why-motif" aria-hidden="true">
            ✳
          </div>
        </div>
        <div className="reasons">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <article key={title}>
              <div className="reason-number">0{i + 1}</div>
              <div>
                <Icon size={27} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
