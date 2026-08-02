import { test, expect } from "@playwright/test";

test.describe("motion & fallbacks", () => {
  test.use({ reducedMotion: "reduce" });

  test("reduced motion: all content visible, no WebGL canvas", async ({ page }) => {
    await page.goto("/");
    // Reveal targets must not be hidden for reduced-motion users.
    const hero = page.getByRole("heading", { level: 1 });
    await expect(hero).toBeVisible();
    const opacity = await hero.evaluate((el) => {
      const target = el.closest("[data-reveal]") ?? el;
      return window.getComputedStyle(target as Element).opacity;
    });
    expect(Number(opacity)).toBe(1);

    // The 3D scene must not initialise under reduced motion — poster only.
    await page.waitForTimeout(800);
    expect(await page.locator("canvas").count()).toBe(0);
    const ringAnimation = await page
      .locator(".brand-lockup .matrix-mark__ring")
      .first()
      .evaluate((el) => window.getComputedStyle(el).animationName);
    expect(ringAnimation).toBe("none");

    // Native keyboard scrolling stays intact (no scroll hijack).
    await page.keyboard.press("End");
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled).toBeGreaterThan(0);
  });
});

test.describe("content without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all sections render and are visible with JS disabled", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Reveal-hiding must not apply without JS (html.js class is absent).
    const sectionHeading = page.getByRole("heading", { name: /Five service lines/ });
    await expect(sectionHeading).toBeVisible();
  });
});
