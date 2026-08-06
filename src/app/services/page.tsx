import Link from "next/link";
import { services } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { TiltCard } from "@/components/animation/TiltCard";

export const metadata = buildMetadata({
  title: "Procurement & Platform Services",
  description:
    "Five service lines — consulting, source-to-pay platform delivery, ERP & core SAP, data & integrations, and software engineering — from one accountable team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five service lines, one accountable team"
        lede="From process design to platform delivery to the engineering that connects them. Every service below is a full delivery practice, not a bullet point."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-20">
          <Reveal group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} data-reveal>
                <TiltCard className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                  >
                    <CardCover
                      cover={service.cover}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="flex grow flex-col p-7">
                      <IconChip name={service.icon} />
                      <h2 className="mt-5 text-lg font-extrabold text-ink">{service.title}</h2>
                      <p className="mt-2.5 grow text-sm leading-relaxed text-ink-muted">
                        {service.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet">
                        Explore service
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Not sure which service line fits?"
        lede="Describe the problem — we'll tell you honestly what it needs, even when the answer is simpler than you expected."
      />
    </>
  );
}
