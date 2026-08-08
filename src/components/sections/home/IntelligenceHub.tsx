import Link from "next/link";
import type { IconName } from "@/lib/content/types";
import { MatrixMark } from "@/components/brand/MatrixMark";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { TechnologyMark } from "@/components/ui/TechnologyMark";
import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

const layers: { number: string; title: string; icon: IconName; items: string[] }[] = [
  {
    number: "01",
    title: "Source to Pay",
    icon: "cart",
    items: ["SAP Ariba", "Coupa", "Oracle Procurement", "SAP Fieldglass"],
  },
  {
    number: "02",
    title: "Core ERP",
    icon: "database",
    items: ["SAP S/4HANA", "SAP ECC", "SAP MM & SD", "Master Data Governance"],
  },
  {
    number: "03",
    title: "Intelligence",
    icon: "sparkles",
    items: ["SAP Joule AI", "SAP Analytics Cloud", "SpendConsole", "Custom Reporting"],
  },
  {
    number: "04",
    title: "Integration & Build",
    icon: "api",
    items: ["OpenText", "DocuSign", "REST & SOAP APIs", "Web & Portals"],
  },
];

export function IntelligenceHub() {
  return (
    <section className="hub-section text-ink" aria-labelledby="intelligence-hub-title">
      <Container className="max-w-[1440px] py-14 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="editorial-label text-navy-soft">Platform landscape</p>
            <h2
              id="intelligence-hub-title"
              className="mt-5 max-w-sm text-3xl leading-[1.05] font-bold tracking-[-0.04em] sm:text-[2.6rem]"
            >
              The stack we work across.
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-7 text-ink-muted">
              Four connected layers, from source-to-pay through the integration fabric. Designed,
              implemented and supported by one accountable team.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-violet transition-colors hover:text-navy"
            >
              Explore the service lines <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal className="platform-stack">
            <div className="platform-stack__head">
              <span>Nexolve Technologies / Platform system</span>
              <MatrixMark dark animated cut="compact" className="platform-stack__mark" />
            </div>
            <ol className="platform-stack__layers">
              {layers.map((layer) => (
                <li key={layer.number} className="platform-stack__layer">
                  <span className="platform-stack__number">{layer.number}</span>
                  <h3 className="platform-stack__title">
                    <Icon name={layer.icon} size={19} />
                    {layer.title}
                  </h3>
                  <ul className="platform-stack__chips" aria-label={`${layer.title} technologies`}>
                    {layer.items.map((item) => (
                      <li key={item}>
                        <TechnologyMark name={item} compact />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="platform-stack__foot">
              <span>Process</span>
              <i />
              <span>Platform</span>
              <i />
              <span>Data</span>
              <i />
              <span>Build</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
