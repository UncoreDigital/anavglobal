"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        /*
          Deliberately generic. Distinguishing "no such user" from "wrong
          password" tells an attacker which admin emails exist.
        */
        setError("Those credentials were not recognised.");
        setPending(false);
        return;
      }

      /*
        `next` is echoed back from the middleware redirect, so it is attacker-
        controllable. Only same-origin paths are honoured — an absolute URL here
        would turn the login into an open redirect.
      */
      const next = searchParams.get("next");
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Could not reach the authentication service. Please try again.");
      setPending(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
        <h2 className="flex items-center gap-2.5 text-[15px] font-bold text-navy-deep">
          <AlertCircle className="h-4 w-4 text-accent-dark" aria-hidden="true" />
          Supabase is not configured
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
          Set <code className="rounded bg-white px-1.5 py-0.5 text-[12.5px]">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-[12.5px]">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          in <code className="rounded bg-white px-1.5 py-0.5 text-[12.5px]">.env.local</code>, then
          run the migrations in <code className="rounded bg-white px-1.5 py-0.5 text-[12.5px]">supabase/migrations</code>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-navy-deep">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="field"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] font-semibold text-navy-deep">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/25 bg-destructive/5 p-3.5 text-[13px] text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <Button type="submit" size="lg" variant="navy" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" aria-hidden="true" />
            Sign in
          </>
        )}
      </Button>

      <p className="text-center text-[12.5px] leading-relaxed text-slate-400">
        Powered by{" "}
        <a
          href={site.builtBy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline transition-colors hover:text-brand-dark"
        >
          {site.builtBy.name}
        </a>
        .
      </p>
    </form>
  );
}
