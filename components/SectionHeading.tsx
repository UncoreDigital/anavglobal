import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

/**
 * The heading block above every section: eyebrow, title, optional lead.
 *
 * One component so the eyebrow rule, the heading scale and the gap between
 * them are identical on every page — these are exactly the details that drift
 * when each section styles its own header.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  onDark = false,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Trailing fragment of the title, rendered in the accent gradient. */
  accent?: string;
  lead?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow mb-4", onDark && "eyebrow-on-dark")}>{eyebrow}</span>
      )}
      <Tag
        className={cn(
          "text-[1.8rem] font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.65rem]",
          onDark && "text-white"
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={onDark ? "text-gradient-on-dark" : "text-gradient-brand"}>
              {accent}
            </span>
          </>
        )}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-5 text-[15.5px] leading-[1.75]",
            onDark ? "text-white/70" : "text-ink-muted"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
