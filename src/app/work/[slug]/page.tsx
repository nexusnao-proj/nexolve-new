import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { getService } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.title,
    description: cs.excerpt,
    path: `/work/${cs.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const related = cs.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const index = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        eyebrow={cs.industry}
        title={cs.title}
        lede={cs.excerpt}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: cs.title, path: `/work/${cs.slug}` },
        ]}
      />

      <section className="border-y border-line bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-12">
              <Reveal>
                <h2 className="text-2xl font-extrabold text-ink">The problem</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">{cs.problem}</p>
              </Reveal>
              <Reveal>
                <h2 className="text-2xl font-extrabold text-ink">The solution</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">{cs.solution}</p>
              </Reveal>
              <Reveal>
                <h2 className="text-2xl font-extrabold text-ink">The process</h2>
                <ol className="mt-5 space-y-4">
                  {cs.process.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-extrabold text-white"
                      >
                        {i + 1}
                      </span>
                      <p className="text-base leading-relaxed text-ink">{step}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal>
                <h2 className="text-2xl font-extrabold text-ink">Results</h2>
                <ul className="mt-5 space-y-3">
                  {cs.results.map((result) => (
                    <li
                      key={result}
                      className="rounded-2xl border border-dashed border-line bg-neutral-light px-5 py-4 text-sm text-ink-muted"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {cs.testimonial && !isPlaceholder(cs.testimonial) ? (
                <Reveal>
                  <blockquote className="rounded-3xl border border-line bg-neutral-light p-8 text-lg leading-relaxed text-ink italic">
                    {cs.testimonial}
                  </blockquote>
                </Reveal>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal className="rounded-3xl border border-line bg-white p-7 shadow-card">
                <h2 className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                  Engagement facts
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-ink">Client</dt>
                    <dd className="mt-1 text-ink-muted">{cs.client}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">Industry</dt>
                    <dd className="mt-1 text-ink-muted">{cs.industry}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">Technology stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {cs.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line bg-neutral-light px-3 py-1 text-xs font-semibold text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
              {related.length > 0 && (
                <Reveal className="rounded-3xl border border-line bg-white p-7 shadow-card">
                  <h2 className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                    Related services
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {related.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center justify-between gap-3 text-sm font-bold text-ink transition-colors hover:text-violet"
                        >
                          {service.title}
                          <ArrowIcon className="shrink-0 text-violet transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {next && next.slug !== cs.slug && (
        <section className="bg-neutral-light">
          <Container className="py-14 sm:py-16">
            <SectionHeading eyebrow="Next case study" title="Keep reading" />
            <Reveal className="mt-6">
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover sm:flex-row"
              >
                <CardCover
                  cover={next.cover}
                  sizes="(min-width: 640px) 18rem, 100vw"
                  className="sm:w-72"
                />
                <div className="flex grow items-center justify-between gap-4 p-7">
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-ink-muted uppercase">
                      {next.industry}
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-ink group-hover:text-violet">
                      {next.title}
                    </p>
                  </div>
                  <ArrowIcon className="size-6 shrink-0 text-violet transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
