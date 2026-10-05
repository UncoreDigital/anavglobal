"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger, viewport, viewportTall } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal.
 *
 * Wrapping rather than per-element `whileInView` props keeps the motion
 * vocabulary in lib/motion.ts and out of the page files — a section that wants
 * different movement picks a different variant instead of tuning numbers where
 * nobody will find them again.
 */

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  /** Seconds. Use sparingly; prefer RevealGroup for sequenced children. */
  delay?: number;
  /** Trigger earlier, for sections taller than the viewport. */
  tall?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
};

export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  tall = false,
  className,
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={tall ? viewportTall : viewport}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

/**
 * Parent for a staggered group. Children must be <RevealItem> (or any motion
 * element using the same variant names) for the stagger to reach them.
 */
export function RevealGroup({
  children,
  className,
  variants = stagger,
  tall = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  tall?: boolean;
  as?: "div" | "ul" | "section";
}) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={tall ? viewportTall : viewport}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component variants={variants} className={cn(className)}>
      {children}
    </Component>
  );
}
