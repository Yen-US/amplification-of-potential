-- Replace legacy `mesa` (integer, 1-20) column with `beacon` (text) on both
-- AOP Beacon tables. The vision is that each physical beacon has a stable
-- unique identifier (event + table + rev), not a raw table number.
--
-- Safe to drop because both columns are brand new and empty (introduced in
-- 20260702120000 and 20260702130000, deployed the same day).

alter table public.aop_beacon_feedback drop column if exists mesa;
alter table public.aop_beacon_feedback add column if not exists beacon text null;
create index if not exists aop_beacon_feedback_beacon_idx
  on public.aop_beacon_feedback (beacon);

alter table public.aop_beacon_email_optins drop column if exists mesa;
alter table public.aop_beacon_email_optins add column if not exists beacon text null;
create index if not exists aop_beacon_email_optins_beacon_idx
  on public.aop_beacon_email_optins (beacon);
