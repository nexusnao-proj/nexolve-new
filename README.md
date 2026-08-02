# Nexolve Technologies — Company Website

**Procurement, solved.**

Production-ready marketing website for **Nexolve Technologies**, a procurement and supply chain
transformation company operating across APAC and the Middle East. Built with
Next.js (App Router), TypeScript strict mode, Tailwind CSS 4, React Three Fiber, anime.js and
Lenis — engineered for Lighthouse 90+ mobile performance, WCAG 2.2 AA accessibility and complete
technical SEO.

---

## Quick start

```bash
# Requirements: Node 20+ (corepack included). pnpm is pinned via packageManager.
corepack enable pnpm          # or use `corepack pnpm <cmd>` directly

pnpm install
cp .env.example .env.local    # fill in what you have; everything degrades gracefully
pnpm dev                      # http://localhost:3000
```

## Scripts

| Command             | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Development server                           |
| `pnpm build`        | Static export to `out/`                      |
| `pnpm preview`      | Serve `out/` locally (port 3000)             |
| `pnpm start`        | Node server — not used for static hosting    |
| `pnpm lint`         | ESLint (next/core-web-vitals + TS)           |
| `pnpm typecheck`    | `tsc --noEmit` (strict)                      |
| `pnpm test`         | Vitest unit tests (schema, content, utils)   |
| `pnpm test:e2e`     | Playwright e2e (requires `pnpm build` first) |
| `pnpm format`       | Prettier write                               |

Before deploying run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
For e2e: `pnpm build` first, then `pnpm test:e2e` (Playwright serves `out/` via `pnpm preview`).

## Architecture

```
src/
  app/                    # Routes (App Router, RSC by default)
    services/[slug]       # 5 service-line pages (generateStaticParams)
    industries/[slug]     # 6 sector pages
    work/[slug]           # Case-study system
    blog/[slug]           # Insights articles (category filter is client-side)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
  components/
    layout/               # Header (a11y dropdown + focus-trapped drawer), Footer, SkipLink
    sections/             # Page sections; home/ holds the 14 home sections
    ui/                   # Container, Button, SectionHeading, Icon set, Logo
    animation/            # Reveal (IO + anime.js), SmoothScroll (Lenis), Marquee, TiltCard
    three/                # HeroVisual orchestrator + RibbonScene (lazy R3F)
    forms/                # ContactForm (client Zod + mailto)
    seo/                  # JsonLd, Breadcrumbs
    consent/              # CookieConsent + consent-gated GA4 loader
  lib/
    site.ts               # Brand strings, URLs, navigation (single source of truth)
    seo.ts schema.ts      # Metadata builder + JSON-LD builders
    content/              # Typed content layer: services, industries, case studies,
                          # posts, FAQ, solutions, company. CMS-swappable.
    contact/              # Zod schema + mailto helper (static-friendly)
```

**Content layer:** all copy lives in `src/lib/content/*` as typed data. Swapping to MDX or a
headless CMS means reimplementing those modules' exports — no template changes needed. Content
integrity (unique slugs, resolvable cross-references, placeholder policy) is enforced by unit
tests.

## Animation & 3D decisions

| Effect                        | Technology & why                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Hero 3D ribbon                | React Three Fiber — the one WebGL moment. Lazy-loaded (`next/dynamic`), WebGL-detected, DPR-clamped, reduced geometry on mobile, paused off-screen & on hidden tabs, disposed on unmount. Static SVG/CSS poster is the loading state **and** the complete non-WebGL fallback. |
| Scroll reveals                | anime.js + IntersectionObserver. Transform/opacity only, run once.               |
| Connection-line drawing       | CSS `stroke-dashoffset` (no JS animation lib), IO-triggered.                     |
| Smooth scrolling              | Lenis (the engine inside Locomotive Scroll v5) — chosen over Locomotive v4 because it preserves native scroll semantics, keyboard nav and browser history. Desktop fine-pointer only. |
| Card depth                    | CSS `perspective` tilt (rAF-throttled pointer), fine pointers only.              |
| Marquee                       | Pure CSS animation, paused when off-screen.                                      |

**Reduced motion:** `prefers-reduced-motion` disables smooth scroll, the WebGL scene (poster
shown instead), tilt, marquee, reveals and parallax — all content remains fully visible.
**No-JS:** reveal-hiding only applies when JS adds `html.js`, so crawlers and no-JS visitors see
everything.

## Contact form

Client-side form with shared Zod validation, a honeypot field, and `mailto:` delivery to
`info@nexolvetech.com`. Submitting opens the visitor’s email app with a drafted enquiry. There is
no server action or Resend dependency — suitable for static Cloudflare Pages hosting.

## SEO

- Metadata API with `metadataBase`, unique titles/descriptions, canonicals, OG + Twitter cards
- Dynamic OG image (`/opengraph-image`), `sitemap.xml`, `robots.txt`, web manifest, SVG favicon
- JSON-LD: `Organization`, `WebSite`, `ProfessionalService` (site-wide); `Service` + `FAQPage`
  (service pages); `Article` (posts); `BreadcrumbList` (all inner pages); `FAQPage` (/faq)
- All content server-rendered; nothing important lives in canvas or client-only components
- JobPosting schema intentionally **not** emitted while roles are placeholders

## Security

- CSP + security headers in `public/_headers` (applied by Cloudflare Pages). GA hosts are
  included so enabling `NEXT_PUBLIC_GA_ID` does not require a CSP edit.
- Form: client-side Zod validation, honeypot, mailto delivery (no server secrets).
- No client-side secrets; analytics load only after explicit consent.

## Deployment (Cloudflare Pages)

1. Push this repository to GitHub.
2. In Cloudflare: **Workers & Pages → Create → Connect to Git**.
3. Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npx next build` or `pnpm build` |
| Build output directory | `out` |
| Root directory | `/` |

4. Set `NEXT_PUBLIC_SITE_URL` (and optional analytics vars) under Environment variables.
5. Deploy. After first deploy: verify `https://<domain>/sitemap.xml`, submit it in Google Search
   Console, and confirm the OG image renders via a share debugger.

Local static preview: `pnpm build && pnpm preview`.

## Content replacement guide

All placeholders follow the `[Placeholder: …]` convention — grep for `Placeholder:` to find every
one. Priority order:

1. `src/lib/site.ts` — business email, regions, social URLs
2. `public/brand/*.svg` — **replace the recreated Matrix O logo files with official exports** (the
   mark was rebuilt from the brand identity guidelines; swap in the master SVGs when available).
   Keep filenames.
3. `src/lib/content/case-studies.ts` — verified client names, results, testimonials (the
   disclaimer banner disappears only when you remove it deliberately)
4. Home `TrustStatement` + `TestimonialsPlaceholder` — verified logos & quotes
5. `src/app/about/page.tsx` — leadership bios
6. `src/lib/content/company.ts` — open roles (then add JobPosting JSON-LD)
7. Legal pages — review by counsel; fill jurisdiction, retention periods, providers
8. `.env.example` values in your deployment environment

## Checklists

**Performance** (target: Lighthouse mobile ≥ 90, LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [x] Three.js excluded from initial bundles (dynamic import; home first-load ≈ 124 kB)
- [x] Hero text server-rendered; 3D is decorative with fixed-aspect container (no CLS)
- [x] Self-hosted font via next/font (swap), single family
- [x] GPU-only animations, IO triggers, rAF-throttled pointer handlers
- [x] Canvas paused off-screen/hidden; DPR clamp; mobile geometry reduction
- [x] No render-blocking third parties; analytics behind consent
- [ ] Run Lighthouse against the production domain after deploy (numbers depend on hosting)

**SEO**
- [x] Unique title/description/canonical per page; OG/Twitter cards; OG image
- [x] sitemap.xml, robots.txt, manifest, favicon, breadcrumbs, semantic URLs
- [x] Structured data (Organization, WebSite, ProfessionalService, Service, Article,
  BreadcrumbList, FAQPage) matching visible content only
- [ ] Set final production domain in `NEXT_PUBLIC_SITE_URL`
- [ ] Submit sitemap in Google Search Console; verify rich results

**Accessibility (WCAG 2.2 AA)**
- [x] Skip link, landmarks, heading order, focus-visible styles
- [x] Keyboard-complete header dropdown + focus-trapped mobile drawer (Esc closes)
- [x] Form labels, aria-invalid, role=alert errors, touch targets ≥ 44px
- [x] prefers-reduced-motion honoured everywhere; no flashing content
- [ ] Periodic audit with axe + a screen reader after content changes
