import nodemailer from "nodemailer";
import { buildContactEmail } from "@/lib/contact/email";
import { contactSchema, type ContactFormState, type ContactInput } from "@/lib/contact/schema";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function requestIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string, now = Date.now()): boolean {
  if (rateLimits.size > 1_000) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
  }

  const current = rateLimits.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function fieldErrors(input: ContactInput | unknown): ContactFormState["fieldErrors"] {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) return {};

  const errors: ContactFormState["fieldErrors"] = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

function smtpConfiguration() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;

  const isPlaceholder = (value: string | undefined) =>
    !value || value.includes("FROM_EMAIL_PROVIDER") || value.includes("MAILBOX_PASSWORD");

  if (
    isPlaceholder(host) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !user ||
    isPlaceholder(pass) ||
    !to
  ) {
    return null;
  }

  return {
    transport: {
      host,
      port,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
    user,
    to,
  };
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) return json({ message: "Request origin is not allowed." }, 403);

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ message: "Content type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json({ message: "Request is too large." }, 413);

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ message: "Request is too large." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ message: "Invalid request body." }, 400);
  }

  if (!body || typeof body !== "object") return json({ message: "Invalid request body." }, 400);

  const submission = body as Record<string, unknown>;
  if (typeof submission.website === "string" && submission.website.trim() !== "") {
    return json({ message: "Thanks — we'll be in touch shortly." });
  }

  if (isRateLimited(requestIp(request))) {
    return json({ message: "Too many enquiries. Please wait a few minutes and try again." }, 429);
  }

  const parsed = contactSchema.safeParse(submission);
  if (!parsed.success) {
    return json(
      {
        message: "Please review the highlighted fields.",
        fieldErrors: fieldErrors(submission),
      },
      400,
    );
  }

  const smtp = smtpConfiguration();
  if (!smtp) {
    console.error("Contact form SMTP environment variables are incomplete.");
    return json(
      { message: "Email service is temporarily unavailable. Please email us directly." },
      503,
    );
  }

  const email = buildContactEmail(parsed.data);
  const transporter = nodemailer.createTransport(smtp.transport);

  try {
    await transporter.sendMail({
      from: `"Nexolve Website" <${smtp.user}>`,
      to: smtp.to,
      replyTo: parsed.data.email,
      subject: email.subject,
      text: email.text,
    });
    return json({
      message: "Thanks — your enquiry has been sent. We'll reply within one business day.",
    });
  } catch (error) {
    console.error(
      "Contact form SMTP send failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ message: "We couldn't send your enquiry. Please email us directly." }, 502);
  }
}
