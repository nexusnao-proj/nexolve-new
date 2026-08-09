import type { Metadata } from "next";
import { site } from "./site";

/** Absolute URL on the canonical site origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

type PageSeo = {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export const socialImage = {
  url: absoluteUrl("/nexolve-social-preview.png"),
  width: 1200,
  height: 630,
  alt: "Nexolve Technologies — Procurement and supply chain transformation",
  type: "image/png",
} as const;

/**
 * Build per-page metadata with canonical URL, Open Graph and Twitter cards.
 * The root layout supplies metadataBase and the title template.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogType = "website",
  publishedTime,
  noIndex,
}: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: ogType,
      locale: "en_US",
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
