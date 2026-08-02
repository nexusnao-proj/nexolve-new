import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { PostCard } from "@/components/sections/PostCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readingTime(post.sections.flatMap((s) => s.body).join(" "));
  const related = post.related
    .map((r) => getPost(r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      <article>
        <header className="relative overflow-hidden bg-grid">
          <div
            aria-hidden="true"
            className="absolute -top-40 right-[-10%] size-[420px] rounded-full bg-gradient-brand-soft blur-3xl"
          />
          <Container className="relative pt-10 pb-12 sm:pt-14 sm:pb-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Insights", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
              className="mb-8"
            />
            <Reveal className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <Link
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="rounded-full bg-gradient-brand-soft px-3 py-1 text-violet"
                >
                  {post.category}
                </Link>
                <time dateTime={post.date} className="text-ink-muted">
                  {formatDate(post.date)}
                </time>
                <span className="text-ink-muted">· {minutes} min read</span>
              </div>
              <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{post.excerpt}</p>
              <p className="mt-6 text-sm font-bold text-ink">
                {post.author.name}
                <span className="ml-2 font-normal text-ink-muted">{post.author.role}</span>
              </p>
            </Reveal>
          </Container>
        </header>

        <div className="border-t border-line bg-white">
          <Container className="py-12 sm:py-16">
            <div className="grid gap-12 lg:grid-cols-[0.28fr_0.72fr]">
              {/* Table of contents */}
              <nav
                aria-label="Table of contents"
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <h2 className="text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
                  In this article
                </h2>
                <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
                  {post.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm font-semibold text-ink-muted transition-colors hover:text-violet"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Article body */}
              <div className="max-w-2xl">
                {post.sections.map((section) => (
                  <section key={section.id} className="mb-10">
                    <h2
                      id={section.id}
                      className="scroll-mt-28 text-2xl font-extrabold tracking-tight text-ink"
                    >
                      {section.heading}
                    </h2>
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="mt-4 text-base leading-relaxed text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-neutral-light">
          <Container className="py-14 sm:py-20">
            <SectionHeading eyebrow="Related reading" title="Continue with" />
            <Reveal group className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((rel) => (
                <div key={rel.slug} data-reveal>
                  <PostCard post={rel} />
                </div>
              ))}
            </Reveal>
          </Container>
        </section>
      )}

      <CtaSection
        title="Working on something like this?"
        lede="These articles come from real delivery. If the problem sounds like yours, we can help you solve it properly."
      />
    </>
  );
}
