import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/content/services";
import type { IconName } from "@/lib/content/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Hero } from "@/components/sections/home/Hero";
import { IntelligenceHub } from "@/components/sections/home/IntelligenceHub";
import { ProofBand } from "@/components/sections/home/ProofBand";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata = buildMetadata({
  title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
  description:
    "Nexolve Technologies designs how organisations source, buy and pay — then implements it on SAP, Coupa and Oracle, with integration, analytics and software engineering from one accountable team.",
  path: "/",
});

const firmStats: { value: string; label: string; icon: IconName }[] = [
  { value: "15+", label: "Enterprise programmes delivered", icon: "calendar" },
  { value: "24+", label: "Years combined delivery experience", icon: "users" },
  { value: "9", label: "Platforms & modules expertise", icon: "badge" },
  { value: "2", label: "Delivery regions (India & Middle East)", icon: "globe" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBand />

      <section className="border-y border-navy bg-navy text-white" aria-labelledby="firm-statement-title">
        <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 xl:gap-20">
            <div>
              <p className="editorial-label text-blue">What we believe</p>
              <h2
                id="firm-statement-title"
                className="mt-5 max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Procurement transformation is only real when it runs in live operations.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/72 sm:text-lg">
                We design how organisations source, buy and pay—then implement, integrate and stay
                through adoption. Process credibility, platform depth and software engineering remain
                under one roof.
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {firmStats.map((stat) => (
                <div
                  key={stat.label}
                  className="firm-stat flex items-start gap-4 rounded-2xl border border-blue/45 bg-navy-soft/40 px-5 py-5 transition-[border-color,background-color] duration-250 hover:border-blue hover:bg-navy-soft/70"
                >
                  <Icon name={stat.icon} size={26} className="mt-0.5 shrink-0 text-blue" />
                  <div className="min-w-0">
                    <dd className="text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-[1.65rem]">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-sm leading-snug text-white/70">{stat.label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <IntelligenceHub />

      <section className="border-y border-line bg-white" aria-labelledby="services-home-title">
        <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label text-blue">Our offering</p>
              <h2
                id="services-home-title"
                className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem]"
              >
                Five service lines. One accountable team.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-navy"
            >
              All services <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal group className="service-matrix mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-reveal
                className="service-matrix__item group"
              >
                <span className="text-xs font-extrabold tabular-nums tracking-[0.12em] text-blue transition-colors group-hover:text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  name={service.icon}
                  size={28}
                  className="mt-5 text-blue transition-colors group-hover:text-white/80"
                />
                <h3 className="mt-5 text-lg font-bold leading-[1.15] tracking-[-0.03em] text-ink transition-colors group-hover:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 grow text-[0.9rem] leading-6 text-ink-muted transition-colors group-hover:text-white/70">
                  {service.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors group-hover:text-white">
                  View practice{" "}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Let's look at your landscape."
        lede="A short discovery session on your current source-to-pay estate—where value is sitting unused, and what it takes to release it."
        secondaryLabel="Explore our services"
      />
    </>
  );
}
