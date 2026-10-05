import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AvLine from "@/components/brand/AvLine";
import Logo from "@/components/brand/Logo";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-5 py-16">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute -left-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand opacity-30 blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent opacity-20 blur-[120px]" aria-hidden="true" />
      <AvLine
        id="login-line"
        variant="trend"
        strokeWidth={2}
        glow
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-30"
      />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex justify-center" aria-label="ANAV Global home">
          <Logo variant="stacked" tone="dark" className="h-28" />
        </Link>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white p-8 shadow-lift">
          <h1 className="text-xl font-extrabold text-navy-deep">Admin sign in</h1>
          <p className="mt-2 text-[13.5px] text-ink-muted">Manage leads, insights, team, testimonials and site settings.</p>
          <div className="mt-7">
            {/* useSearchParams inside LoginForm needs a Suspense boundary to keep the page static. */}
            <Suspense fallback={<div className="h-72" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <Link href="/" className="mt-6 block text-center text-[13px] text-white/50 transition-colors hover:text-accent-light">
          ← Back to the site
        </Link>
      </div>
    </div>
  );
}
