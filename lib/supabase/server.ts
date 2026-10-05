import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "./types";

const url = () => process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cookie-free client, for reading published content.
 *
 * This exists because `cookies()` cannot be called outside a request scope, and
 * `generateStaticParams` — plus every page body during static generation — runs
 * without one. Using the session-bound client below for public reads throws
 * "cookies was called outside a request scope" at build time, which stays
 * hidden until the moment Supabase is actually configured.
 *
 * Public reads have no business touching the session anyway. Everything they
 * fetch is guarded by the anon row-level-security policies in
 * supabase/migrations/0001_init.sql, so an anonymous client returns exactly
 * what a visitor is allowed to see — and, unlike the cookie-bound client, it
 * does not opt the whole route into dynamic rendering.
 *
 * `persistSession: false` because there is no browser here to persist one to.
 */
export function createStaticClient() {
  const u = url();
  const k = anonKey();
  if (!u || !k) return null;

  return createSupabaseClient<Database>(u, k, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Session-bound client, for anything that depends on who is signed in — which
 * on this site means the admin tree and nothing else.
 *
 * Returns null rather than throwing when the env is absent: a page should
 * degrade to its "not configured" state on a misconfigured preview deploy, not
 * 500.
 */
export function createClient() {
  const u = url();
  const k = anonKey();
  if (!u || !k) return null;

  const cookieStore = cookies();

  return createServerClient<Database>(u, k, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      /*
        Server components cannot write cookies. The session refresh that would
        need to happen here is done in middleware.ts instead, so these are
        no-ops guarded against the throw Next raises on a write attempt.
      */
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* called from a Server Component — middleware handles the refresh */
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          /* as above */
        }
      },
    },
  });
}
