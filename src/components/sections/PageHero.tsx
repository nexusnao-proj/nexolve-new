import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";
import { MatrixMark } from "@/components/brand/MatrixMark";

type PageHeroProps = { eyebrow?: string; title: string; lede?: string; crumbs?: { name: string; path: string }[]; children?: React.ReactNode; className?: string };

export function PageHero({ eyebrow, title, lede, crumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("page-hero relative overflow-hidden border-b border-line bg-neutral-light", className)}>
      <MatrixMark animated className="page-hero__mark" />
      <Container className="relative max-w-[1440px] pb-14 pt-28 sm:pb-18 sm:pt-32 lg:px-12">
        {crumbs?.length ? <Breadcrumbs items={crumbs} className="mb-8" /> : null}
        <Reveal className="max-w-5xl">
          {eyebrow ? <p className="editorial-label mb-5 text-navy-soft">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-ink sm:text-5xl lg:text-[3.75rem]">{title}</h1>
          {lede ? <p className="mt-6 max-w-2xl text-[0.9375rem] leading-7 text-ink-muted sm:text-base">{lede}</p> : null}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
