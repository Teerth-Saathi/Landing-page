-- Run once in the Supabase SQL editor. The server uses a secret key; clients have no table access.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  city text not null check (char_length(city) between 2 and 100),
  travellers text not null check (travellers in ('1','2','3','4+')),
  travelling_with text not null check (travelling_with in ('Myself','Parents','Family','Partner','Friends','Other')),
  destination text not null check (destination in ('Mathura–Vrindavan','Ayodhya','Haridwar–Rishikesh','Varanasi')),
  budget text not null check (budget in ('₹3,000–₹4,000','₹4,000–₹5,000','₹5,000–₹6,000','₹6,000+')),
  priorities text[] not null check (cardinality(priorities) between 1 and 8 and priorities <@ array['Comfortable travel','Good hotel','Food','Medical support','Less walking','More places','Darshan assistance','Trip coordinator']),
  interest_level text not null check (interest_level in ('Definitely interested','Maybe interested','Just exploring')),
  message text not null default '' check (char_length(message) <= 1000),
  consent boolean not null check (consent = true),
  consent_version text not null,
  source text not null default 'website',
  unique(phone, destination)
);
alter table public.leads enable row level security;
revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to service_role;
