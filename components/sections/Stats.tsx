import CountUp from "@/components/CountUp";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { figure, splitFigure, type Settings } from "@/lib/settings";
import { cn } from "@/lib/utils";

/**
 * The four headline figures, read from Admin → Site Settings. Labels VERBATIM
 * from the old site's stats band.
 *
 * A figure that is not a number ("TBC") renders as text rather than counting
 * up from zero; an emptied one renders as an em dash.
 */
export default function Stats({ settings, onDark = false }: { settings: Settings; onDark?: boolean }) {
  const items = [
    { key: "clients", label: "Clients Served" },
    { key: "invoices", label: "Invoices Processed" },
    { key: "experience", label: "Years Experience" },
    { key: "satisfaction", label: "Client Satisfaction" },
  ];

  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-4">
      {items.map((item) => {
        const raw = settings[item.key];
        const split = splitFigure(raw);
        return (
          <RevealItem
            key={item.key}
            className={cn("relative p-6 text-center sm:p-8", onDark ? "bg-navy-deep" : "bg-white")}
          >
            <p
              className={cn(
                "font-display text-[2.4rem] font-extrabold leading-none sm:text-5xl",
                onDark ? "text-gradient-on-dark" : "text-gradient-brand"
              )}
            >
              {split ? <CountUp value={split.value} suffix={split.suffix} /> : figure(raw)}
            </p>
            <p className={cn("mt-3 text-[13.5px] font-medium", onDark ? "text-white/65" : "text-ink-muted")}>{item.label}</p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
