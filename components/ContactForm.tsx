"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { countries } from "@/lib/content";
import { regionContent } from "@/lib/region-content";
import { regions, type Region } from "@/lib/regions";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<string, string>>;

/**
 * The lead form.
 *
 * Validates with the same Zod schema the API route uses, so the two cannot
 * drift. Field errors are shown inline and the first invalid field is focused.
 *
 * On success the form is replaced rather than cleared: a blank form after
 * submission reads as "that did not go through" and produces duplicates.
 *
 * Replaces the old site's web3forms integration, which emailed a submission
 * and kept nothing. Every enquiry now lands in Admin → Leads as well.
 */
export default function ContactForm({ defaultService, region = "us" }: { defaultService?: string; region?: Region }) {
  const { serviceInterests, enquirerTypes } = regionContent[region];
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : []);
  const [enquirer, setEnquirer] = useState<string>("");

  /*
    Service pages link here as /contact?service=Payroll%20Services. Read on the
    client rather than through searchParams, so /contact stays a static page;
    only names that are real options are accepted.
  */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && serviceInterests.includes(requested)) {
      setSelected((current) => (current.includes(requested) ? current : [...current, requested]));
    }
  }, [serviceInterests]);

  const toggleService = (value: string) =>
    setSelected((current) => (current.includes(value) ? current.filter((s) => s !== value) : [...current, value]));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      enquirerType: enquirer,
      services: selected,
      message: String(data.get("message") ?? ""),
      sourcePage: pathname,
      region,
      website: String(data.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setState("sent");
    } catch (error) {
      setState("error");
      setFormError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald/25 bg-mint-light p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-7 w-7 text-emerald" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-xl font-bold text-navy-deep">Thank you — we have your message.</h2>
        {/* VERBATIM promise from the old form: "we'll get back to you within 24 hours". */}
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          A member of our team will get back to you within 24 hours to arrange your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className="label">I am a…</legend>
        {/* Stacked below 360px: at 320 a third of the row is narrower than the word "accounting". */}
        <div className="grid grid-cols-1 gap-1 rounded-xl bg-slate-100 p-1 [@media(min-width:360px)]:grid-cols-3 [@media(min-width:360px)]:gap-2">
          {enquirerTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEnquirer(enquirer === type ? "" : type)}
              aria-pressed={enquirer === type}
              className={cn(
                "rounded-lg px-2 py-2.5 text-[12.5px] font-semibold transition-all sm:text-[13px]",
                enquirer === type ? "bg-white text-navy-deep shadow-soft" : "text-ink-muted hover:text-navy-deep"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={errors.name} autoComplete="name" placeholder="John Doe" />
        <Field
          label="Email address"
          name="email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
          placeholder="john@company.com"
        />
        <Field label="Phone number" name="phone" type="tel" error={errors.phone} autoComplete="tel" placeholder="+1 (555) 123-4567" />
        <Field label="Company name" name="company" error={errors.company} autoComplete="organization" placeholder="Your company" />
      </div>

      <div>
        <label htmlFor="country" className="label">
          Where are you based?
        </label>
        <select id="country" name="country" defaultValue={regions[region].country} className="field">
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="label">Services you are interested in</legend>
        <div className="flex flex-wrap gap-2">
          {serviceInterests.map((service) => {
            const active = selected.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-medium transition-all",
                  active
                    ? "border-accent bg-accent/15 text-navy-deep"
                    : "border-border bg-white text-ink-muted hover:border-brand/40 hover:text-navy-deep"
                )}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="label">
          Message <span className="text-accent-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your needs — software you use, monthly volumes, deadlines…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-[14.5px] text-ink transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2",
            errors.message
              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
              : "border-input focus:border-brand focus:ring-brand/20"
          )}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

      {/* Honeypot. Hidden from sight, from the accessibility tree and the tab order. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-[13.5px] text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={state === "submitting"}>
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-center text-[12.5px] leading-relaxed text-slate-400">
        We use your details only to respond to this enquiry. No third-party sharing.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
        {required && <span className="ml-1 text-accent-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn("field", error && "border-destructive focus:border-destructive focus:ring-destructive/20")}
      />
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-1.5 text-[12.5px] text-destructive">
      {children}
    </p>
  );
}
