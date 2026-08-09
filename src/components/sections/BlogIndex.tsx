"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPostsByCategory } from "@/lib/content/posts";
import { postCategories, type Post, type PostCategory } from "@/lib/content/types";
import { cn, formatDate, readingTime } from "@/lib/utils";
import { CardCover } from "@/components/ui/CardCover";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

function readCategoryFromLocation(): PostCategory | undefined {
  if (typeof window === "undefined") return undefined;
  const value = new URLSearchParams(window.location.search).get("category") ?? undefined;
  return postCategories.find((category) => category === value);
}

function minutesFor(post: Post) {
  return readingTime(post.sections.flatMap((section) => section.body).join(" "));
}

export function BlogIndex({ initialPosts }: { initialPosts: Post[] }) {
  const [active, setActive] = useState<PostCategory | undefined>(undefined);

  useEffect(() => {
    setActive(readCategoryFromLocation());
  }, []);

  const filtered = useMemo(
    () => (active ? getPostsByCategory(active) : initialPosts),
    [active, initialPosts],
  );

  function selectCategory(next?: PostCategory) {
    setActive(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("category", next);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url.pathname + url.search);
  }

  const [featured, ...remaining] = filtered;

  return (
    <>
      <Reveal>
        <nav aria-label="Filter articles by category">
          <ul className="insight-filters">
            <li>
              <button
                type="button"
                onClick={() => selectCategory(undefined)}
                className={cn("insight-filter", !active && "is-active")}
                aria-pressed={!active}
              >
                All topics
              </button>
            </li>
            {postCategories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => selectCategory(category)}
                  className={cn("insight-filter", active === category && "is-active")}
                  aria-pressed={active === category}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

      {featured ? (
        <div className="insight-editorial mt-10">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="insight-feature group">
              <div className="insight-feature__media">
                <CardCover cover={featured.cover} sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
              <div className="insight-feature__content">
                <p className="editorial-label text-core-cyan">Featured perspective</p>
                <p className="insight-feature__meta">
                  {featured.category} · {minutesFor(featured)} min read
                </p>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span>
                  Read the perspective
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal group className="insight-ledger">
            {remaining.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-reveal
                className="insight-ledger__item group"
              >
                <span className="insight-ledger__index">{String(index + 2).padStart(2, "0")}</span>
                <div className="insight-ledger__media">
                  <CardCover cover={post.cover} sizes="(min-width: 900px) 180px, 34vw" />
                </div>
                <div className="insight-ledger__content">
                  <p className="insight-ledger__meta">
                    {post.category} · {minutesFor(post)} min read · {formatDate(post.date)}
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <ArrowIcon className="insight-ledger__arrow transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </Reveal>
        </div>
      ) : (
        <p className="mt-12 border border-dashed border-white/30 bg-white/5 px-6 py-8 text-center text-white/70">
          No articles in this category yet.
        </p>
      )}
    </>
  );
}
