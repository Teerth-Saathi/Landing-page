import { UsersRound, Heart, Flower2, HandHeart } from 'lucide-react';
const groups = [
  {
    icon: HandHeart,
    name: 'Parents & Seniors',
    text: 'Thoughtful pacing and a helping hand along the way.',
  },
  {
    icon: UsersRound,
    name: 'Families',
    text: 'Shared moments that bring generations closer.',
  },
  {
    icon: Heart,
    name: 'Couples',
    text: 'Step away from the everyday. Reconnect through the journey.',
  },
  {
    icon: Flower2,
    name: 'Spiritual Travellers',
    text: 'Space for devotion, discovery and personal reflection.',
  },
];
export function Community() {
  return (
    <section className="section container community">
      <p className="eyebrow centered">
        DIFFERENT TRAVELLERS. A SHARED JOURNEY.
      </p>
      <h2 className="centered">A place for every generation.</h2>
      <p className="section-intro centered">
        Elderly-first in our care. Open to everyone in spirit.
      </p>
      <div className="community-grid">
        {groups.map(({ icon: Icon, name, text }) => (
          <article key={name}>
            <Icon size={30} strokeWidth={1.3} />
            <h3>{name}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function HowItWorks() {
  const steps = [
    [
      'Register your interest',
      'Tell us a little about you and your travel preferences.',
    ],
    [
      'Our team contacts you',
      'We’ll understand your needs and answer your questions.',
    ],
    [
      'Journey details are finalized',
      'Review the dates, itinerary, price and inclusions before booking.',
    ],
    [
      'Travel together with TeerthSaathi',
      'Once your booking is confirmed, join us for the journey.',
    ],
  ];
  return (
    <section className="how-section section">
      <div className="container">
        <p className="eyebrow centered">A SIMPLE START</p>
        <h2 className="centered">Your journey begins with a hello.</h2>
        <div className="steps">
          {steps.map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
