import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Work & Delivery Experience",
  description:
    "Enterprise programmes delivered by the Nexolve team across SAP Ariba, sourcing, commerce automation and S/4HANA.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Programmes we have delivered"
        lede="Selected engagements from years of global consulting work. Client names are withheld under NDA; sectors and scope are stated plainly, and references are available on request."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
      />
      <section className="surface-network work-ledger" aria-label="Selected delivery experience">
        <Container className="relative py-16 sm:py-24">
          <Reveal group className="work-ledger__list">
            {caseStudies.map((work, index) => (
              <Link
                key={work.slug}
                href={`/work/${work.slug}`}
                data-reveal
                className="work-ledger__item group"
              >
                <span className="work-ledger__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="work-ledger__media">
                  <CardCover cover={work.cover} sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>
                <div className="work-ledger__content">
                  <p className="editorial-label text-navy-soft">{work.industry}</p>
                  <h2>{work.title}</h2>
                  <p>{work.excerpt}</p>
                  <div className="work-ledger__stack">
                    {work.stack.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <span className="work-ledger__action" aria-hidden="true">
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Want to be the next engagement?"
        lede="Bring us the landscape. We will bring the sequence that turns it into live operation."
      />
    </>
  );
}
