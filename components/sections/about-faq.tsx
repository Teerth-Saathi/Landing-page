import { ArrowUpRight } from 'lucide-react';
import { faqs } from '@/data/journey';
import { WhatsAppLink } from '../ui/whatsapp-link';
export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <div>
          <p className="eyebrow">LET’S TALK ABOUT YOUR JOURNEY</p>
          <h2>Have questions about the journey?</h2>
          <p>A real conversation is a lovely place to start.</p>
        </div>
        <WhatsAppLink className="button button-cream">
          Chat with TeerthSaathi
        </WhatsAppLink>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="about" className="section about-section container">
      <div>
        <p className="eyebrow">THE IDEA BEHIND TEERTHSAATHI</p>
        <h2>
          A journey of faith.
          <br />
          <em>A companion who cares.</em>
        </h2>
      </div>
      <div>
        <p className="large-copy">
          Pilgrimage travel should not feel stressful.
        </p>
        <p>
          TeerthSaathi was created around this simple idea. We want you to focus
          on the journey — the quiet moments, the shared stories, the places
          that mean something to you — while we take care of the details.
        </p>
        <p>
          We’re starting small, with a thoughtfully planned founding journey.
          And a belief that care makes all the difference.
        </p>
        <span className="story-signature">
          TeerthSaathi <span>· Journeys With Care</span>
        </span>
      </div>
    </section>
  );
}
export function FAQs() {
  return (
    <section id="faqs" className="section faq-section">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">A LITTLE MORE CLARITY</p>
          <h2>
            Good questions.
            <br />
            Honest answers.
          </h2>
          <p>
            Planning something meaningful starts with knowing what to expect.
          </p>
          <a className="text-link" href="#contact">
            Still have a question? Let’s talk <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
