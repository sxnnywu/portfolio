# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

```
portfolio/
├── frontend/   # Next.js 16 app (the only active code)
└── backend/    # Empty — not yet scaffolded
```

All active work is in `frontend/`. The `backend/` directory is an empty placeholder.

Git state: the repo has a single `Initial commit` containing only `README.md`. `frontend/`, `CLAUDE.md`, and `PLAN.md` are all still **untracked** — the working app has never been committed. There is no root `.gitignore`; the only one is `frontend/.gitignore` (standard Next.js).

## Dev commands (run from `frontend/`)

```bash
npm run dev      # dev server on :5173 (Turbopack)
npm run build    # production build
npm run start    # production server on :5173
npm run lint     # eslint (flat config; Next 16 removed `next lint`)
```

There is no test suite.

The `dev`/`build`/`start` scripts invoke `node node_modules/next/dist/bin/next …` rather than the `next` bin — keep that form when editing scripts, it works around a broken bin shim.

On `npm run dev`, Next.js warns it inferred the workspace root from a stray `/Users/sunny/package-lock.json` (machine-local, outside the repo) — harmless, but silenceable by setting `turbopack.root` in `next.config.ts`.

## Tech stack

- **Next.js 16.2.4** (App Router) · **React 19.2.4** · **TypeScript 5**
- **Tailwind CSS v4** — tokens defined in `app/globals.css` via a `:root` block plus `@theme inline`, not `tailwind.config.ts`. Wired through PostCSS (`@tailwindcss/postcss`)
- **Turbopack** — the default dev/build bundler in Next 16 (no flag or config needed); `next.config.ts` is empty
- **Google Fonts** — `Caveat` (display/headings) and `Anonymous Pro` (body/mono), loaded in `app/layout.tsx` and exposed as CSS variables `--font-caveat` / `--font-anon`
- Path alias: `@/*` → `frontend/*` (e.g. `@/components/Nav`, `@/lib/data`)
- `package.json` `name` is still the scaffold default (`nexttemp`)

## Design tokens

Defined in `frontend/app/globals.css`:

| Token | Hex | Tailwind class |
|---|---|---|
| cream | `#F5EDE4` | `bg-cream`, `text-cream` |
| indigo | `#3535C4` | `bg-indigo`, `text-indigo` |
| yellow | `#F5CF4A` | `bg-yellow`, `text-yellow` |
| blue | `#1A1AFF` | `bg-blue`, `text-blue` |

Font utilities: `font-display` (Caveat) · `font-body` (Anonymous Pro)

Page defaults (cream background, indigo text) are set twice — as a `body` rule in `globals.css` *and* as `bg-cream text-indigo … font-body` classes on `<body>` in `app/layout.tsx`. Change both or they drift.

## Architecture

### Content data
All page content lives in `frontend/lib/data.ts` as typed exported arrays (`experience`, `projects`, `awards`, `communityMade`, `communityJoined`, `features`, `socials`), each typed by an exported interface (`ExperienceEntry`, `Project`, `AwardEntry`, `AwardSection`, `OrgEntry`, `Feature`). Edit content there — don't hardcode it in pages.

### Pages
Each route under `frontend/app/` corresponds to a nav item: `/experience`, `/projects`, `/community`, `/awards`, `/features`, `/contact`. The home page (`app/page.tsx`) is a client component (`"use client"`) because it manages the `HobbiesModal` state.

Inner pages (every route except home) open with `<CloudHeader />` — the watercolor clouds strip. Home uses the sun hero instead.

`app/layout.tsx` renders `<Nav />` above `{children}` for every route, so pages never mount it themselves.

### Components
All shared components are in `frontend/components/`:
- `Nav` — sticky yellow pill navbar; a client component (uses `usePathname` for the active pill)
- `CloudHeader` — watercolor strip for inner pages
- `Polaroid` — reusable polaroid card; accepts `caption`, `rotation`, optional `tags` and `className`
- `TimelineEntry` — timeline row for experience page
- `CommunityCard` — org card with logo + stats
- `AwardItem` — trophy + award details
- `HobbiesModal` — modal overlay triggered from home page (client component)

Everything else is a server component by default — only `app/page.tsx`, `Nav`, and `HobbiesModal` carry `"use client"`.

### Assets
Web-served static assets live in `frontend/public/assets/`, including the `features/`, `logos/`, and `projects/` subfolders. Reference them as `/assets/<filename>` in `src` props.

> ⚠️ `frontend/assets/` is a **stale partial duplicate** of the top-level image files (it lacks the three subfolders) and is **not** served by Next. Only edits to `frontend/public/assets/` take effect at runtime. Add/replace assets in `public/assets/`.

### Design references
- `frontend/designs/` holds PNG mockups of each page (`home.png`, `exp.png`, `projects.png`, `community.png`, `awards.png`, `features.png`, `contact.png`) — the source of visual truth for layouts.
- Root `PLAN.md` is the original build spec: full design system, per-page section breakdowns, component prop shapes, and deferred/open questions. Consult it before large layout changes.

## Important caveats

- This is **Next.js 16**, not the version in LLM training data. Check `frontend/node_modules/next/dist/docs/` for accurate API references before writing any Next.js-specific code. (`frontend/CLAUDE.md` is a one-line `@AGENTS.md` include and `frontend/AGENTS.md` restates this rule for tools that load the nearest instruction file — keep both, they're intentional, not stray duplicates.)
- Tailwind v4 uses `@theme` in CSS rather than `tailwind.config.ts` for token definitions — don't add a config file.
- The contact form is UI-only. Email sending via Resend is deferred.
- Mobile/responsive design is deferred — desktop-first for now.
