import Image from "next/image";
import { leadership, values, techStack } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TechnologyMark } from "@/components/ui/TechnologyMark";
import type { IconName } from "@/lib/content/types";

export const metadata = buildMetadata({
  title: "About Nexolve Technologies",
  description:
    "Nexolve Technologies is a procurement and supply chain transformation firm working across APAC and the Middle East.",
  path: "/about",
});

const trackRecord: { value: string; label: string; icon: IconName; image: string }[] = [
  {
    value: "15+",
    label: "Enterprise programmes",
    icon: "building",
    image: "/images/editorial/case-conglomerate-ariba.webp",
  },
  {
    value: "24+",
    label: "Years combined delivery",
    icon: "calendar",
    image: "/images/editorial/service-procurement-consulting.webp",
  },
  {
    value: "9",
    label: "Platforms and modules",
    icon: "layers",
    image: "/images/editorial/solution-integration-build.webp",
  },
  {
    value: "2",
    label: "Delivery regions",
    icon: "globe",
    image: "/images/editorial/urban-systems.webp",
  },
];

const valueIcons: IconName[] = ["flow", "briefcase", "compass", "badge"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built on delivery, not on a pitch deck"
        lede="Nexolve Technologies is a consulting firm with an engineering bench, founded in 2024 after years of hands-on delivery with leading consultancies and large enterprises."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="surface-blueprint about-belief">
        <Container className="relative py-16 sm:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="editorial-label text-navy-soft">What we believe</p>
              <h2 className="mt-4 text-3xl leading-tight font-bold tracking-[-0.04em] text-ink sm:text-4xl">
                Own the outcome, not just the work package.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-ink-muted">
              <p>
                We specialise in procurement and supply chain transformation. We design how
                organisations source, buy and pay, then implement the platforms and integrations
                that run the process.
              </p>
              <p>
                Process credibility, platform depth and software engineering sit in one team. That
                combination lets us stay accountable from design through adoption.
              </p>
              <p>
                We are precise about scope, plain about risk and honest about timing. We name the
                platform, the module and the date, then stay close enough to delivery to be
                measured.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="about-record" aria-labelledby="track-record-title">
        <Container className="relative py-16 sm:py-20">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label text-core-cyan">Evidence</p>
              <h2
                id="track-record-title"
                className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white"
              >
                Our track record
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/65">
              Delivery experience measured across live programmes, platform depth and operating
              regions.
            </p>
          </Reveal>
          <Reveal group as="dl" className="about-evidence">
            {trackRecord.map((stat) => (
              <div key={stat.label} data-reveal className="about-evidence__metric">
                <div className="about-evidence__visual" aria-hidden="true">
                  <Image
                    src={stat.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="about-evidence__top" aria-hidden="true">
                  <span className="about-evidence__icon">
                    <Icon name={stat.icon} size={22} />
                  </span>
                </div>
                <div className="about-evidence__body">
                  <dd>{stat.value}</dd>
                  <dt>{stat.label}</dt>
                </div>
                <span className="about-evidence__meter" aria-hidden="true">
                  <i />
                </span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="surface-network" aria-label="Leadership">
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for the work"
            lede="You deal with the people who set the standard and who still sit in delivery."
          />
          <Reveal group className="mt-12 grid max-w-4xl gap-6">
            {leadership.map((person) => (
              <article key={person.name} data-reveal className="leader-profile">
                <div
                  className="leader-profile__avatar"
                  aria-label={`${person.name} profile avatar`}
                >
                  <Icon name="user" size={52} />
                </div>
                <div>
                  <p className="editorial-label text-navy-soft">Leadership</p>
                  <h3>{person.name}</h3>
                  <p className="leader-profile__role">{person.role}</p>
                  <p className="leader-profile__credential">{person.credential}</p>
                  <p className="leader-profile__bio">{person.bio}</p>
                </div>
              </article>
            ))}
          </Reveal>
          <p className="mt-5 max-w-3xl text-xs leading-5 text-ink-muted">
            Additional team profiles and approved photographs will be added when supplied with
            consent.
          </p>
        </Container>
      </section>

      <section className="about-principles-section">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why Nexolve"
            title="Four reasons teams bring us in"
            lede="These are the delivery standards we accept being held to."
          />
          <Reveal group className="about-principles mt-10">
            {values.map((value, index) => (
              <article key={value.title} data-reveal className="about-principle">
                <span className="about-principle__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="about-principle__body">
                  <span className="about-principle__label">Delivery principle</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
                <span className="about-principle__icon" aria-hidden="true">
                  <Icon name={valueIcons[index] ?? "compass"} size={23} />
                </span>
              </article>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="surface-dark-network about-architecture">
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            eyebrow="Platform landscape"
            title="The stack we work across"
            lede="Four connected layers from source-to-pay through the integration fabric."
            dark
          />
          <Reveal group className="about-architecture__layers">
            {techStack.map((group, index) => (
              <article key={group.group} data-reveal className="about-architecture__layer">
                <div className="about-architecture__head">
                  <span className="about-architecture__node" aria-hidden="true">
                    L{String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span>Architecture layer</span>
                    <h3>{group.group}</h3>
                  </div>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechnologyMark name={item} compact />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal className="about-architecture__legend">
            <span aria-hidden="true" />
            <p>Connected from business process to integration fabric</p>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Get to know us the practical way."
        lede="One discovery session about your landscape will tell you more than any about page."
      />
    </>
  );
}
