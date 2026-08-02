import { z } from "zod";

/** Shared Zod schema for the contact form (client-side validation). */

export const serviceOptions = [
  "Supply Chain & Procurement Consulting",
  "Source-to-Pay Platform Delivery (SAP Ariba, Coupa, Oracle)",
  "ERP & Core SAP",
  "Data, Analytics & Integrations",
  "Software & Digital Engineering",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k – $250k",
  "$250k+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3+ months",
  "Just exploring",
] as const;

export const sourceOptions = [
  "Search engine",
  "LinkedIn",
  "Referral",
  "Social media",
  "Event or talk",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name looks too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email address.")
    .max(200, "Email looks too long."),
  company: z.string().trim().max(160, "Company name looks too long.").optional().or(z.literal("")),
  phone: z.string().trim().max(40, "Phone number looks too long.").optional().or(z.literal("")),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose a service." }) }),
  budget: z.enum(budgetOptions, { errorMap: () => ({ message: "Please choose a budget range." }) }),
  timeline: z.enum(timelineOptions, {
    errorMap: () => ({ message: "Please choose an expected timeline." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more about the project (at least 20 characters).")
    .max(5000, "Message is too long — 5000 characters max."),
  source: z.enum(sourceOptions, {
    errorMap: () => ({ message: "Please tell us how you found Nexolve." }),
  }),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please accept the privacy policy so we can respond." }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};
