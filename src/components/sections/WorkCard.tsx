import Link from "next/link";
import type { CaseStudy } from "@/lib/content/types";
import { ArrowIcon } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const accentBar: Record<CaseStudy["accent"], string> = {
  blue: "from-[#0b2a44] to-[#4aa3dd]",
  violet: "from-[#0b2a44] to-[#1a5a8a]",
  magenta: "from-[#14456b] to-[#4aa3dd]",
  pink: "from-[#1a5a8a] to-[#0b2a44]",
};

/** Case-study card used on /work and the home page. */
export function WorkCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r", accentBar[caseStudy.accent])} />
      <div className="flex grow flex-col p-7">
        <p className="text-xs font-bold tracking-[0.16em] text-ink-muted uppercase">
          {caseStudy.industry}
        </p>
        <h3 className="mt-3 text-lg leading-snug font-extrabold text-balance text-ink">
          {caseStudy.title}
        </h3>
        <p className="mt-3 grow text-sm leading-relaxed text-ink-muted">{caseStudy.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {caseStudy.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-neutral-light px-3 py-1 text-xs font-semibold text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet">
          Read the case study
          <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
