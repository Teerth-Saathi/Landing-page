import test from 'node:test';
import assert from 'node:assert/strict';
import { leadSchema } from '../lib/lead-schema';
const valid = {
  name: 'Example Traveller',
  phone: '+91 9876543210',
  city: 'Delhi',
  travellers: '2',
  travellingWith: 'Family',
  destination: 'Mathura–Vrindavan',
  budget: '₹4,000–₹5,000',
  priorities: ['Food', 'Less walking'],
  interest: 'Definitely interested',
  message: '',
  consent: true,
  website: '',
};
test('normalizes an Indian phone number and trims names', () => {
  const parsed = leadSchema.parse({ ...valid, name: '  Example Traveller  ' });
  assert.equal(parsed.phone, '9876543210');
  assert.equal(parsed.name, 'Example Traveller');
});
test('rejects invalid phones, missing consent, honeypot and invalid options', () => {
  for (const change of [
    { phone: '1234567890' },
    { phone: '+1 9876543210' },
    { phone: '98765432100' },
    { consent: false },
    { website: 'spam' },
    { travellers: '9' },
    { priorities: [] },
    { priorities: ['Priority darshan'] },
    { message: 'a'.repeat(1001) },
  ])
    assert.equal(leadSchema.safeParse({ ...valid, ...change }).success, false);
});
test('deduplicates preferences and accepts local phone numbers', () => {
  const result = leadSchema.parse({
    ...valid,
    phone: '98765 43210',
    priorities: ['Food', 'Food'],
  });
  assert.deepEqual(result.priorities, ['Food']);
  assert.equal(result.phone, '9876543210');
});
