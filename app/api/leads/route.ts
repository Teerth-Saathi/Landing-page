import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { leadSchema } from '@/lib/lead-schema';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { ok: false, message: 'Please submit the form from our website.' },
      { status: 403 },
    );
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 12_000)
      return NextResponse.json(
        { ok: false, message: 'Your submission is too large.' },
        { status: 413 },
      );
    input = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Please check your submission and try again.' },
      { status: 400 },
    );
  }
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success)
    return NextResponse.json(
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key)
    return NextResponse.json(
      {
        ok: false,
        message:
          'Our interest form is temporarily unavailable. Please register your interest on WhatsApp instead.',
      },
      { status: 503 },
    );
  const lead = parsed.data;
  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from('leads').insert({
      full_name: lead.name,
      phone: lead.phone,
      city: lead.city,
      travellers: lead.travellers,
      travelling_with: lead.travellingWith,
      destination: lead.destination,
      budget: lead.budget,
      priorities: lead.priorities,
      interest_level: lead.interest,
      message: lead.message,
      consent: lead.consent,
      consent_version: '2026-09-29',
      source: 'website',
    });
    if (error) {
      if (error.code === '23505')
        return NextResponse.json(
          {
            ok: false,
            message:
              'You have already registered interest in this destination. For changes or questions, please contact us on WhatsApp.',
          },
          { status: 409 },
        );
      return NextResponse.json(
        {
          ok: false,
          message:
            'We couldn’t save your interest just now. Please try again or contact us on WhatsApp.',
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        ok: true,
        message:
          "Thank you. You're now on the TeerthSaathi priority list. We'll contact you when the founding journey opens.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We couldn’t connect just now. Please try again or contact us on WhatsApp.',
      },
      { status: 503 },
    );
  }
}
