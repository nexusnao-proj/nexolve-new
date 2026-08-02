import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description:
    "Nexolve Technologies' commitment to an accessible website: WCAG 2.2 AA target, current status and how to report barriers.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      lede="Everyone should be able to use this website. Here's our standard, our status and how to tell us when we fall short."
      path="/accessibility"
      updated="18 July 2026"
      sections={[
        {
          heading: "Our standard",
          paragraphs: [
            "We aim for WCAG 2.2 Level AA conformance across this website, and we treat accessibility as an engineering requirement, not an afterthought.",
          ],
        },
        {
          heading: "What we've built in",
          paragraphs: [],
          list: [
            "Semantic HTML with a logical heading structure and landmarks.",
            "Full keyboard operability, including menus, accordions and forms, with visible focus states.",
            "A skip-to-content link on every page.",
            "Color contrast meeting AA on text and interactive elements.",
            "Forms with programmatically associated labels and error messages announced to assistive technology.",
            "prefers-reduced-motion honoured everywhere: smooth-scrolling, 3D and parallax effects are disabled and replaced with simple or no motion.",
            "Decorative visuals (including the 3D scene) hidden from assistive technology; no information exists only inside animations.",
            "Minimum touch target sizes on interactive controls.",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "[Placeholder: list any known accessibility issues and remediation timelines after the next audit.]",
          ],
        },
        {
          heading: "Feedback",
          paragraphs: [
            `If you encounter a barrier on this site, please tell us at ${site.email}. We aim to respond within two business days and to fix verified issues promptly.`,
          ],
        },
      ]}
    />
  );
}
