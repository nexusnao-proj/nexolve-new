import type { ContentCover, IconName } from "./types";

/**
 * Platform landscape — the stack Nexolve works across, rendered on /solutions
 * and the home page capabilities section. Four layers, from the source-to-pay
 * platform down to the integration fabric.
 */
export type Solution = {
  slug: string;
  cover: ContentCover;
  title: string;
  outcome: string;
  description: string;
  bullets: string[];
  services: string[];
  icon: IconName;
};

export const solutions: Solution[] = [
  {
    slug: "source-to-pay",
    cover: {
      src: "/images/editorial/solution-source-to-pay.webp",
      alt: "Procurement specialist arranging supplier material samples beside a blank contract folder",
    },
    title: "Source to Pay",
    outcome: "One platform chain from sourcing to payment, adopted by the business",
    description:
      "The top layer of the estate — where sourcing, contracts, buying and supplier collaboration happen. We implement the full suite and stay through adoption, because go-live is the midpoint, not the finish.",
    bullets: [
      "SAP Ariba full suite — upstream and downstream",
      "Coupa and Oracle Procurement Cloud",
      "SAP Fieldglass for contingent workforce",
      "Commerce Automation via the Digital Supplier Network",
    ],
    services: ["source-to-pay-platform-delivery"],
    icon: "flow",
  },
  {
    slug: "core-erp",
    cover: {
      src: "/images/editorial/solution-core-erp.webp",
      alt: "Engineer inspecting rows of server modules beneath vertical cabling in a technical facility",
    },
    title: "Core ERP",
    outcome: "An SAP core that procurement transactions post to cleanly",
    description:
      "The layer everything reconciles against. S/4HANA and ECC procurement processes, master data governance and migration — delivered by a team that also understands the platforms sitting above.",
    bullets: [
      "SAP S/4HANA and SAP ECC",
      "SAP MM & SD process scope",
      "Master Data Governance and migration",
      "Multi-entity rollouts and shared service models",
    ],
    services: ["erp-core-sap"],
    icon: "database",
  },
  {
    slug: "intelligence",
    cover: {
      src: "/images/editorial/solution-intelligence.webp",
      alt: "Three analysts studying an abstract network of glowing data points on a glass wall",
    },
    title: "Intelligence",
    outcome: "Spend, savings and adoption everyone reads the same way",
    description:
      "The reporting and AI layer — grounded in clean transactions, not aspirations. Spend analytics, platform reporting and Joule AI scenarios enabled where the underlying data actually supports them.",
    bullets: [
      "SAP Analytics Cloud reporting",
      "SpendConsole spend analytics",
      "SAP Joule AI enablement",
      "Custom reporting for procurement, finance and the board",
    ],
    services: ["data-analytics-integrations", "erp-core-sap"],
    icon: "book",
  },
  {
    slug: "integration-build",
    cover: {
      src: "/images/editorial/solution-integration-build.webp",
      alt: "Technician walking beneath organized black cable routes in an industrial technology hall",
    },
    title: "Integration & Build",
    outcome: "An estate that stays connected through every release cycle",
    description:
      "The fabric underneath: APIs and middleware between platforms and ERPs, document flows, e-signature, and the custom portals and web platforms built where configuration ends.",
    bullets: [
      "OpenText document management",
      "DocuSign and e-signature flows",
      "REST & SOAP APIs and middleware",
      "Supplier portals, internal tools and web platforms",
    ],
    services: ["data-analytics-integrations", "software-digital-engineering"],
    icon: "plug",
  },
];
