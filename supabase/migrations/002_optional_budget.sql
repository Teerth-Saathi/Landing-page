-- Run before deploying the shorter interest form. Keep historical budget values.
alter table public.leads alter column budget drop not null;
