import { deliveryProcess } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "How We Engage — Delivery Process",
  description:
    "How Nexolve delivers: assess, design, deploy, enable, optimise. Each phase closes with something the client owns — not a status report.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Each phase closes with something you own"
        lede="Five phases, one principle: every phase ends in an output — a diagnostic, a blueprint, a live system, adoption, measured value. Not a status report."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]}
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="relative space-y-6">
            {/* Vertical connector */}
            <span
              aria-hidden="true"
              className="absolute top-8 bottom-8 left-[27px] hidden w-px bg-gradient-to-b from-[#0b2a44] via-[#4aa3dd] to-[#0b2a44] sm:block"
            />
            {deliveryProcess.map((step, i) => (
              <Reveal key={step.title}>
                <article className="relative grid gap-6 rounded-3xl border border-line bg-white p-7 shadow-card sm:grid-cols-[56px_1fr] sm:p-9">
                  <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-lg font-extrabold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {step.detail.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                          <svg
                            aria-hidden="true"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mt-0.5 shrink-0 text-violet"
                          >
                            <path
                              d="m5 13 4 4L19 7"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="See the sequence from the inside."
        lede="The first phase is a diagnostic conversation — no commitment, just an honest read on your landscape."
      />
    </>
  );
}
