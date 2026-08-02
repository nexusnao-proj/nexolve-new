import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Nexolve Technologies website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede="The terms that govern your use of this website."
      path="/terms"
      updated="18 July 2026"
      sections={[
        {
          heading: "About these terms",
          paragraphs: [
            "These terms apply to your use of the Nexolve Technologies website. Service engagements are governed by separate written agreements, which take precedence over anything here.",
          ],
        },
        {
          heading: "Use of the website",
          paragraphs: [
            "You may browse, link to and share content from this site for lawful purposes. You may not attempt to disrupt the service, probe it for vulnerabilities without authorisation, scrape it at abusive volume or misrepresent an affiliation with Nexolve Technologies.",
          ],
        },
        {
          heading: "Content & intellectual property",
          paragraphs: [
            "Website content, branding and design are owned by Nexolve Technologies or its licensors. Article content may be quoted with attribution and a link. The Nexolve name and logo may not be used without written permission.",
          ],
        },
        {
          heading: "No professional advice",
          paragraphs: [
            "Content on this site — including articles and case studies — is provided for general information. It is not engineering, legal or financial advice for your specific situation, and you rely on it at your own judgment.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The website is provided “as is”. To the maximum extent permitted by law, Nexolve Technologies disclaims liability for loss arising from use of the site or reliance on its content. Nothing in these terms limits liability that cannot lawfully be limited.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "[Placeholder: governing law and jurisdiction — to be completed with the company's registered jurisdiction.]",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about these terms: ${site.email}.`],
        },
      ]}
    />
  );
}
