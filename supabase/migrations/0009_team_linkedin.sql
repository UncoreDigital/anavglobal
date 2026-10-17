-- ============================================================================
-- ANAV Global — team LinkedIn profiles, as supplied by the client (October 2026)
-- Run after 0008_seed_blog_bookkeeping.sql. Safe to re-run.
--
-- Each team card shows a LinkedIn button once its link is set. These are the
-- links the client sent; they replace whatever is stored for that person.
-- (Darshan Thakkar has no link: he is removed from the site in 0010.)
-- ============================================================================

update public.team_members as t
set linkedin_url = v.url
from (values
  ('Virang P Patel',  'https://www.linkedin.com/in/virang-p-patel-15508a66'),
  ('Niket Bhatt',     'https://www.linkedin.com/in/niket-bhatt-82621612a'),
  ('Vandana Patel',   'https://www.linkedin.com/in/ca-vandana-patel-5b102636'),
  ('Raj Barot',       'https://www.linkedin.com/in/raj-barot-13986b176'),
  ('Meet Barot',      'https://www.linkedin.com/in/meet-barot-ea-license-awaiting-0ab0462bb'),
  ('Kishan Thakor',   'https://www.linkedin.com/in/kishankumar-thakor-6a5105242')
) as v(name, url)
where t.name = v.name
  and t.linkedin_url is distinct from v.url;

-- Check: the six people above should each have a link.
select name, linkedin_url from public.team_members order by sort_order;
