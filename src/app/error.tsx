"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Route-level error boundary — friendly recovery, no stack traces leaked. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-grid">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <p className="text-xs font-bold tracking-[0.22em] text-violet uppercase">
          Something went wrong
        </p>
        <h1 className="mt-4 max-w-xl text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
          An unexpected error occurred.
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-muted">
          It&apos;s us, not you. Try again — and if it keeps happening, we&apos;d genuinely like to
          know.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-brand px-8 text-base font-semibold text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-8 text-base font-semibold text-ink"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
