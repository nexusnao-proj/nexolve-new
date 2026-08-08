export type Faq = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ContentCover = {
  src: `/images/editorial/${string}.webp`;
  alt: string;
};

export type Service = {
  slug: string;
  cover: ContentCover;
  /** Short label used in nav, cards and related lists. */
  title: string;
  /** SEO page title (H1). */
  headline: string;
  excerpt: string;
  intro: string;
  problems: string[];
  capabilities: { title: string; description: string }[];
  useCases: string[];
  process: ProcessStep[];
  technologies: string[];
  benefits: string[];
  faq: Faq[];
  related: string[];
  icon: IconName;
};

export type Industry = {
  slug: string;
  cover: ContentCover;
  title: string;
  headline: string;
  excerpt: string;
  intro: string;
  challenges: string[];
  solutions: { title: string; description: string }[];
  services: string[];
  proofNote: string;
  icon: IconName;
};

export type CaseStudy = {
  slug: string;
  cover: ContentCover;
  title: string;
  client: string;
  industry: string;
  excerpt: string;
  problem: string;
  solution: string;
  process: string[];
  stack: string[];
  results: string[];
  /** Optional — only publish quotes with explicit permission. */
  testimonial?: string;
  relatedServices: string[];
  accent: "blue" | "violet" | "magenta" | "pink";
};

export type PostSection = {
  id: string;
  heading: string;
  body: string[];
};

export type Post = {
  slug: string;
  cover: ContentCover;
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string; // ISO
  author: { name: string; role: string };
  sections: PostSection[];
  related: string[];
};

export const postCategories = [
  "Procurement",
  "Source-to-Pay",
  "SAP Ariba",
  "ERP & SAP",
  "Integration",
  "Analytics",
  "Software Engineering",
] as const;

export type PostCategory = (typeof postCategories)[number];

export type IconName =
  | "compass"
  | "chip"
  | "bot"
  | "sparkles"
  | "book"
  | "flow"
  | "browser"
  | "layers"
  | "phone"
  | "api"
  | "cloud"
  | "pen"
  | "refresh"
  | "database"
  | "plug"
  | "bank"
  | "heart"
  | "cart"
  | "truck"
  | "cap"
  | "building"
  | "briefcase"
  | "rocket"
  | "calendar"
  | "users"
  | "shield"
  | "globe"
  | "badge";
