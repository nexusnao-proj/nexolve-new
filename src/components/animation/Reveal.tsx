"use client";

import { createElement, useEffect, useRef, type CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li" | "dl" | "span" | "header" | "figure";
  /** Delay before the animation starts, ms. */
  delay?: number;
  /** Initial vertical offset, px. */
  y?: number;
  /**
   * Group mode: animates all `[data-reveal]` descendants with a stagger
   * instead of the wrapper itself. Mark each child with `data-reveal`.
   */
  group?: boolean;
};

/**
 * One-shot, native scroll reveal. JavaScript only decides when an element is
 * visible; CSS owns the transform/opacity transition. No animation runtime.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 26,
  group = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: HTMLElement[] = group
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"))
      : [el];
    if (targets.length === 0) return;

    targets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${delay + (group ? index * 70 : 0)}ms`);
      target.style.setProperty("--reveal-y", `${y}px`);
      target.classList.add("reveal-ready");
    });

    const revealNow = () => targets.forEach((target) => target.classList.add("is-revealed"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      revealNow();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        io.disconnect();
        revealNow();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, group]);

  return createElement(
    as,
    {
      ref,
      className,
      style: { "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties,
      ...(group ? { "data-reveal-root": "" } : { "data-reveal": "" }),
    },
    children,
  );
}
