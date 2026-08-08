import Link from "next/link";
import { industries } from "@/lib/content/industries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/animation/Reveal";

export function IndustriesStrip() {
  return (
    <section className="bg-neutral-light">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Sectors served"
          title="Sector context, taken seriously"
          lede="Procurement only works when it respects how your sector actually buys — its categories, its compliance and its suppliers."
          align="center"
        />
        <Reveal group className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry) => (
            <div key={industry.slug} data-reveal>
              <Link
                href={`/industries/${industry.slug}`}
                className="color-card group flex h-full flex-col items-center gap-3 rounded-3xl border border-line bg-white px-4 py-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-brand-soft text-violet">
                  <Icon name={industry.icon} size={20} />
                </span>
                <span className="text-sm font-bold text-ink group-hover:text-violet">
                  {industry.title}
                </span>
              </Link>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
