import Link from "next/link";
import { solutions } from "@/lib/content/solutions";
import { getService } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "The Platform Landscape",
  description:
    "Four layers — source-to-pay platforms, core ERP, intelligence, and integration & build — the estate Nexolve designs, implements and supports end to end.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Platforms"
        title="The platform landscape we work across"
        lede="Four layers, from the source-to-pay platform down to the integration fabric. Every layer below is one we implement, integrate and support in live operation."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      />
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-20">
          <div className="space-y-8">
            {solutions.map((solution, index) => {
              const relServices = solution.services
                .map((s) => getService(s))
                .filter((s): s is NonNullable<typeof s> => Boolean(s));
              return (
                <Reveal key={solution.slug}>
                  <article
                    id={solution.slug}
                    className="group scroll-mt-24 rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <div className="flex items-center gap-4">
                          <IconChip name={solution.icon} />
                          <p className="text-xs font-bold tracking-[0.2em] text-violet uppercase">
                            Layer {String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                        <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl">
                          {solution.title}
                        </h2>
                        <p className="mt-2 text-base font-bold text-violet">{solution.outcome}</p>
                        <p className="mt-4 text-base leading-relaxed text-ink-muted">
                          {solution.description}
                        </p>
                        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          {solution.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-brand"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="overflow-hidden rounded-2xl bg-neutral-light">
                        <CardCover
                          cover={solution.cover}
                          sizes="(min-width: 1024px) 35vw, 100vw"
                        />
                        <div className="p-6">
                          <h3 className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                            Delivered by these service lines
                          </h3>
                          <ul className="mt-4 space-y-3">
                            {relServices.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="group/link flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition-colors hover:text-violet"
                                >
                                  {service.title}
                                  <ArrowIcon className="shrink-0 text-violet transition-transform group-hover/link:translate-x-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <CtaSection
        title="Which layer needs attention first?"
        lede="Start from where value is sitting unused, and we'll design the shortest path to it."
      />
    </>
  );
}
