/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Estimated reading time in whole minutes (≥1) at ~215 wpm. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 215));
}

/** Format an ISO date for display, stable across server and client. */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** True when a content string is an editorial placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("[Placeholder");
}
