import { test, expect } from "@playwright/test";

test.describe("header navigation", () => {
  test("desktop nav links work and route correctly", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "desktop-only behaviour");
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: "About", exact: true })).toBeVisible();

    await nav.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await nav.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("mobile menu opens, traps navigation and closes on Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only behaviour");
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();
    const drawer = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(drawer.getByRole("link", { name: "Contact", exact: true })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await drawer.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test("skip link jumps to main content", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "keyboard-focused test");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("critical pages & links", () => {
  test("home hero CTAs are server-rendered and route correctly", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /buy, source and move goods/i }),
    ).toBeVisible();
    await page.getByRole("link", { name: /Book a discovery session/ }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("service detail page renders full content", async ({ page }) => {
    await page.goto("/services/supply-chain-procurement-consulting");
    await expect(
      page.getByRole("heading", { level: 1, name: /procurement/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "What Nexolve delivers" })).toBeVisible();
    // FAQ accordion is keyboard-operable native details/summary.
    const firstFaq = page.locator("details summary").first();
    await firstFaq.click();
    await expect(page.locator("details[open]").first()).toBeVisible();
  });

  test("blog article renders TOC, author and body", async ({ page }) => {
    await page.goto("/blog/ariba-programmes-stall-after-stage-two");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ariba");
    await expect(page.getByRole("navigation", { name: "Table of contents" })).toBeVisible();
    await expect(page.getByText("min read").first()).toBeVisible();
  });

  test("unknown routes show the custom 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Error 404")).toBeVisible();
    await page.getByRole("link", { name: /Back to home/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("no horizontal overflow on the home page", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
