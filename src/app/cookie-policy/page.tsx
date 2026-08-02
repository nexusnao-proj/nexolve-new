import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "How the Nexolve Technologies website uses cookies and similar technologies.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lede="What this site stores in your browser, and the choices you have."
      path="/cookie-policy"
      updated="18 July 2026"
      sections={[
        {
          heading: "Our approach",
          paragraphs: [
            "This website is designed to work without non-essential cookies. No analytics or marketing cookies are set unless you explicitly consent via the cookie banner.",
          ],
        },
        {
          heading: "Strictly necessary storage",
          paragraphs: ["Used only to make the site function:"],
          list: [
            "Consent preference (localStorage key nx-cookie-consent) — remembers whether you accepted or declined analytics.",
          ],
        },
        {
          heading: "Analytics (consent-only)",
          paragraphs: [
            "If analytics is configured and you accept, Google Analytics 4 sets cookies to measure aggregated site usage (pages viewed, approximate region, device type) with IP anonymisation enabled. If you decline, nothing loads.",
          ],
        },
        {
          heading: "Managing your choice",
          paragraphs: [
            "You can clear your browser's site data for this website at any time to reset your choice; the banner will ask again on your next visit. You can also block cookies entirely in your browser settings — the site will keep working.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about this policy: ${site.email}.`],
        },
      ]}
    />
  );
}
