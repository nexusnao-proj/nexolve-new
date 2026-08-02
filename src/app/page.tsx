import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Hero } from "@/components/sections/home/Hero";
import { IntelligenceHub } from "@/components/sections/home/IntelligenceHub";
import { ProofBand } from "@/components/sections/home/ProofBand";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
  description:
    "Nexolve Technologies designs how organisations source, buy and pay — then implements it on SAP, Coupa and Oracle, with integration, analytics and software engineering from one accountable team.",
  path: "/",
});

const firmStats = [
  ["15+", "Enterprise programmes"],
  ["24+", "Years combined delivery"],
  ["9", "Platforms & modules"],
  ["2", "Delivery regions"],
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-b-2 border-ink bg-neutral-light" aria-labelledby="firm-statement-title">
        <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
          <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="editorial-label text-navy">The firm</p>
              <p className="mt-5 max-w-md text-xl font-bold leading-7 tracking-[-0.025em] text-ink">
                A consulting firm with an engineering bench, built on delivery rather than a pitch deck.
              </p>
              <dl className="mt-9 grid grid-cols-2 border-l-2 border-t-2 border-ink">
                {firmStats.map(([value, label]) => (
                  <div key={label} className="border-b-2 border-r-2 border-ink p-4 sm:p-5">
                    <dd className="text-3xl font-extrabold tracking-[-0.05em] text-navy sm:text-4xl">{value}</dd>
                    <dt className="mt-2 text-[0.62rem] font-extrabold uppercase leading-4 tracking-[0.15em] text-ink-muted">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="editorial-label text-ink-muted">What we believe</p>
              <h2 id="firm-statement-title" className="mt-5 max-w-4xl text-4xl leading-[1] font-bold tracking-[-0.05em] text-ink sm:text-6xl lg:text-[4.5rem]">
                Procurement transformation is only real when it runs in live operations.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
                We design how organisations source, buy and pay—then implement it, integrate it and stay through adoption. Process credibility, platform depth and software engineering remain under one roof.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <IntelligenceHub />

      <section className="border-b-2 border-ink bg-neutral-light" aria-labelledby="services-home-title">
        <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label text-navy">The offering</p>
              <h2 id="services-home-title" className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Five service lines. One accountable team.</h2>
            </div>
            <Link href="/services" className="inline-flex min-h-11 items-center gap-3 text-sm font-bold">All services <ArrowIcon /></Link>
          </Reveal>

          <Reveal group className="service-matrix mt-10 grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} data-reveal className="service-matrix__item group">
                <span className="text-xs font-extrabold tabular-nums tracking-[0.12em] text-navy-soft">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-7 text-xl font-bold leading-[1.05] tracking-[-0.035em]">{service.title}</h3>
                <p className="mt-4 grow text-[0.9375rem] leading-6 text-ink-muted">{service.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-navy">View practice <ArrowIcon className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <ProofBand />

      <CtaSection
        title="Let's look at your landscape."
        lede="A short discovery session on your current source-to-pay estate—where value is sitting unused, and what it takes to release it."
        secondaryLabel="Explore our services"
      />
    </>
  );
}
