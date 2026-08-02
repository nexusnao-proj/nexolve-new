import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
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

export function ProofBand() {
  const selectedWork = caseStudies.slice(0, 3);

  return (
    <section className="brand-proof border-y-2 border-ink bg-neutral-light" aria-labelledby="brand-proof-title">
      <Container className="max-w-[1440px] py-12 sm:py-20 lg:px-12">
        <Reveal className="grid gap-7 border-b-2 border-ink pb-8 lg:grid-cols-[0.45fr_1.55fr] lg:items-end">
          <div>
            <p className="editorial-label text-navy">The proof</p>
            <p className="mt-4 text-5xl font-extrabold tracking-[-0.055em] text-navy sm:text-6xl">15+</p>
            <p className="editorial-label mt-2 text-ink-muted">Enterprise programmes</p>
          </div>
          <div>
            <h2 id="brand-proof-title" className="max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
              Delivery evidence, stated plainly.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
              Enterprise programmes, approved experience and the platforms behind both.
            </p>
          </div>
        </Reveal>

        <Reveal group className="mt-8 grid border-l-2 border-t-2 border-ink lg:grid-cols-3">
          {selectedWork.map((work, index) => (
            <Link key={work.slug} href={`/work/${work.slug}`} data-reveal className="proof-project group">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-extrabold tracking-[0.12em] text-navy-soft">{String(index + 1).padStart(2, "0")}</span>
                <span className="editorial-label text-ink-muted">{work.industry}</span>
              </div>
              <h3 className="mt-7 text-2xl font-bold leading-[1.05] tracking-[-0.035em]">{work.title}</h3>
              <p className="mt-4 grow text-[0.9375rem] leading-6 text-ink-muted">{work.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-navy">Read case <ArrowIcon className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </Reveal>

        <div className="mt-8 flex items-end justify-between gap-5">
          <p className="editorial-label text-navy">Delivery landscape</p>
          <Link href="/work" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold">All work <ArrowIcon /></Link>
        </div>
        <Reveal group className="mt-4 grid grid-cols-2 border-l-2 border-t-2 border-ink sm:grid-cols-4">
          {platforms.map(([name, src]) => (
            <div key={name} data-reveal className="brand-proof__logo brand-proof__logo--platform">
              <Image src={src} alt={name} width={512} height={150} className="h-12 w-auto max-w-[82%] object-contain" />
            </div>
          ))}
        </Reveal>

        <Reveal group className="grid grid-cols-4 border-l-2 border-ink lg:grid-cols-8">
          {enterprises.map(([name, src]) => (
            <div key={name} data-reveal className="brand-proof__logo">
              <Image src={src} alt={name} width={526} height={200} className="h-12 w-auto max-w-[82%] object-contain" />
            </div>
          ))}
        </Reveal>
        <p className="mt-5 max-w-3xl text-xs leading-5 text-ink-muted">
          Project experience reflects work delivered by Nexolve team members during current and prior consulting engagements.
        </p>
      </Container>
    </section>
  );
}
