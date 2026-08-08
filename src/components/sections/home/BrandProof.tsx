import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Marquee } from "@/components/animation/Marquee";
import { ArrowIcon } from "@/components/ui/Button";
import { TechnologyMark } from "@/components/ui/TechnologyMark";

const platforms = ["SAP Ariba", "Coupa", "Oracle", "SAP Fieldglass"] as const;

const enterprises = [
  ["Engro Corporation", "/brand/proof/engro.webp", 471, 199],
  ["United Energy Pakistan", "/brand/proof/uep.webp", 103, 103],
  ["Packages Group", "/brand/proof/packages.webp", 150, 150],
  ["Woolworths", "/brand/proof/woolworths.webp", 172, 134],
  ["PanAust", "/brand/proof/panaust.webp", 200, 200],
  ["Pakistan Beverage Limited", "/brand/proof/pbl.webp", 526, 184],
  ["Alfalak", "/brand/proof/alfalak.webp", 212, 164],
  ["National Foods", "/brand/proof/national-foods.webp", 198, 198],
] as const;

export function BrandProof() {
  return (
    <section className="surface-blueprint" aria-labelledby="brand-proof-title">
      <Container className="relative max-w-[1440px] py-14 sm:py-16 lg:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className="editorial-label text-navy-soft">Delivery landscape</p>
            <h2
              id="brand-proof-title"
              className="mt-3 max-w-3xl text-xl leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink sm:text-[1.55rem]"
            >
              Platform depth up front. Enterprise evidence in motion.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-violet transition-colors hover:text-navy"
          >
            Explore delivery evidence <ArrowIcon />
          </Link>
        </Reveal>

        <Reveal className="brand-panel mt-8">
          <div className="brand-panel__group brand-panel__group--platforms">
            <p className="brand-panel__label">Platforms we deliver on</p>
            <ul className="brand-panel__platform-wall">
              {platforms.map((name) => (
                <li key={name}>
                  <TechnologyMark name={name} />
                </li>
              ))}
            </ul>
          </div>

          <div className="brand-panel__group brand-panel__group--enterprises">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="brand-panel__label">Enterprises served</p>
              <p className="text-xs text-ink-muted">Across APAC and the Middle East</p>
            </div>
            <Marquee className="brand-marquee mt-5">
              {enterprises.map(([name, src, width, height]) => (
                <span key={name} className="brand-marquee__item">
                  <Image src={src} alt={name} width={width} height={height} sizes="180px" />
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>

        <p className="mt-5 max-w-3xl text-xs leading-5 text-ink-muted">
          Project experience reflects work delivered by Nexolve team members during current and prior
          consulting engagements.
        </p>
      </Container>
    </section>
  );
}
