import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content/services";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { Reveal } from "@/components/animation/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Hero } from "@/components/sections/home/Hero";
import { BrandProof } from "@/components/sections/home/BrandProof";
import { ProofBand } from "@/components/sections/home/ProofBand";
import { ImpactBand } from "@/components/sections/home/ImpactBand";
import { IntelligenceHub } from "@/components/sections/home/IntelligenceHub";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
  description:
    "Nexolve Technologies designs how organisations source, buy and pay, then implements it on SAP, Coupa and Oracle, with integration, analytics and software engineering from one accountable team.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandProof />
      <ProofBand />
      <ImpactBand />
      <IntelligenceHub />

      <section className="surface-blueprint" aria-labelledby="services-home-title">
        <Container className="max-w-[1440px] py-14 sm:py-20 lg:px-12">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label text-navy-soft">The offering</p>
              <h2
                id="services-home-title"
                className="mt-5 max-w-lg text-3xl leading-[1.05] font-bold tracking-[-0.04em] sm:text-[2.6rem]"
              >
                Five service lines. One accountable team.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-violet transition-colors hover:text-navy"
            >
              View all services <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal group className="service-matrix mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-reveal
                className="service-matrix__item group"
              >
                <CardCover
                  cover={service.cover}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="service-matrix__body">
                  <div className="nx-card__head">
                    <span className="nx-card__index">{String(index + 1).padStart(2, "0")}</span>
                    <Icon name={service.icon} size={18} className="nx-card__icon" />
                  </div>
                  <h3 className="mt-4 text-base leading-[1.25] font-bold tracking-[-0.02em] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 grow text-[0.9375rem] leading-[1.6] text-ink-muted">
                    {service.excerpt}
                  </p>
                  <span className="nx-card__link nx-card__link--footed">
                    View practice
                    <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Let's look at your landscape."
        lede="A short discovery session on your current source-to-pay estate: where value is sitting unused, and what it takes to release it."
        secondaryLabel="Explore our services"
      />
    </>
  );
}
