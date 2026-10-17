-- ============================================================================
-- ANAV Global — remove Darshan Thakkar from the team page (client request,
-- October 2026). Run after 0009_team_linkedin.sql. Safe to re-run.
-- ============================================================================

delete from public.team_members where name = 'Darshan Thakkar';

-- Check: expect six people — three leadership, three management.
select name, tier, linkedin_url from public.team_members order by sort_order;
