import { describe, expect, it } from "vitest";
import { services } from "./services";
import { industries } from "./industries";
import { caseStudies } from "./case-studies";
import { posts } from "./posts";
import { postCategories } from "./types";

/** Content integrity — broken slugs and dangling references fail the build. */

describe("services content", () => {
  it("contains all 5 service lines with unique slugs", () => {
    expect(services).toHaveLength(5);
    const slugs = new Set(services.map((s) => s.slug));
    expect(slugs.size).toBe(5);
  });

  it("has resolvable related-service references", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const service of services) {
      for (const related of service.related) {
        expect(slugs, `${service.slug} → ${related}`).toContain(related);
      }
      expect(service.related).not.toContain(service.slug);
    }
  });

  it("has complete section content for every service", () => {
    for (const service of services) {
      expect(service.problems.length).toBeGreaterThanOrEqual(3);
      expect(service.capabilities.length).toBeGreaterThanOrEqual(4);
      expect(service.useCases.length).toBeGreaterThanOrEqual(4);
      expect(service.process.length).toBeGreaterThanOrEqual(3);
      expect(service.faq.length).toBeGreaterThanOrEqual(3);
      expect(service.benefits.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("industries content", () => {
  it("contains all 6 industries with unique slugs", () => {
    expect(industries).toHaveLength(6);
    expect(new Set(industries.map((i) => i.slug)).size).toBe(6);
  });

  it("references only existing services", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const industry of industries) {
      for (const service of industry.services) {
        expect(slugs, `${industry.slug} → ${service}`).toContain(service);
      }
    }
  });

  it("keeps proof notes honest — NDA framing, no fabricated client names", () => {
    for (const industry of industries) {
      expect(industry.proofNote.length).toBeGreaterThan(0);
      expect(industry.proofNote).toContain("NDA");
    }
  });
});

describe("case studies content", () => {
  it("publishes real products without placeholder markers", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    expect(new Set(caseStudies.map((c) => c.slug)).size).toBe(caseStudies.length);
    for (const cs of caseStudies) {
      expect(cs.client.startsWith("[Placeholder"), `${cs.slug} client`).toBe(false);
      for (const result of cs.results) {
        expect(result.startsWith("[Placeholder"), `${cs.slug} result`).toBe(false);
      }
      if (cs.testimonial) {
        expect(cs.testimonial.startsWith("[Placeholder"), `${cs.slug} testimonial`).toBe(false);
      }
    }
  });

  it("references only existing services", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const cs of caseStudies) {
      for (const service of cs.relatedServices) {
        expect(slugs).toContain(service);
      }
    }
  });
});

describe("posts content", () => {
  it("has unique slugs and valid categories", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const post of posts) {
      expect(postCategories).toContain(post.category);
      expect(["published", "draft"]).toContain(post.status);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (post.updatedDate) {
        expect(post.updatedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(post.updatedDate >= post.date).toBe(true);
      }
    }
  });

  it("has resolvable related-post references and section ids", () => {
    const slugs = new Set(posts.map((p) => p.slug));
    const serviceSlugs = new Set(services.map((service) => service.slug));
    for (const post of posts) {
      for (const related of post.related) {
        expect(slugs, `${post.slug} → ${related}`).toContain(related);
      }
      for (const relatedService of post.relatedServices) {
        expect(serviceSlugs, `${post.slug} → ${relatedService}`).toContain(relatedService);
      }
      const ids = new Set(post.sections.map((s) => s.id));
      expect(ids.size).toBe(post.sections.length);
    }
  });

  it("contains no lorem ipsum anywhere", () => {
    const all = JSON.stringify([services, industries, caseStudies, posts]).toLowerCase();
    expect(all).not.toContain("lorem ipsum");
  });
});
