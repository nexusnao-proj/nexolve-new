import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

export const metadata = buildMetadata({
  title: "Book a Discovery Session — Contact Nexolve",
  description:
    "Tell Nexolve Technologies about your source-to-pay landscape. We reply within one business day with an honest read on scope, timeline and next steps.",
  path: "/contact",
});

const expectations = [
  {
    title: "A reply within one business day",
    description: "From a person who read your message — not an autoresponder.",
  },
  {
    title: "An honest first assessment",
    description: "Including 'this doesn't need us' when that's the truth.",
  },
  {
    title: "A concrete next step",
    description: "Usually a short call, then a scoped, fixed-price proposal.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a discovery session"
        lede="The more you can tell us about your source-to-pay estate, the more useful our first reply will be. Everything you share is treated confidentially."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="border-t border-line bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <Reveal group className="space-y-4">
                {expectations.map((item, i) => (
                  <div key={item.title} data-reveal className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-white"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="text-base font-extrabold text-ink">{item.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
              <Reveal className="rounded-3xl border border-line bg-neutral-light p-7">
                <h2 className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                  Direct contact
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  <li>{site.email}</li>
                  <li>www.nexolvetech.com</li>
                  <li>{site.address}</li>
                  <li>PSEB registered</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
