import { HeroVideoSequence } from "@/components/media/HeroVideoSequence";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { MatrixMark } from "@/components/brand/MatrixMark";

/** Short credentials that anchor the foot of the hero. */
const credentials = [
  ["15+", "Enterprise programmes"],
  ["SAP · Coupa · Oracle", "Platforms delivered"],
  ["APAC & Middle East", "Delivery regions"],
] as const;

export function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-film" aria-hidden="true">
        <HeroVideoSequence />
        <div className="hero-film-shade" />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <MatrixMark dark animated className="hero-matrix" />

      <Container className="home-hero__shell relative z-[2] flex max-w-[1440px] flex-col lg:px-12">
        <Reveal group className="hero-stage">
          <div className="hero-copy">
            <p data-reveal className="hero-eyebrow">
              <span>Procurement &amp; supply chain transformation</span>
            </p>
            {/* Each line masks its own wipe-up, so the headline resolves line by
                line rather than fading in as one block. */}
            <h1 className="hero-title">
              <span className="hero-title__line">
                <span>We fix how large organisations</span>
              </span>
              <span className="hero-title__line hero-title__accent">
                <span>buy, source and move goods.</span>
              </span>
            </h1>
            <p data-reveal className="hero-lede">
              Nexolve Technologies designs how you source, buy and pay — then implements it on SAP,
              Coupa and Oracle, with the integration, analytics and software engineering delivered by
              the same accountable team.
            </p>
            <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Book a discovery session <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="onDark">
                Explore our work <ArrowIcon />
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <dl className="hero-rail">
          {credentials.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
