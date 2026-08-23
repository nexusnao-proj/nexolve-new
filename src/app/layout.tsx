import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { socialImage } from "@/lib/seo";
import { organizationSchema, professionalServiceSchema, webSiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/consent/CookieConsent";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nexolve Technologies — Procurement & Supply Chain Transformation",
    template: "%s | Nexolve Technologies",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Business consulting and technology services",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "procurement consulting",
    "supply chain transformation",
    "SAP Ariba implementation",
    "Coupa implementation",
    "Oracle procurement cloud",
    "source-to-pay",
    "S/4HANA migration",
    "SAP Fieldglass",
    "procurement analytics",
    "ERP integration",
    "supplier portals",
    "APAC Middle East consulting",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
    description: site.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
    description: site.description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/brand/nexolve-app-icon.svg",
  },
  verification: {
    google: "J27VBUMqXeiktonbVPWP1XPrKkvNRmDRg6YUnN3umrA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1418",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Runs before first paint: returning visitors never see the intro splash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{sessionStorage.getItem("nx-intro-seen")&&document.documentElement.classList.add("nx-intro-seen")}catch(e){}',
          }}
        />
        <JsonLd data={[organizationSchema(), webSiteSchema(), professionalServiceSchema()]} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
