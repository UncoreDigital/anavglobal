import type { Transition, Variants } from "framer-motion";

/**
 * Shared Framer Motion variants.
 *
 * Centralised so the whole site moves with one vocabulary: every reveal uses
 * the same distance, the same easing and the same duration, and a section that
 * wants to feel different does it by choosing a different variant rather than
 * by inventing new numbers inline.
 *
 * The easing is a custom cubic rather than "easeOut" — it decelerates harder at
 * the tail, which reads as weight. Financial brands look flimsy when elements
 * float to a stop; this lands them.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = { duration: 0.6, ease: EASE };

/** Distance a revealing element travels. 24px: visible, never janky. */
const DISTANCE = 24;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  show: { opacity: 1, y: 0, transition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -DISTANCE },
  show: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: DISTANCE },
  show: { opacity: 1, x: 0, transition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -DISTANCE },
  show: { opacity: 1, x: 0, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition },
};

/**
 * Parent for staggered groups. `delayChildren` is deliberately small: the
 * viewport trigger already fires slightly before the group is fully on screen,
 * so a long lead-in reads as lag rather than as choreography.
 */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045 },
  },
};

/**
 * Standard viewport config for scroll-triggered reveals.
 *
 * `once` matters: re-animating on every scroll-back turns a long marketing page
 * into a flicker reel.
 *
 * The trigger is a root margin rather than an `amount` fraction, because
 * `amount` is a share of the *element's own area* and so becomes unreachable
 * once the element grows taller than the viewport. That is not hypothetical:
 * the team page's leadership group stacks five 3:4 portrait cards on mobile,
 * which makes the container roughly 3,700px against a ~700px viewport — a peak
 * intersection ratio of about 0.19, permanently short of a 0.2 threshold. The
 * group never left `hidden`, and the cards rendered as page-height blank space.
 *
 * A negative bottom margin measures the viewport instead: the reveal fires when
 * the element's top edge crosses 12% above the fold, which behaves the same for
 * a short card and cannot be starved by a tall one.
 */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Earlier trigger, for sections that should be settled before they are read. */
export const viewportTall = { once: true, margin: "0px 0px -4% 0px" } as const;

/** Card hover lift, shared by service, industry and post cards. */
export const hoverLift = {
  y: -6,
  transition: { duration: 0.3, ease: EASE },
} as const;
