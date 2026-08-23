import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.headline,
    description: industry.excerpt,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.services
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={industry.headline}
        lede={industry.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ]}
      />

      <section className="border-y border-line bg-white">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Industry challenges" title="What usually holds teams back" />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2">
            {industry.challenges.map((challenge) => (
              <div
                key={challenge}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-line bg-neutral-light p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-extrabold text-white"
                >
                  !
                </span>
                <p className="text-base leading-relaxed text-ink">{challenge}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="How Nexolve helps" title="Solutions built for this domain" />
          <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2">
            {industry.solutions.map((solution) => (
              <div
                key={solution.title}
                data-reveal
                className="rounded-3xl border border-line bg-white p-7 shadow-card"
              >
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-gradient-brand" />
                <h3 className="mt-4 text-lg font-extrabold text-ink">{solution.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {solution.description}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10" delay={100}>
            <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-5 text-sm text-ink-muted">
              {industry.proofNote}
            </div>
          </Reveal>
        </Container>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-white">
          <Container className="py-16 sm:py-24">
            <SectionHeading
              eyebrow="Relevant services"
              title={`Services ${industry.title.toLowerCase()} teams use most`}
            />
            <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service) => (
                <div key={service.slug} data-reveal>
                  <Link
                    href={`/services/${service.slug}`}
                    className="color-card group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <CardCover
                      cover={service.cover}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="flex grow flex-col p-6">
                      <IconChip name={service.icon} className="size-10 rounded-xl" />
                      <h3 className="mt-4 grow text-base font-extrabold text-ink group-hover:text-violet">
                        {service.title}
                      </h3>
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

      <CtaSection
        title={`Buying in ${industry.title.toLowerCase()}?`}
        lede="Tell us about your categories and constraints. We'll respond with a grounded view of what procurement transformation can realistically do for them."
      />
    </>
  );
}
