'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react';
import { leadSchema, options } from '@/lib/lead-schema';
import type { LeadResult } from '@/types/lead';
import { WhatsAppLink } from '../ui/whatsapp-link';

export function InterestForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  function showResult(value: LeadResult) {
    setResult(value);
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      ...Object.fromEntries(data),
      priorities: data.getAll('priorities'),
      consent: data.get('consent') === 'on',
    };
    setErrors({});
    setResult(null);
    const parsed = leadSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const value: LeadResult = await response.json();
      if (value.errors) setErrors(value.errors);
      showResult(value);
    } catch {
      showResult({
        ok: false,
        message:
          'We couldn’t connect. Please try again, or register your interest on WhatsApp.',
      });
    } finally {
      setPending(false);
    }
  }
  function error(name: string) {
    return errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name][0]}
      </span>
    ) : null;
  }
  function select(
    name: keyof Pick<
      typeof options,
      'travellers' | 'travellingWith' | 'destination' | 'budget' | 'interest'
    >,
    label: string,
  ) {
    return (
      <div className="field">
        <label htmlFor={`lead-${name}`}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <select
          id={`lead-${name}`}
          name={name}
          required
          defaultValue={name === 'destination' ? 'Mathura–Vrindavan' : ''}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options[name].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {error(name)}
      </div>
    );
  }
  return (
    <section id="interest" className="section interest-section">
      <div className="container interest-grid">
        <div className="interest-copy">
          <p className="eyebrow">BE PART OF THE BEGINNING</p>
          <h2>
            Your next journey.
            <br />
            <em>Our first chapter.</em>
          </h2>
          <p>
            Join the TeerthSaathi priority list. Help us shape a journey that
            feels right for you.
          </p>
          <ul>
            {[
              'No payment needed to register',
              'No commitment to book',
              'Journey details shared before bookings open',
            ].map((t) => (
              <li key={t}>
                <Check size={18} />
                {t}
              </li>
            ))}
          </ul>
          <div className="interest-aside">
            <ShieldCheck size={24} strokeWidth={1.4} />
            <p>
              Your details stay private. We’ll use them to respond to your
              interest and plan journeys with care.
            </p>
          </div>
          <p className="fine-print">Prefer a conversation?</p>
          <WhatsAppLink className="text-link">
            Talk to us on WhatsApp
          </WhatsAppLink>
        </div>
        <div className="form-panel">
          {result?.ok ? (
            <div
              className="success-state"
              ref={statusRef}
              tabIndex={-1}
              role="status"
            >
              <CheckCircle2 size={48} strokeWidth={1.3} />
              <p className="eyebrow">A MEANINGFUL BEGINNING</p>
              <h3>You’re on the list.</h3>
              <p>{result.message}</p>
              <p className="fine-print">
                This registers your interest; it does not reserve a seat or
                confirm a booking.
              </p>
              <WhatsAppLink />
            </div>
          ) : (
            <form onSubmit={submit} aria-label="Register your interest">
              <h3>Let’s plan something meaningful.</h3>
              <p className="form-intro">
                A few details to help us get to know your journey.
                <br />
                <span className="fine-print">
                  Fields marked * are required.
                </span>
              </p>
              <div className="form-grid">
                {[
                  {
                    name: 'name',
                    label: 'Full Name',
                    autocomplete: 'name',
                    placeholder: 'Your full name',
                    max: 100,
                  },
                  {
                    name: 'phone',
                    label: 'Phone / WhatsApp Number',
                    autocomplete: 'tel',
                    placeholder: '10-digit mobile number',
                    max: 18,
                  },
                  {
                    name: 'city',
                    label: 'City / Area',
                    autocomplete: 'address-level2',
                    placeholder: 'e.g. Rohini, Delhi',
                    max: 100,
                  },
                ].map((f) => (
                  <div
                    className={`field ${f.name === 'city' ? 'full' : ''}`}
                    key={f.name}
                  >
                    <label htmlFor={f.name}>
                      {f.label} <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.name === 'phone' ? 'tel' : 'text'}
                      autoComplete={f.autocomplete}
                      required
                      minLength={f.name === 'phone' ? 10 : 2}
                      maxLength={f.max}
                      placeholder={f.placeholder}
                      aria-invalid={!!errors[f.name]}
                      aria-describedby={
                        errors[f.name] ? `${f.name}-error` : undefined
                      }
                    />
                    {error(f.name)}
                  </div>
                ))}
                {select('travellers', 'Number of Travellers')}
                {select('travellingWith', 'Travelling With')}
                {select('destination', 'Preferred Destination')}
                {select('budget', 'Comfortable Budget')}
                <fieldset
                  className="full priorities"
                  aria-describedby={
                    errors.priorities ? 'priorities-error' : 'priorities-help'
                  }
                >
                  <legend>
                    What matters most? <span aria-hidden="true">*</span>
                  </legend>
                  <p id="priorities-help" className="fine-print">
                    Choose all that matter to you.
                  </p>
                  <div>
                    {options.priorities.map((p) => (
                      <label key={p}>
                        <input type="checkbox" name="priorities" value={p} />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                  {error('priorities')}
                  <p className="fine-print">
                    Preferences help us plan; specific arrangements are not
                    guaranteed. Darshan assistance does not include priority
                    access.
                  </p>
                </fieldset>
                {select('interest', 'Interest Level')}
                <div className="field full">
                  <label htmlFor="message">
                    Anything you’d like us to know?{' '}
                    <span className="optional">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={1000}
                    placeholder="Your preferences or any questions about the journey"
                    aria-describedby="message-help"
                  />
                  <span id="message-help" className="fine-print">
                    Please avoid sharing medical records or sensitive health
                    details.
                  </span>
                  {error('message')}
                </div>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  name="website"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label className="consent">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  aria-describedby={
                    errors.consent ? 'consent-error' : undefined
                  }
                />
                <span>
                  I agree to be contacted by TeerthSaathi by phone or WhatsApp
                  about my interest. I have read the{' '}
                  <Link href="/privacy">Privacy Policy</Link>. *
                </span>
              </label>
              {error('consent')}
              {result && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  className="form-alert"
                >
                  <p>{result.message}</p>
                  <WhatsAppLink className="text-link">
                    Register on WhatsApp
                  </WhatsAppLink>
                </div>
              )}
              <button
                disabled={pending}
                className="button button-green submit-button"
                type="submit"
              >
                {pending ? (
                  <>
                    <LoaderCircle size={18} className="spinner" />
                    Submitting your interest…
                  </>
                ) : (
                  <>
                    Join the Priority List <ArrowUpRight size={18} />
                  </>
                )}
              </button>
              <p className="fine-print centered">
                Your interest today. A meaningful journey tomorrow.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
