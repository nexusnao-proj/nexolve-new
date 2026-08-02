import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Testimonials section — placeholder by policy. No fabricated quotes:
 * clearly marked slots show where verified client testimonials belong.
 */
export function TestimonialsPlaceholder() {
  return (
    <section className="bg-white">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Client voices"
          title="What partners say about working with us"
          lede="Verified client testimonials will be published here with permission. We don't print quotes we can't stand behind."
          align="center"
        />
        <Reveal group className="mt-12 grid gap-5 md:grid-cols-2">
          {[1, 2].map((slot) => (
            <figure
              key={slot}
              data-reveal
              className="flex h-full flex-col rounded-3xl border border-dashed border-line bg-neutral-light p-8"
            >
              <svg aria-hidden="true" width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path
                  d="M0 24V13.7C0 6.5 4.6 1.5 12.2 0l1.5 3.6C8.9 5.2 6.6 8 6.4 11.3H13V24H0Zm19 0V13.7C19 6.5 23.6 1.5 31.2 0l1.5 3.6C27.9 5.2 25.6 8 25.4 11.3H32V24H19Z"
                  fill="url(#tq)"
                />
                <defs>
                  <linearGradient id="tq" x1="0" y1="0" x2="32" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0b2a44" />
                    <stop offset="1" stopColor="#4aa3dd" />
                  </linearGradient>
                </defs>
              </svg>
              <blockquote className="mt-5 grow text-base leading-relaxed text-ink-muted">
                [Placeholder: verified client testimonial — pending client permission]
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold text-ink">
                [Placeholder: client name &amp; role]
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
