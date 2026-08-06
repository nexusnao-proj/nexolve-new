import type { Service } from "./types";

/**
 * Service catalogue — the content source of truth for /services and all
 * service detail pages. Five service lines, one accountable team.
 */
export const services: Service[] = [
  {
    slug: "supply-chain-procurement-consulting",
    cover: {
      src: "/images/editorial/service-procurement-consulting.webp",
      alt: "One professional reviewing technical plans and material samples at a steel worktable",
    },
    title: "Supply Chain & Procurement Consulting",
    headline: "Supply Chain & Procurement Consulting",
    excerpt:
      "Category strategy, process design and operating models for procurement that has to work in live operations — not just in a deck.",
    intro:
      "Most procurement functions know what good looks like; the gap is getting there while the day job continues. Nexolve consultants have run sourcing, contracts, supplier management and P2P programmes inside large organisations across APAC and the Middle East. We design how you source, buy and pay — baselined against your actual spend, signed off by your business, and ready for the platform that will run it.",
    problems: [
      "Savings are claimed at award but never reach the P&L",
      "Sourcing cycles take months and still end in single-source decisions",
      "Maverick buying bypasses the process because the process is slower than the workaround",
      "No agreed spend baseline, so every savings number is negotiable",
      "Roles between the procurement CoE and business units are disputed or duplicated",
    ],
    capabilities: [
      {
        title: "Category strategy & strategic sourcing",
        description:
          "Category plans built from spend analysis, market research and stakeholder demand — then executed through structured RFx and negotiation events.",
      },
      {
        title: "Process and operating-model design",
        description:
          "Source-to-pay process maps, RACI, policy and workflow design that the business signs off before a system is configured.",
      },
      {
        title: "Spend and savings baselining",
        description:
          "A reconciled spend cube and a savings methodology finance accepts — so value is measured the same way by everyone.",
      },
      {
        title: "Procurement diagnostics",
        description:
          "A fixed-scope current-state review covering process, platform readiness, data quality and adoption gaps, closing with a prioritised roadmap.",
      },
      {
        title: "Contract and supplier lifecycle design",
        description:
          "Clause libraries, template strategy, onboarding flows and performance scorecards designed for the categories you actually run.",
      },
    ],
    useCases: [
      "Standing up a procurement function or CoE after a carve-out or reorganisation",
      "Rebasing spend and savings methodology ahead of an annual target cycle",
      "Redesigning a sourcing process that stakeholders route around",
      "Preparing the process blueprint before an SAP Ariba or Coupa implementation",
      "Category strategy for a high-spend area with no sourcing history",
    ],
    process: [
      {
        title: "Assess",
        description: "Current-state review, spend baseline and platform readiness — output is a diagnostic.",
      },
      {
        title: "Design",
        description: "Process, category and operating-model design signed off by the business — output is a blueprint.",
      },
      {
        title: "Deploy",
        description: "Pilot categories and live sourcing events against the new model — output is evidence it works.",
      },
      {
        title: "Enable",
        description: "Stakeholder training and handover into live operation — output is adoption with agreed measures.",
      },
    ],
    technologies: [
      "SpendConsole spend analytics",
      "SAP Ariba Guided Sourcing",
      "SAP Analytics Cloud",
      "Coupa spend analysis",
    ],
    benefits: [
      "A spend baseline finance and procurement both sign",
      "Category strategies with named owners and dated milestones",
      "Processes designed around how the business actually buys",
      "A blueprint the implementation team can configure from directly",
    ],
    faq: [
      {
        question: "Do you only consult, or do you also implement?",
        answer:
          "Both. The same team that designs the process can configure the platform that runs it — SAP Ariba, Coupa or Oracle — so nothing is lost in a handoff between advisory and delivery.",
      },
      {
        question: "How long does a diagnostic take?",
        answer:
          "A procurement diagnostic is a fixed-scope engagement, typically four to six weeks depending on data availability and stakeholder access. We give you the exact timeline in the proposal and do not oversell it.",
      },
      {
        question: "Will you work with our existing consulting partners?",
        answer:
          "Yes. We regularly deliver alongside established advisory firms and systems integrators — we bring platform depth, they bring scale, and the client gets one plan.",
      },
    ],
    related: ["source-to-pay-platform-delivery", "data-analytics-integrations"],
    icon: "compass",
  },
  {
    slug: "source-to-pay-platform-delivery",
    cover: {
      src: "/images/editorial/service-source-to-pay-platform-delivery.webp",
      alt: "Three gloved workers arranging black cards and a metal grid beside a laptop",
    },
    title: "Source-to-Pay Platform Delivery",
    headline: "Source-to-Pay Platform Delivery — SAP Ariba, Coupa & Oracle",
    excerpt:
      "SAP Ariba full suite, Coupa, Oracle Procurement, SAP Fieldglass and Commerce Automation — implemented end to end, upstream to adoption.",
    intro:
      "This is our deepest bench. The team has delivered 15+ Ariba programmes covering sourcing, contracts, supplier lifecycle, buying and invoicing, catalogues and commerce automation — integrated with S/4HANA, ECC and non-SAP estates. Most competitors stop after go-live of stage two; we stay through integration, supplier onboarding and adoption, because that is where source-to-pay programmes actually succeed or stall.",
    problems: [
      "A platform went live but suppliers still transact by email",
      "Upstream modules were bought and never configured beyond a pilot",
      "Catalogues are stale, so buyers punch out or free-text instead",
      "Integration between Ariba and the ERP breaks on every release",
      "Adoption metrics were never agreed, so nobody can say if it worked",
    ],
    capabilities: [
      {
        title: "Upstream: sourcing to supplier risk",
        description:
          "Sourcing & Guided Sourcing, Contracts & Clause Libraries, Supplier Lifecycle & Performance, and Supplier Risk — configured to your category strategies.",
      },
      {
        title: "Downstream: buying, invoicing and catalogues",
        description:
          "Buying & Invoicing (P2P), Catalogues & Punchout, Commerce Automation via the Digital Supplier Network, and supplier onboarding at scale.",
      },
      {
        title: "Integration",
        description:
          "S/4HANA and ECC integration, non-SAP ERP and third parties, Ariba APIs and CI upgrades, DocuSign, OpenText and e-signature flows.",
      },
      {
        title: "Adoption",
        description:
          "QA for large-scale programmes, change management and training, reporting and adoption metrics, and continuous optimisation after go-live.",
      },
      {
        title: "Coupa, Oracle & Fieldglass",
        description:
          "Full delivery capability across Coupa and Oracle Procurement Cloud, plus SAP Fieldglass for contingent workforce and services procurement.",
      },
    ],
    useCases: [
      "Full-suite SAP Ariba implementation from blueprint to adoption",
      "Recovering an Ariba programme that went live without supplier onboarding",
      "P2P rollout with catalogue and punchout strategy across multiple entities",
      "Commerce Automation via DSN for a high-volume supplier base",
      "Coupa or Oracle Procurement implementation where Ariba is not the fit",
    ],
    process: [
      {
        title: "Design",
        description: "Process, category and integration design signed off by the business — output is a blueprint.",
      },
      {
        title: "Deploy",
        description: "Configuration, integration build and quality assurance — output is a live system.",
      },
      {
        title: "Enable",
        description: "Supplier onboarding, change management and user training — output is adoption.",
      },
      {
        title: "Optimise",
        description: "Automation, analytics and continuous improvement — output is measured value.",
      },
    ],
    technologies: [
      "SAP Ariba (Sourcing, Contracts, SLP, Buying & Invoicing)",
      "Coupa",
      "Oracle Procurement Cloud",
      "SAP Fieldglass",
      "Ariba Commerce Automation / DSN",
      "DocuSign & OpenText",
    ],
    benefits: [
      "One team accountable for configuration, integration and adoption",
      "Supplier onboarding run as a managed workstream, not an afterthought",
      "Integration tested against real release cycles, not just go-live day",
      "Adoption metrics agreed before the programme starts",
    ],
    faq: [
      {
        question: "Are you tied to SAP Ariba?",
        answer:
          "No. We are deepest in SAP Ariba but fluent in Coupa and Oracle — the recommendation follows your requirement, not a licence we resell.",
      },
      {
        question: "Can you take over a programme mid-flight?",
        answer:
          "Yes. Recoveries usually start with a two-week programme review covering configuration, integration health and adoption data, then a remediation plan with fixed milestones.",
      },
      {
        question: "How do you handle supplier onboarding at scale?",
        answer:
          "As a structured workstream: supplier segmentation, wave planning, templated communications, guided enablement and weekly adoption reporting — run by our team alongside yours.",
      },
      {
        question: "Do you support the platform after go-live?",
        answer:
          "Yes — through the Optimise phase or a managed support arrangement covering release management, CI upgrades, configuration changes and reporting.",
      },
    ],
    related: ["erp-core-sap", "data-analytics-integrations", "supply-chain-procurement-consulting"],
    icon: "flow",
  },
  {
    slug: "erp-core-sap",
    cover: {
      src: "/images/editorial/service-erp-core-sap.webp",
      alt: "Technician inspecting a row of server racks with a flashlight",
    },
    title: "ERP & Core SAP",
    headline: "ERP & Core SAP — S/4HANA, ECC & Master Data",
    excerpt:
      "S/4HANA and ECC delivery, master data and migration, and SAP Joule AI enablement — the core your procurement platforms depend on.",
    intro:
      "Procurement platforms are only as good as the core they post to. Nexolve delivers the SAP core work that source-to-pay programmes need: S/4HANA and ECC procurement processes, master data governance and migration, and Joule AI enablement where it is grounded in real transactions. We run this as part of a wider programme or as a standalone workstream alongside your existing SI.",
    problems: [
      "An ECC estate with a S/4HANA deadline and no credible migration plan",
      "Vendor, material and purchasing master data duplicated across entities",
      "Procurement transactions failing downstream because core configuration was never aligned",
      "AI ambitions announced while the underlying master data is unfit",
    ],
    capabilities: [
      {
        title: "S/4HANA and ECC delivery",
        description:
          "Procurement and logistics process design and configuration across S/4HANA and ECC, aligned to the source-to-pay platform sitting above.",
      },
      {
        title: "Master data and migration",
        description:
          "Business partner, material, vendor and purchasing data — profiling, cleansing, governance design and cutover execution.",
      },
      {
        title: "SAP Joule AI enablement",
        description:
          "Joule scenarios grounded in your actual transactions and authorisations, enabled where the data supports them — not as a demo.",
      },
      {
        title: "Multi-entity rollouts",
        description:
          "Template design and phased rollouts across entities and shared service models, with localisation handled per entity.",
      },
    ],
    useCases: [
      "ECC to S/4HANA migration with procurement scope",
      "Master data remediation ahead of an Ariba or Coupa rollout",
      "Aligning MM configuration with a new P2P platform",
      "Joule AI enablement for procurement and supply chain transactions",
    ],
    process: [
      {
        title: "Assess",
        description: "System and data readiness review, customisation inventory and migration scoping.",
      },
      {
        title: "Design",
        description: "Template design, governance rules and cutover criteria agreed before configuration.",
      },
      {
        title: "Deploy",
        description: "Configuration, data migration and quality assurance against real business scenarios.",
      },
      {
        title: "Optimise",
        description: "Post-go-live stabilisation, governance handover and continuous improvement.",
      },
    ],
    technologies: [
      "SAP S/4HANA",
      "SAP ECC (MM & SD)",
      "Master Data Governance",
      "SAP Joule AI",
    ],
    benefits: [
      "A core configuration that matches how procurement actually transacts",
      "Master data your platforms and AI scenarios can rely on",
      "Migration milestones with named owners and explicit cutover criteria",
      "One team that understands both the ERP and the source-to-pay layer",
    ],
    faq: [
      {
        question: "Do you replace our existing SAP partner?",
        answer:
          "Not necessarily. We often deliver the procurement and data scope inside a programme run by a larger SI — through our alliance network or alongside yours.",
      },
      {
        question: "How do you de-risk a migration?",
        answer:
          "By starting with data profiling and a customisation inventory, then fixing scope and cutover criteria in writing. We name the module and the date — we do not give a timeline we cannot evidence.",
      },
      {
        question: "Is Joule AI ready for procurement use cases?",
        answer:
          "Where the underlying transactions and authorisations are clean, yes. We assess readiness first and only enable scenarios the data supports.",
      },
    ],
    related: ["source-to-pay-platform-delivery", "data-analytics-integrations"],
    icon: "database",
  },
  {
    slug: "data-analytics-integrations",
    cover: {
      src: "/images/editorial/service-data-analytics-integrations.webp",
      alt: "Hand adjusting a junction in transparent tubes connecting four black devices",
    },
    title: "Data, Analytics & Integrations",
    headline: "Data, Analytics & Integration Services",
    excerpt:
      "API and middleware integration, OpenText document flows, SAP Analytics Cloud and reporting — the fabric that connects the estate.",
    intro:
      "A source-to-pay estate touches the ERP, the finance stack, the document store and every supplier channel. Nexolve builds the integration and analytics layer that keeps it coherent: REST and SOAP APIs, middleware, OpenText document flows, and reporting that procurement, finance and IT all read the same way.",
    problems: [
      "Interfaces fail silently and are discovered at month-end",
      "Every module has its own report and none of them agree",
      "Contracts and invoices live in inboxes instead of a document platform",
      "Spend data is extracted manually before every board pack",
    ],
    capabilities: [
      {
        title: "API and middleware integration",
        description:
          "REST and SOAP interfaces between source-to-pay platforms, ERPs and third parties — with monitoring, error handling and release-tested upgrades.",
      },
      {
        title: "OpenText document flows",
        description:
          "Invoice, contract and document capture, storage and retrieval integrated with SAP and Ariba processes.",
      },
      {
        title: "SAP Analytics Cloud & reporting",
        description:
          "Spend, savings, adoption and supplier performance reporting on SAP Analytics Cloud, SpendConsole and custom reporting layers.",
      },
      {
        title: "Integration health & support",
        description:
          "Interface monitoring, reconciliation reports and managed support for the integration fabric after go-live.",
      },
    ],
    useCases: [
      "Connecting Ariba or Coupa to S/4HANA, ECC and non-SAP ERPs",
      "Invoice and contract document management on OpenText",
      "A single spend and savings reporting layer across modules",
      "e-Signature flows with DocuSign embedded in contract processes",
    ],
    process: [
      {
        title: "Design",
        description: "Interface catalogue, data mapping and error-handling design agreed with both system owners.",
      },
      {
        title: "Deploy",
        description: "Build, unit and scenario testing, and release-managed cutover.",
      },
      {
        title: "Enable",
        description: "Documentation, ownership handover and reconciliation reporting stood up with your team.",
      },
      {
        title: "Optimise",
        description: "Monitoring, reconciliation reporting and continuous improvement of the interface estate.",
      },
    ],
    technologies: [
      "REST & SOAP APIs",
      "SAP Integration Suite / middleware",
      "OpenText",
      "SAP Analytics Cloud",
      "SpendConsole",
      "DocuSign",
    ],
    benefits: [
      "Interfaces with monitoring and named failure handling, not silent breakage",
      "One reporting truth for spend, savings and adoption",
      "Documents findable and auditable inside the process they belong to",
      "An integration fabric that survives platform release cycles",
    ],
    faq: [
      {
        question: "Can you integrate non-SAP systems?",
        answer:
          "Yes. A significant share of our integration work connects Ariba and SAP to non-SAP ERPs, finance systems and third-party services over REST and SOAP APIs.",
      },
      {
        question: "Who owns the interfaces after delivery?",
        answer:
          "You do — documented and handed over. Where you prefer, we run them under a managed support agreement with agreed response times.",
      },
      {
        question: "Can you fix reporting without replacing our BI stack?",
        answer:
          "Usually, yes. We start from the decisions the reports must support, reconcile the data definitions, then build on SAP Analytics Cloud, SpendConsole or your existing layer.",
      },
    ],
    related: ["source-to-pay-platform-delivery", "erp-core-sap", "software-digital-engineering"],
    icon: "api",
  },
  {
    slug: "software-digital-engineering",
    cover: {
      src: "/images/editorial/service-software-digital-engineering.webp",
      alt: "Engineer working at a computer beside an exposed machine prototype",
    },
    title: "Software & Digital Engineering",
    headline: "Software & Digital Engineering",
    excerpt:
      "Supplier and internal portals, web platforms and websites, with managed support and QA — custom software from the same accountable team.",
    intro:
      "Some requirements do not fit inside a configured module. Nexolve engineers the custom layer around your platforms: supplier-facing portals, internal tools, web platforms and websites — designed, built and supported by the same team that runs your procurement programmes, so the software understands the process it serves.",
    problems: [
      "Suppliers chase status by email because there is no self-service channel",
      "Internal teams run critical trackers in spreadsheets",
      "A portal was built once, never maintained, and quietly abandoned",
      "QA is squeezed at the end of every programme and go-live pays for it",
    ],
    capabilities: [
      {
        title: "Supplier portals",
        description:
          "Self-service registration, onboarding, catalogue and status portals that sit on top of your source-to-pay platform and its APIs.",
      },
      {
        title: "Internal portals and tools",
        description:
          "Intake, approval tracking, dashboards and workflow tools shaped around your procurement operating model.",
      },
      {
        title: "Web platforms and websites",
        description:
          "Production-grade web platforms and company websites engineered for performance, accessibility and maintainability.",
      },
      {
        title: "Managed support and QA",
        description:
          "Structured QA for large-scale programmes and managed support for the software we build — with agreed response and release discipline.",
      },
    ],
    useCases: [
      "A supplier self-service portal over SAP Ariba and DSN",
      "Replacing spreadsheet trackers with a governed internal tool",
      "A corporate website or platform for a procurement-facing business",
      "Independent QA capacity for a large-scale platform programme",
    ],
    process: [
      {
        title: "Assess",
        description: "Journey and integration review — which requirements justify custom software and which do not.",
      },
      {
        title: "Design",
        description: "User journeys, data flows and integration points agreed with process owners before build.",
      },
      {
        title: "Deploy",
        description: "Incremental build with automated tests and weekly demonstrations of working software.",
      },
      {
        title: "Enable",
        description: "Training, documentation and handover — or managed support under an agreed service level.",
      },
    ],
    technologies: [
      "Next.js & TypeScript",
      "REST & SOAP APIs",
      "SAP Ariba APIs",
      "PostgreSQL",
      "Cloud hosting (AWS, Azure)",
    ],
    benefits: [
      "Software built by a team that already understands your procurement process",
      "Supplier-facing channels that reduce email and status-chasing",
      "QA as a first-class workstream, not a final-week scramble",
      "Support and handover options agreed in writing before build starts",
    ],
    faq: [
      {
        question: "Why would a procurement firm build our software?",
        answer:
          "Because the software we build sits on procurement processes and platform APIs. Supplier portals, intake tools and programme QA need that context more than they need a generic dev shop.",
      },
      {
        question: "Do you build standalone products too?",
        answer:
          "Yes — web platforms and websites beyond procurement scope are part of the fifth service line, delivered with the same engineering discipline.",
      },
      {
        question: "What happens after delivery?",
        answer:
          "Your choice: documented handover to your team, or managed support and QA under an agreed service level. Both are priced in the proposal before build starts.",
      },
    ],
    related: ["data-analytics-integrations", "source-to-pay-platform-delivery"],
    icon: "browser",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
