import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/content/types";

export const metadata = buildMetadata({
  title: "Book a Discovery Session — Contact Nexolve",
  description:
    "Tell Nexolve Technologies about your source-to-pay landscape. We reply within one business day with an honest read on scope, timeline and next steps.",
  path: "/contact",
});

const expectations: { title: string; description: string; icon: IconName }[] = [
  {
    title: "A reply within one business day",
    description: "From a person who read your message, not an autoresponder.",
    icon: "calendar",
  },
  {
    title: "An honest first assessment",
    description: "Including ‘this does not need us’ when that is the truth.",
    icon: "compass",
  },
  {
    title: "A concrete next step",
    description: "Usually a short call followed by a scoped proposal.",
    icon: "flow",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a discovery session"
        lede="Tell us about your source-to-pay estate and we will make the first reply useful. Everything you share is treated confidentially."
        className="page-hero--blue"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="surface-dark-network discovery-section">
        <Container className="relative py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
            <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="editorial-label text-core-cyan">What happens next</p>
                <h2 className="mt-4 max-w-md text-3xl leading-tight font-bold tracking-[-0.04em] text-white">
                  A useful conversation starts with context.
                </h2>
              </Reveal>
              <Reveal group className="discovery-expectations">
                {expectations.map((item) => (
                  <div key={item.title} data-reveal className="discovery-expectation">
                    <span className="discovery-expectation__icon">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
              <Reveal className="discovery-direct">
                <p className="editorial-label text-white/55">Direct contact</p>
                <ul>
                  <li>{site.email}</li>
                  <li>www.nexolvetech.com</li>
                  <li>{site.address}</li>
                  <li>PSEB registered</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <div className="discovery-form">
                <div className="discovery-form__head">
                  <span>Discovery brief</span>
                  <span>Confidential</span>
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
