import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

const platforms = [
  ["SAP Ariba", "/brand/proof/sap-ariba.png"],
  ["Coupa", "/brand/proof/coupa.png"],
  ["Oracle", "/brand/proof/oracle.png"],
  ["SAP Fieldglass", "/brand/proof/sap-fieldglass.png"],
] as const;

const enterprises = [
  ["Engro Corporation", "/brand/proof/engro.png"],
  ["United Energy Pakistan", "/brand/proof/uep.png"],
  ["Packages Group", "/brand/proof/packages.png"],
  ["Woolworths", "/brand/proof/woolworths.png"],
  ["PanAust", "/brand/proof/panaust.png"],
  ["Pakistan Beverage Limited", "/brand/proof/pbl.png"],
  ["Alfalak", "/brand/proof/alfalak.png"],
  ["National Foods", "/brand/proof/national-foods.png"],
] as const;

/**
 * Delivery landscape — one quiet surface under the hero. Two labelled ranks on
 * a shared four-column rhythm: the platforms we deliver on, then the
 * enterprises those programmes ran for.
 */
export function BrandProof() {
  return (
    <section className="bg-neutral-light" aria-labelledby="brand-proof-title">
      <Container className="max-w-[1440px] py-14 sm:py-16 lg:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className="editorial-label text-navy-soft">Delivery landscape</p>
            <h2
              id="brand-proof-title"
              className="mt-3 max-w-3xl text-xl leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink sm:text-[1.55rem]"
            >
              The platforms we deliver on, and the enterprises they run for.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-violet transition-colors hover:text-navy"
          >
            All work <ArrowIcon />
          </Link>
        </Reveal>

        <Reveal className="brand-panel mt-8">
          <div className="brand-panel__group">
            <p className="brand-panel__label">Platforms we deliver on</p>
            <ul className="brand-panel__row brand-panel__row--platform">
              {platforms.map(([name, src]) => (
                <li key={name}>
                  <Image src={src} alt={name} width={512} height={150} sizes="220px" />
                </li>
              ))}
            </ul>
          </div>

          <div className="brand-panel__group">
            <p className="brand-panel__label">Enterprises served</p>
            <ul className="brand-panel__row brand-panel__row--enterprise">
              {enterprises.map(([name, src]) => (
                <li key={name}>
                  <Image src={src} alt={name} width={526} height={200} sizes="180px" />
                </li>
              ))}
            </ul>
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
