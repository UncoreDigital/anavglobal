import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The one button.
 *
 * `accent` is the primary CTA — the mark's green with a navy label (8.7:1) —
 * and owns conversion. There should never be two competing accent buttons in
 * one viewport. `brand` is the secondary action, `outline` and `ghost` are for
 * toolbars and the admin, `onDark` is the outline inverted for navy bands.
 *
 * Renders an <a> when given `href` (internal links go through next/link) and a
 * <button> otherwise, so callers never have to think about which they get.
 */

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const variants = {
  accent:
    "text-navy-deep shadow-accent hover:shadow-lift hover:-translate-y-0.5 [background-image:var(--gradient-accent-x)] hover:[background-image:var(--gradient-accent-x-hover)]",
  brand: "bg-brand text-white shadow-brand hover:bg-brand-dark hover:shadow-lift hover:-translate-y-0.5",
  navy: "bg-navy-deep text-white hover:bg-navy hover:-translate-y-0.5 hover:shadow-lift",
  outline: "border border-border bg-white text-navy-deep hover:border-brand hover:bg-brand/5 hover:text-brand",
  onDark:
    "border border-white/25 bg-white/5 text-white backdrop-blur hover:border-accent-light/70 hover:bg-white/10",
  ghost: "text-ink-muted hover:bg-muted hover:text-navy-deep",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-[15px]",
} as const;

export type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "accent",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
