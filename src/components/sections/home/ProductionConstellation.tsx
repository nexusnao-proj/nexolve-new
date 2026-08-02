"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

const editorialTiles = [
  {
    src: "/images/editorial/engineered-intelligence.webp",
    alt: "Procurement data operations inside a monochrome computing facility",
  },
  {
    src: "/images/editorial/physical-automation.webp",
    alt: "Precision warehouse automation in a monochrome production environment",
  },
  {
    src: "/images/editorial/data-infrastructure.webp",
    alt: "Monochrome integration infrastructure carrying transactions through a connected estate",
  },
  {
    src: "/images/editorial/digital-product-craft.webp",
    alt: "Engineer shaping a supplier portal interface in a monochrome studio",
  },
  {
    src: "/images/editorial/urban-systems.webp",
    alt: "Connected logistics and transport systems viewed across a modern city",
  },
  {
    src: "/images/editorial/clinical-ai.webp",
    alt: "Specialist supervising an analytics-assisted operational review",
  },
  {
    src: "/images/editorial/logistics-automation.webp",
    alt: "Automated logistics infrastructure coordinating physical supply chains",
  },
  {
    src: "/images/editorial/decision-intelligence.webp",
    alt: "Procurement team reviewing spend evidence for a sourcing decision",
  },
] as const;

export function ProductionConstellation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let isVisible = false;
    const syncMotion = () => {
      root.classList.toggle("is-motion-paused", !isVisible || document.hidden);
    };

    const handleVisibility = () => syncMotion();
    document.addEventListener("visibilitychange", handleVisibility);

    if (!("IntersectionObserver" in window)) {
      isVisible = true;
      syncMotion();
      return () => document.removeEventListener("visibilitychange", handleVisibility);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        syncMotion();
      },
      { rootMargin: "12% 0px", threshold: 0.05 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="production-constellation is-motion-paused"
      aria-labelledby="production-constellation-title"
    >
      <div className="production-constellation__stage">
        <div className="production-constellation__orbit" aria-hidden="true">
          <div className="production-constellation__ring">
            {editorialTiles.map((tile, index) => (
              <figure
                key={tile.src}
                className="production-constellation__tile"
                style={{ "--i": index } as CSSProperties}
              >
                <div className="production-constellation__face">
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 64px"
                    quality={65}
                    className="production-constellation__image"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="production-constellation__copy">
          <p className="production-constellation__eyebrow editorial-label">
            From diagnostic to operation
          </p>
          <h2 id="production-constellation-title">
            Programmes that end in live operation.
          </h2>
          <p className="production-constellation__lede">
            Nexolve connects consulting, platform delivery, integration and engineering
            into one accountable delivery.
          </p>
          <ButtonLink href="/services" className="production-constellation__cta">
            Explore our services <ArrowIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
