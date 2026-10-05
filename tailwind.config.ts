import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      /*
        Height-based variant. The hero has to clear the fold, and on a laptop the
        binding constraint is vertical, not horizontal.
      */
      screens: {
        short: { raw: "(max-height: 820px)" },
      },
      /*
        Every colour carries the <alpha-value> placeholder. Without it Tailwind
        cannot build opacity modifiers and — the dangerous part — does not warn:
        `bg-brand/10` silently produces no rule at all.

        The CSS variables must stay in space-separated `H S% L%` form for this to
        work. A variable written as `hsl(226 75% 53%)` would break it.
      */
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        /* ---- Brand tokens, sampled from the ANAV Global mark ---- */

        /* Navy — the wordmark ink, and every dark band. */
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          deep: "hsl(var(--navy-deep) / <alpha-value>)",
          light: "hsl(var(--navy-light) / <alpha-value>)",
        },
        /* Royal blue — the left leg of the A. The primary. */
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          dark: "hsl(var(--brand-dark) / <alpha-value>)",
          light: "hsl(var(--brand-light) / <alpha-value>)",
          bright: "hsl(var(--brand-bright) / <alpha-value>)",
        },
        /* Teal — where the A meets the V. */
        teal: {
          DEFAULT: "hsl(var(--teal) / <alpha-value>)",
          deep: "hsl(var(--teal-deep) / <alpha-value>)",
          light: "hsl(var(--teal-light) / <alpha-value>)",
        },
        /*
          Green — the right arm of the V, and the accent. Owns primary CTAs.
          Named for the role ("the colour that owns conversion") rather than the
          hue, so a rebrand is a token change, not a find-and-replace.
        */
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          dark: "hsl(var(--accent-dark) / <alpha-value>)",
          light: "hsl(var(--accent-light) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        /* Mint — the light stroke running through the mark. Surfaces only. */
        mint: {
          DEFAULT: "hsl(var(--mint) / <alpha-value>)",
          light: "hsl(var(--mint-light) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          muted: "hsl(var(--ink-muted) / <alpha-value>)",
        },
        /* Success / verified states. Tied to the accent so it never reads as a third hue. */
        emerald: {
          DEFAULT: "hsl(var(--emerald) / <alpha-value>)",
          light: "hsl(var(--emerald-light) / <alpha-value>)",
          mint: "hsl(var(--emerald-mint) / <alpha-value>)",
        },
        slate: {
          50: "hsl(var(--slate-50) / <alpha-value>)",
          100: "hsl(var(--slate-100) / <alpha-value>)",
          200: "hsl(var(--slate-200) / <alpha-value>)",
          400: "hsl(var(--slate-400) / <alpha-value>)",
          600: "hsl(var(--slate-600) / <alpha-value>)",
          800: "hsl(var(--slate-800) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 2px 10px -2px hsl(220 70% 11% / 0.10)",
        card: "0 10px 30px -6px hsl(220 70% 11% / 0.12)",
        lift: "0 22px 55px -14px hsl(220 70% 11% / 0.26)",
        accent: "0 10px 30px -8px hsl(157 97% 41% / 0.45)",
        brand: "0 10px 30px -8px hsl(226 75% 53% / 0.40)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        /*
          The mark's light stroke drawn on — the motif the site is built around.
          Paired with pathLength="1" on the SVG, so the dash maths is 0..1
          whatever the path's real length is.
        */
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 44s linear infinite",
        "draw-line": "draw-line 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
