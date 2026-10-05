-- ============================================================================
-- ANAV Global — initial schema
-- Run in the Supabase SQL Editor (Dashboard > SQL Editor > New query) against
-- the project referenced by NEXT_PUBLIC_SUPABASE_URL. Safe to re-run.
--
-- Security model throughout:
--   * anon may INSERT into leads (the public contact form) and may SELECT only
--     published posts, published team members, published testimonials and the
--     site_settings the public pages read.
--   * authenticated (the admin) may do everything else.
--   * anon has no SELECT on leads at all — a policy that let the public read the
--     lead table would expose every enquiry the firm has ever received.
--
-- There is no public sign-up. Admin accounts are created by hand in
-- Authentication > Users, so "authenticated" means "an admin".
-- ============================================================================

create extension if not exists "pgcrypto";

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 1. leads — contact form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  email          text not null,
  company        text,
  phone          text,
  country        text,   -- United States / United Kingdom / India / Other
  enquirer_type  text,   -- CPA / accounting firm, Business owner, Other
  services       text[] not null default '{}',
  message        text,
  source_page    text,
  status         text not null default 'new'
                   check (status in ('new','contacted','qualified','won','lost','archived')),
  notes          text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

alter table public.leads enable row level security;

drop policy if exists "leads: public can submit" on public.leads;
create policy "leads: public can submit"
  on public.leads for insert to anon, authenticated
  -- New rows always start as 'new' with no notes, whoever submits them.
  with check (status = 'new' and notes is null);

drop policy if exists "leads: admin can read" on public.leads;
create policy "leads: admin can read"
  on public.leads for select to authenticated using (true);

drop policy if exists "leads: admin can update" on public.leads;
create policy "leads: admin can update"
  on public.leads for update to authenticated using (true) with check (true);

drop policy if exists "leads: admin can delete" on public.leads;
create policy "leads: admin can delete"
  on public.leads for delete to authenticated using (true);

-- ---------------------------------------------------------------------------
-- 2. posts — the Insights blog
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  slug             text not null unique,
  title            text not null,
  excerpt          text not null default '',
  content          text not null default '',
  category         text not null default 'Insights',
  author           text not null default 'ANAV Global',
  cover_url        text,
  cover_alt        text,
  meta_title       text,
  meta_description text,
  is_featured      boolean not null default false,
  status           text not null default 'draft' check (status in ('draft','published')),
  published_at     timestamptz
);

create index if not exists posts_status_published_idx on public.posts (status, published_at desc);

alter table public.posts enable row level security;

-- Anonymous readers see published posts only; a post scheduled for a future
-- published_at stays hidden until that moment.
drop policy if exists "posts: public reads published" on public.posts;
create policy "posts: public reads published"
  on public.posts for select to anon
  using (status = 'published' and published_at is not null and published_at <= now());

drop policy if exists "posts: admin full access" on public.posts;
create policy "posts: admin full access"
  on public.posts for all to authenticated using (true) with check (true);

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 3. site_settings — one source of truth for figures, contact details, links
--
-- Stored as text, never numeric: "500+" and "50K+" are the client's own
-- formatting, and a numeric column would strip the suffix and turn an empty
-- value into 0 — which is how a site ends up advertising "0+ clients".
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key         text primary key,
  value       text,
  label       text not null,
  group_name  text not null default 'stats',
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "settings: public can read" on public.site_settings;
create policy "settings: public can read"
  on public.site_settings for select to anon, authenticated using (true);

drop policy if exists "settings: admin can write" on public.site_settings;
create policy "settings: admin can write"
  on public.site_settings for all to authenticated using (true) with check (true);

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- Seeded with the values the Emergent build published.
insert into public.site_settings (key, value, label, group_name, sort_order) values
  ('clients',            '500+',                       'Clients served',                  'stats',   1),
  ('invoices',           '50K+',                       'Invoices processed',              'stats',   2),
  ('experience',         '10+',                        'Years of experience',             'stats',   3),
  ('satisfaction',       '99%',                        'Client satisfaction',             'stats',   4),
  ('email',              'accounting@anavglobal.com',  'Email address',                   'contact', 1),
  ('phone_primary',      '+1 (614) 427-1512',          'Phone (USA) — primary',           'contact', 2),
  ('phone_secondary',    '+1 (614) 427-2151',          'Phone (USA) — secondary',         'contact', 3),
  ('whatsapp_primary',   '+91 97246 12506',            'WhatsApp (India) — primary',      'contact', 4),
  ('whatsapp_secondary', '+91 99097 04060',            'WhatsApp (India) — secondary',    'contact', 5),
  ('hours_weekdays',     '9:00 AM – 6:00 PM',          'Office hours — Monday to Friday', 'contact', 6),
  ('hours_saturday',     '10:00 AM – 2:00 PM',         'Office hours — Saturday',         'contact', 7),
  ('hours_sunday',       'Closed',                     'Office hours — Sunday',           'contact', 8),
  ('linkedin',           null,                         'LinkedIn page',                   'social',  1),
  ('facebook',           null,                         'Facebook page',                   'social',  2),
  ('x',                  null,                         'X (Twitter) profile',             'social',  3),
  ('instagram',          null,                         'Instagram profile',               'social',  4),
  ('booking_url',        null,                         'Booking link (Calendly etc.)',    'booking', 1)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- 4. team_members — Admin > Team
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  name          text not null,
  role          text not null,
  bio           text not null default '',
  photo_url     text,
  credentials   text[] not null default '{}',
  tier          text not null default 'management' check (tier in ('leadership','management')),
  sort_order    int not null default 0,
  published     boolean not null default true,
  linkedin_url  text
);

create index if not exists team_members_order_idx on public.team_members (sort_order);

alter table public.team_members enable row level security;

drop policy if exists "team: public reads published" on public.team_members;
create policy "team: public reads published"
  on public.team_members for select to anon using (published);

drop policy if exists "team: admin full access" on public.team_members;
create policy "team: admin full access"
  on public.team_members for all to authenticated using (true) with check (true);

drop trigger if exists team_members_touch_updated_at on public.team_members;
create trigger team_members_touch_updated_at
  before update on public.team_members
  for each row execute function public.touch_updated_at();

-- The seven people the Emergent build published, verbatim. Seeded only into an
-- empty table, so re-running this file never duplicates or resurrects anyone.
insert into public.team_members (name, role, bio, photo_url, credentials, tier, sort_order)
select * from (values
  ('Virang P Patel', 'Founder & Managing Director',
   'Leading a dedicated team committed to delivering exceptional financial and accounting solutions with highest standards of service, integrity, and professionalism.',
   '/assets/team/virang-patel.webp', array['QuickBooks ProAdvisor'], 'leadership', 1),
  ('Niket Bhatt', 'Founder & Managing Director',
   'Building strong, lasting relationships with clients through trust, open communication, and bespoke advice that aligns with your vision.',
   '/assets/team/niket-bhatt.webp', array['Client Relations','Advisory'], 'leadership', 2),
  ('Vandana Patel', 'Chief Executive Officer (CEO)',
   'A seasoned Chartered Accountant with extensive industry experience, delivering reliable, transparent, and client-focused solutions.',
   '/assets/team/vandana-patel.webp', array['CA','Tax Expert'], 'leadership', 3),
  ('Darshan Thakkar', 'Senior Manager – Direct Client',
   'Managing direct client relationships with expertise and dedication.',
   '/assets/team/darshan-thakkar.webp', array['Client Management'], 'management', 4),
  ('Raj Barot', 'Senior Manager – Onboarding & Transition',
   'Ensuring smooth onboarding and seamless transitions for all clients.',
   '/assets/team/raj-barot.webp', array['Onboarding Expert'], 'management', 5),
  ('Meet Barot', 'Senior Manager – Taxation',
   'Expert in taxation with comprehensive knowledge of tax compliance and planning.',
   '/assets/team/meet-barot.webp', array['EA','Tax Specialist'], 'management', 6),
  ('Kishan Thakor', 'Manager – Operations',
   'Managing day-to-day operations with efficiency and precision.',
   '/assets/team/kishan-thakor.webp', array['Operations'], 'management', 7)
) as seed(name, role, bio, photo_url, credentials, tier, sort_order)
where not exists (select 1 from public.team_members);

-- ---------------------------------------------------------------------------
-- 5. testimonials — Admin > Testimonials
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  quote       text not null,
  name        text not null,
  role        text,
  company     text,
  rating      int not null default 5 check (rating between 0 and 5),
  sort_order  int not null default 0,
  published   boolean not null default false
);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials: public reads published" on public.testimonials;
create policy "testimonials: public reads published"
  on public.testimonials for select to anon using (published);

drop policy if exists "testimonials: admin full access" on public.testimonials;
create policy "testimonials: admin full access"
  on public.testimonials for all to authenticated using (true) with check (true);

drop trigger if exists testimonials_touch_updated_at on public.testimonials;
create trigger testimonials_touch_updated_at
  before update on public.testimonials
  for each row execute function public.touch_updated_at();

-- The five quotes from the Emergent build, seeded UNPUBLISHED.
-- They were shown with Unsplash stock headshots and could not be verified as
-- real clients. The client confirms each one (or replaces it) and publishes
-- it from Admin > Testimonials. Until then the section does not render.
insert into public.testimonials (quote, name, role, company, rating, sort_order, published)
select * from (values
  ('ANAV Global has been instrumental in streamlining our accounting processes. Their team is professional, responsive, and incredibly knowledgeable. We''ve seen a 40% reduction in our accounting costs.',
   'Michael Chen', 'CEO', 'TechStart Inc.', 5, 1, false),
  ('As a CPA firm, we needed reliable outsourcing partners. ANAV Global exceeded our expectations with their attention to detail and quick turnaround times. Highly recommended!',
   'Sarah Johnson', 'CPA', 'Johnson & Associates', 5, 2, false),
  ('The team at ANAV Global provides exceptional service. They handle our multi-location bookkeeping seamlessly and their monthly reports are invaluable for decision making.',
   'David Rodriguez', 'CFO', 'Retail Solutions Group', 5, 3, false),
  ('Working with ANAV Global has been a game-changer for our business. Their cloud-based solutions and proactive approach have saved us countless hours.',
   'Emily Williams', 'Owner', 'Williams Consulting', 5, 4, false),
  ('ANAV Global''s expertise and dedication to quality have made them an invaluable partner. Their team integrates seamlessly with ours and delivers consistently excellent results.',
   'James Patterson', 'Managing Partner', 'Patterson & Co. CPA', 5, 5, false)
) as seed(quote, name, role, company, rating, sort_order, published)
where not exists (select 1 from public.testimonials);

-- ---------------------------------------------------------------------------
-- 6. Storage — one public bucket for everything the admin uploads
--
-- World-readable by design (post covers, inline images and team photos are all
-- published), admin-writable only. The site has no public upload path, so
-- there is nothing confidential to store and no private bucket.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,                   -- 10 MB
  array['image/jpeg','image/png','image/webp','image/avif','image/gif']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site-media: anyone can read" on storage.objects;
create policy "site-media: anyone can read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "site-media: admin can write" on storage.objects;
create policy "site-media: admin can write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "site-media: admin can update" on storage.objects;
create policy "site-media: admin can update"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media');

drop policy if exists "site-media: admin can delete" on storage.objects;
create policy "site-media: admin can delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media');
