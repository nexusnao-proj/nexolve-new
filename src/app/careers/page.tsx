import { careers } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Careers at Nexolve Technologies",
  description:
    "Join a senior team delivering enterprise procurement and platform programmes. Open roles at Nexolve are published here.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do the best engineering of your career"
        lede={careers.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />

      <section className="border-y border-line bg-white">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Why join" title="What working here is like" />
          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2">
            {careers.perks.map((perk) => (
              <div
                key={perk}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-line bg-neutral-light p-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-2 shrink-0 rounded-full bg-gradient-brand"
                />
                <p className="text-base leading-relaxed font-semibold text-ink">{perk}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-light">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow="Open positions" title="Current openings" />
          <Reveal className="mt-8">
            {careers.openRoles.length > 0 ? (
              <ul className="space-y-4">
                {careers.openRoles.map((role) => (
                  <li
                    key={role.title}
                    className="rounded-3xl border border-line bg-white p-7 shadow-card"
                  >
                    <h3 className="text-lg font-extrabold text-ink">{role.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      {role.type} · {role.location}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-center">
                <p className="text-base font-semibold text-ink">
                  No open roles are published right now.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                  Strong engineers, designers and strategists are always worth meeting. Introduce
                  yourself via the contact page.
                </p>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Think you'd raise our bar?"
        lede="Tell us what you've delivered and what you want to work on next."
        primaryLabel="Introduce yourself"
        secondaryLabel="About Nexolve"
        secondaryHref="/about"
      />
    </>
  );
}
