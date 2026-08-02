import { values } from "@/lib/content/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

export function WhyNexolve() {
  return (
    <section className="bg-neutral-light">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Why choose Nexolve"
            title="A delivery partner, not a vendor"
            lede="Plenty of firms can configure a platform. We're built around the harder promises: process credibility, platform depth and a team measured on value in live operations."
          />
          <Reveal group className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                data-reveal
                className="rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-gradient-brand" />
                <h3 className="mt-4 text-base font-extrabold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
