# Nexolve Technologies theme

Reusable design-system layer for colors, patterns, and motion.

## Import

`src/app/globals.css` already imports this package:

```css
@import "tailwindcss";
@import "../theme/index.css";
```

TypeScript tokens:

```ts
import { colors, gradients, motion, shadows } from "@/theme";
```

## Ownership

| Layer | Owns |
| --- | --- |
| `src/theme/*` | Tokens, grids, editorial chrome, reveal/marquee/float utilities |
| `src/app/globals.css` | Page-specific choreography (hero film, reel, constellation, hub, delivery model) |
| `src/components/animation/*` | Behavior (observers, Lenis, tilt) that toggles theme CSS classes |

## Patterns

- `.bg-grid` / `.bg-grid-dark`
- `.hairline-spectrum`
- `.editorial-label` / `.editorial-row` / `.editorial-frame` / `.editorial-slide`
- `.process-line`
- `.text-gradient` / `.bg-gradient-brand` / `.bg-gradient-brand-soft`
- `.surface-paper` / `.surface-ink` / `.surface-white`

## Animations

- Scroll reveal via `[data-reveal]` + `Reveal` component
- `.marquee-track` / `.marquee-paused` via `Marquee`
- `.animate-float`, `.scroll-cue-line`, `.hero-video-loader-logo`

All theme motion respects `prefers-reduced-motion`.
