import { describe, expect, it } from "vitest";
import { CANONICAL_SITE_URL, site } from "./site";

describe("site configuration", () => {
  it("uses one fixed HTTPS www origin for canonical URLs", () => {
    expect(CANONICAL_SITE_URL).toBe("https://www.nexolvetechnologies.com");
    expect(site.url).toBe(CANONICAL_SITE_URL);
    expect(new URL(site.url).origin).toBe(site.url);
  });
});
