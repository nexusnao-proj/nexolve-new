import Link from "next/link";
import { industries } from "@/lib/content/industries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { Icon } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Sectors We Work In",
  description:
    "Procurement and supply chain transformation across FMCG, oil and gas, retail, banking, energy, mining and manufacturing.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector context shapes every sourcing decision"
        lede="High-velocity FMCG, contract-heavy oil and gas, and regulated banking each change how procurement must run. Our experience spans six sectors across APAC and the Middle East."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <section className="surface-dark-network industry-field" aria-label="Industries served">
        <Container className="relative py-16 sm:py-24">
          <Reveal group className="industry-field__grid">
            {industries.map((industry, index) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                data-reveal
                className="industry-panel group"
              >
                <CardCover cover={industry.cover} sizes="(min-width: 1024px) 58vw, 100vw" />
                <div className="industry-panel__wash" aria-hidden="true" />
                <div className="industry-panel__content">
                  <div className="flex items-center justify-between gap-4">
                    <span className="industry-panel__icon">
                      <Icon name={industry.icon} size={22} />
                    </span>
                    <span className="industry-panel__index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h2>{industry.title}</h2>
                  <p>{industry.excerpt}</p>
                  <span className="industry-panel__link">
                    Explore sector
                    <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Do not see your sector?"
        lede="The delivery discipline transfers, while the sector listening starts fresh every time. Tell us what you buy and we will tell you honestly if we can help."
      />
    </>
  );
}
