import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap, { sitemapStaticPages } from "./sitemap";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { publishedPosts } from "@/lib/content/posts";
import { site } from "@/lib/site";

describe("sitemap metadata route", () => {
  const entries = sitemap();

  it("contains every maintained public route exactly once", () => {
    const expectedCount =
      sitemapStaticPages.length +
      services.length +
      industries.length +
      caseStudies.length +
      publishedPosts.length;
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(expectedCount);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("uses only clean canonical www URLs", () => {
    for (const entry of entries) {
      const url = new URL(entry.url);
      expect(url.origin).toBe(site.url);
      expect(url.search).toBe("");
      expect(url.hash).toBe("");
      expect(entry.url === site.url || !entry.url.endsWith("/")).toBe(true);
    }
  });

  it("has a valid, non-future lastModified date for every URL", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect((entry.lastModified as Date).getTime()).toBeLessThanOrEqual(Date.now());
    }
  });
});

describe("robots metadata route", () => {
  it("allows public crawling and advertises the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.nexolvetechnologies.com/sitemap.xml",
    });
  });
});
