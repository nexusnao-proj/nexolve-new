import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { posts } from "@/lib/content/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/solutions", priority: 0.8 },
    { path: "/industries", priority: 0.8 },
    { path: "/work", priority: 0.85 },
    { path: "/about", priority: 0.7 },
    { path: "/careers", priority: 0.7 },
    { path: "/process", priority: 0.7 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.9 },
    { path: "/faq", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workPages = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const postPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...industryPages, ...workPages, ...postPages];
}
