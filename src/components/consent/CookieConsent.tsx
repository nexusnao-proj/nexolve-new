"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nx-cookie-consent"; // "granted" | "denied"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function loadAnalytics(gaId: string) {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  gtag("js", new Date());
  gtag("config", gaId, { anonymize_ip: true });
}

/**
 * Cookie consent banner. Optional analytics (GA4) load only after explicit
 * consent and never block rendering. Without NEXT_PUBLIC_GA_ID no banner is
 * shown and nothing loads — the site sets no non-essential cookies.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      loadAnalytics(GA_ID);
    } else if (stored !== "denied") {
      setVisible(true);
    }
  }, []);

  if (!visible || !GA_ID) return null;

  const decide = (granted: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    setVisible(false);
    if (granted) loadAnalytics(GA_ID);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-3xl border border-line bg-white p-5 shadow-[0_20px_60px_rgb(9_19_61/0.18)] sm:p-6"
    >
      <h2 className="text-base font-extrabold text-ink">Cookies &amp; analytics</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        We&apos;d like to use analytics cookies to understand how the site is used and improve it.
        No analytics run unless you agree. See the{" "}
        <Link href="/cookie-policy" className="font-semibold text-violet underline">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-11 rounded-full bg-gradient-brand px-6 text-sm font-bold text-white"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-11 rounded-full border border-line px-6 text-sm font-bold text-ink"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
