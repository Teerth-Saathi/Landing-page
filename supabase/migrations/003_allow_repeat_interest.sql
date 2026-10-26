-- Allow repeat submissions without deleting or overwriting existing leads.
alter table public.leads
  drop constraint if exists leads_phone_destination_key;
