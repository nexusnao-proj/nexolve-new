import { describe, expect, it } from "vitest";
import { cn, formatDate, isPlaceholder, readingTime } from "./utils";

describe("cn", () => {
  it("joins truthy classes and skips falsy values", () => {
    expect(cn("a", false, undefined, "b", null)).toBe("a b");
  });
});

describe("readingTime", () => {
  it("returns at least one minute", () => {
    expect(readingTime("short text")).toBe(1);
  });

  it("scales with word count", () => {
    const words = Array.from({ length: 645 }, () => "word").join(" ");
    expect(readingTime(words)).toBe(3);
  });
});

describe("formatDate", () => {
  it("formats ISO dates deterministically in UTC", () => {
    expect(formatDate("2026-07-02")).toBe("2 July 2026");
  });
});

describe("isPlaceholder", () => {
  it("detects placeholder strings", () => {
    expect(isPlaceholder("[Placeholder: business email]")).toBe(true);
    expect(isPlaceholder("info@nexolvetech.com")).toBe(false);
  });
});
