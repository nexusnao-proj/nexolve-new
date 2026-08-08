import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "onDark";
type Size = "md" | "lg";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-3 rounded-[3px] border font-bold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy-soft disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-alert bg-alert text-white shadow-[0_6px_18px_rgb(236_48_19/0.22)] hover:border-[#cf2a0f] hover:bg-[#cf2a0f] hover:shadow-[0_8px_24px_rgb(236_48_19/0.32)] active:translate-y-px",
  secondary:
    "border-line bg-white text-ink shadow-card hover:border-navy-soft hover:text-navy active:translate-y-px",
  ghost: "border-transparent bg-transparent text-ink hover:border-line hover:bg-white",
  inverse: "border-white bg-white text-navy hover:bg-neutral-light active:translate-y-px",
  onDark:
    "border-white/35 bg-white/5 text-white backdrop-blur-[2px] hover:border-white hover:bg-white hover:text-navy active:translate-y-px",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.8125rem]",
  lg: "min-h-12 px-6 py-3 text-sm",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

/** Small right-arrow used inside buttons and link-cards. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
