"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-driven infinite marquee. The track duplicates its content for a
 * seamless loop; animation pauses when the marquee leaves the viewport
 * and is disabled entirely under prefers-reduced-motion (globals.css).
 */
export function Marquee({
  children,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("marquee-paused", !entry?.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className={cn("marquee-track flex w-max items-center", trackClassName)}>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
