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

const trackRecord: { value: string; label: string; icon: IconName }[] = [
  { value: "15+", label: "Enterprise programmes", icon: "building" },
  { value: "24+", label: "Years combined delivery", icon: "calendar" },
  { value: "9", label: "Platforms and modules", icon: "layers" },
  { value: "2", label: "Delivery regions", icon: "globe" },
];

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
                platform, the module and the date, then stay close enough to delivery to be measured.
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
              <h2 id="track-record-title" className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white">
                Our track record
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/65">
              Delivery experience measured across live programmes, platform depth and operating regions.
            </p>
          </Reveal>
          <Reveal group as="dl" className="about-record__stats">
            {trackRecord.map((stat) => (
              <div key={stat.label} data-reveal className="about-record__stat">
                <Icon name={stat.icon} size={23} />
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
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
                <div className="leader-profile__avatar" aria-label={`${person.name} profile image placeholder`}>
                  MY
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
            Additional team profiles and approved photographs will be added when supplied with consent.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why Nexolve"
            title="Four reasons teams bring us in"
            lede="These are the delivery standards we accept being held to."
          />
          <Reveal group className="about-values mt-10">
            {values.map((value, index) => (
              <div key={value.title} data-reveal className="about-value">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="surface-dark-network about-stack">
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            eyebrow="Platform landscape"
            title="The stack we work across"
            lede="Four connected layers from source-to-pay through the integration fabric."
            dark
          />
          <Reveal group className="about-stack__grid">
            {techStack.map((group, index) => (
              <div key={group.group} data-reveal className="about-stack__group">
                <div className="about-stack__head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.group}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechnologyMark name={item} compact />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
