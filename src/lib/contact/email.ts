import type { ContactInput } from "./schema";

export function buildContactEmail(input: ContactInput): { subject: string; text: string } {
  const subject = `Nexolve website enquiry — ${input.service}`;
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company}`,
    input.phone ? `Phone: ${input.phone}` : null,
    `Service: ${input.service}`,
    `Budget: ${input.budget}`,
    `Timeline: ${input.timeline}`,
    `Source: ${input.source}`,
    "",
    "Project description:",
    input.message,
  ].filter((line): line is string => line !== null);

  return { subject, text: lines.join("\n") };
}
