import Link from "next/link";
import { solutions } from "@/lib/content/solutions";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export function SolutionsOverview() {
  return (
    <section className="bg-white">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Platform landscape"
          title="Four layers, one estate"
          lede="From the source-to-pay platform down to the integration fabric — the landscape we design, implement and support end to end."
        />
        <Reveal group className="mt-12 grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <div key={solution.slug} data-reveal>
              <Link
                href={`/solutions#${solution.slug}`}
                className="color-card group flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconChip name={solution.icon} />
                  <ArrowIcon className="mt-1 text-ink-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-violet" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{solution.title}</h3>
                <p className="mt-1.5 text-sm font-bold text-violet">{solution.outcome}</p>
                <p className="mt-3 grow text-sm leading-relaxed text-ink-muted">
                  {solution.description}
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
                  {solution.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-brand"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Link>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
