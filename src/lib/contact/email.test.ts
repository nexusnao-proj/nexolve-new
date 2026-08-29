import { describe, expect, it } from "vitest";
import { buildContactEmail } from "./email";
import type { ContactInput } from "./schema";

const input: ContactInput = {
  name: "Jordan Example",
  email: "jordan@example.com",
  company: "Example Ltd",
  phone: "",
  service: "Supply Chain & Procurement Consulting",
  budget: "$25k – $50k",
  timeline: "1 – 3 months",
  message: "We need a procurement diagnostic across three regional entities.",
  source: "Search engine",
  consent: "on",
};

describe("buildContactEmail", () => {
  it("creates a useful subject and plain-text notification", () => {
    const email = buildContactEmail(input);

    expect(email.subject).toContain(input.service);
    expect(email.text).toContain(`Email: ${input.email}`);
    expect(email.text).toContain(`Company: ${input.company}`);
    expect(email.text).toContain(input.message);
    expect(email.text).not.toContain("Phone:");
  });
});
