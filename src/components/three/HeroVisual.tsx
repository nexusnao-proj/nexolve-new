"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Three.js is loaded only when this component decides to render the scene —
// pages without the hero never ship the WebGL bundle.
const RibbonScene = dynamic(() => import("./RibbonScene"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static CSS/SVG poster — instant, and the complete non-WebGL fallback. */
function RibbonPoster({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      <div className="absolute top-[12%] left-[8%] size-[55%] rounded-full bg-blue/15 blur-3xl" />
      <div className="absolute right-[6%] bottom-[8%] size-[50%] rounded-full bg-black/10 blur-3xl" />
      <svg viewBox="0 0 600 600" fill="none" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="posterGrad" x1="80" y1="140" x2="520" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0b2a44" />
            <stop offset="0.38" stopColor="#1a5a8a" />
            <stop offset="0.72" stopColor="#4aa3dd" />
            <stop offset="1" stopColor="#0b2a44" />
          </linearGradient>
        </defs>
        <path
          d="M120 150 C 60 260, 100 400, 170 430 C 250 465, 280 330, 320 280 C 365 225, 430 160, 490 190 C 545 220, 540 350, 470 450"
          stroke="url(#posterGrad)"
          strokeWidth="64"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

/**
 * Hero 3D orchestrator. Decorative only (aria-hidden) — all hero text and
 * navigation live in server-rendered HTML outside this component.
 *
 * Decision ladder:
 * 1. Reduced motion → static poster, no WebGL at all
 * 2. No WebGL support → static poster
 * 3. Otherwise → lazy-loaded scene, paused off-screen and on hidden tabs
 */
export function HeroVisual({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"poster" | "scene">("poster");
  const [detail, setDetail] = useState<"full" | "reduced">("full");
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !supportsWebGL()) return;
    setDetail(window.matchMedia("(max-width: 768px)").matches ? "reduced" : "full");
    setMode("scene");
  }, []);

  useEffect(() => {
    if (mode !== "scene") return;
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      rootMargin: "80px",
    });
    io.observe(el);

    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    // Give the canvas a moment to produce its first frame before fading in.
    const readyTimer = window.setTimeout(() => setSceneReady(true), 350);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(readyTimer);
    };
  }, [mode]);

  return (
    <div ref={containerRef} className={cn("relative", className)} aria-hidden="true">
      <RibbonPoster
        className={cn(
          "transition-opacity duration-700",
          mode === "scene" && sceneReady ? "opacity-0" : "opacity-100",
        )}
      />
      {mode === "scene" && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            sceneReady ? "opacity-100" : "opacity-0",
          )}
        >
          <RibbonScene frameloop={inView && tabVisible ? "always" : "never"} detail={detail} />
        </div>
      )}
    </div>
  );
}
