import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

const validInput = {
  name: "Jordan Example",
  email: "jordan@company.com",
  company: "Example Ltd",
  phone: "+44 20 0000 0000",
  service: "Supply Chain & Procurement Consulting",
  budget: "$25k – $50k",
  timeline: "1 – 3 months",
  message: "We want a procurement diagnostic and S2P roadmap across three regional entities.",
  source: "Search engine",
  consent: "on",
};

describe("contactSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts an empty optional phone field", () => {
    const result = contactSchema.safeParse({ ...validInput, phone: "" });
    expect(result.success).toBe(true);
  });

  it("rejects an empty company field", () => {
    const result = contactSchema.safeParse({ ...validInput, company: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short message", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "Too short" });
    expect(result.success).toBe(false);
  });

  it("rejects missing consent", () => {
    const result = contactSchema.safeParse({ ...validInput, consent: null });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown service option", () => {
    const result = contactSchema.safeParse({ ...validInput, service: "Time travel" });
    expect(result.success).toBe(false);
  });

  it("reports field-level issues with paths", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "nope", name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("email");
      expect(fields).toContain("name");
    }
  });
});
