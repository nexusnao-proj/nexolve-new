import type { CaseStudy } from "./types";

/**
 * Selected delivery experience. Client names are withheld under NDA — sectors
 * and scope are stated plainly, and no unverifiable metrics are published.
 * References are available on request.
 */

export const caseStudies: CaseStudy[] = [
  {
    slug: "conglomerate-ariba-full-suite",
    cover: {
      src: "/images/editorial/case-conglomerate-ariba.webp",
      alt: "Woman arranging metal parts and material samples across a steel worktable",
    },
    title: "Full-suite SAP Ariba delivery for a diversified conglomerate",
    client: "Regional conglomerate (name withheld under NDA)",
    industry: "Conglomerate",
    excerpt:
      "Upstream sourcing through downstream P2P on SAP Ariba, integrated with the SAP core and rolled out across multiple business units.",
    problem:
      "A diversified group ran sourcing in email, contracts in shared drives and purchasing in the ERP with no connecting layer. Each business unit had its own process, savings claims were disputed between procurement and finance, and supplier onboarding took months.",
    solution:
      "Nexolve delivered the full source-to-pay chain on SAP Ariba: Sourcing and Contracts upstream, Buying & Invoicing downstream, Supplier Lifecycle across both — integrated with the group's SAP estate. The same team designed the process, configured the platform and ran supplier enablement in waves.",
    process: [
      "Baselined spend across business units and agreed one savings methodology with finance",
      "Designed the group process template with unit-level localisation",
      "Configured upstream and downstream modules and built the ERP integration",
      "Ran supplier onboarding in segmented waves with weekly adoption reporting",
    ],
    stack: ["SAP Ariba", "SAP S/4HANA", "Ariba Commerce Automation / DSN", "SAP Analytics Cloud"],
    results: [
      "One governed source-to-pay process across the group's business units",
      "Contracts moved from shared drives to a searchable, auditable repository",
      "Supplier onboarding run as a managed workstream with wave planning and adoption metrics",
      "Implementation, enablement and ongoing optimisation under one accountable team",
    ],
    relatedServices: [
      "source-to-pay-platform-delivery",
      "erp-core-sap",
      "data-analytics-integrations",
    ],
    accent: "blue",
  },
  {
    slug: "oil-gas-compliant-sourcing",
    cover: {
      src: "/images/editorial/case-oil-gas-sourcing.webp",
      alt: "Hard-hat worker inspecting a sealed industrial valve beside a black equipment case",
    },
    title: "Compliant sourcing and contracts for an oil & gas operator",
    client: "Oil & gas operator (name withheld under NDA)",
    industry: "Oil & Gas",
    excerpt:
      "Contract-heavy sourcing under strict compliance and audit regimes — with the audit trail built into the process itself.",
    problem:
      "Sourcing events involving technical evaluations were run over email and spreadsheets. Audit requests meant weeks of document reconstruction, contract renewals were missed, and supplier pre-qualification lived outside any system.",
    solution:
      "Nexolve configured sourcing, contracts and supplier lifecycle on SAP Ariba around the operator's compliance requirements: structured evaluations, approval gates, clause libraries and a governed repository, with HSE pre-qualification embedded in supplier onboarding.",
    process: [
      "Mapped sourcing and approval requirements against audit obligations",
      "Configured sourcing events with multi-disciplinary technical scoring",
      "Deployed clause libraries, templates and the contract repository",
      "Moved supplier pre-qualification and performance into SLP workflows",
    ],
    stack: ["SAP Ariba Sourcing & Contracts", "SAP Ariba SLP", "SAP ECC", "DocuSign"],
    results: [
      "Sourcing events produce their own audit evidence as they run",
      "Contract renewals and obligations visible ahead of expiry",
      "Supplier pre-qualification embedded in onboarding rather than bolted on",
      "e-Signature embedded in the contract execution flow",
    ],
    relatedServices: ["source-to-pay-platform-delivery", "supply-chain-procurement-consulting"],
    accent: "violet",
  },
  {
    slug: "retail-commerce-automation",
    cover: {
      src: "/images/editorial/case-retail-commerce.webp",
      alt: "Cardboard boxes riding autonomous carts and conveyors through a warehouse",
    },
    title: "Commerce automation across a retail supplier network",
    client: "Retail group (name withheld under NDA)",
    industry: "Retail",
    excerpt:
      "A long supplier tail moved from email transactions to digital commerce automation, with catalogues buyers actually use.",
    problem:
      "A retail group transacted with most of its supplier base by email and phone. Purchase orders were re-keyed, invoices arrived as PDFs, matching exceptions absorbed the shared service team, and buyers avoided a catalogue that was permanently out of date.",
    solution:
      "Nexolve delivered Ariba Buying & Invoicing with Commerce Automation via the Digital Supplier Network: suppliers segmented and onboarded in waves, catalogue content rebuilt with an ownership model, and invoice matching tuned with the finance team.",
    process: [
      "Segmented the supplier base by volume and digital readiness",
      "Rebuilt catalogue and punchout content with clear ownership",
      "Enabled suppliers onto DSN in planned waves with guided support",
      "Tuned matching and exception flows with the shared service centre",
    ],
    stack: ["SAP Ariba Buying & Invoicing", "Commerce Automation / DSN", "SAP S/4HANA", "OpenText"],
    results: [
      "High-volume suppliers transacting digitally from PO to invoice",
      "Catalogue content with a named owner and a maintenance cadence",
      "Exception queues redesigned around root causes, not just volume",
      "Adoption tracked against metrics agreed before the rollout started",
    ],
    relatedServices: ["source-to-pay-platform-delivery", "data-analytics-integrations"],
    accent: "magenta",
  },
  {
    slug: "manufacturing-s4hana-rollout",
    cover: {
      src: "/images/editorial/case-manufacturing-s4hana.webp",
      alt: "Technician holding a tablet beside a robotic machine working on a metal component",
    },
    title: "S/4HANA procurement rollout across manufacturing entities",
    client: "Manufacturing group (name withheld under NDA)",
    industry: "Manufacturing",
    excerpt:
      "Multi-entity S/4HANA procurement scope with master data remediation — the core a group P2P platform could rely on.",
    problem:
      "A manufacturing group moving to S/4HANA had vendor, material and purchasing master data duplicated across plants, and a first-entity template that was already diverging. The planned P2P platform above it had nothing stable to integrate with.",
    solution:
      "Nexolve delivered the procurement scope of the S/4HANA programme: template design, master data profiling and cleansing, MM configuration aligned to the future P2P layer, and a phased rollout across entities under a shared service model.",
    process: [
      "Profiled master data across plants and agreed governance rules",
      "Designed the procurement template with explicit localisation points",
      "Configured MM scope and aligned it with the P2P platform design",
      "Executed phased cutovers with entity-level readiness criteria",
    ],
    stack: ["SAP S/4HANA", "SAP MM", "Master Data Governance", "SAP Ariba"],
    results: [
      "A single governed procurement template across manufacturing entities",
      "Master data fit for the P2P platform and analytics above it",
      "Cutover criteria and readiness checks applied per entity",
      "Shared service exception volumes addressed at root cause",
    ],
    relatedServices: ["erp-core-sap", "source-to-pay-platform-delivery"],
    accent: "pink",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
