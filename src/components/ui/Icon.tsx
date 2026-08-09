import type { IconName } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * Minimal 24×24 stroke icon set (schematic SVG — appropriate per design
 * guidance: SVG for simple schematic visuals only). Decorative by default.
 */
const paths: Record<IconName, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.8-4.5 3.3-7 7.5-7s6.7 2.5 7.5 7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 7V4m4 3V4m-4 16v-3m4 3v-3M7 10H4m3 4H4m16-4h-3m3 4h-3" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V5m0 0h3M9 13v1m6-1v1m-7 4h8" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4c.6 3.4 2 4.8 5.5 5.5C14 10.2 12.6 11.6 12 15c-.6-3.4-2-4.8-5.5-5.5C10 8.8 11.4 7.4 12 4Z" />
      <path d="M18.5 14c.3 1.7 1 2.4 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.4 2.5-1.1 2.8-2.8ZM6 15.5c.25 1.4.85 2 2.2 2.2-1.35.3-1.95.9-2.2 2.3-.25-1.4-.85-2-2.2-2.3 1.35-.2 1.95-.8 2.2-2.2Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20M8 7.5h8" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="6" height="6" rx="1.5" />
      <rect x="15" y="14" width="6" height="6" rx="1.5" />
      <path d="M9 7h5a4 4 0 0 1 4 4v3m-9 3H7a4 4 0 0 1-4-4v-1" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M6.5 7h.01M9.5 7h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m4.5 12.5 7.5 4 7.5-4m-15 4L12 20.5l7.5-4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 17.5h2" />
    </>
  ),
  api: (
    <>
      <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18.2 10.6 3.8 3.8 0 0 1 17.2 18H7Z" />
    </>
  ),
  pen: (
    <>
      <path d="m14.5 4.5 5 5L8 21H3v-5L14.5 4.5Z" />
      <path d="m12 7 5 5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3" />
      <path d="M20 4v4h-4M4 20v-4h4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-10 0V8Z" />
      <path d="M12 16v5" />
    </>
  ),
  bank: (
    <>
      <path d="m3 9 9-6 9 6H3Z" />
      <path d="M5 9v8m4.5-8v8m5-8v8M19 9v8M3 21h18M3 17h18" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-9-9.3C2 7.6 4 5 6.8 5c1.9 0 3.5 1 4.2 2.6h2C13.7 6 15.3 5 17.2 5 20 5 22 7.6 21 10.7c-1.5 4.7-9 9.3-9 9.3Z" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2 12h11l2-8H6" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h12v11H2zM14 10h4.5L21 13v4h-7" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6.5 11.5V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.5M22 9v5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2m4 0h-2M9 11h2m4 0h-2M9 15h2m4 0h-2M12 21v-3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-12 5h18" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 16c-1.5-4.5-.5-8.5 3.5-11.5 2-1.5 4.5-2 4.5-2s-.5 2.5-2 4.5c-3 4-7 5-11.5 3.5" />
      <path d="M9 15c-2 .5-3.5 2.5-4 6 3.5-.5 5.5-2 6-4m1.5-8.5h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4m8-4v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19.5c.8-3.2 3-5 6.5-5s5.7 1.8 6.5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.2 14.2c2.4.4 4.3 1.8 4.8 4.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6.5v5.2c0 4.6 3.1 8.7 7.5 9.8 4.4-1.1 7.5-5.2 7.5-9.8V6.5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9Z" />
    </>
  ),
  badge: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8.5 16.5c.9-1.5 2.1-2.2 3.5-2.2s2.6.7 3.5 2.2" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
};

export function Icon({ name, className, size = 22 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}

/** Gradient chip wrapper for feature/service icons. */
export function IconChip({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-brand-soft text-violet",
        className,
      )}
    >
      <Icon name={name} />
    </span>
  );
}
