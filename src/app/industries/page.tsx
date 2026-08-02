import Link from "next/link";
import { industries } from "@/lib/content/industries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Sectors We Work In",
  description:
    "Procurement and supply chain transformation across FMCG, oil & gas, retail, banking, energy & mining and manufacturing — APAC and the Middle East.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector context shapes every sourcing decision"
        lede="High-velocity FMCG, contract-heavy oil & gas, regulated banking — each sector changes how procurement must run. Ours spans six, delivered across APAC and the Middle East."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-20">
          <Reveal group className="grid gap-5 sm:grid-cols-2">
            {industries.map((industry) => (
              <div key={industry.slug} data-reveal>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-4">
                    <IconChip name={industry.icon} />
                    <h2 className="text-xl font-extrabold text-ink group-hover:text-violet">
                      {industry.title}
                    </h2>
                  </div>
                  <p className="mt-4 grow text-sm leading-relaxed text-ink-muted">
                    {industry.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet">
                    Explore {industry.title.toLowerCase()}
                    <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaSection
        title="Don't see your sector?"
        lede="The delivery discipline transfers; the sector listening starts fresh every time. Tell us what you buy — we'll tell you honestly if we can help."
      />
    </>
  );
}
