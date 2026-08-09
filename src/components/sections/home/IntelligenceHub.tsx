import Link from "next/link";
import type { IconName } from "@/lib/content/types";
import { MatrixMark } from "@/components/brand/MatrixMark";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { TechnologyMark } from "@/components/ui/TechnologyMark";
import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

const layers: {
  number: string;
  title: string;
  descriptor: string;
  icon: IconName;
  items: string[];
}[] = [
  {
    number: "01",
    title: "Source to Pay",
    descriptor: "Buy with control",
    icon: "cart",
    items: ["SAP Ariba", "Coupa", "Oracle Procurement", "SAP Fieldglass"],
  },
  {
    number: "02",
    title: "Core ERP",
    descriptor: "Run on trusted data",
    icon: "database",
    items: ["SAP S/4HANA", "SAP ECC", "SAP MM & SD", "Master Data Governance"],
  },
  {
    number: "03",
    title: "Intelligence",
    descriptor: "Decide with evidence",
    icon: "sparkles",
    items: ["SAP Joule AI", "SAP Analytics Cloud", "SpendConsole", "Custom Reporting"],
  },
  {
    number: "04",
    title: "Integration & Build",
    descriptor: "Connect every edge",
    icon: "api",
    items: ["OpenText", "DocuSign", "REST & SOAP APIs", "Web & Portals"],
  },
];

export function IntelligenceHub() {
  return (
    <section className="hub-section" aria-labelledby="intelligence-hub-title">
      <Container className="max-w-[1440px] py-14 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="editorial-label text-core-cyan">Platform landscape</p>
            <h2
              id="intelligence-hub-title"
              className="mt-5 max-w-sm text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-white sm:text-[2.6rem]"
            >
              The stack we work across.
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-7 text-white/60">
              Four connected layers, from source-to-pay through the integration fabric. Designed,
              implemented and supported by one accountable team.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex min-h-11 items-center gap-2.5 text-sm font-bold text-core-cyan transition-colors hover:text-white"
            >
              Explore the service lines <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal className="platform-stack">
            <div className="platform-stack__head">
              <span>Connected delivery architecture</span>
              <span>Process · Platform · Data · Build</span>
            </div>
            <ol className="platform-stack__layers">
              {layers.map((layer) => (
                <li key={layer.number} className="platform-stack__layer">
                  <div className="platform-stack__layer-head">
                    <span className="platform-stack__number">{layer.number}</span>
                    <span className="platform-stack__icon">
                      <Icon name={layer.icon} size={20} />
                    </span>
                    <div>
                      <p>{layer.descriptor}</p>
                      <h3 className="platform-stack__title">{layer.title}</h3>
                    </div>
                  </div>
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
            <div className="platform-stack__core" aria-hidden="true">
              <div className="platform-stack__core-inner">
                <MatrixMark dark animated cut="compact" className="platform-stack__mark" />
                <span>One team</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
