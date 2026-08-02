import Link from "next/link";
import { deliveryProcess } from "@/lib/content/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export function ProcessOverview() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0" />
      <Container className="relative py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            eyebrow="How we engage"
            title="Each phase closes with something you own"
            lede="A diagnostic, a blueprint, a live system, adoption, measured value — five phases, each ending in an output, not a status report."
          />
          <Reveal delay={150}>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-white"
            >
              Explore the full process
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
        <Reveal group className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {deliveryProcess.map((step, i) => (
            <div key={step.title} data-reveal className="relative">
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="text-gradient text-3xl font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
