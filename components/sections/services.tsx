import {
  BusFront,
  BedDouble,
  Utensils,
  HeartPulse,
  HandHeart,
  UserRoundCheck,
} from 'lucide-react';
const services = [
  { icon: BusFront, name: 'Comfortable AC Travel' },
  { icon: BedDouble, name: 'Quality Stay' },
  { icon: Utensils, name: 'Satvik Meals' },
  { icon: HeartPulse, name: 'Medical Support' },
  { icon: UserRoundCheck, name: 'Dedicated Trip Coordinator' },
  { icon: HandHeart, name: 'Elder-Friendly Assistance' },
];
export function Services() {
  return (
    <section className="services" aria-label="Our planned care essentials">
      <div className="container">
        <h2 className="sr-only">Our planned care essentials</h2>
        <p className="eyebrow centered">
          THE DETAILS WE CARE ABOUT, SO YOU CAN BE PRESENT
        </p>
        <div className="service-grid">
          {services.map(({ icon: Icon, name }) => (
            <div className="service" key={name}>
              <Icon size={28} strokeWidth={1.3} aria-hidden="true" />
              <h3>{name}</h3>
            </div>
          ))}
        </div>
        <p className="fine-print centered">
          Planned for our founding journey. Final inclusions and medical support
          arrangements will be shared before bookings open.
        </p>
      </div>
    </section>
  );
}
