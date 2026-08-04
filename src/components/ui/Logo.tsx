import { MatrixMark } from "@/components/brand/MatrixMark";
import { cn } from "@/lib/utils";

/** The logo mark always preserves all three ray layers. */
export function LogoMark({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <MatrixMark animated cut="full" title="Nexolve Technologies" className="size-full" />
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
      <MatrixMark animated cut="full" dark={reversed} className="brand-lockup__mark" />
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
