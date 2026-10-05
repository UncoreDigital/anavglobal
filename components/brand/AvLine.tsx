import { cn } from "@/lib/utils";

/**
 * The AV line — the site's one decorative motif.
 *
 * It is the light stroke that runs through the client's mark: up the A, down
 * into the V, up again. Traced from the artwork and normalised, it reads as a
 * line on a chart going up — which, for an accounting firm, is the point.
 *
 *   mark   the stroke exactly as it sits in the logo (three segments)
 *   trend  the same rhythm continued across a wide band, ending high
 *
 * `pathLength="1"` makes the draw-on animation length-independent: dasharray 1
 * and an offset animated 1 → 0 draws any path in full, whatever its real size.
 *
 * Pure SVG with no hooks, so it renders in server components. `id` must be
 * unique per page because it names the gradient definition.
 */

const PATHS = {
  // Normalised from the mint stroke in assets-src/brand/logo-master.png:
  // (150,690) → (405,250) → (625,640) → (840,260) in a 1024 square.
  mark: { viewBox: "0 0 100 60", d: "M0 60 L37 0 L68.8 53 L100 1.4" },
  trend: { viewBox: "0 0 400 120", d: "M0 112 L62 52 L104 84 L176 22 L226 70 L300 12 L340 44 L400 4" },
} as const;

export default function AvLine({
  id,
  variant = "mark",
  className,
  strokeWidth = 2,
  animate = false,
  glow = false,
  tone = "brand",
}: {
  id: string;
  variant?: keyof typeof PATHS;
  className?: string;
  strokeWidth?: number;
  animate?: boolean;
  glow?: boolean;
  /** brand: blue → teal → green. mint: the logo's own light stroke colour. */
  tone?: "brand" | "mint";
}) {
  const { viewBox, d } = PATHS[variant];
  const stroke = tone === "mint" ? "hsl(var(--mint))" : `url(#${id}-g)`;

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="hsl(226 75% 53%)" />
          <stop offset="0.5" stopColor="hsl(180 84% 34%)" />
          <stop offset="1" stopColor="hsl(157 97% 41%)" />
        </linearGradient>
        {glow && (
          <filter id={`${id}-f`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        )}
      </defs>
      {glow && (
        <path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth * 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter={`url(#${id}-f)`}
          opacity="0.5"
        />
      )}
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={animate ? 1 : undefined}
        strokeDashoffset={animate ? 1 : undefined}
        className={animate ? "animate-draw-line" : undefined}
      />
    </svg>
  );
}
