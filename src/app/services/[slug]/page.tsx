import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { publishedPosts } from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.headline,
    description: service.excerpt,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedIndustries = industries
    .filter((industry) => industry.services.includes(service.slug))
    .slice(0, 3);
  const relatedWork = caseStudies
    .filter((caseStudy) => caseStudy.relatedServices.includes(service.slug))
    .slice(0, 3);
  const relatedInsights = publishedPosts
    .filter((post) => post.relatedServices.includes(service.slug))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faq)]} />
      <PageHero
        eyebrow="Service"
        title={service.headline}
        lede={service.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <Reveal delay={150} className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/contact" size="lg">
            Book a discovery session
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/process" size="lg" variant="secondary">
            See how we deliver
          </ButtonLink>
        </Reveal>
      </PageHero>

      {/* Problems */}
      <section className="border-y border-line bg-white">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Problems we solve" title="Sound familiar?" />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.problems.map((problem) => (
              <div
                key={problem}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-line bg-neutral-light p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-extrabold text-white"
                >
                  !
                </span>
                <p className="text-base leading-relaxed text-ink">{problem}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Capabilities" title="What Nexolve delivers" />
          <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((cap) => (
              <div
                key={cap.title}
                data-reveal
                className="rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="block h-1 w-10 rounded-full bg-gradient-brand"
                />
                <h3 className="mt-4 text-base font-extrabold text-ink">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{cap.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Use cases + tech */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Typical use cases" title="Where this lands first" />
              <Reveal group as="ul" className="mt-8 space-y-3">
                {service.useCases.map((useCase) => (
                  <li key={useCase} data-reveal className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 shrink-0 text-violet"
                    >
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-base leading-relaxed text-ink">{useCase}</span>
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <SectionHeading eyebrow="Recommended technology" title="Tools we reach for" />
              <Reveal className="mt-8" delay={100}>
                <ul className="flex flex-wrap gap-2.5">
                  {service.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line bg-neutral-light px-4 py-2 text-sm font-bold text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  Final technology choices are made per project, on evidence — never by default.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0" />
        <Container className="relative py-16 sm:py-24">
          <SectionHeading dark eyebrow="Delivery process" title="How the engagement runs" />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div
                key={step.title}
                data-reveal
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <span className="text-gradient text-2xl font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Benefits" title="What you get out of it" />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-2 shrink-0 rounded-full bg-gradient-brand"
                />
                <p className="text-base leading-relaxed font-semibold text-ink">{benefit}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="FAQ"
              title={`${service.title} questions`}
              lede="Straight answers to the questions teams usually bring us."
            />
            <FaqAccordion items={service.faq} />
          </div>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-line bg-white">
          <Container className="py-16 sm:py-20">
            <SectionHeading eyebrow="Related services" title="Often combined with" />
            <Reveal group className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((rel) => (
                <div key={rel.slug} data-reveal>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="color-card group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <CardCover
                      cover={rel.cover}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="flex grow flex-col p-6">
                      <IconChip name={rel.icon} className="size-10 rounded-xl" />
                      <h3 className="mt-4 text-base font-extrabold text-ink group-hover:text-violet">
                        {rel.title}
                      </h3>
                      <p className="mt-2 grow text-sm leading-relaxed text-ink-muted">
                        {rel.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet">
                        Learn more
                        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>
      )}

      {(relatedIndustries.length > 0 || relatedWork.length > 0 || relatedInsights.length > 0) && (
        <section className="border-t border-line bg-neutral-light">
          <Container className="py-14 sm:py-18">
            <SectionHeading
              eyebrow="Explore further"
              title="Related sector experience and thinking"
            />
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {relatedIndustries.length > 0 && (
                <div>
                  <h3 className="text-sm font-extrabold text-ink">Industries</h3>
                  <ul className="mt-3 space-y-2">
                    {relatedIndustries.map((industry) => (
                      <li key={industry.slug}>
                        <Link
                          className="text-sm font-semibold text-violet hover:underline"
                          href={`/industries/${industry.slug}`}
                        >
                          {industry.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedWork.length > 0 && (
                <div>
                  <h3 className="text-sm font-extrabold text-ink">Case studies</h3>
                  <ul className="mt-3 space-y-2">
                    {relatedWork.map((caseStudy) => (
                      <li key={caseStudy.slug}>
                        <Link
                          className="text-sm font-semibold text-violet hover:underline"
                          href={`/work/${caseStudy.slug}`}
                        >
                          {caseStudy.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedInsights.length > 0 && (
                <div>
                  <h3 className="text-sm font-extrabold text-ink">Insights</h3>
                  <ul className="mt-3 space-y-2">
                    {relatedInsights.map((post) => (
                      <li key={post.slug}>
                        <Link
                          className="text-sm font-semibold text-violet hover:underline"
                          href={`/blog/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        title={`Ready to talk ${service.title.toLowerCase()}?`}
        lede="Share where you are today. We'll respond with an honest read on feasibility, timeline and the fastest route to value."
      />
    </>
  );
}
