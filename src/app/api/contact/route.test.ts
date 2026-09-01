import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendMail, createTransport } = vi.hoisted(() => {
  const sendMail = vi.fn();
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});
vi.mock("nodemailer", () => ({
  default: {
    createTransport,
  },
}));

import { POST } from "./route";

const validSubmission = {
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
  website: "",
};

function request(body: unknown, ip: string): Request {
  return new Request("https://www.nexolvetechnologies.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: "www.nexolvetechnologies.com",
      origin: "https://www.nexolvetechnologies.com",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SMTP_HOST = "smtp.hostinger.com";
  process.env.SMTP_PORT = "465";
  process.env.SMTP_SECURE = "true";
  process.env.SMTP_USER = "info@nexolvetechnologies.com";
  process.env.SMTP_PASS = "test-password";
  process.env.CONTACT_TO_EMAIL = "info@nexolvetechnologies.com";
  sendMail.mockResolvedValue({ messageId: "test-message" });
});

describe("POST /api/contact", () => {
  it("sends a validated enquiry with the visitor as Reply-To", async () => {
    const response = await POST(request(validSubmission, "192.0.2.1"));

    expect(response.status).toBe(200);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ authMethod: "LOGIN" }),
    );
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: '"Nexolve Website" <info@nexolvetechnologies.com>',
        to: "info@nexolvetechnologies.com",
        replyTo: validSubmission.email,
      }),
    );
  });

  it("rejects invalid fields before sending", async () => {
    const response = await POST(
      request({ ...validSubmission, email: "invalid", message: "Too short" }, "192.0.2.2"),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fieldErrors).toHaveProperty("email");
    expect(body.fieldErrors).toHaveProperty("message");
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const response = await POST(
      request({ ...validSubmission, website: "https://spam.example" }, "192.0.2.3"),
    );

    expect(response.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("fails safely when SMTP configuration is missing", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    delete process.env.SMTP_PASS;
    const response = await POST(request(validSubmission, "192.0.2.4"));

    expect(response.status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("rejects example SMTP placeholders without attempting delivery", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.SMTP_HOST = "SMTP_HOST_FROM_EMAIL_PROVIDER";
    process.env.SMTP_PASS = "INFO_MAILBOX_PASSWORD";
    const response = await POST(request(validSubmission, "192.0.2.7"));

    expect(response.status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("returns a gateway error when the SMTP provider rejects sending", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    sendMail.mockRejectedValueOnce(new Error("Authentication failed"));
    const response = await POST(request(validSubmission, "192.0.2.5"));

    expect(response.status).toBe(502);
    consoleError.mockRestore();
  });

  it("rate limits repeated submissions from one IP", async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await POST(request(validSubmission, "192.0.2.6"))).status).toBe(200);
    }

    const response = await POST(request(validSubmission, "192.0.2.6"));
    expect(response.status).toBe(429);
  });
});
