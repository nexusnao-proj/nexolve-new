import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { publishedPosts } from "@/lib/content/posts";

export const dynamic = "force-static";

type StaticPage = {
  path: `/${string}`;
  /** Update this when the page's visible content changes. */
  lastModified: string;
};

/**
 * Public, canonical static routes. Keeping this explicit prevents system and
 * accidental routes from entering the sitemap merely because a file exists.
 */
export const sitemapStaticPages: readonly StaticPage[] = [
  { path: "/", lastModified: "2026-08-08" },
  { path: "/services", lastModified: "2026-08-08" },
  { path: "/solutions", lastModified: "2026-08-08" },
  { path: "/industries", lastModified: "2026-08-08" },
  { path: "/work", lastModified: "2026-08-08" },
  { path: "/about", lastModified: "2026-08-23" },
  { path: "/careers", lastModified: "2026-08-09" },
  { path: "/process", lastModified: "2026-08-02" },
  { path: "/blog", lastModified: "2026-08-08" },
  { path: "/contact", lastModified: "2026-08-09" },
  { path: "/faq", lastModified: "2026-08-02" },
  { path: "/privacy-policy", lastModified: "2026-08-02" },
  { path: "/terms", lastModified: "2026-08-02" },
  { path: "/cookie-policy", lastModified: "2026-08-02" },
  { path: "/accessibility", lastModified: "2026-08-02" },
] as const;

const detailPageDates = {
  services: "2026-08-08",
  industries: "2026-08-08",
  work: "2026-08-08",
} as const;

function toLastModified(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid sitemap lastModified date: ${value}`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date > new Date()) {
    throw new Error(`Sitemap lastModified date must be valid and not in the future: ${value}`);
  }
  return date;
}

function entry(path: `/${string}`, lastModified: string): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? site.url : absoluteUrl(path),
    lastModified: toLastModified(lastModified),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...sitemapStaticPages.map((page) => entry(page.path, page.lastModified)),
    ...services.map((service) => entry(`/services/${service.slug}`, detailPageDates.services)),
    ...industries.map((industry) =>
      entry(`/industries/${industry.slug}`, detailPageDates.industries),
    ),
    ...caseStudies.map((caseStudy) => entry(`/work/${caseStudy.slug}`, detailPageDates.work)),
    ...publishedPosts.map((post) => entry(`/blog/${post.slug}`, post.updatedDate ?? post.date)),
  ];
}
