import { describe, expect, it } from "vitest";
import { buildContactMailto } from "./mailto";
import type { ContactInput } from "./schema";

const input: ContactInput = {
  name: "Jordan Lee",
  email: "jordan@company.com",
  company: "Acme",
  phone: "+1 555 0100",
  service: "Source-to-Pay Platform Delivery (SAP Ariba, Coupa, Oracle)",
  budget: "$25k – $50k",
  timeline: "1 – 3 months",
  message: "We need an Ariba deployment programme scoped end to end.",
  source: "Search engine",
  consent: "on",
};

describe("buildContactMailto", () => {
  it("builds a mailto URL with encoded subject and body fields", () => {
    const href = buildContactMailto("info@nexolvetech.com", input);
    expect(href.startsWith("mailto:info@nexolvetech.com?")).toBe(true);
    const qs = new URL(href).searchParams;
    expect(qs.get("subject")).toBe(
      "Nexolve enquiry — Source-to-Pay Platform Delivery (SAP Ariba, Coupa, Oracle)",
    );
    const body = qs.get("body") ?? "";
    expect(body).toContain("Name: Jordan Lee");
    expect(body).toContain("Email: jordan@company.com");
    expect(body).toContain("Company: Acme");
    expect(body).toContain("Phone: +1 555 0100");
    expect(body).toContain("Service: Source-to-Pay Platform Delivery (SAP Ariba, Coupa, Oracle)");
    expect(body).toContain("Budget: $25k – $50k");
    expect(body).toContain("Timeline: 1 – 3 months");
    expect(body).toContain("Source: Search engine");
    expect(body).toContain("We need an Ariba deployment programme scoped end to end.");
  });

  it("omits empty optional company/phone lines", () => {
    const href = buildContactMailto("info@nexolvetech.com", {
      ...input,
      company: "",
      phone: "",
    });
    const body = new URL(href).searchParams.get("body") ?? "";
    expect(body).not.toContain("Company:");
    expect(body).not.toContain("Phone:");
  });
});
