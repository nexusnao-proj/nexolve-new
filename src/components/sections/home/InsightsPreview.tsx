import Link from "next/link";
import { getPostsByCategory } from "@/lib/content/posts";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { PostCard } from "@/components/sections/PostCard";

export function InsightsPreview() {
  const latest = getPostsByCategory().slice(0, 3);
  return (
    <section className="bg-neutral-light">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Latest insights"
            title="Thinking from the build floor"
            lede="Practical writing on AI, agents, automation and software engineering — from the people doing the work."
          />
          <Reveal delay={150}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet transition-colors hover:text-magenta"
            >
              All insights
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
        <Reveal group className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((post) => (
            <div key={post.slug} data-reveal>
              <PostCard post={post} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
