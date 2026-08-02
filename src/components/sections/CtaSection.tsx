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
    <section className="brand-cta relative overflow-hidden border-y-2 border-white/20 bg-navy">
      <MatrixMark dark animated className="brand-cta__mark" />
      <Container className="relative max-w-[1440px] py-16 sm:py-24 lg:px-12">
        <Reveal>
          <p className="editorial-label text-white/55">Procurement, solved.</p>
          <h2 className="mt-6 max-w-4xl text-5xl leading-[0.94] font-extrabold tracking-[-0.05em] text-balance text-white sm:text-7xl lg:text-[5.75rem]">{title}</h2>
          <div className="mt-8 grid gap-7 border-t-2 border-white/20 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-xl text-base leading-7 text-white/55 sm:text-lg">{lede}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryHref} size="lg">{primaryLabel}<ArrowIcon /></ButtonLink>
              <ButtonLink href={secondaryHref} size="lg" variant="secondary" className="border-white/45 text-white hover:border-white hover:bg-white hover:text-black">{secondaryLabel}</ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
