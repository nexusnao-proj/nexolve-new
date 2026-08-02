"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight CSS 3D tilt on hover — decorative depth without a 3D library.
 * Pointer-fine devices only; disabled under prefers-reduced-motion.
 * Pointer handling is rAF-throttled so it never floods the main thread.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let rafId = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      rafId = 0;
      if (!pending) return;
      const rect = el.getBoundingClientRect();
      const px = (pending.x - rect.left) / rect.width - 0.5;
      const py = (pending.y - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(0)`;
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pending = null;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={cn("transition-transform duration-300 will-change-transform", className)}>
      {children}
    </div>
  );
}
