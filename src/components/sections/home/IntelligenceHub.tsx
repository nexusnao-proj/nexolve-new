import Link from "next/link";
import { MatrixMark } from "@/components/brand/MatrixMark";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Button";

const layers = [
  {
    number: "01",
    title: "Source to Pay",
    items: ["SAP Ariba", "Coupa", "Oracle Procurement", "SAP Fieldglass"],
  },
  {
    number: "02",
    title: "Core ERP",
    items: ["SAP S/4HANA", "SAP ECC", "SAP MM & SD", "Master Data Governance"],
  },
  {
    number: "03",
    title: "Intelligence",
    items: ["SAP Joule AI", "SAP Analytics Cloud", "SpendConsole", "Custom Reporting"],
  },
  {
    number: "04",
    title: "Integration & Build",
    items: ["OpenText", "DocuSign", "REST & SOAP APIs", "Web & Portals"],
  },
] as const;

export function IntelligenceHub() {
  return (
    <section className="hub-section border-y-2 border-ink text-ink" aria-labelledby="intelligence-hub-title">
      <Container className="max-w-[1440px] py-16 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
          <div>
            <p className="editorial-label text-navy">Platform landscape</p>
            <h2 id="intelligence-hub-title" className="mt-5 max-w-xl text-4xl leading-[1] font-bold tracking-[-0.05em] sm:text-5xl">
              The stack we work across.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-ink-muted">
              Four connected layers, from source-to-pay through the integration fabric. Designed, implemented and supported by one accountable team.
            </p>
            <Link href="/services" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b-2 border-ink/35 text-sm font-bold transition-colors hover:border-navy hover:text-navy">
              Explore the service lines <ArrowIcon />
            </Link>
          </div>

          <div className="platform-stack">
            <div className="platform-stack__head">
              <span>NEXOLVE TECHNOLOGIES / PLATFORM SYSTEM</span>
              <MatrixMark animated cut="compact" className="platform-stack__mark" />
            </div>
            <ol className="platform-stack__layers">
              {layers.map((layer) => (
                <li key={layer.number} className="platform-stack__layer">
                  <span className="platform-stack__number">{layer.number}</span>
                  <h3>{layer.title}</h3>
                  <ul>
                    {layer.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="platform-stack__foot">
              <span>PROCESS</span><i /><span>PLATFORM</span><i /><span>DATA</span><i /><span>BUILD</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
