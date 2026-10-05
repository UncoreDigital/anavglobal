-- ============================================================================
-- ANAV Global — US / UK country sites
-- Run after 0003_lead_notification.sql. Safe to re-run.
--
-- The site now has a USA / UK switcher (US at /, UK at /uk). This adds:
--   * leads.region   — which country site an enquiry came from ('us' | 'uk')
--   * posts.region   — which site a post shows on ('all' | 'us' | 'uk')
--   * phone_uk       — the UK phone number, edited in Admin → Site Settings
--
-- The app works before this is run: the contact form retries without the
-- region, and posts without one show on both sites. Running it turns on the
-- site filter in Admin → Leads and the "Show on" option in the post editor.
-- ============================================================================

alter table public.leads
  add column if not exists region text not null default 'us';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_region_check') then
    alter table public.leads add constraint leads_region_check check (region in ('us', 'uk'));
  end if;
end $$;

-- Leads that arrived through /uk/… before this column existed.
update public.leads set region = 'uk' where region = 'us' and source_page like '/uk%';

create index if not exists leads_region_idx on public.leads (region);

alter table public.posts
  add column if not exists region text not null default 'all';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'posts_region_check') then
    alter table public.posts add constraint posts_region_check check (region in ('all', 'us', 'uk'));
  end if;
end $$;

-- No UK number was published on the old site. Until one is set, the UK site
-- leads with email and WhatsApp instead of showing a US number.
insert into public.site_settings (key, value, label, group_name, sort_order) values
  ('phone_uk', null, 'Phone (UK) — shown on the UK site', 'contact', 4)
on conflict (key) do nothing;

-- Keep the existing contact rows in a sensible order around the new one.
update public.site_settings set sort_order = 5 where key = 'whatsapp_primary' and sort_order = 4;
update public.site_settings set sort_order = 6 where key = 'whatsapp_secondary' and sort_order = 5;
update public.site_settings set sort_order = 7 where key = 'hours_weekdays' and sort_order = 6;
update public.site_settings set sort_order = 8 where key = 'hours_saturday' and sort_order = 7;
update public.site_settings set sort_order = 9 where key = 'hours_sunday' and sort_order = 8;
