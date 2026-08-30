# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

```
portfolio/
├── frontend/   # Next.js 16 app (the only active code)
└── backend/    # Empty — not yet scaffolded
```

All active work is in `frontend/`. The `backend/` directory is an empty placeholder.

## Dev commands (run from `frontend/`)

```bash
npm run dev      # dev server on :5173 (Turbopack)
npm run build    # production build (also runs the TypeScript check)
npm run start    # production server on :5173
npm run lint     # eslint (flat config; Next 16 removed `next lint`)
```

There is no test suite. `npm run build` is the real gate — it typechecks as part of the build.

**The `next` and `tsc` bin shims in `node_modules/.bin` are broken.** The npm scripts work around this by calling `node node_modules/next/dist/bin/next …` directly; keep that form. To typecheck without a full build, run `node node_modules/typescript/bin/tsc --noEmit` (plain `npx tsc` fails with `Cannot find module '../lib/tsc.js'`).

## Tech stack

- **Next.js 16.2.4** (App Router) · **React 19.2.4** · **TypeScript 5** · Turbopack
- **No CSS framework.** Styling is inline style objects built from `lib/tokens.ts`, plus a small `app/globals.css` for resets and link/scroll behaviour. **Do not add Tailwind** — the design handoff is explicit that its values are bespoke and rounding them to a utility scale visibly changes the design.
- **Fonts** via `next/font/google`, exposed as CSS variables: Newsreader (`--font-newsreader`, normal + italic), Schibsted Grotesk (`--font-schibsted`, the default body face), Caveat (`--font-caveat`, used only for "Sunny" in the hero)
- Path alias `@/*` → `frontend/*`
- **`next.config.ts` pins `turbopack.root` to the frontend directory.** This is load-bearing: without it Next infers the workspace root as `/Users/sunny` and picks up an unrelated `postcss.config.js` + `tailwind.config.js` sitting in the home directory, which fails the build with a confusing Tailwind PostCSS error.

## Design source of truth

The site implements `~/Downloads/design_handoff_sunny_site/` (a design handoff). Read its `README.md` before any visual change — it carries the full token table, motion spec, per-page anatomy and final copy.

- `reference/*.html` are the design prototypes: plain HTML with inline styles plus a `componentDidMount` script. **Where the handoff README and a reference file disagree, the reference file wins** — two known cases on Home: the sun's parallax is `data-speed="0.03"` (README's prose says 0.06), and "Sunny" in the hero is Caveat 700 at 1.1em in blue, not Newsreader.
- `screenshots/` are captured at 924px. Clouds are positioned in absolute px, so at wider viewports they sit further out and the middle opens up — that is expected, not a regression.
- Copy is final and uses **straight** apostrophes (`i'm`, `i've`). In JSX write them as `&apos;`; a bare `'` trips `react/no-unescaped-entities`.

## Architecture

`app/layout.tsx` loads the three fonts, and renders `<Header />` and `<ParallaxRoot />` around every page.

- **`components/ParallaxRoot.tsx`** (client) — the single throttled scroll handler driving both parallax systems. `[data-speed]` layers translate against absolute page scroll (`data-fade="1"` also fades them); `[data-local]` layers translate against how far their enclosing `[data-scene]` has entered the viewport. It writes transforms straight to the DOM — **never put scroll offset in React state**, it re-renders every frame. It re-queries on pathname change and no-ops (clearing transforms) under `prefers-reduced-motion: reduce`.
- **`components/Header.tsx`** (client) — fixed bar, transparent until it solidifies. Threshold differs by route: `innerHeight * 0.7` on Home, `140` on inner pages. The brand is hidden over the Home hero (the hero already says the name) and always visible elsewhere.
- **`components/Cloud.tsx`** — the one raster asset (`public/assets/cloud-watercolour.png`) reused everywhere; variety comes from `height`, `opacity` and `flipped`. **`masked` applies the bottom mask to the `<img>` itself — never move that mask to a positioning wrapper**, a zero-height wrapper collapses the gradient into a hard alpha cut. Do not add veil rectangles over the sky→paper seam.
- **`components/Sun.tsx`** — the hand-drawn SVG sun. `<SunFilterDefs />` must be rendered once on any page using it; the sun references its filter by `url(#sunTex)`.
- **`components/ContactSection.tsx`** — the closing section, identical on all five pages.
- **`lib/tokens.ts`** — colours, gradients, type scales, `skyTint(alpha)`, and the two button styles. Take values from here rather than retyping hex.
- **`lib/data.ts`** — page content (socials, education, stats, nav rows). Edit content here, not in the page.

`components/Cloud.tsx` deliberately uses `<img>`, not `next/image`; the clouds need a fixed `height` with auto width plus a CSS mask. The resulting `@next/next/no-img-element` lint warning is expected — lint should still show **0 errors**.

## Likes

The sticky like button (`components/LikeButton.tsx` → `app/api/likes/route.ts`) counts in Upstash Redis under `likes:total`, carried over from the old portfolio's Mongo-backed counter. The route accepts either `KV_REST_API_*` or `UPSTASH_REDIS_REST_*` because the marketplace integration names them differently by version, and it returns `count: null` when the store is missing or erroring so the button hides instead of showing a broken state.

It counts clicks, not people: there is deliberately no per-visitor limit and no unlike. The only guard is a per-address ceiling of 120 a minute in Redis, high enough that no human clicking fast is refused. A rejected write still resolves the fetch, so the client rolls back the optimistic click on any non-ok response, not only on a thrown error. The total rolls up from zero on first paint the way the stat band does, and a click during that roll ends it so the number never runs backwards.

## Build state

All five pages are built: Home, Work, Projects, Awards, Story. Every header link resolves.

`SkyBand` and `ContactSection` are shared by all four inner pages. The Work filter is the only real client state on the site: a `Set<Discipline>` in `WorkTimeline`, union semantics, empty set means show all.

`Project.links` entries carry an optional `href`, and `ProjectCard` renders only the ones that have it, so a missing URL drops the link rather than shipping a dead `#`. Every project link is wired except Post It's demo video, which has no URL yet.

The old site (cream/indigo, Caveat + Anonymous Pro, Tailwind, six different routes) is preserved in commit `9fd3f98` if anything needs recovering.

## Caveats

- This is **Next.js 16**, not the version in LLM training data. Check `frontend/node_modules/next/dist/docs/` before writing Next-specific code. (`frontend/CLAUDE.md` is a one-line `@AGENTS.md` include and `frontend/AGENTS.md` restates this — both intentional.)
- `frontend/assets/` is a stale duplicate of some `public/assets/` files and is **not** served. Only `public/assets/` reaches the browser.
- `public/assets/` still holds imagery from the old design (bee, sunflower, headshot, logos…). The new design uses no logos or photos — only the cloud PNG and the inline SVG sun.
- Nav rows on the home page wash with a watercolour bloom on hover (`components/Bloom.tsx`), keyed to a per-row colour in `navRows`. It is scoped to `(hover: hover) and (pointer: fine)`, because on touch `:hover` sticks after a tap and would leave a card washed. The row also brightens instead of taking the site-wide `a:hover` dim, which would fade the wash out with everything else.
- Clouds hang past the bottom of whatever holds them and rely on their bottom mask to fade out. The Home hero is the reference: it does not clip at all, so the mask finishes and no seam appears.
- Where a section *must* clip (the contact panel contains its clouds, or they would spill over the nav rows), fade the **clip boundary**, not the images. Parallax slides a cloud an arbitrary distance past the edge — measured between 23px and 237px on one scroll position — so no fixed mask on an image can guarantee the cut lands where that image is transparent. Two earlier attempts at image masks only reduced the seam. The contact panel carries a top mask instead, which costs nothing visually because the gradient's first stop is `#fdfaf1`, the page background exactly. Do not clip a section that contains them unless its clouds are masked *and* the clip lands in the faded part: the sky band used to cut its tallest cloud at 68% opacity, which read as a straight line across the page. The Home hero is the reference — it does not clip at all.
- The like button's count holds until the home hero has finished typing both lines and settling its call to action, and only on the first landing. The wait is derived from the same `sequenceEnd` helper the hero uses, so rewording a hero line retimes it automatically. The "first landing" flag lives at module scope, which survives client-side navigation but not a reload, so returning home from another page shows the count at once.
- `app/template.tsx` gives every route a short fade in, since Next remounts a template on each navigation. It animates **opacity only** on purpose: `transform`, `filter` or `will-change: transform` there would make the wrapper the containing block for the fixed header and like button and break both.
- Motion: `Typed` types a line out by wrapping every character in its own span and flipping visibility on a per-character delay, with a caret riding the character currently being typed. Do not go back to clipping the line: `steps()` divides by width, not by glyph, so in a proportional face it leaves half-drawn letters mid-run. Every character is in the DOM from the start, so nothing reflows and a centred heading cannot shift. Pass the plain-text `text` prop — it drives the timing and provides the accessible name, since the visual spans are `aria-hidden`.
- Motion: `ScrollReveal` fades `[data-reveal]` elements up on entry. It is driven by scroll position rather than `IntersectionObserver` — the first screenful must reveal synchronously on mount, and an observer that never fires would strand content invisible. `[data-reveal]` is hidden in CSS from the first paint, with a `<noscript>` override in the layout so a page without JS shows everything. Anything new that is revealed needs the attribute, nothing else.
- Responsive: breakpoints at `max-width: 768px` and a `769-1023px` tablet tier, in `globals.css`, following the handoff's own list of open questions. Because the layout is styled inline, those rules need `!important` to outrank the inline styles, and they hook onto data attributes (`data-site-header`, `data-stat-band`, `data-project-grid`, `data-award-group`, `data-role-dates`) rather than classes. Keep any new responsive rule in that block so there is one place to look.
