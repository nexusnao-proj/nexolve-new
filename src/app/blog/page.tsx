import { getPostsByCategory } from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { Container } from "@/components/ui/Container";

export const metadata = buildMetadata({
  title: "Insights — Procurement, Source-to-Pay & Platform Delivery",
  description:
    "Practical writing on procurement transformation, SAP Ariba, integration and analytics from the Nexolve delivery team.",
  path: "/blog",
});

export default function BlogPage() {
  const initialPosts = getPostsByCategory();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Thinking from the build floor"
        lede="No thought-leadership fluff — practical lessons from procurement and supply chain programmes across APAC and the Middle East."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
        ]}
      />
      <section className="bg-neutral-light">
        <Container className="py-14 sm:py-20">
          <BlogIndex initialPosts={initialPosts} />
        </Container>
      </section>
      <CtaSection
        title="Prefer answers to articles?"
        lede="If a question here touches your business, skip the reading list — ask us directly."
      />
    </>
  );
}
