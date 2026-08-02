import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { MatrixMark } from "@/components/brand/MatrixMark";

const capabilities = ["Consult", "Implement", "Integrate", "Build"];

export function Hero() {
  return (
    <section className="home-hero">
      <MatrixMark dark animated className="hero-matrix" />
      <Container className="home-hero__shell relative z-[2] grid max-w-[1440px] grid-rows-[1fr_auto] py-5 sm:py-7 lg:px-12">
        <div className="hero-copy flex items-center py-5">
          <Reveal group className="max-w-[940px]">
            <p data-reveal className="hero-eyebrow editorial-label text-blue">Procurement & supply chain transformation</p>
            <h1 data-reveal className="hero-title mt-5 text-[clamp(3.5rem,5.4vw,5.75rem)] font-extrabold leading-[0.92] tracking-[-0.055em] text-white">
              We fix how large organisations buy, <span className="text-blue">source and move goods.</span>
            </h1>
            <p data-reveal className="hero-lede mt-5 max-w-[620px] text-[0.9375rem] leading-6 text-white/68 sm:text-base sm:leading-7">
              Nexolve Technologies designs how you source, buy and pay — then implements it on SAP, Coupa and Oracle, with the integration, analytics and software engineering delivered by the same accountable team.
            </p>
            <div data-reveal className="hero-actions mt-6 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href="/contact">Book a discovery session <ArrowIcon /></ButtonLink>
              <ButtonLink href="/work" variant="secondary" className="border-white/45 text-white hover:border-white hover:bg-white hover:text-black">Explore our work <ArrowIcon /></ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="hero-capability-rail hidden gap-4 pt-4 sm:grid sm:grid-cols-[180px_1fr] sm:items-center">
          <div className="flex items-center gap-3">
            <span className="h-7 w-0.5 bg-blue" aria-hidden="true" />
            <span className="editorial-label text-white/60">One accountable team</span>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
            {capabilities.map((capability, index) => (
              <li key={capability} className="border-l border-white/25 pl-4">
                <span className="block text-[0.62rem] font-bold tracking-[0.18em] text-blue">0{index + 1}</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-white/75">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
