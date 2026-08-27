import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("uses the production origin when the value is absent or blank", () => {
    expect(resolveSiteUrl(undefined)).toBe("https://www.nexolvetechnologies.com");
    expect(resolveSiteUrl("   ")).toBe("https://www.nexolvetechnologies.com");
  });

  it("accepts a full URL and removes paths", () => {
    expect(resolveSiteUrl("https://example.com/a/path")).toBe("https://example.com");
  });

  it("adds HTTPS to a bare domain", () => {
    expect(resolveSiteUrl("example.com")).toBe("https://example.com");
  });

  it("falls back when the value cannot form a URL", () => {
    expect(resolveSiteUrl(":// invalid")).toBe("https://www.nexolvetechnologies.com");
    expect(resolveSiteUrl("ftp://example.com")).toBe("https://www.nexolvetechnologies.com");
  });
});
