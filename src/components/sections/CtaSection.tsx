import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { MatrixMark } from "@/components/brand/MatrixMark";

type Props = { title?: string; lede?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string };

export function CtaSection({
  title = "Let's look at your landscape.",
  lede = "A short discovery session on your current source-to-pay estate — where value is sitting unused, and what it takes to release it.",
  primaryLabel = "Book a discovery session",
  primaryHref = "/contact",
  secondaryLabel = "Explore our services",
  secondaryHref = "/services",
}: Props) {
  return (
    <section className="brand-cta relative overflow-hidden bg-navy">
      <MatrixMark dark animated className="brand-cta__mark" />
      <Container className="relative max-w-[1440px] py-14 sm:py-20 lg:px-12">
        <Reveal className="grid gap-9 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-14">
          <div>
            <p className="editorial-label text-white/50">Procurement, solved.</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-white sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-7 text-white/55">{lede}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href={primaryHref} size="lg">
              {primaryLabel}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href={secondaryHref} size="lg" variant="onDark">
              {secondaryLabel}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
