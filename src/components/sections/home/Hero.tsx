import { HeroVideoSequence } from "@/components/media/HeroVideoSequence";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { MatrixMark } from "@/components/brand/MatrixMark";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/content/types";

const credentials: { value: string; label: string; icon: IconName; focal?: boolean }[] = [
  { value: "15+", label: "Enterprise programmes", icon: "building", focal: true },
  { value: "SAP · Coupa · Oracle", label: "Platforms delivered", icon: "layers" },
  { value: "APAC & Middle East", label: "Delivery regions", icon: "globe" },
];

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
            <h1 className="hero-title">
              <span className="hero-title__line">
                <span>We fix how large organisations</span>
              </span>
              <span className="hero-title__line hero-title__accent">
                <span>buy, source and move goods.</span>
              </span>
            </h1>
            <p data-reveal className="hero-lede">
              Nexolve Technologies designs how you source, buy and pay. We then implement it on SAP,
              Coupa and Oracle, with integration, analytics and software engineering delivered by the
              same accountable team.
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
          {credentials.map((credential) => (
            <div
              key={credential.label}
              className={credential.focal ? "hero-rail__item--focal" : undefined}
            >
              <dt>
                <Icon name={credential.icon} size={22} className="hero-rail__icon" />
                <span>{credential.value}</span>
              </dt>
              <dd>{credential.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
