-- ============================================================================
-- ANAV Global — new-lead email notification
-- Run after 0002_seed_insights.sql. Safe to re-run: everything is idempotent.
--
-- Emails the firm whenever a row lands in public.leads, by calling the
-- lead-notification edge function. This replaces the old site's web3forms
-- integration, which emailed a submission and stored nothing.
--
-- BEFORE RUNNING: replace <PROJECT_REF> below with your Supabase project ref
-- (Dashboard > Project Settings > General).
--
-- ORDER OF OPERATIONS — all four steps, or no email arrives:
--
--   1. Pick a shared secret. Any long random string; it is NOT a Supabase key:
--        openssl rand -hex 32
--
--   2. Give it to the function, with the SMTP settings:
--        supabase secrets set WEBHOOK_SECRET=<that string>
--        supabase secrets set SMTP_HOST=smtp.gmail.com SMTP_PORT=465 \
--          SMTP_USER=<sending mailbox> SMTP_PASS=<app password> \
--          NOTIFICATION_EMAIL=accounting@anavglobal.com
--
--   3. Deploy with JWT verification OFF (supabase/config.toml already sets it):
--        supabase functions deploy lead-notification
--
--   4. Give the SAME shared secret to the database, then run this file:
--        select vault.create_secret(
--          '<that same string>', 'lead_notification_secret',
--          'Shared secret sent as x-webhook-secret to lead-notification'
--        );
--
-- WITHOUT THE CLI (dashboard only): do steps 1 and 4 in the SQL editor, then
-- copy the value into Edge Functions > Secrets as WEBHOOK_SECRET:
--        select vault.create_secret(
--          replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
--          'lead_notification_secret',
--          'Shared secret sent as x-webhook-secret to lead-notification'
--        );
--        select decrypted_secret from vault.decrypted_secrets
--        where name = 'lead_notification_secret';
--
-- WHY A SHARED SECRET RATHER THAN A SUPABASE KEY
-- Supabase's current key format is not accepted in an `Authorization: Bearer`
-- header. The gateway rejects such a call before the function starts, so the
-- failure leaves no trace in the invocation log. A secret in our own header is
-- checked inside the function, so a bad call is logged as a 401 instead.
-- ============================================================================

create extension if not exists pg_net;
create extension if not exists supabase_vault with schema vault;

create or replace function public.notify_lead_webhook()
returns trigger
language plpgsql
security definer
-- pg_net may live in `net` or `extensions` depending on project age; this
-- search_path covers both, so `http_post` below is deliberately unqualified.
set search_path = public, net, extensions, vault
as $$
declare
  fn_url      text := 'https://<PROJECT_REF>.supabase.co/functions/v1/lead-notification';
  hook_secret text;
begin
  select decrypted_secret into hook_secret
  from vault.decrypted_secrets
  where name = 'lead_notification_secret';

  if coalesce(hook_secret, '') = '' then
    -- Loud, because the alternative is leads arriving that nobody is told about.
    raise warning
      'notify_lead_webhook: vault secret "lead_notification_secret" is missing — no notification sent for %',
      TG_TABLE_NAME;
    return NEW;
  end if;

  -- Asynchronous: queues the request and returns immediately, so the INSERT
  -- never waits on SMTP and a slow mail server cannot time out the form.
  perform http_post(
    url     := fn_url,
    headers := jsonb_build_object(
                 'Content-Type',     'application/json',
                 'x-webhook-secret', hook_secret
               ),
    body    := jsonb_build_object(
                 'type',   TG_OP,
                 'table',  TG_TABLE_NAME,
                 'schema', TG_TABLE_SCHEMA,
                 'record', to_jsonb(NEW)
               ),
    -- An SMTP handshake plus an edge-function cold start routinely exceeds
    -- pg_net's 5s default, which would be logged as a failure even when the
    -- mail went out.
    timeout_milliseconds := 30000
  );

  return NEW;
end;
$$;

drop trigger if exists leads_notify on public.leads;
create trigger leads_notify
  after insert on public.leads
  for each row execute function public.notify_lead_webhook();

-- ---------------------------------------------------------------------------
-- Set-up check — the SQL editor shows this row as the result of the run.
--
-- Both mistakes it looks for are silent later: the form still says "thank
-- you", the lead is saved, but no request ever reaches the function, so its
-- invocation log stays empty and no email arrives. The placeholder is spelled
-- in pieces so a find-and-replace of it leaves this check intact.
-- ---------------------------------------------------------------------------
select case
  when strpos(p.prosrc, '<' || 'PROJECT_REF' || '>') > 0 then
    'NOT READY: the function URL still contains the PROJECT_REF placeholder. '
    || 'Replace it with your project ref (Project Settings > General) and run this file again.'
  when not exists (
    select 1 from vault.decrypted_secrets
    where name = 'lead_notification_secret' and coalesce(decrypted_secret, '') <> ''
  ) then
    'NOT READY: Vault secret "lead_notification_secret" is missing, so the trigger skips the call. '
    || 'Do step 4 at the top of this file, then send a test enquiry.'
  else
    'READY: new leads are posted to ' || substring(p.prosrc from 'https://[^'']+')
    || ' — send a test enquiry, then run the check below.'
end as lead_notification_setup
from pg_proc p
where p.proname = 'notify_lead_webhook' and p.pronamespace = 'public'::regnamespace;

-- ---------------------------------------------------------------------------
-- Checking it worked:
--
--   select id, status_code, error_msg, created from net._http_response order by created desc limit 5;
--
-- 200  delivered.
-- 401  the Vault secret and WEBHOOK_SECRET do not match.
-- 5xx  the function ran and threw — read the Edge Function logs.
-- no status_code, error_msg set  the request never left — almost always the
--      URL (is the PROJECT_REF placeholder still in it?).
-- no row at all  the Vault secret is missing (the trigger skips the call), the
--      trigger did not fire, or pg_net is not installed.
-- ---------------------------------------------------------------------------
