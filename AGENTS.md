<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Single-page marketing site (Next.js App Router, all-client)

## Commands
- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` — ESLint (flat config `eslint.config.mjs`)
- No test suites and no `typecheck` script. Build runs typecheck (`tsc --noEmit` is the fast local check).

## Stack quirks
- **Tailwind v4, CSS-first config**: theme tokens live in `src/app/globals.css` via `@theme`, NOT in a `tailwind.config.*`. Do not create one. Utilities come from `--color-*` tokens: `bg-background`, `text-foreground`, `text-accent`, `text-muted`.
- Design tokens are duplicated as `:root` CSS vars in the same file — keep the two lists in sync.
- Fonts: Geist/Geist Mono loaded via `next/font` in `src/app/layout.tsx`, wired into `@theme` as `--font-sans` / `--font-mono`.
- **Motion = the `motion` package** (`import { motion } from "motion/react"`), NOT `framer-motion`.
- **Smooth scroll = `lenis`**: `SmoothScroll` (`src/components/ui/SmoothScroll.tsx`, mounted in `layout.tsx`) wraps the app in `ReactLenis root` and keeps ScrollTrigger in sync via `useLenis(() => ScrollTrigger.update())`. Lenis CSS is hand-inlined in `globals.css` (not imported from the package).
- Path alias `@/*` → `src/*`.

## Structure & conventions
- `src/app/page.tsx` is a thin server component that stacks five `"use client"` sections in order: Hero, Work, About, Contact, Footer.
- Components live under `src/components/`: `sections/` for page sections, `ui/` for shared chrome (Navigation, SmoothScroll, ScrollToTop). Mark new components `"use client"` if they use gsap/motion/lenis — in practice everything interactive is client-side.
- **GSAP pattern** (see `About.tsx`, `Work.tsx`): `gsap.registerPlugin(ScrollTrigger)` at module top; animations created inside `gsap.context(() => {...}, ref)`; cleanup via `ctx.revert()` in the `useEffect` return. Guard ScrollTrigger `pin` and setups with `useReducedMotion()` (as in `Work.tsx`).
- **Hero is a motion-powered smooth-scroll parallax hero** (like hover.dev's "SmoothScroll Hero", adapted to the 5-section page): a sticky full-screen image that shrinks via scroll-linked `clipPath` + `backgroundSize` (`useScroll`/`useTransform`/`useMotionTemplate` from `motion/react`, see `Hero.tsx`), with floating parallax `ParallaxImg` divs that drift/fade on scroll. No video/WebGL. Images are plain CSS `background-image` URLs (NOT `next/image`, so no `remotePatterns` needed).
- Sections carry their own rhythm with raw Tailwind: horizontal padding is `px-6 md:px-10 max-w-7xl mx-auto`, vertical is a per-section `py-*`. No shared layout primitive — the composition is hand-tuned, so keep new sections visually consistent with the existing `py-*` scale rather than introducing new space utilities. Anchored sections use `scroll-mt-24` to offset the fixed nav.

## Operational
- `next/image` requires remote hosts in `next.config.ts` `remotePatterns` (only `images.unsplash.com` is allowlisted, and project images are Unsplash URLs).
- Build artifacts in `.next/`; Vercel deploy — no CI config in repo.
