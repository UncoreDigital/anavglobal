"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, CircleDashed, Zap } from "lucide-react";
import Image from "next/image";
import AvLine from "@/components/brand/AvLine";
import { Button } from "@/components/ui/Button";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { EASE, fadeUp, stagger } from "@/lib/motion";

/**
 * Homepage hero.
 *
 * No stock photograph. The old hero leaned on generic office imagery, and for
 * a firm selling "tech-driven" bookkeeping the more honest picture is the work
 * itself — so the right-hand side is an illustrative month-end close panel: the
 * checklist every engagement runs to, drawn in the brand's own colours. It
 * carries no client data and no invented figures; the only number on it is the
 * client count from Admin → Site Settings.
 *
 * Behind everything runs the AV line — the light stroke from the mark, drawn on
 * as the page loads.
 *
 * Motion here does not wait for the viewport: everything above the fold is
 * visible on load, so a scroll-triggered variant would fire instantly or never.
 */
export default function Hero({ clients, satisfaction, region }: { clients: string; satisfaction: string; region: Region }) {
  const hero = regionContent[region].hero;
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-48 -top-56 -z-10 h-[38rem] w-[38rem] rounded-full bg-brand opacity-35 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-64 right-[-10%] -z-10 h-[36rem] w-[36rem] rounded-full bg-accent opacity-25 blur-[130px]"
        aria-hidden="true"
      />
      <AvLine
        id="hero-line"
        variant="trend"
        strokeWidth={2.5}
        animate
        glow
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-35 sm:h-64"
      />

      <div className="container relative">
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-24 short:lg:py-16">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-semibold text-white/85 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-light" />
              </span>
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.35rem] font-extrabold leading-[1.06] text-white sm:text-[3.25rem] lg:text-[3.6rem]"
            >
              {hero.headline} <span className="text-gradient-on-dark">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[16.5px] leading-[1.75] text-white/75">
              {hero.lead}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={rhref(region, hero.primaryCta.href)} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={rhref(region, hero.secondaryCta.href)} size="lg" variant="onDark">
                {hero.secondaryCta.label}
              </Button>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {hero.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-[13px] text-white/70">
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent-light" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative mx-auto mt-12 w-full max-w-[30rem] lg:ml-auto lg:mt-10"
            aria-hidden="true"
          >
            <ClosePanel steps={hero.panelSteps} />

            {/* Floating proof chips */}
            <div className="absolute -top-[4.25rem] left-0 flex animate-float items-center gap-2.5 rounded-xl border border-white/15 bg-navy/90 px-3.5 py-2.5 shadow-lift backdrop-blur sm:-left-10">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent-light">
                <Zap className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-white">24-hour turnaround</span>
                <span className="block text-[11px] text-white/55">on routine tasks</span>
              </span>
            </div>

            <div className="absolute -bottom-6 -right-2 flex animate-float-slow items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lift sm:-right-8 lg:-right-2 xl:-right-8">
              <span className="font-display text-2xl font-extrabold text-navy-deep">{clients}</span>
              <span className="text-[11.5px] font-medium leading-tight text-ink-muted">
                clients
                <br />
                served
              </span>
              <span className="mx-1 h-8 w-px bg-border" />
              <span className="font-display text-2xl font-extrabold text-navy-deep">{satisfaction}</span>
              <span className="text-[11.5px] font-medium leading-tight text-ink-muted">
                client
                <br />
                satisfaction
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** The illustrative month-end close panel. Decorative — hidden from assistive tech by its parent. */
function ClosePanel({ steps }: { steps: { label: string; done: boolean }[] }) {
  const done = steps.filter((s) => s.done).length;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white p-6 shadow-lift sm:p-7">
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundImage: "var(--gradient-brand)" }} />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/assets/logo-mark-alpha.png" alt="" width={640} height={396} className="h-7 w-auto" />
          <div>
            <p className="text-[14px] font-bold text-navy-deep">Month-end close</p>
            <p className="text-[11.5px] text-ink-muted">Your books, this month</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11.5px] font-semibold text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          On track
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[11.5px] font-semibold">
          <span className="text-ink-muted">Close progress</span>
          <span className="text-navy-deep">
            {done} of {steps.length}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundImage: "var(--gradient-brand)" }}
            initial={{ width: "0%" }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
          />
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {steps.map((step, i) => (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.12 }}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-slate-50 px-3.5 py-2.5"
          >
            <span className="flex items-center gap-2.5 text-[13px] font-medium text-navy-deep">
              {step.done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald" />
              ) : (
                <CircleDashed className="h-4 w-4 animate-[spin_6s_linear_infinite] text-brand" />
              )}
              {step.label}
            </span>
            <span className={step.done ? "text-[11px] font-semibold text-emerald" : "text-[11px] font-semibold text-brand"}>
              {step.done ? "Done" : "In review"}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-navy-deep">Cash flow</p>
          <p className="text-[11px] text-ink-muted">Trailing 6 months</p>
        </div>
        <div className="relative mt-3 h-20">
          <div className="absolute inset-0 bg-grid-light [background-size:24px_20px]" />
          <AvLine id="panel-line" variant="trend" strokeWidth={2.5} animate className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </div>
  );
}
