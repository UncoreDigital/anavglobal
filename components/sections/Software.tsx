import Image from "next/image";
import Reveal from "@/components/Reveal";
import { software, type SoftwareTool } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "Tools and Applications" — the platforms the team works in.
 *
 * Tiles carry the vendor logo where one exists locally, the parent brand's
 * symbol beside the product name where the product has no logo of its own
 * (CCH Axcess, UltraTax CS), and the name set as a wordmark otherwise
 * (Expensify, Taxfiler). Every tile is the same size and plate, so the row
 * still reads as one set.
 *
 * `strip` is the slim marquee under the hero; `grid` is the static set used on
 * interior pages, where a moving row would compete with the copy.
 */

function Tool({ tool, className }: { tool: SoftwareTool; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-16 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-7 transition-colors",
        className
      )}
    >
      <ToolArt tool={tool} />
    </span>
  );
}

/** The art inside a tile — shared with the "Platforms we work in" list on service pages. */
export function ToolArt({ tool, small = false }: { tool: SoftwareTool; small?: boolean }) {
  if (tool.logo) {
    return (
      <Image
        src={tool.logo}
        alt={tool.name}
        width={220}
        height={80}
        className={cn("w-auto object-contain", small ? "h-7 max-w-[9rem]" : "h-8 max-w-[10rem]")}
      />
    );
  }
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      {tool.mark && (
        <Image src={tool.mark} alt="" width={96} height={96} className={cn("w-auto shrink-0", small ? "h-6" : "h-7")} />
      )}
      <span className={cn("font-display font-bold text-navy-deep/75", small ? "text-[15px]" : "text-[16px]")}>{tool.name}</span>
    </span>
  );
}

export default function Software({
  variant = "strip",
  tools = software,
}: {
  variant?: "strip" | "grid";
  /** The region's list (lib/region-content.ts). */
  tools?: SoftwareTool[];
}) {
  if (variant === "grid") {
    return (
      <ul className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <li key={tool.name}>
            <Tool tool={tool} className="h-14 px-5" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="relative border-b border-border bg-white py-10 md:py-12">
      <div className="container">
        <Reveal>
          {/* VERBATIM: "Tools and Applications — Seamlessly integrated with the platforms you already use" */}
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em] text-ink-muted">
            Seamlessly integrated with the platforms you already use
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-7">
        <div className="mask-fade-x pause-on-hover flex overflow-hidden">
          {/*
            The keyframe translates -50%, so the loop is seamless only when the
            track holds an EVEN number of copies (-50% must land on a copy
            boundary — an odd count restarts mid-copy and visibly jumps), and
            enough of them that half the track still covers a 2000px screen.
            Each tile is ~176px wide including the gap.
          */}
          <div className="flex shrink-0 animate-marquee gap-4 pr-4">
            {Array.from({ length: 2 * Math.max(1, Math.ceil(2000 / (tools.length * 176))) }, () => tools)
              .flat()
              .map((tool, i) => (
              <Tool key={`${tool.name}-${i}`} tool={tool} className="hover:border-brand/30" />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
