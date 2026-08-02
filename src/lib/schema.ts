import { site } from "./site";
import { absoluteUrl } from "./seo";
import { isPlaceholder } from "./utils";
import type { Faq, Post, Service } from "./content/types";

/**
 * JSON-LD builders. Only emit data that is visible on the page and real —
 * placeholder contact details are omitted rather than published.
 */

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter((v) => !isPlaceholder(v));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/brand/nexolve-horizontal.svg"),
    slogan: site.tagline,
    description: site.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#professionalservice`,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/brand/nexolve-horizontal.svg"),
    description: site.description,
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${site.url}/#organization` },
    serviceType: service.title,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    articleSection: post.category,
  };
}
