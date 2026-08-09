import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
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
    <section className="contact-workspace">
      <Container className="contact-workspace__container">
        <div className="contact-workspace__frame">
          <aside className="contact-workspace__intro">
            <Reveal>
              <p className="contact-workspace__eyebrow">Contact</p>
              <h1>Book a discovery session</h1>
              <p className="contact-workspace__lede">
                Tell us roughly what you are working with. We will make the first reply useful and
                treat everything you share confidentially.
              </p>
            </Reveal>

            <Reveal group className="discovery-expectations">
              {expectations.map((item) => (
                <div key={item.title} data-reveal className="discovery-expectation">
                  <span className="discovery-expectation__icon">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal className="discovery-direct">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <p>APAC &amp; Middle East</p>
              <p>PSEB registered</p>
            </Reveal>
          </aside>

          <Reveal delay={100} className="contact-workspace__form-panel">
            <div className="discovery-form">
              <div className="discovery-form__head">
                <span>Tell us about the work</span>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
