import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { WorkCard } from "@/components/sections/WorkCard";

export function SelectedWork() {
  const items = caseStudies.slice(0, 4);
  return (
    <section className="bg-neutral-light">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Engagements, end to end"
            lede="Programmes from years of global consulting work. Client names are withheld under NDA; references are available on request."
          />
          <Reveal delay={150}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet transition-colors hover:text-magenta"
            >
              View all case studies
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
        <Reveal group className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((cs) => (
            <div key={cs.slug} data-reveal>
              <WorkCard caseStudy={cs} />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
