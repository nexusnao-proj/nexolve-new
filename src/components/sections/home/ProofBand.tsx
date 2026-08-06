import Link from "next/link";
import type { IconName } from "@/lib/content/types";
import { caseStudies } from "@/lib/content/case-studies";
import { Container } from "@/components/ui/Container";
import { CardCover } from "@/components/ui/CardCover";
import { Reveal } from "@/components/animation/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ArrowIcon } from "@/components/ui/Button";

/** Card corner icons, keyed by the case study's industry. */
const industryIcon: Record<string, IconName> = {
  Conglomerate: "layers",
  "Oil & Gas": "plug",
  Retail: "cart",
  Manufacturing: "chip",
  Banking: "bank",
  FMCG: "truck",
  "Energy & Mining": "flow",
};

export function ProofBand() {
  const selectedWork = caseStudies.slice(0, 3);

  return (
    <section className="brand-proof bg-neutral-light" aria-labelledby="brand-proof-title">
      <Container className="max-w-[1440px] py-14 sm:py-20 lg:px-12">
        <Reveal className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <p className="editorial-label text-navy-soft">The proof</p>
            <h2
              id="brand-proof-title"
              className="mt-5 max-w-sm text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-ink sm:text-[2.6rem]"
            >
              Delivery evidence, stated plainly.
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-7 text-ink-muted">
              Enterprise programmes, approved experience and the platforms behind both.
            </p>
            <Link
              href="/work"
              className="mt-7 inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-violet transition-colors hover:text-navy"
            >
              View all case studies <ArrowIcon />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.map((work, index) => (
              <Link key={work.slug} href={`/work/${work.slug}`} className="proof-project group">
                <CardCover
                  cover={work.cover}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="proof-project__body">
                  <div className="nx-card__head">
                    <span className="nx-card__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-2.5">
                      <span className="editorial-label text-ink-muted">{work.industry}</span>
                      <Icon
                        name={industryIcon[work.industry] ?? "layers"}
                        size={18}
                        className="nx-card__icon"
                      />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg leading-[1.25] font-bold tracking-[-0.02em] text-ink">
                    {work.title}
                  </h3>
                  <p className="mt-3 grow text-[0.9375rem] leading-[1.6] text-ink-muted">
                    {work.excerpt}
                  </p>
                  <span className="nx-card__link nx-card__link--footed">
                    Read case study
                    <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
