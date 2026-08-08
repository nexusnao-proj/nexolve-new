import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "./case-studies";
import { industries } from "./industries";
import { posts } from "./posts";
import { services } from "./services";
import { solutions } from "./solutions";

type CoverCandidate = {
  slug: string;
  cover?: {
    src?: string;
    alt?: string;
  };
};

describe("content card covers", () => {
  it("gives every destination entry descriptive local editorial cover metadata", () => {
    const collections: Record<string, CoverCandidate[]> = {
      services,
      caseStudies,
      industries,
      posts,
      solutions,
    };

    for (const [collection, entries] of Object.entries(collections)) {
      for (const entry of entries) {
        expect(entry.cover?.src, `${collection}/${entry.slug} cover source`).toMatch(
          /^\/images\/editorial\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/,
        );
        expect(entry.cover?.alt?.trim(), `${collection}/${entry.slug} cover alt`).toBeTruthy();
        expect(
          existsSync(join(process.cwd(), "public", entry.cover?.src?.slice(1) ?? "")),
          `${collection}/${entry.slug} cover file`,
        ).toBe(true);
      }
    }
  });

  it("gives each platform layer its own cover image", () => {
    const coverSources = solutions.map((solution) => solution.cover?.src);

    expect(new Set(coverSources).size).toBe(solutions.length);
  });
});
