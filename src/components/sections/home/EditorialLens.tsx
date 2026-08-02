"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stories = [
  {
    image: "/images/editorial/engineered-intelligence.webp",
    title: "Consult",
    kicker: "Strategy grounded in spend data",
    copy: "Category strategy, process design and operating models built from your actual spend — not from templates.",
    alt: "Monochrome editorial interpretation of procurement strategy work",
  },
  {
    image: "/images/editorial/physical-automation.webp",
    title: "Implement",
    kicker: "Platforms, end to end",
    copy: "SAP Ariba, Coupa and Oracle delivered across the full chain — upstream, downstream, integration and adoption.",
    alt: "Monochrome editorial interpretation of platform implementation",
  },
  {
    image: "/images/editorial/data-infrastructure.webp",
    title: "Integrate",
    kicker: "The fabric underneath",
    copy: "APIs, OpenText document flows and analytics that keep the ERP, the platforms and the reports in agreement.",
    alt: "Monochrome editorial interpretation of integration infrastructure",
  },
  {
    image: "/images/editorial/digital-product-craft.webp",
    title: "Build",
    kicker: "Where configuration ends",
    copy: "Supplier portals, internal tools and web platforms — custom software from the same accountable team.",
    alt: "Monochrome editorial interpretation of custom software engineering",
  },
];

export function EditorialLens() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const activeStory = stories[active]!;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.18 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % stories.length), 6500);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduced]);

  const select = (index: number) => {
    setActive(index);
    setPaused(true);
  };

  return (
    <div
      ref={rootRef}
      className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") select((active + 1) % stories.length);
        if (event.key === "ArrowLeft") select((active - 1 + stories.length) % stories.length);
        if (event.key === "Home") select(0);
        if (event.key === "End") select(stories.length - 1);
      }}
    >
      <div className="editorial-frame relative aspect-[4/3] overflow-hidden bg-[#d9d7d4] sm:aspect-[16/10]">
        {stories.map((story, index) => (
          <figure key={story.image} className={cn("editorial-slide absolute inset-0", index === active && "is-active")} aria-hidden={index !== active}>
            <Image src={story.image} alt={index === active ? story.alt : ""} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority={index === 0} />
          </figure>
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-20 text-white sm:px-7 sm:pb-7">
          <div aria-live="polite">
            <p className="editorial-label text-white/60">{activeStory.kicker}</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{activeStory.title}</p>
          </div>
          <p className="text-xs font-bold tabular-nums"><span className="text-white">{String(active + 1).padStart(2, "0")}</span><span className="mx-2 text-white/55">/</span><span className="text-white/60">04</span></p>
        </div>
      </div>

      <div className="self-center border-b border-black">
        {stories.map((story, index) => (
          <button
            key={story.title}
            type="button"
            onClick={() => select(index)}
            aria-current={index === active ? "true" : undefined}
            className={cn("editorial-row grid min-h-[92px] w-full grid-cols-[42px_1fr] gap-3 border-t border-black py-5 text-left transition-colors", index === active ? "bg-navy px-4 text-white" : "hover:bg-white")}
          >
            <span className={cn("pt-1 text-xs font-bold tabular-nums", index === active ? "text-white/55" : "text-ink-muted")}>{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong className="block text-lg font-semibold tracking-[-0.03em]">{story.title}</strong>
              <span className={cn("mt-2 block text-sm leading-6", index === active ? "text-white/55" : "text-ink-muted")}>{story.copy}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
