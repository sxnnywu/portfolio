# Portfolio Revamp — Implementation Plan

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `cream` | `#f5f0e8` | Page background |
| `navy` | `#2d2daa` (approx) | Headings, links, body text |
| `yellow` | `#f5d45e` (approx) | Nav bar background |
| `white` | `#ffffff` | Cards, polaroid borders |
| `blue-btn` | `#1a1aff` (approx) | CTA buttons (contact send) |

### Typography
- **Headings / titles:** Google Font — `Caveat` (handwritten cursive feel)
- **Body / stats / nav:** Google Font — `DM Mono` or `Space Mono` (clean, slightly quirky mono)

### Shared Decorative Elements
- **Watercolor clouds strip:** rendered at the top of every inner page (below nav), as a full-width image or SVG
- **Per-page illustrations:** scattered, positioned absolutely — lemon on experience, sunflower on home, stars on awards

---

## File Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout: Nav + fonts + global styles
│   ├── page.tsx                # Home
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   ├── community/page.tsx
│   ├── awards/page.tsx
│   ├── features/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Nav.tsx                 # Yellow pill navbar
│   ├── CloudHeader.tsx         # Watercolor clouds strip (inner pages)
│   ├── Polaroid.tsx            # Reusable polaroid card (home + projects)
│   ├── TimelineEntry.tsx       # Experience timeline row
│   ├── CommunityCard.tsx       # Community org card (logo + role + stats)
│   ├── AwardItem.tsx           # Trophy icon + award details
│   └── HobbiesModal.tsx        # Popup for "hobbies" link on home page
├── public/
│   ├── clouds.png              # Watercolor clouds strip asset
│   ├── sun.png                 # Sun illustration (home hero)
│   ├── profile.jpg             # Circular profile photo
│   ├── decorations/            # Lemon, sunflower, stars, etc.
│   ├── logos/                  # Company/org logos (Rocket, Polarity, etc.)
│   ├── projects/               # Project screenshot images (placeholder for now)
│   ├── community/              # Org logos (Pink Stairs, Blueprint, etc.)
│   └── features/               # Press/media feature images
├── lib/
│   └── data.ts                 # All content data (experience, projects, etc.)
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Content Data Strategy

All page content lives in `lib/data.ts` — typed arrays exported and consumed by each page. This makes content updates easy without touching components.

```ts
// Example shape
export const experience: ExperienceEntry[] = [...]
export const projects: Project[] = [...]
export const awards: AwardSection[] = [...]
export const community: { made: OrgEntry[], joined: OrgEntry[] } = {...}
export const features: Feature[] = [...]
```

---

## Pages

### 1. Home (`/`)
**Sections (top to bottom):**
1. **Nav** (shared, sticky)
2. **Hero** — sun illustration centered, "hey, i'm Sunny" in Caveat large, degree lines below
3. **About split** — left: "i like big ideas" headline + bullets (focus/now/past) + social links + "currently building [oro](buildingoro.ca)"; right: circular profile photo + sunflower
4. **"some cool things about me"** — 3 `<Polaroid>` cards with photos + handwritten captions
5. **"more about me:"** — 2-column link grid (work experience, awards, projects, features, community, hobbies→modal)
6. **"let's chat!"** — centered social links

**Notes:**
- "oro" in the about section links to `https://buildingoro.ca`
- "hobbies" link in the grid opens `<HobbiesModal>` (placeholder content for now)
- No cloud strip on home (it has the sun hero instead)

### 2. Experience (`/experience`)
**Layout:**
- Cloud strip header
- "experience" title (Caveat, large)
- "download resume" link (underlined, blue)
- **Timeline:** thin vertical line on the left; each entry is a row with date label on the left, dot on the line, and a card on the right
- Lemon slice illustration (absolute positioned, decorative)

**Card anatomy:** company logo (square, rounded) | role title (bold) | company name + location (right-aligned) | stat bullets below

**Entries (newest → oldest):**
1. Software Engineer Intern — Rocket | Remote | incoming may 2026
2. Founding Creator — Polarity | Waterloo | apr 2025 – present | 33k+ impressions
3. Growth Operator — 1851 Labs | Toronto | apr 2025 – apr 2025 | 500k+ users, 600k+ impressions
4. Growth Fellow — Stan | Toronto | mar 2025 – apr 2025 | $35M ARR, 300k+ impressions, Founding cohort
5. Data Intern — Skans Accountants | Markham | feb 2024 – jun 2024 | 15+ clients, 10+ corporate tax returns, $2,000+ in client funds
6. Frontend Supervisor — Vanspall's No Frills | Markham | aug 2022 – mar 2024 | 20+ cashiers trained, $2000+ theft prevented, 100 transactions/hour

### 3. Projects (`/projects`)
**Layout:**
- Cloud strip header
- "projects" title
- "sunny's github" link
- **Scattered polaroid layout:** cards are NOT in a grid — they're positioned with slight random rotations and offsets to look like photos tossed on a table. Each `<Polaroid>` has an image area + project name + tech tag chips below the white frame.

**Interaction:** Cards can have a subtle hover (de-rotate, slight scale up).

**Projects (placeholder images for now):**
1. alicebot — ai agents, prediction markets
2. sort.it
3. breast tumor detector
4. bonanza
5. ellmuright (or similar)
6. ton_run
7. nomads — travel
8. choiceboard

### 4. Community (`/community`)
**Layout:**
- Cloud strip header
- "community" title
- **Section: "what i've made"** — 2 orgs with logo, name, role+dates, one-liner description, bullet stats
- **Section: "what i've joined"** — 6+ orgs, same card layout

**"What I've made":**
- The Pink Stairs | founder & ceo | jun 2024–present | global youth-led nonprofit advancing gender equity | 30+ girls in 20 countries, 17k+ followers, 500+ care packages donated
- Byte-Sized Coding | founding author | jan–may 2024 | coding workbook for kids | donated across 3+ continents, 200+ copies, 100+ hours

**"What I've joined":**
- UW Blueprint | project manager | jan 2025–present | building software for small businesses + nonprofits | 500+ volunteers, 1000+ community hours
- Ignition Hacks | director of development | oct 2025–present | student-led hackathon in Toronto | 50k+ hackers, leading 4 engineers
- UW Women in Computer Science | committee | uwaterloo | promoting gender equity in tech
- mind4youth | director of outreach | may 2025 | making youth mental health resources accessible | $450k+ raised
- empowerIO | director of workshop | jan–jul 2024 | STEM opportunities for youth | 200+ attendees, 4+ chapters
- Youth United Project | aug–oct 2023 | quality education accessible | tutored students globally

### 5. Awards (`/awards`)
**Layout:**
- Cloud strip header
- "awards" title
- **5 sections**, each with a title + horizontal row of award items
- Each award item: trophy emoji/icon + award name + institution (smaller, below) + year

**Sections:**
1. **hackathon wins:** yHack (best use of polymarket, 2026), Hack Canada (best use of solana, 2026), Hack the North (finalist + snapchat top 10, 2025), Engineers Without Borders (top 4, 2024)
2. **scholarships:** Ted Rogers Future Leaders (2025), Loran Foundation Provincial Scholar (2025), UWaterloo President's Scholarship of Distinction (2025)
3. **academic:** UWaterloo President's Scholarship of Distinction (2025), Bur Oak CS Distinctive Award (2025), Bur Oak Principal's Award for Future Leadership (2025), Bur Oak CS Distinctive Award (2024)
4. **competitions:** DMZ Tech Micro-grant (2025), SAGE 2nd place nationals (2025), Ontario CMC top 20 provincials (2024)
5. **theatre:** NTS District Award: Spirit of the Festival (2025), NTS District Award: Spirit of the Festival (2024), NTS District Award: Distinctive Merit for Commitment to the Absurd (2024)

### 6. Features (`/features`)
**Layout:**
- Cloud strip header
- "features" title
- **Scattered/overlapping card layout** — like press clippings on a corkboard. Cards are feature images (actual screenshots/graphics of the media coverage) with slight rotations and offsets. Minimal text on the cards themselves — visual-first.

**Current features:**
1. STEAM Speaker Series — "Climbing Together: Leading Together"
2. Innovation Insider 09 — "Be an insider..."
3. Pink Stars / Professor Mac — "One of the Largest Youth-Led Nonprofit Empowering Women"

### 7. Contact (`/contact`)
**Layout:**
- Cloud strip header
- "contact" title
- Social links row: linkedin, github, x, resume, email (all underlined links)
- White card with:
  - "email me directly!" label
  - Large `<textarea>` ("start typing...")
  - Solid blue "send" button
- **Note:** Form UI only for now. Wire up email sending later (likely Resend).

---

## Shared Components

### `<Nav>`
- Yellow pill/rounded-full background
- Flex row with all 7 links
- Active link styling (bold or slightly different)
- Sticky at top, small top margin so it floats

### `<CloudHeader>`
- Full-width watercolor clouds image strip
- Used on all inner pages (experience, projects, community, awards, features, contact)
- NOT used on home (home has sun hero instead)

### `<Polaroid>`
Props: `image`, `caption`, `rotation?`, `tags?`
- White card, thick white border bottom (polaroid style)
- Image fills the top portion
- Caption or tags below the image inside the frame
- `rotation` applies a CSS `rotate()` for scattered layouts

### `<TimelineEntry>`
Props: `date`, `role`, `company`, `location`, `stats`, `logo`
- Left: date string
- Center: dot on the line
- Right: white card with all details

### `<CommunityCard>`
Props: `logo`, `name`, `role`, `dates`, `description`, `stats`
- Horizontal layout: logo left, text right
- Stats as bullet list

### `<AwardItem>`
Props: `trophy` (color: gold/silver), `name`, `institution`, `year`
- Trophy icon top, text below
- Displayed in horizontal flex rows per category

### `<HobbiesModal>`
- Triggered by "hobbies" link on home page
- Modal overlay with placeholder content for now
- Close on backdrop click or X button

---

## Build Order

1. **Project setup** — init Next.js 15, Tailwind, TypeScript, Google Fonts
2. **Design tokens** — Tailwind config with custom colors + font families
3. **Shared layout** — `layout.tsx` with Nav + font imports
4. **Shared components** — Nav, CloudHeader, Polaroid (used across multiple pages)
5. **`lib/data.ts`** — all content typed and filled in
6. **Home page** — most complex, sets the visual tone
7. **Experience page** — timeline layout
8. **Projects page** — scattered polaroid grid
9. **Community page** — two-section card list
10. **Awards page** — 5-section trophy grid
11. **Features page** — scattered card layout
12. **Contact page** — form UI
13. **HobbiesModal** — popup wired to home page link
14. **Polish pass** — spacing, responsive, hover states, decorative illustrations

---

## Assets Needed (from you)

- [ ] Profile photo (circular crop-friendly)
- [ ] Company logos: Rocket, Polarity, 1851 Labs, Stan, Skans Accountants, No Frills
- [ ] Org logos: Pink Stairs, Byte-Sized Coding, UW Blueprint, Ignition Hacks, UW WiCS, mind4youth, empowerIO, Youth United Project
- [ ] Project screenshots (8 projects) — placeholder until ready
- [ ] Feature press images (3 items)
- [ ] Watercolor clouds asset (can source/recreate from Figma export)
- [ ] Decorative illustrations: sun, sunflower, lemon slice, stars

---

## Open Questions / Deferred

- **Contact form email:** Will use Resend when ready. UI-only for now.
- **Hobbies modal:** Content TBD. Placeholder for now.
- **Responsive/mobile:** Design is desktop-first. Mobile breakpoints after desktop is complete.
- **Animations:** Subtle — polaroid hover de-rotate, maybe a fade-in on scroll. Keep it light.
