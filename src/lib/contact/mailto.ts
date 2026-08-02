import type { ContactInput } from "./schema";

export function buildContactMailto(to: string, input: ContactInput): string {
  const subject = `Nexolve enquiry — ${input.service}`;
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.phone ? `Phone: ${input.phone}` : null,
    `Service: ${input.service}`,
    `Budget: ${input.budget}`,
    `Timeline: ${input.timeline}`,
    `Source: ${input.source}`,
    "",
    input.message,
  ].filter((line): line is string => line !== null);

  const params = new URLSearchParams({
    subject,
    body: lines.join("\n"),
  });
  return `mailto:${to}?${params.toString()}`;
}
