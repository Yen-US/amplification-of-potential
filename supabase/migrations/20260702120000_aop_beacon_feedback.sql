-- AOP Beacon prompt feedback
-- One row per thumbs vote from a participant on a generated conversation prompt.
-- No PII: name never leaves the device (system prompt uses a {{NAME}} token).

create table if not exists public.aop_beacon_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stage text not null check (stage in ('discover','connect','collaborate','amplify')),
  lang text not null check (lang in ('es','en')),
  rating text not null check (rating in ('up','down')),
  prompt_text text not null,
  selections jsonb not null,
  source text not null check (source in ('ai','fallback')),
  mesa integer null check (mesa is null or (mesa between 1 and 20))
);

create index if not exists aop_beacon_feedback_stage_rating_idx
  on public.aop_beacon_feedback (stage, rating, created_at desc);

alter table public.aop_beacon_feedback enable row level security;

-- No public policies. Writes go through the service-role client in the API route.
