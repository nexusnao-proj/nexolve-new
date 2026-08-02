import { MatrixMark } from "@/components/brand/MatrixMark";
import { cn } from "@/lib/utils";

/** The mark animates everywhere it is rendered, while respecting reduction cuts. */
export function LogoMark({ className, size = 34 }: { className?: string; size?: number }) {
  const cut = size < 24 ? "micro" : size <= 48 ? "compact" : "full";
  return (
    <span className={cn("inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <MatrixMark animated cut={cut} title="Nexolve Technologies" className="size-full" />
    </span>
  );
}

type LockupProps = {
  light?: boolean;
  dark?: boolean;
  className?: string;
};

function AnimatedLockup({ light = false, dark = false, className }: LockupProps) {
  const reversed = light || dark;
  return (
    <span
      role="img"
      aria-label="Nexolve Technologies"
      className={cn("brand-lockup", reversed && "brand-lockup--reversed", className)}
    >
      <MatrixMark animated cut="compact" dark={reversed} className="brand-lockup__mark" />
      <span className="brand-lockup__rule" aria-hidden="true" />
      <span className="brand-lockup__type" aria-hidden="true">
        <span className="brand-lockup__name">NEXOLVE</span>
        <span className="brand-lockup__descriptor">TECHNOLOGIES</span>
      </span>
    </span>
  );
}

export function Wordmark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return <AnimatedLockup dark={dark} className={cn("h-8", className)} />;
}

export function BrandLogo({ light = false, className }: { light?: boolean; className?: string }) {
  return <AnimatedLockup light={light} className={cn("h-9", className)} />;
}
