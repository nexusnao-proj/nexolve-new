import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { MatrixMark } from "@/components/brand/MatrixMark";

export function Hero() {
  return (
    <section className="home-hero">
      <MatrixMark dark animated className="hero-matrix" />
      <Container className="home-hero__shell relative z-[2] flex max-w-[1440px] items-center py-5 sm:py-7 lg:px-12">
        <div className="hero-copy flex w-full items-center justify-center py-5 text-center">
          <Reveal group className="mx-auto max-w-[1100px]">
            <p data-reveal className="hero-eyebrow editorial-label text-blue">Procurement & supply chain transformation</p>
            <h1 data-reveal className="hero-title mx-auto mt-5 text-[clamp(3.5rem,5.4vw,5.75rem)] font-extrabold leading-[0.92] tracking-[-0.055em] text-white">
              We fix how large organisations buy, <span className="text-blue">source and move goods.</span>
            </h1>
            <p data-reveal className="hero-lede mx-auto mt-5 max-w-[620px] text-[0.9375rem] leading-6 text-white/68 sm:text-base sm:leading-7">
              Nexolve Technologies designs how you source, buy and pay — then implements it on SAP, Coupa and Oracle, with the integration, analytics and software engineering delivered by the same accountable team.
            </p>
            <div data-reveal className="hero-actions mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
              <ButtonLink href="/contact">Book a discovery session <ArrowIcon /></ButtonLink>
              <ButtonLink href="/work" variant="onDark">Explore our work <ArrowIcon /></ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
