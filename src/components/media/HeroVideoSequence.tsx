"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEO_READY_EVENT } from "@/components/media/IntroSplash";
import { cn } from "@/lib/utils";

const SOURCES = ["/video/1.mp4", "/video/2.mp4", "/video/3.mp4", "/video/4.mp4"] as const;
const POSTERS = [
  "/video/1-poster.webp",
  "/video/2-poster.webp",
  "/video/3-poster.webp",
  "/video/4-poster.webp",
] as const;
const FADE_MS = 900;
/** Start warming the next clip this many seconds before the current ends. */
const WARM_AHEAD_S = 2.5;

type SlotIndex = 0 | 1;

type HeroVideoSequenceProps = {
  className?: string;
};

/**
 * Dual-slot crossfade sequence for the home hero.
 * Only the active clip is fetched up front; the next clip warms near the end
 * so later clips never compete with first paint. Each slot shows its clip's
 * first-frame poster until enough video has buffered to play.
 */
export function HeroVideoSequence({ className }: HeroVideoSequenceProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const [slots, setSlots] = useState<[number | null, number | null]>([0, null]);
  const [activeSlot, setActiveSlot] = useState<SlotIndex>(0);
  const [fading, setFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const nextIndexRef = useRef(1);
  const transitioningRef = useRef(false);
  const warmQueuedRef = useRef(false);

  const playSlot = useCallback(async (slot: SlotIndex) => {
    const video = videoRefs.current[slot];
    if (!video) return;
    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      /* Autoplay may be blocked; muted + playsInline usually succeeds. */
    }
  }, []);

  const warmNext = useCallback(() => {
    if (warmQueuedRef.current || transitioningRef.current) return;
    warmQueuedRef.current = true;
    const nextSlot: SlotIndex = activeSlot === 0 ? 1 : 0;
    const nextSource = nextIndexRef.current % SOURCES.length;
    setSlots((prev) => {
      const next: [number | null, number | null] = [...prev];
      next[nextSlot] = nextSource;
      return next;
    });
  }, [activeSlot]);

  const beginTransition = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setFading(true);

    const nextSlot: SlotIndex = activeSlot === 0 ? 1 : 0;
    void playSlot(nextSlot);

    window.setTimeout(() => {
      const outgoing = videoRefs.current[activeSlot];
      if (outgoing) {
        outgoing.pause();
        outgoing.removeAttribute("src");
        outgoing.load();
      }

      setActiveSlot(nextSlot);
      setSlots((prev) => {
        const cleared: [number | null, number | null] = [...prev];
        cleared[activeSlot] = null;
        return cleared;
      });
      nextIndexRef.current = (nextIndexRef.current + 1) % SOURCES.length;
      setFading(false);
      transitioningRef.current = false;
      warmQueuedRef.current = false;
    }, FADE_MS);
  }, [activeSlot, playSlot]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVideoReady(true);
      return;
    }
    void playSlot(0);
    const video = videoRefs.current[0];
    if (video && video.readyState >= 2) {
      setVideoReady(true);
    }
  }, [playSlot, prefersReducedMotion]);

  /* Safety: never report "loading" forever if media stalls. */
  useEffect(() => {
    if (videoReady) return;
    const id = window.setTimeout(() => setVideoReady(true), 8000);
    return () => window.clearTimeout(id);
  }, [videoReady]);

  /* Tell the first-visit intro splash the hero can render frames. */
  useEffect(() => {
    if (!videoReady) return;
    window.__nxHeroVideoReady = true;
    window.dispatchEvent(new Event(HERO_VIDEO_READY_EVENT));
  }, [videoReady]);

  const handleTimeUpdate = (slot: SlotIndex) => {
    if (slot !== activeSlot || transitioningRef.current) return;
    const video = videoRefs.current[slot];
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= WARM_AHEAD_S) {
      warmNext();
    }
    if (remaining <= FADE_MS / 1000) {
      beginTransition();
    }
  };

  const handleEnded = (slot: SlotIndex) => {
    if (slot !== activeSlot) return;
    warmNext();
    beginTransition();
  };

  const handleCanPlay = (slot: SlotIndex) => {
    if (videoReady) return;
    if (slots[slot] !== null && slot === activeSlot) {
      setVideoReady(true);
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#08192a]", className)} aria-hidden="true">
      {/* Reduced motion: hold the first clip's poster rather than an empty plate. */}
      {prefersReducedMotion && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTERS[0]}
          alt=""
          className="hero-film-clip absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!prefersReducedMotion &&
        ([0, 1] as const).map((slot) => {
          const sourceIndex = slots[slot];
          const isActive = slot === activeSlot;
          const visible = isActive ? !fading : fading;

          return (
            <video
              key={slot}
              ref={(el) => {
                videoRefs.current[slot] = el;
              }}
              className={cn(
                "hero-film-clip absolute inset-0 h-full w-full object-cover transition-opacity ease-out",
                visible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              muted
              playsInline
              preload={sourceIndex === null ? "none" : isActive ? "auto" : "metadata"}
              src={sourceIndex === null ? undefined : SOURCES[sourceIndex]}
              poster={sourceIndex === null ? undefined : POSTERS[sourceIndex]}
              onCanPlay={() => handleCanPlay(slot)}
              onLoadedData={() => handleCanPlay(slot)}
              onTimeUpdate={() => handleTimeUpdate(slot)}
              onEnded={() => handleEnded(slot)}
            />
          );
        })}
    </div>
  );
}
