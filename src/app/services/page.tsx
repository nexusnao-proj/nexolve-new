import Link from "next/link";
import { services } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { Icon } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Procurement & Platform Services",
  description:
    "Five service lines covering consulting, source-to-pay platforms, core SAP, data, integrations and software engineering from one accountable team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five service lines, one accountable team"
        lede="From process design to platform delivery and the engineering that connects them. Each service is a complete delivery practice with a clear operational outcome."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <section className="surface-blueprint service-journey" aria-label="Nexolve service lines">
        <Container className="relative py-16 sm:py-24">
          <Reveal group className="service-story-list">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-reveal
                className="service-story group"
              >
                <div className="service-story__visual">
                  <CardCover
                    cover={service.cover}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  <span className="service-story__number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="service-story__content">
                  <span className="service-story__icon">
                    <Icon name={service.icon} size={24} />
                  </span>
                  <p className="editorial-label text-navy-soft">Delivery practice</p>
                  <h2>{service.title}</h2>
                  <p>{service.excerpt}</p>
                  <ul>
                    {service.capabilities.slice(0, 2).map((capability) => (
                      <li key={capability.title}>{capability.title}</li>
                    ))}
                  </ul>
                  <span className="service-story__link">
                    Explore this service
                    <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Not sure which service line fits?"
        lede="Describe the problem and we will tell you what it needs, even when the answer is simpler than expected."
      />
    </>
  );
}
