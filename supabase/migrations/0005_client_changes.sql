-- ============================================================================
-- ANAV Global — client change list, October 2026
-- Run after 0004_regions.sql. Safe to re-run.
--
-- Two of the client's changes live in the database rather than the code:
--
--   * Office hours — "We are not working on Saturday". Saturday becomes Closed.
--     Only the value 0001 seeded is replaced, so an hour someone has since set
--     in Admin → Site Settings is left alone.
--
--   * LinkedIn on the team page — "All team managers and owners need LinkedIn
--     ID". Each team card shows a LinkedIn button once its link is set. Only
--     Niket Bhatt's public profile could be matched to ANAV with confidence;
--     the others are added in Admin → Team → Edit → "LinkedIn profile" as the
--     client sends them. Existing links are never overwritten.
-- ============================================================================

update public.site_settings
set value = 'Closed'
where key = 'hours_saturday' and value = '10:00 AM – 2:00 PM';

update public.team_members
set linkedin_url = 'https://www.linkedin.com/in/niket-bhatt-82621612a/'
where name = 'Niket Bhatt' and coalesce(linkedin_url, '') = '';
