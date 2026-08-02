import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

const stages = [
  {
    label: "Diagnostic",
    title: "A baseline worth signing",
    description:
      "Spend data nobody fully trusts, processes stakeholders route around. We start by baselining both — reconciled with finance.",
  },
  {
    label: "Live system",
    title: "Configured, not improvised",
    description:
      "Platform, integration and supplier enablement — designed together, tested against real scenarios, deployed in phases.",
  },
  {
    label: "Measured value",
    title: "Adoption that holds",
    description:
      "Agreed metrics, reporting and continuous improvement keep the programme honest while it takes on more categories, more suppliers, more entities.",
  },
] as const;

/**
 * "Diagnostic → live system → measured value" — animated SVG connection path drawn
 * as the section scrolls into view (CSS stroke-dashoffset, IO-triggered).
 */
export function IdeaToSystem() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="How value compounds"
          title="From diagnostic to live system to measured value"
          lede="Every engagement follows the same arc: baseline the problem, deploy the system, then hold it to agreed metrics."
          align="center"
        />

        <Reveal group className="relative mt-14">
          {/* Connection line (desktop) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-10 hidden h-[120px] w-full lg:block"
          >
            <defs>
              <linearGradient id="its-grad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#0b2a44" />
                <stop offset="0.5" stopColor="#4aa3dd" />
                <stop offset="1" stopColor="#0b2a44" />
              </linearGradient>
            </defs>
            <path
              data-draw
              pathLength={1}
              d="M60 60 C 220 -20, 380 140, 500 60 C 620 -20, 780 140, 940 60"
              stroke="url(#its-grad)"
              strokeWidth="2.5"
              strokeDasharray="1"
            />
          </svg>

          <div className="relative grid gap-8 lg:grid-cols-3">
            {stages.map((stage, i) => (
              <div key={stage.label} data-reveal className="relative">
                <div className="flex h-full flex-col items-center rounded-3xl border border-line bg-white p-8 text-center shadow-card">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-brand text-base font-extrabold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-xs font-bold tracking-[0.2em] text-violet uppercase">
                    {stage.label}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-ink">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
