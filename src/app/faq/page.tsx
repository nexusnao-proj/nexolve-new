import { generalFaq } from "@/lib/content/faq";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container } from "@/components/ui/Container";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about working with Nexolve — engagement models, platforms, timelines, alliance delivery and accreditation.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(generalFaq)} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        lede="Straight answers about how we engage, which platforms we deliver and what happens after go-live. Anything missing? Ask us directly."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <section className="bg-white">
        <Container className="max-w-3xl py-14 sm:py-20">
          <FaqAccordion items={generalFaq} />
        </Container>
      </section>
      <CtaSection
        title="Still have a question?"
        lede="Ask it directly — a human replies within one business day."
      />
    </>
  );
}
