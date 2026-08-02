import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Short trust band. No fabricated logos, stats or awards — a clearly marked
 * placeholder strip shows where verified client logos belong.
 */
export function TrustStatement() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="py-12 sm:py-14">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed font-semibold text-balance text-ink sm:text-xl">
            Large organisations across APAC and the Middle East trust Nexolve to turn procurement
            ambition into systems that run in live operations.
          </p>
        </Reveal>
        <Reveal className="mt-8" delay={120}>
          <div
            className="mx-auto flex max-w-2xl items-center justify-center rounded-2xl border border-dashed border-line px-6 py-5 text-center text-sm text-ink-muted"
            aria-label="Client logos placeholder"
          >
            [Placeholder: verified client logos]
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
