"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Keep the splash up at least this long so the logo pulse reads as intentional. */
const MIN_VISIBLE_MS = 1600;
const FADE_MS = 700;
/** Never hold the page hostage if the hero video stalls. */
const SAFETY_MS = 8000;
const STORAGE_KEY = "nx-intro-seen";
export const HERO_VIDEO_READY_EVENT = "nx:hero-video-ready";

declare global {
  interface Window {
    __nxHeroVideoReady?: boolean;
  }
}

type Phase = "visible" | "closing" | "done";

/**
 * Full-screen first-visit splash: solid black with the pulsing brand logo,
 * shown until the hero video can play. It renders in the prerendered HTML so
 * the very first paint is already black. Return visits in the same session
 * skip it entirely — an inline script in the root layout adds
 * `html.nx-intro-seen` before paint, and CSS hides the splash instantly.
 */
export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("visible");
  const shownAtRef = useRef(0);

  useEffect(() => {
    shownAtRef.current = performance.now();

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* Storage unavailable (e.g. blocked); fall back to showing it each load. */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    let closeTimer = 0;
    const close = () => {
      window.clearTimeout(closeTimer);
      const elapsed = performance.now() - shownAtRef.current;
      closeTimer = window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* Best effort. */
        }
        setPhase("closing");
      }, Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const safety = window.setTimeout(close, SAFETY_MS);
    if (window.__nxHeroVideoReady) {
      close();
    } else {
      window.addEventListener(HERO_VIDEO_READY_EVENT, close);
    }
    return () => {
      window.removeEventListener(HERO_VIDEO_READY_EVENT, close);
      window.clearTimeout(safety);
      window.clearTimeout(closeTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "closing") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "intro-splash fixed inset-0 z-[100] flex items-center justify-center bg-[#0e1418] transition-opacity ease-out",
        phase === "closing" && "opacity-0"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden="true"
    >
      <BrandLogo light className="h-10 w-auto opacity-90 sm:h-12" />
    </div>
  );
}
