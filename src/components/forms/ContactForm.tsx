"use client";

import { useId, useState, type FormEvent } from "react";
import {
  budgetOptions,
  contactSchema,
  serviceOptions,
  sourceOptions,
  timelineOptions,
  type ContactFormState,
  type ContactInput,
} from "@/lib/contact/schema";
import { buildContactMailto } from "@/lib/contact/mailto";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const initialState: ContactFormState = { status: "idle" };

const inputCls =
  "w-full rounded-[3px] border border-navy/20 bg-[#f5f8fb] px-4 py-3 text-base text-ink shadow-[inset_0_1px_0_rgb(11_42_68/0.03)] placeholder:text-ink-muted/55 transition-[border-color,background-color,box-shadow] hover:border-navy-soft/45 hover:bg-white focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/15 disabled:cursor-not-allowed disabled:border-line disabled:bg-neutral-light disabled:text-ink-muted/55 aria-[invalid=true]:border-alert aria-[invalid=true]:bg-[#fff7f5] aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-alert/10";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-navy">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-ink">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-ink-muted">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm font-semibold text-alert" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const id = useId();
  const errors = state.fieldErrors ?? {};

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
      setState({
        status: "success",
        message: "Thanks — we'll be in touch shortly.",
      });
      setMailtoHref(null);
      return;
    }

    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
      source: formData.get("source"),
      consent: formData.get("consent"),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: ContactFormState["fieldErrors"] = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setState({
        status: "error",
        message: "Please review the highlighted fields.",
        fieldErrors,
      });
      return;
    }

    const href = buildContactMailto(site.email, parsed.data);
    setMailtoHref(href);
    window.location.href = href;
    setState({
      status: "success",
      message:
        "Your email app should open with a drafted message. Send it to complete your enquiry. If nothing opened, use the email link below.",
    });
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-line bg-neutral-light p-8 text-center sm:p-12"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-gradient-brand text-white">
          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="m5 13 4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-extrabold text-ink">Enquiry ready to send</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">{state.message}</p>
        {mailtoHref && (
          <p className="mt-4">
            <a href={mailtoHref} className="font-semibold text-violet underline">
              Open email to {site.email}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${id}-name`} error={errors.name} required>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={inputCls}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Work email" htmlFor={`${id}-email`} error={errors.email} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={inputCls}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Company" htmlFor={`${id}-company`} error={errors.company}>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            className={inputCls}
            placeholder="Company name"
          />
        </Field>
        <Field label="Phone" htmlFor={`${id}-phone`} error={errors.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={inputCls}
            placeholder="+1 555 000 0000"
          />
        </Field>
        <Field label="Service required" htmlFor={`${id}-service`} error={errors.service} required>
          <select
            id={`${id}-service`}
            name="service"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
            className={inputCls}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project budget" htmlFor={`${id}-budget`} error={errors.budget} required>
          <select
            id={`${id}-budget`}
            name="budget"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? `${id}-budget-error` : undefined}
            className={inputCls}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Expected timeline"
          htmlFor={`${id}-timeline`}
          error={errors.timeline}
          required
        >
          <select
            id={`${id}-timeline`}
            name="timeline"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? `${id}-timeline-error` : undefined}
            className={inputCls}
          >
            <option value="" disabled>
              Select a timeline…
            </option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="How did you find Nexolve?"
          htmlFor={`${id}-source`}
          error={errors.source}
          required
        >
          <select
            id={`${id}-source`}
            name="source"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.source)}
            aria-describedby={errors.source ? `${id}-source-error` : undefined}
            className={inputCls}
          >
            <option value="" disabled>
              Select an option…
            </option>
            {sourceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Project description"
        htmlFor={`${id}-message`}
        error={errors.message}
        required
      >
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          minLength={20}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(inputCls, "resize-y")}
          placeholder="What are you building? What problem should it solve? Anything you can share about systems, data and goals helps us respond usefully."
        />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="mt-1 size-5 shrink-0 accent-navy"
          />
          <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed text-ink-muted">
            I agree that Nexolve Technologies may store and process this information to respond to my enquiry,
            as described in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-violet underline">
              privacy policy
            </Link>
            .<span aria-hidden="true" className="text-ink"> *</span>
          </label>
        </div>
        {errors.consent && (
          <p id={`${id}-consent-error`} className="mt-1.5 text-sm font-semibold text-alert" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-black/5 px-4 py-3 text-sm font-semibold text-ink">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send enquiry
      </Button>
      <p className="text-sm text-ink-muted">
        Opens your email app with a drafted message to {site.email}.
      </p>
    </form>
  );
}
