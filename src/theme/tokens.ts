/**
 * Nexolve Signal palette — keep in sync with `tokens.css`.
 *
 * Fixed by the Nexolve Brand Identity Guidelines (Edition 01 · 2026, slide 06
 * "Colour"). These hex values are client-specified; do not tune them.
 * - Core Cyan is the lit core of the mark only — never a field, never body text.
 * - Signal Blue and Core Cyan must not carry body text on light grounds; use
 *   Deep Navy or navySoft (#14456b) for paragraph text in colour.
 * - Alert Red is warnings and at most one primary action per view; never in the mark.
 */
export const colors = {
  ink: "#201e1d",
  inkMuted: "#5b5856",
  paper: "#f3f2f2",
  line: "#d9d7d4",
  white: "#ffffff",
  navy: "#0b2a44",
  navySoft: "#14456b",
  blue: "#4aa3dd",
  violet: "#1a5a8a",
  purple: "#14456b",
  magenta: "#0b2a44",
  pink: "#4aa3dd",
  coreCyan: "#7fd0ff",
  alert: "#ec3013",
  night: "#0e1418",
} as const;

export const gradients = {
  brand: "linear-gradient(90deg, #0b2a44 0%, #4aa3dd 50%, #0b2a44 100%)",
  brandSoft: "linear-gradient(90deg, rgb(11 42 68 / 0.06), rgb(11 42 68 / 0.06))",
} as const;

export const motion = {
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const shadows = {
  card: "0 1px 0 rgb(11 42 68 / 0.08), 0 12px 34px rgb(11 42 68 / 0.05)",
  cardHover: "0 1px 0 rgb(11 42 68 / 0.12), 0 22px 52px rgb(11 42 68 / 0.1)",
} as const;

export const radii = {
  card: "3px",
} as const;
