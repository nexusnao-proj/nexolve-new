import Link from "next/link";
import type { Post } from "@/lib/content/types";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/Button";

/** Blog post card used on /blog and the home page insights preview. */
export function PostCard({ post }: { post: Post }) {
  const minutes = readingTime(post.sections.flatMap((s) => s.body).join(" "));
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      >
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="rounded-full bg-gradient-brand-soft px-3 py-1 text-violet">
            {post.category}
          </span>
          <span className="text-ink-muted">{minutes} min read</span>
        </div>
        <h3 className="mt-4 grow text-lg leading-snug font-extrabold text-balance text-ink group-hover:text-violet">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
          <time dateTime={post.date} className="text-ink-muted">
            {formatDate(post.date)}
          </time>
          <ArrowIcon className="text-violet transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}
