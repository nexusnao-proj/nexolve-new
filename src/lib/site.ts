/**
 * Global site configuration — single source of truth for brand strings,
 * URLs and navigation. Company name must always be written "Nexolve Technologies".
 */
const DEFAULT_SITE_URL = "https://www.nexolvetechnologies.com";

/**
 * Vercel environment values are user-entered and may be blank or omit a scheme.
 * Always expose a valid HTTP(S) origin because Next.js evaluates metadata while
 * collecting the built-in /_not-found route.
 */
export function resolveSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();

  if (!candidate) return DEFAULT_SITE_URL;

  const absoluteCandidate = /^[a-z][a-z\d+.-]*:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    const url = new URL(absoluteCandidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return DEFAULT_SITE_URL;
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const site = {
  name: "Nexolve Technologies",
  legalName: "Nexolve Technologies",
  tagline: "Procurement, solved.",
  description:
    "Procurement and supply chain transformation across SAP, Coupa and Oracle, delivered by one accountable consulting, integration and engineering team.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "info@nexolvetechnologies.com",
  address: "APAC & Middle East",
  social: {
    linkedin: "https://www.linkedin.com/company/nexolve-technologies",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: { label: string; href: string; children?: NavItem[] }[] = [
  { label: "Services", href: "/services" },
  { label: "Platforms", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: [
    {
      label: "Supply Chain & Procurement Consulting",
      href: "/services/supply-chain-procurement-consulting",
    },
    { label: "Source-to-Pay Platform Delivery", href: "/services/source-to-pay-platform-delivery" },
    { label: "ERP & Core SAP", href: "/services/erp-core-sap" },
    { label: "Data, Analytics & Integrations", href: "/services/data-analytics-integrations" },
    { label: "Software & Digital Engineering", href: "/services/software-digital-engineering" },
    { label: "All services", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Work", href: "/work" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  industries: [
    { label: "FMCG", href: "/industries/fmcg" },
    { label: "Oil & Gas", href: "/industries/oil-gas" },
    { label: "Retail", href: "/industries/retail" },
    { label: "Banking", href: "/industries/banking" },
    { label: "Energy & Mining", href: "/industries/energy-mining" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
    { label: "All industries", href: "/industries" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const;
