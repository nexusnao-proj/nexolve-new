import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Assess",
    copy: "Current-state review, spend baseline and platform readiness. Output: diagnostic.",
  },
  {
    number: "02",
    title: "Design",
    copy: "Process, category and integration design signed off by the business. Output: blueprint.",
  },
  {
    number: "03",
    title: "Deploy",
    copy: "Configuration, integration build and quality assurance. Output: live system.",
  },
  {
    number: "04",
    title: "Enable",
    copy: "Supplier onboarding, change management and user training. Output: adoption.",
  },
  {
    number: "05",
    title: "Optimise",
    copy: "Automation, analytics and continuous improvement. Output: measured value.",
  },
] as const;

/** Home delivery model — wide, compact editorial row (not a tall vertical timeline). */
export function DeliveryModel() {
  return (
    <section className="delivery-model relative overflow-hidden border-y border-line bg-neutral-light">
      <Container className="relative max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
        <Reveal className="flex flex-col gap-6 border-b border-black pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <p className="editorial-label text-ink-muted">How we engage</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-ink sm:text-5xl">
              Each phase closes with something you own.
            </h2>
          </div>
          <div className="flex max-w-sm flex-col gap-4 sm:items-end sm:text-right">
            <p className="text-sm leading-6 text-ink-muted sm:text-[0.95rem] sm:leading-7">
              Our delivery sequence ends every phase in an output — a diagnostic, a blueprint, a live
              system, adoption, measured value. Not a status report.
            </p>
            <Link
              href="/process"
              className="inline-flex min-h-10 items-center gap-3 text-sm font-bold"
            >
              Full process <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <Reveal group className="relative mt-8 sm:mt-10">
          <ol className="delivery-steps">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                className="delivery-step"
                style={{ "--step-i": index } as React.CSSProperties}
              >
                <span className="delivery-step__number" aria-hidden="true">
                  {step.number}
                </span>
                <div className="delivery-step__body">
                  <p className="delivery-step__index">{step.number}</p>
                  <h3 className="delivery-step__title">{step.title}</h3>
                  <p className="delivery-step__copy">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
