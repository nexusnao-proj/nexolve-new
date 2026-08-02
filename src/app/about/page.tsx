import { leadership, values, techStack } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "About Nexolve Technologies",
  description:
    "Nexolve Technologies is a procurement and supply chain transformation firm working across APAC and the Middle East — consulting, platform delivery, integration and software engineering from one accountable team.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built on delivery, not on a pitch deck"
        lede="Nexolve Technologies is a consulting firm with an engineering bench — founded in 2024 out of years of hands-on delivery with leading consulting firms and large enterprises."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="border-y border-line bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                What we believe
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
                <p>
                  We specialise in procurement and supply chain transformation — designing how
                  organisations source, buy and pay, then implementing the platforms and
                  integrations that run it.
                </p>
                <p>
                  Our team has been part of 15+ enterprise programmes spanning sourcing,
                  contracts, supplier management, P2P, ERP integration and analytics. That
                  combination — process credibility plus platform and software engineering
                  under one roof — is what lets us own an outcome rather than a work package.
                </p>
                <p>
                  We are precise, plain, specific about scope and honest about risk. We name
                  the platform, the module and the date. We never oversell a timeline.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="border-l border-line pl-8 sm:pl-10">
                <p className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                  The team
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  A senior, hands-on team of procurement consultants, platform architects and
                  engineers — small enough that the people you meet are the people who deliver.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <dt className="sr-only">Enterprise programmes</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-navy">15+</dd>
                    <dd className="mt-1 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">Enterprise programmes</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Years combined delivery</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-navy">24+</dd>
                    <dd className="mt-1 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">Years combined delivery</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Platforms and modules</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-navy">9</dd>
                    <dd className="mt-1 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">Platforms & modules</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Delivery regions</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-navy">2</dd>
                    <dd className="mt-1 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">Delivery regions</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-neutral-light" aria-label="Leadership">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for the work"
            lede="You deal with the people who set the standard — and who still sit in delivery."
          />
          <Reveal group className="mt-12 grid max-w-3xl gap-10">
            {leadership.map((person) => (
              <article key={person.name} data-reveal className="group rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-gradient-brand" />
                <div className="mt-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-ink-muted">
                    {person.role}
                  </p>
                  <p className="mt-1 text-xs font-bold tracking-[0.14em] text-navy uppercase">
                    {person.credential}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                    {person.bio}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why Nexolve"
            title="Four reasons teams bring us in"
            lede="These aren't wall posters. They're the standards we accept being held to."
          />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                data-reveal
                className="rounded-3xl border border-line bg-neutral-light p-7 shadow-card"
              >
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-gradient-brand" />
                <h3 className="mt-4 text-lg font-extrabold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-neutral-light">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Platform landscape"
            title="The stack we work across"
            lede="Four layers, from the source-to-pay platform down to the integration fabric."
          />
          <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((group) => (
              <div key={group.group} data-reveal className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-sm font-extrabold tracking-wide text-ink">{group.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-neutral-light px-3 py-1 text-xs font-semibold text-ink-muted"
                    >
                      {item}
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
