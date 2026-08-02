import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexolve Technologies — Procurement & Supply Chain Transformation",
    description: site.description,
  },
  robots: { index: true, follow: true },
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
