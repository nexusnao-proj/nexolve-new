"use client";

import { useEffect, useMemo, useState } from "react";
import { getPostsByCategory } from "@/lib/content/posts";
import { postCategories, type Post, type PostCategory } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/sections/PostCard";
import { Reveal } from "@/components/animation/Reveal";

function readCategoryFromLocation(): PostCategory | undefined {
  if (typeof window === "undefined") return undefined;
  const value = new URLSearchParams(window.location.search).get("category") ?? undefined;
  return postCategories.find((c) => c === value);
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

  return (
    <>
      <Reveal>
        <nav aria-label="Filter articles by category">
          <ul className="flex flex-wrap gap-2.5">
            <li>
              <button
                type="button"
                onClick={() => selectCategory(undefined)}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-bold transition-colors",
                  !active
                    ? "border-transparent bg-navy text-white"
                    : "border-line bg-white text-ink hover:border-violet/40 hover:text-violet",
                )}
                aria-current={!active ? "true" : undefined}
              >
                All topics
              </button>
            </li>
            {postCategories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => selectCategory(cat)}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-bold transition-colors",
                    active === cat
                      ? "border-transparent bg-navy text-white"
                      : "border-line bg-white text-ink hover:border-violet/40 hover:text-violet",
                  )}
                  aria-current={active === cat ? "true" : undefined}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

      {filtered.length > 0 ? (
        <Reveal group className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <div key={post.slug} data-reveal>
              <PostCard
                post={post}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </Reveal>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-line bg-white px-6 py-8 text-center text-ink-muted">
          No articles in this category yet — new insights are published regularly.
        </p>
      )}
    </>
  );
}
