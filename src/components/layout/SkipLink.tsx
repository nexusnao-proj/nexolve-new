/** Keyboard skip-to-content link — first focusable element on every page. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
    >
      Skip to main content
    </a>
  );
}
