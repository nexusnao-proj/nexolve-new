import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("shows accessible validation errors for an empty submit", async ({ page }) => {
    await page.goto("/contact");
    await page.evaluate(() => {
      document.querySelector("form")?.setAttribute("novalidate", "novalidate");
    });
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Please review the highlighted fields.")).toBeVisible();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    const nameInput = page.getByLabel(/^Name/);
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
  });

  test("shows success UI after valid submit (mailto path)", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/^Name/).fill("Playwright Tester");
    await page.getByLabel(/Work email/).fill("tester@example.com");
    await page.getByLabel(/Service required/).selectOption("Source-to-Pay Platform Delivery (SAP Ariba, Coupa, Oracle)");
    await page.getByLabel(/Project budget/).selectOption("$25k – $50k");
    await page.getByLabel(/Expected timeline/).selectOption("1 – 3 months");
    await page.getByLabel(/How did you find Nexolve/).selectOption("Search engine");
    await page
      .getByLabel(/Project description/)
      .fill("End-to-end test enquiry describing an Ariba deployment programme in enough detail.");
    await page.getByLabel(/I agree that Nexolve/).check();

    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("heading", { name: "Enquiry ready to send" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open email to info@nexolvetechnologies.com/ })).toBeVisible();
  });
});
