import Link from "next/link";
import { services } from "@/lib/content/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { TiltCard } from "@/components/animation/TiltCard";

const featured = [
  "supply-chain-procurement-consulting",
  "source-to-pay-platform-delivery",
  "erp-core-sap",
  "data-analytics-integrations",
  "software-digital-engineering",
];

export function ServicesOverview() {
  const items = services.filter((s) => featured.includes(s.slug));
  return (
    <section className="bg-neutral-light">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="Everything it takes to transform procurement"
            lede="Five service lines across consulting, platform delivery, ERP, integration and engineering — combined into whatever your programme actually needs."
          />
          <Reveal delay={150}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet transition-colors hover:text-magenta"
            >
              View all services
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        <Reveal group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <div key={service.slug} data-reveal>
              <TiltCard className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <IconChip name={service.icon} />
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{service.title}</h3>
                  <p className="mt-2.5 grow text-sm leading-relaxed text-ink-muted">
                    {service.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet">
                    Learn more
                    <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
