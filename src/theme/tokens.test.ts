import { describe, expect, it } from "vitest";
import { colors, gradients, motion, radii, shadows } from "./tokens";

/**
 * These hex values are fixed by the Nexolve Brand Identity Guidelines
 * (Edition 01 · 2026, slide 06 "Colour"). This suite exists so a restyle
 * cannot quietly drift the palette off-spec — if one of these fails, the
 * change is wrong, not the test.
 */
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

  it("pins the remaining specified colours", () => {
    expect(colors.coreCyan).toBe("#7fd0ff"); // the lit core only
    expect(colors.night).toBe("#0e1418"); // dark theme ground
    expect(colors.alert).toBe("#ec3013"); // warnings, one primary action per view
  });

  it("keeps navySoft on #14456b, the specified colour for paragraph text", () => {
    // Slide 06: "Signal Blue and Core Cyan do not carry body text on light
    // grounds. For paragraph text in colour, use Deep Navy or #14456B."
    expect(colors.navySoft).toBe("#14456b");
  });

  it("exports brand gradients and motion/shadow/radius tokens", () => {
    expect(gradients.brand).toContain("#0b2a44");
    expect(gradients.brand).toContain("#4aa3dd");
    expect(motion.easeOutExpo).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    expect(radii.card).toBe("3px");
    // Elevation is tinted with Deep Navy rather than neutral black.
    expect(shadows.card).toContain("rgb(11 42 68");
    expect(shadows.cardHover).toContain("rgb(11 42 68");
  });
});
