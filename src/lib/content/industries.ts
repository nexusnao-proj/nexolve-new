import type { Industry } from "./types";

/**
 * Industry pages. Sector context shapes every sourcing decision — ours spans
 * six, from high-velocity FMCG to capital-heavy energy. proofNote stays honest:
 * sector coverage is claimed, client names are shared under NDA on request.
 */

export const industries: Industry[] = [
  {
    slug: "fmcg",
    title: "FMCG",
    headline: "Procurement & Supply Chain Transformation for FMCG",
    excerpt:
      "High-volume supplier networks, fast catalogue turnover and tight working capital — procurement built for speed without losing control.",
    intro:
      "FMCG procurement runs on volume and velocity: thousands of SKUs, fast-moving catalogues, promotional demand and working capital watched weekly. Nexolve designs and implements the sourcing, P2P and supplier processes that keep pace — catalogues that stay current, suppliers that transact digitally, and spend visibility that holds up at month-end.",
    challenges: [
      "Catalogue turnover that makes static content stale within a quarter",
      "Long supplier tails transacting by email and paper",
      "Promotional and seasonal demand stressing standard lead times",
      "Working capital pressure from payment terms and invoice cycle times",
    ],
    solutions: [
      {
        title: "Catalogue & content strategy",
        description:
          "Catalogue, punchout and content management processes that keep buying channels current at FMCG turnover rates.",
      },
      {
        title: "Supplier onboarding at scale",
        description:
          "Wave-planned enablement that moves the long tail onto digital transactions through Ariba and DSN.",
      },
      {
        title: "P2P cycle-time reduction",
        description:
          "Buying and invoicing flows redesigned around receipt, matching and approval bottlenecks that delay payment.",
      },
      {
        title: "Spend and savings baselining",
        description:
          "Category-level spend visibility across entities, reconciled with finance so savings claims hold.",
      },
    ],
    services: [
      "source-to-pay-platform-delivery",
      "supply-chain-procurement-consulting",
      "data-analytics-integrations",
    ],
    proofNote:
      "Team delivery record includes FMCG sourcing, catalogue and P2P programmes. Client names and references are shared under NDA on request.",
    icon: "cart",
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    headline: "Procurement & Supply Chain Transformation for Oil & Gas",
    excerpt:
      "Contract-heavy sourcing under strict compliance and audit regimes — with the documentation discipline this sector demands.",
    intro:
      "Oil and gas sourcing is contract-heavy, compliance-bound and audited end to end. Technical bid evaluations, frame agreements, HSE pre-qualification and JV audit rights all shape how procurement must run. Nexolve has delivered sourcing, contracts and supplier management programmes in exactly this environment — configured so the audit trail is a by-product of the process, not extra work.",
    challenges: [
      "Complex technical evaluations with multi-disciplinary scoring",
      "Compliance and audit requirements across every sourcing event",
      "Contract repositories that auditors cannot navigate",
      "Supplier risk and HSE pre-qualification handled outside the system",
    ],
    solutions: [
      {
        title: "Compliant sourcing design",
        description:
          "RFx and evaluation workflows with scoring, approval gates and documentation configured for audit from day one.",
      },
      {
        title: "Contract lifecycle on Ariba",
        description:
          "Clause libraries, templates and repository design so every agreement is findable, current and auditable.",
      },
      {
        title: "Supplier risk & lifecycle",
        description:
          "SLP and Supplier Risk modules configured around HSE pre-qualification and performance regimes.",
      },
      {
        title: "Integration with core ERP",
        description:
          "Contract and PO flows integrated with S/4HANA or ECC so commitments and actuals reconcile.",
      },
    ],
    services: [
      "source-to-pay-platform-delivery",
      "erp-core-sap",
      "data-analytics-integrations",
    ],
    proofNote:
      "Team delivery record includes contract-heavy sourcing and compliance programmes in oil & gas. Client names and references are shared under NDA on request.",
    icon: "truck",
  },
  {
    slug: "retail",
    title: "Retail",
    headline: "Procurement & Supply Chain Transformation for Retail",
    excerpt:
      "Long supplier tails, commerce automation and omnichannel replenishment — procurement that keeps shelves stocked and costs visible.",
    intro:
      "Retail procurement spans goods for resale and a long tail of indirect spend across stores, DCs and digital channels. Nexolve implements the platforms and automation that keep both sides moving: supplier networks transacting digitally, replenishment integrated with demand, and indirect spend brought under management without slowing the business down.",
    challenges: [
      "Thousands of suppliers across merchandise and indirect categories",
      "Store and DC purchasing happening outside managed channels",
      "Omnichannel replenishment straining legacy order processes",
      "Indirect spend unmanaged because it is everyone's part-time job",
    ],
    solutions: [
      {
        title: "Commerce automation",
        description:
          "DSN and EDI-style automation so high-volume suppliers transact digitally from PO to invoice.",
      },
      {
        title: "Guided buying for stores & DCs",
        description:
          "Catalogue-led buying experiences that make the compliant route the easiest route for non-procurement users.",
      },
      {
        title: "Indirect category management",
        description:
          "Category strategies and supplier panels for logistics, packaging, marketing and facilities spend.",
      },
      {
        title: "Supplier portals",
        description:
          "Self-service onboarding and status visibility that cut email traffic between buyers and suppliers.",
      },
    ],
    services: [
      "source-to-pay-platform-delivery",
      "supply-chain-procurement-consulting",
      "software-digital-engineering",
    ],
    proofNote:
      "Team delivery record includes retail sourcing, commerce automation and enablement programmes. Client names and references are shared under NDA on request.",
    icon: "browser",
  },
  {
    slug: "banking",
    title: "Banking",
    headline: "Procurement & Third-Party Risk for Banking",
    excerpt:
      "Third-party risk, governance and vendor lifecycle at the centre — procurement built for regulated environments.",
    intro:
      "Banking procurement is governed by outsourcing regulations, third-party risk frameworks and board-level vendor oversight. Every onboarding, renewal and exit needs evidence. Nexolve designs and implements supplier lifecycle, risk and contract processes that satisfy the regulator and still let the business buy at a reasonable pace.",
    challenges: [
      "Third-party risk assessments slowing onboarding to months",
      "Vendor data scattered across procurement, risk and business systems",
      "Outsourcing and materiality registers maintained manually",
      "Contract renewals discovered after auto-renewal, not before",
    ],
    solutions: [
      {
        title: "Supplier lifecycle & risk",
        description:
          "Onboarding, due diligence, risk tiering and ongoing monitoring configured in SLP and Supplier Risk.",
      },
      {
        title: "Contract governance",
        description:
          "Repositories, clause libraries and renewal alerts so obligations and exit windows are visible in advance.",
      },
      {
        title: "Approval & evidence workflows",
        description:
          "Sourcing and contracting workflows that capture the approvals and evidence auditors ask for.",
      },
      {
        title: "Vendor reporting",
        description:
          "Consolidated vendor, spend and risk reporting for procurement, risk and the board.",
      },
    ],
    services: [
      "source-to-pay-platform-delivery",
      "supply-chain-procurement-consulting",
      "data-analytics-integrations",
    ],
    proofNote:
      "Team delivery record includes vendor lifecycle and governance programmes in regulated environments. Client names and references are shared under NDA on request.",
    icon: "bank",
  },
  {
    slug: "energy-mining",
    title: "Energy & Mining",
    headline: "Procurement & Supply Chain Transformation for Energy & Mining",
    excerpt:
      "Capital projects, complex category structures and long lead times — sourcing designed for project-scale procurement.",
    intro:
      "Energy and mining procurement is capital-project driven: EPC packages, long-lead equipment, complex category structures and sites that are hard to reach. Nexolve brings sourcing, contracts and logistics-aware P2P delivery shaped around project timelines — so procurement milestones hold when the project schedule depends on them.",
    challenges: [
      "Capital project packages with multi-year sourcing timelines",
      "Long-lead categories exposed to commodity and logistics volatility",
      "Site purchasing and expediting run on spreadsheets and phone calls",
      "Contract claims and variations tracked outside the system",
    ],
    solutions: [
      {
        title: "Project sourcing & contracting",
        description:
          "Package strategies, RFx events and contract structures aligned to project schedules and risk allocation.",
      },
      {
        title: "Category strategy for long-lead items",
        description:
          "Market analysis, supplier panels and frame agreements for categories where lead time is the constraint.",
      },
      {
        title: "Site-enabled P2P",
        description:
          "Buying, receipting and invoicing flows that work for remote sites and shared service centres.",
      },
      {
        title: "Contract & claims visibility",
        description:
          "Repositories and reporting that keep variations, claims and milestones in one governed place.",
      },
    ],
    services: [
      "supply-chain-procurement-consulting",
      "source-to-pay-platform-delivery",
      "erp-core-sap",
    ],
    proofNote:
      "Team delivery record includes mining and energy sourcing programmes with capital-project scope. Client names and references are shared under NDA on request.",
    icon: "building",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    headline: "Procurement & Supply Chain Transformation for Manufacturing",
    excerpt:
      "Direct materials, multi-entity rollouts and shared service models — procurement integrated with the ERP core.",
    intro:
      "Manufacturing procurement lives or dies in the ERP: direct materials, MRP-driven buying, multi-entity structures and shared service models. Nexolve delivers the combination this sector needs — source-to-pay platforms integrated deeply with S/4HANA or ECC, master data that holds up across plants, and rollouts that respect each entity's reality.",
    challenges: [
      "Direct materials sourcing disconnected from production planning",
      "Master data inconsistencies across plants and entities",
      "Shared service centres processing exceptions instead of transactions",
      "Rollout templates that break on the second entity",
    ],
    solutions: [
      {
        title: "ERP-integrated P2P",
        description:
          "Buying and invoicing integrated with MM, MRP and finance so transactions post cleanly end to end.",
      },
      {
        title: "Master data governance",
        description:
          "Business partner, material and purchasing data cleansed and governed for multi-entity operation.",
      },
      {
        title: "Multi-entity rollouts",
        description:
          "Template design and phased deployment across plants, with localisation handled per entity.",
      },
      {
        title: "Direct materials sourcing",
        description:
          "Sourcing events, BOM-linked demand and supplier collaboration designed for direct categories.",
      },
    ],
    services: [
      "erp-core-sap",
      "source-to-pay-platform-delivery",
      "supply-chain-procurement-consulting",
    ],
    proofNote:
      "Team delivery record includes multi-entity manufacturing rollouts and shared service models. Client names and references are shared under NDA on request.",
    icon: "layers",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
