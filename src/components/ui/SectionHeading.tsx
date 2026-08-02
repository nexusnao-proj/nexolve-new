import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animation/Reveal";

type Props = { eyebrow?: string; title: string; lede?: string; align?: "left" | "center"; as?: "h1" | "h2"; dark?: boolean; className?: string };

export function SectionHeading({ eyebrow, title, lede, align = "left", as: Tag = "h2", dark = false, className }: Props) {
  return (
    <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("editorial-label mb-5", dark ? "text-white/55" : "text-ink-muted")}>{eyebrow}</p> : null}
      <Tag className={cn("text-4xl leading-[1.02] font-semibold tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl", dark ? "text-white" : "text-ink")}>{title}</Tag>
      {lede ? <p className={cn("mt-6 max-w-2xl text-base leading-7 sm:text-lg", align === "center" && "mx-auto", dark ? "text-white/55" : "text-ink-muted")}>{lede}</p> : null}
    </Reveal>
  );
}
