import { z } from 'zod';
export const options = {
  travellers: ['1', '2', '3', '4+'],
  travellingWith: [
    'Myself',
    'Parents',
    'Family',
    'Partner',
    'Friends',
    'Other',
  ],
  destination: [
    'Mathura–Vrindavan',
    'Ayodhya',
    'Haridwar–Rishikesh',
    'Varanasi',
  ],
  budget: ['₹3,000–₹4,000', '₹4,000–₹5,000', '₹5,000–₹6,000', '₹6,000+'],
  priorities: [
    'Comfortable travel',
    'Good hotel',
    'Food',
    'Medical support',
    'Less walking',
    'More places',
    'Darshan assistance',
    'Trip coordinator',
  ],
  interest: ['Definitely interested', 'Maybe interested', 'Just exploring'],
} as const;
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+91[\s-]?|91[\s-]?)?[6-9][0-9\s-]{9,13}$/,
      'Enter a valid Indian mobile number.',
    )
    .transform((v) =>
      v.replace(/[\s-]/g, '').replace(/^(?:\+91|91)(?=\d{10}$)/, ''),
    )
    .refine(
      (v) => /^[6-9]\d{9}$/.test(v),
      'Enter a valid 10-digit mobile number.',
    ),
  city: z.string().trim().min(2, 'Please enter your city or area.').max(100),
  travellers: z.enum(options.travellers),
  travellingWith: z.enum(options.travellingWith),
  destination: z.enum(options.destination),
  budget: z.enum(options.budget),
  priorities: z
    .array(z.enum(options.priorities))
    .min(1, 'Choose at least one priority.')
    .max(8)
    .transform((v) => [...new Set(v)]),
  interest: z.enum(options.interest),
  message: z
    .string()
    .trim()
    .max(1000, 'Please keep your message within 1,000 characters.'),
  consent: z.literal(true, {
    error: 'Please agree to be contacted about your interest.',
  }),
  website: z.string().max(0),
});
export type Lead = z.infer<typeof leadSchema>;
