-- AOP Beacon email opt-ins
-- Participant explicitly opts in with email at the closing block.
-- Because it is explicit consent, name + full journey are OK to store here
-- (unlike the prompt endpoint, which stays PII-free).

create table if not exists public.aop_beacon_email_optins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text not null,
  lang text not null check (lang in ('es','en')),
  mesa integer null check (mesa is null or (mesa between 1 and 20)),
  journey jsonb not null
);

create index if not exists aop_beacon_email_optins_created_at_idx
  on public.aop_beacon_email_optins (created_at desc);
create index if not exists aop_beacon_email_optins_email_idx
  on public.aop_beacon_email_optins (email);

alter table public.aop_beacon_email_optins enable row level security;
-- No public policies. Writes go through the service-role client in the API route.
