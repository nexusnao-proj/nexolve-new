import type { ProcessStep } from "./types";

/**
 * Delivery sequence — rendered on /process and the home page.
 * Each phase closes with something the client owns, not a status report.
 */
export const deliveryProcess: (ProcessStep & { detail: string[] })[] = [
  {
    title: "Assess",
    description: "Current-state review, spend baseline and platform readiness.",
    detail: [
      "Process, data and platform landscape review",
      "Spend baseline reconciled with finance",
      "Readiness and risk assessment in writing",
      "Output: diagnostic",
    ],
  },
  {
    title: "Design",
    description: "Process, category and integration design signed off by the business.",
    detail: [
      "Future-state process and operating model",
      "Category and integration design",
      "Business sign-off before configuration",
      "Output: blueprint",
    ],
  },
  {
    title: "Deploy",
    description: "Configuration, integration build and quality assurance.",
    detail: [
      "Platform configuration to the signed blueprint",
      "Integration build with named owners",
      "QA as a first-class workstream",
      "Output: live system",
    ],
  },
  {
    title: "Enable",
    description: "Supplier onboarding, change management and user training.",
    detail: [
      "Wave-planned supplier enablement",
      "Change management and communications",
      "Role-based user training",
      "Output: adoption",
    ],
  },
  {
    title: "Optimise",
    description: "Automation, analytics and continuous improvement.",
    detail: [
      "Adoption and value reporting against agreed metrics",
      "Automation of remaining manual steps",
      "Continuous improvement with named owners",
      "Output: measured value",
    ],
  },
];

/** Leadership — trust layer on /about. */
export const leadership = [
  {
    name: "Maaz Younus Chottani",
    role: "Chief Executive Officer",
    bio: "Founded Nexolve in 2024 out of years of hands-on delivery with leading consulting firms and large enterprises — 15+ enterprise programmes spanning sourcing, contracts, supplier management, P2P, ERP integration and analytics across APAC and the Middle East.",
  },
] as const;

/** Why Nexolve — rendered on /about and the home page. */
export const values = [
  {
    title: "Process and platform in one team",
    description:
      "Consultants who can redesign the process and configure the system that runs it — no handoff, no translation loss.",
  },
  {
    title: "Enterprise-grade delivery experience",
    description:
      "Our people came from the consulting firms and enterprise teams that ran these programmes at scale.",
  },
  {
    title: "Platform-agnostic advice",
    description:
      "Deepest in SAP Ariba, fluent in Coupa and Oracle — so the recommendation follows the requirement, not a licence.",
  },
  {
    title: "Measured on value, not documents",
    description:
      "Efficiency, compliance and agility in live operations — with adoption metrics we agree before we start.",
  },
];

/** Platform landscape — rendered on /about and home. Grouped by layer. */
export const techStack: { group: string; items: string[] }[] = [
  {
    group: "Source to Pay",
    items: [
      "SAP Ariba",
      "Coupa",
      "Oracle Procurement",
      "SAP Fieldglass",
      "Commerce Automation / DSN",
    ],
  },
  {
    group: "Core ERP",
    items: ["SAP S/4HANA", "SAP ECC", "SAP MM & SD", "Master Data Governance"],
  },
  {
    group: "Intelligence",
    items: ["SAP Joule AI", "SAP Analytics Cloud", "SpendConsole", "Custom Reporting"],
  },
  {
    group: "Integration & Build",
    items: ["OpenText", "DocuSign", "REST & SOAP APIs", "Web & Portals", "Next.js & TypeScript"],
  },
];

/** Careers — placeholder roles policy: no fabricated openings. */
export const careers = {
  intro:
    "We are a team of procurement consultants, platform architects and engineers who like delivered programmes more than decks about them. As Nexolve grows, open roles will be published here.",
  openRoles: [] as { title: string; type: string; location: string; href: string }[],
  perks: [
    "Work on enterprise programmes that actually go live",
    "Small senior team — your decisions ship into production",
    "APAC & Middle East delivery with remote-friendly collaboration",
    "Platform depth across SAP Ariba, Coupa, Oracle and the SAP core",
  ],
};
