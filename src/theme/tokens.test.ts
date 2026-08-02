import { describe, expect, it } from "vitest";
import { colors, gradients, motion, shadows } from "./tokens";

describe("theme tokens", () => {
  it("exposes the Nexolve Signal ink/paper base", () => {
    expect(colors.ink).toBe("#201e1d");
    expect(colors.inkMuted).toBe("#5b5856");
    expect(colors.paper).toBe("#f3f2f2");
    expect(colors.line).toBe("#d9d7d4");
    expect(colors.white).toBe("#ffffff");
  });

  it("keeps compatibility aliases pointed at the navy-family ramp", () => {
    expect(colors.navy).toBe("#0b2a44");
    expect(colors.blue).toBe("#4aa3dd");
    expect(colors.violet).toBe("#1a5a8a");
    expect(colors.pink).toBe("#4aa3dd");
    expect(colors.purple).toBe("#14456b");
    expect(colors.magenta).toBe("#0b2a44");
  });

  it("exports brand gradients and motion/shadow tokens", () => {
    expect(gradients.brand).toContain("#0b2a44");
    expect(gradients.brand).toContain("#4aa3dd");
    expect(motion.easeOutExpo).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    expect(shadows.card).toContain("rgb(11 42 68");
  });
});
