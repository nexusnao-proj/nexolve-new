"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/Logo";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

const nav = mainNav.filter((item) => item.label !== "Contact");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const light = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const items = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    items()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300",
        mobileOpen
          ? "border-white/15 bg-[#0e1418] text-white"
          : light
            ? "border-white/15 bg-[#0e1418]/85 text-white backdrop-blur-md"
            : "border-ink/10 bg-white text-ink",
      )}
    >
      <div className="relative z-10 mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Nexolve Technologies — home" className="inline-flex min-h-11 items-center">
          <BrandLogo light={mobileOpen || light} className="h-8 sm:h-9" />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center text-[0.72rem] font-extrabold tracking-[0.12em] uppercase after:absolute after:bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full",
                    isActive(item.href) && "after:w-full",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href="/contact"
            variant={light ? "onDark" : "secondary"}
          >
            Book a discovery session <ArrowIcon />
          </ButtonLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-300",
                mobileOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] block h-px w-6 bg-current transition-opacity duration-300",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-300",
                mobileOpen && "-translate-y-[8px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div ref={drawerRef} id="mobile-menu" className="fixed inset-0 z-0 overflow-y-auto bg-[#0e1418] pt-[72px] text-white lg:hidden">
          <nav aria-label="Mobile navigation" className="flex min-h-full flex-col px-5 pb-8 sm:px-8">
            <p className="editorial-label mt-10 text-white/55">Navigation</p>
            <ul className="mt-5 border-t border-white/20">
              {mainNav.map((item, index) => (
                <li key={item.href} className="border-b border-white/20">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[72px] items-center justify-between text-3xl font-bold tracking-[-0.05em] sm:text-4xl"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-bold tracking-widest text-white/40">{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-10 text-sm leading-relaxed text-white/55">Consult · Implement · Integrate · Build</p>
          </nav>
        </div>
      )}
    </header>
  );
}
