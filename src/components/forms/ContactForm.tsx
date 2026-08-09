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

const inputCls = "discovery-input";

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
    <div className="discovery-field">
      <label htmlFor={htmlFor} className="discovery-field__label">
        {label}
        {required ? (
          <span aria-hidden="true" className="discovery-field__required">
            {" "}
            *
          </span>
        ) : (
          <span className="discovery-field__optional">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="discovery-field__error" role="alert">
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
      <div role="status" className="discovery-success">
        <span className="discovery-success__icon">
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
        <h2>Enquiry ready to send</h2>
        <p>{state.message}</p>
        {mailtoHref && (
          <p className="mt-4">
            <a href={mailtoHref}>Open email to {site.email}</a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="discovery-form__body">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <section className="discovery-form__section" aria-labelledby={`${id}-required-heading`}>
        <div className="discovery-form__section-head">
          <h2 id={`${id}-required-heading`}>Required</h2>
          <span>Fields marked *</span>
        </div>
        <div className="discovery-form__grid">
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
            rows={5}
            required
            minLength={20}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id}-message-error` : undefined}
            className={cn(inputCls, "resize-y")}
            placeholder="Current platforms, where it hurts, and what a good outcome looks like."
          />
        </Field>
        <div className="discovery-form__grid">
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
      </section>

      <section className="discovery-form__section" aria-labelledby={`${id}-optional-heading`}>
        <div className="discovery-form__section-head">
          <h2 id={`${id}-optional-heading`}>Optional</h2>
          <span>Helpful context</span>
        </div>
        <div className="discovery-form__grid">
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
        </div>
      </section>

      <div className="discovery-consent">
        <div className="discovery-consent__row">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="discovery-consent__checkbox"
          />
          <label htmlFor={`${id}-consent`}>
            I agree that Nexolve Technologies may store and process this information to respond to
            my enquiry, as described in the <Link href="/privacy-policy">privacy policy</Link>.
            <span aria-hidden="true" className="discovery-field__required">
              {" "}
              *
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id={`${id}-consent-error`} className="discovery-field__error" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="discovery-form__alert">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="discovery-submit">
        Send enquiry <span aria-hidden="true">→</span>
      </Button>
      <p className="discovery-form__note">
        Opens your email app with a drafted message to {site.email}.
      </p>
    </form>
  );
}
