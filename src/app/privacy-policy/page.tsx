import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Nexolve Technologies collects, uses and protects personal information across this website and our services.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede="How Nexolve Technologies collects, uses and protects personal information."
      path="/privacy-policy"
      updated="18 July 2026"
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            `Nexolve Technologies (“we”, “us”) operates this website. Contact details for privacy matters: ${site.email} and ${site.address}.`,
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: ["We collect only what we need to respond to you and run this site:"],
          list: [
            "Contact form submissions: name, work email, company, phone (optional), project details and how you found us.",
            "Analytics data (only with your consent): anonymised usage statistics such as pages visited and approximate region.",
            "Technical logs required to operate and secure the service (IP address, request metadata), retained briefly.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [],
          list: [
            "To respond to enquiries and manage prospective projects.",
            "To improve the website based on aggregated, consented analytics.",
            "To protect the service from abuse (rate limiting, spam prevention).",
          ],
        },
        {
          heading: "Legal bases",
          paragraphs: [
            "Where GDPR or similar regulation applies, we process enquiry data on the basis of legitimate interest / pre-contractual steps, and analytics data only on the basis of consent.",
          ],
        },
        {
          heading: "Sharing",
          paragraphs: [
            "We do not sell personal data. Data is shared only with processors needed to operate the site — hosting (Cloudflare Pages). Contact enquiries are drafted in your email client and sent to us directly; we do not use a third-party form email provider.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "Enquiry data is kept while relevant to a potential or active engagement and then deleted. [Placeholder: specific retention periods.]",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `Depending on your jurisdiction, you may have rights to access, correct, delete, restrict or port your personal data, and to withdraw consent at any time. Contact ${site.email} to exercise them. You may also lodge a complaint with your supervisory authority.`,
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We apply appropriate technical and organisational measures: encrypted transport, least-privilege access, input validation and no sale or secondary use of your data.",
          ],
        },
      ]}
    />
  );
}
