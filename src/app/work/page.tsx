import { caseStudies } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { WorkCard } from "@/components/sections/WorkCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Work & Delivery Experience",
  description:
    "Enterprise programmes delivered by the Nexolve team — full-suite SAP Ariba, compliant sourcing, commerce automation and S/4HANA rollouts across sectors.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Programmes we have delivered"
        lede="Key engagements from years of global consulting work. Client names are withheld under NDA; sectors and scope are stated plainly, and references are available on request."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
      />
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-20">
          <Reveal group className="grid gap-5 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <div key={cs.slug} data-reveal>
                <WorkCard caseStudy={cs} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Want to be the next engagement?"
        lede="Bring us the landscape — we'll bring the sequence that turns it into live operation."
      />
    </>
  );
}
