import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import type { IconName } from "@/lib/content/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const proofStats: { value: string; label: string; icon: IconName }[] = [
  { value: "15+", label: "Enterprise programmes delivered", icon: "building" },
  { value: "24+", label: "Years combined delivery experience", icon: "calendar" },
  { value: "9", label: "Platforms & modules expertise", icon: "users" },
  { value: "2", label: "Delivery regions", icon: "shield" },
];

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
    <section className="brand-proof border-y border-line bg-white" aria-labelledby="brand-proof-title">
      <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12 lg:py-24">
        {/* The Proof — stats */}
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] lg:items-end lg:gap-16">
          <div>
            <p className="editorial-label text-blue">The proof</p>
            <h2
              id="brand-proof-title"
              className="mt-4 max-w-md text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem]"
            >
              Trusted outcomes. Proven impact.
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <Icon name={stat.icon} size={24} className="text-blue" />
                <dd className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-ink sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 max-w-[9.5rem] text-[0.8rem] leading-snug text-ink-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Delivery evidence — case studies */}
        <div className="mt-16 sm:mt-20">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label text-blue">Delivery evidence</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-ink sm:text-3xl">
                Real outcomes. Delivered.
              </h3>
            </div>
            <Link
              href="/work"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-navy"
            >
              View all work <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal group className="mt-8 grid gap-5 lg:grid-cols-3">
            {selectedWork.map((work, index) => (
              <Link
                key={work.slug}
                href={`/work/${work.slug}`}
                data-reveal
                className="proof-project group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-extrabold tracking-[0.12em] text-ink-muted transition-colors group-hover:text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="editorial-label text-blue transition-colors group-hover:text-white/70">
                    {work.industry}
                  </span>
                </div>
                <h4 className="mt-6 text-xl font-bold leading-[1.15] tracking-[-0.03em] text-ink transition-colors group-hover:text-white">
                  {work.title}
                </h4>
                <p className="mt-3 grow text-[0.9375rem] leading-6 text-ink-muted transition-colors group-hover:text-white/70">
                  {work.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors group-hover:text-white">
                  Read case study{" "}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>

        {/* Platform landscape — logos */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-end justify-between gap-5">
            <p className="editorial-label text-blue">Platform landscape</p>
            <Link
              href="/solutions"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-navy"
            >
              All platforms <ArrowIcon />
            </Link>
          </div>

          <Reveal group className="proof-logo-grid mt-5">
            {platforms.map(([name, src]) => (
              <div key={name} data-reveal className="brand-proof__logo brand-proof__logo--platform">
                <Image
                  src={src}
                  alt={name}
                  width={512}
                  height={150}
                  className="h-10 w-auto max-w-[78%] object-contain sm:h-12"
                />
              </div>
            ))}
            {enterprises.map(([name, src]) => (
              <div key={name} data-reveal className="brand-proof__logo">
                <Image
                  src={src}
                  alt={name}
                  width={526}
                  height={200}
                  className="h-9 w-auto max-w-[78%] object-contain sm:h-10"
                />
              </div>
            ))}
          </Reveal>

          <p className="mt-5 max-w-3xl text-xs leading-5 text-ink-muted">
            Project experience reflects work delivered by Nexolve team members during current and
            prior consulting engagements.
          </p>
        </div>
      </Container>
    </section>
  );
}
