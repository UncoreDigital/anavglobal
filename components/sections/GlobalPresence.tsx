"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import CountryCode from "@/components/CountryCode";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { regions, type Region } from "@/lib/regions";
import { offices } from "@/lib/site";

/**
 * Three offices, three live clocks.
 *
 * A list of addresses claims coverage; three running clocks demonstrate it.
 * The point the section makes is the one a client actually cares about — with
 * the delivery centre in India, work sent at the end of a US or UK day is
 * worked on overnight and back by the next morning, which is how the old
 * site's "24-hour turnaround" is possible at all.
 *
 * The UK site promises five working days from the last piece of information
 * instead (client change list, October 2026), so it does not repeat the
 * overnight claim either.
 */
export default function GlobalPresence({ region = "us" }: { region?: Region }) {
  /* The current country's office leads. */
  const list = [...offices].sort((a, b) => Number(b.id === regions[region].officeId) - Number(a.id === regions[region].officeId));
  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-grid-light mask-fade-b" aria-hidden="true" />
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <span className="eyebrow mb-4">Global Presence</span>
            <h2 className="text-[1.8rem] font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.65rem]">
              Three offices.{" "}
              <span className="text-gradient-brand sm:block">One team, around the clock.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.75] text-ink-muted">
              {region === "uk"
                ? "With offices in the UK, the USA and India, your work keeps moving after your day ends — our team in India picks it up while the UK is offline."
                : "With offices in the USA, the UK and India, your work keeps moving after your day ends. Send it in the evening; it is reconciled, prepared and waiting for review by the time your office opens."}
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <p className="text-[14px] text-navy-deep">
                {region === "uk" ? (
                  <>
                    <strong className="font-semibold">5 working days turnaround</strong>{" "}
                    <span className="text-ink-muted">once we receive the last piece of information.</span>
                  </>
                ) : (
                  <>
                    <strong className="font-semibold">24-hour turnaround</strong>{" "}
                    <span className="text-ink-muted">on routine tasks, across every time zone we serve.</span>
                  </>
                )}
              </p>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {list.map((office) => (
              <RevealItem
                key={office.id}
                className="card-edge group flex flex-col p-6 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <CountryCode code={office.code} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">{office.role}</span>
                </div>
                <Clock timezone={office.timezone} label={office.tzLabel} />
                <h3 className="mt-1 text-[15px] font-bold text-navy-deep">{office.label}</h3>
                <p className="mt-3 flex flex-1 gap-2 text-[13px] leading-relaxed text-ink-muted">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                  {office.address}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/**
 * One live clock. Renders an em dash until mounted rather than the server's
 * time — hydrating a server time that differs from the visitor's is both a
 * React warning and a visibly wrong number.
 */
function Clock({ timezone, label }: { timezone: string; label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: timezone }).format(
        new Date()
      );
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <p className="mt-6 font-display text-[1.9rem] font-extrabold tabular-nums leading-none text-navy-deep">
      {time ?? "—"}
      <span className="ml-1.5 align-middle text-[12px] font-semibold text-slate-400">{label}</span>
    </p>
  );
}
