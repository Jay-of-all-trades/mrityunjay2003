# AGENTS.md

Overview of this codebase for developers and AI agents. See `README.md` for the
product description and local setup.

## What this is

A personal portfolio and coursework explorer for Mrityunjay Chakraborty,
built on TanStack Start and deployed to Netlify. It is complete and fully
built — there is no PLAN.md and no staged roadmap.

### Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (`@theme` tokens, no shadcn theme layer) |
| Icons | lucide-react |
| Content | Plain TypeScript modules in `src/data/` |
| Forms | Netlify Forms |
| Images | Netlify Image CDN |
| Language | TypeScript, strict mode |
| Deployment | Netlify |

## Directory structure

```
├── public
│   ├── __forms.html          # Hidden static form so Netlify registers "contact" at build time
│   ├── favicon.ico
│   └── img
│       ├── mrityunjay-portrait.jpg   # 3:4 hero crop (Samvidhan Sadan, New Delhi)
│       ├── mrityunjay-avatar.jpg     # Square crop, used on /journey
│       └── samvidhan-sadan.jpg       # 16:9 wide crop, used in the speaking section
├── src
│   ├── components
│   │   ├── Bits.tsx          # Chip, Eyebrow, SectionHeading, StatTile — the shared small parts
│   │   ├── Reveal.tsx        # IntersectionObserver scroll-reveal wrapper
│   │   ├── SiteNav.tsx       # SiteNav (sticky header + mobile drawer) and SiteFooter
│   │   └── ui/               # Leftover template primitives; currently unused
│   ├── data                  # ALL content lives here — see below
│   │   ├── courses.ts
│   │   ├── journey.ts
│   │   ├── profile.ts
│   │   └── projects.ts
│   ├── lib
│   │   ├── img.ts            # Netlify Image CDN URL builder
│   │   └── utils.ts          # cn() class merger
│   ├── routes
│   │   ├── __root.tsx        # Shell: fonts, meta, grain overlay, nav, footer
│   │   ├── index.tsx         # Home
│   │   ├── coursework.tsx    # Interactive coursework explorer
│   │   ├── projects.tsx      # Project gallery
│   │   ├── journey.tsx       # Roles, honours, speaking
│   │   └── contact.tsx       # Netlify Forms contact page
│   ├── router.tsx
│   └── styles.css            # Design tokens, textures, animations
├── netlify.toml
└── vite.config.ts
```

## Content model

There is **no CMS and no database** — this is a static personal site, and all
content is typed TypeScript. Content Collections was removed from the template
because the transcript is structured records, not markdown prose.

- `src/data/courses.ts` — the 31 course entries, the level blurbs and the
  domain colour map. Entries deliberately carry **no grade data**.
- `src/data/projects.ts` — the ten projects. `featured: true` puts a project in
  the home page zig-zag grid; `since` is the sort key.
- `src/data/journey.ts` — `orgs` (each with nested `roles`) and `honors`, both
  newest-first, which is the page's reading order.
- `src/data/profile.ts` — identity, links, bio paragraphs, ticker facts, toolkit.

Adding a record to any of these flows straight through to the pages, filters,
counts and charts. Nothing needs to be registered anywhere.

## Design system

Defined entirely in `src/styles.css` via Tailwind 4 `@theme`. The named colours
(`paper`, `ink`, `rule`, `teal`, `marigold`, `rust`, `plum`, `harbor`, `wine`
and their `-wash` tints) are the whole palette — do not introduce ad-hoc hex
values.

Reusable CSS classes rather than repeated utility strings:

- `.sheet` / `.sheet-lift` — the card surface and its hover lift
- `.display` — Fraunces with the SOFT/WONK variation axes dialled in
- `.label` — the mono uppercase eyebrow used above most headings
- `.paper-grid` — graph-paper background
- `.grain-overlay` — fixed, non-scrolling grain (in `__root.tsx` only)
- `.marker` — highlighter swipe behind a word
- `.ink-link` — underline that draws itself on hover
- `.rise`, `.reveal`, `.ticker-track`, `.grow-bar` — the animations

All motion is disabled under `prefers-reduced-motion`. Keep it that way.

## Non-obvious decisions

- **Grades are never published.** The site lists coursework only. Do not add
  grades, grade points, grade filters, distributions or averages back — not even
  in `src/data/`, since anything imported there ships in the client bundle.
- **`Reveal` renders visible on the server** and only opts into the hidden
  state after mount, so readers without JS still see all content.
- **Images always go through `img()`** from `src/lib/img.ts` so pages never ship
  full-resolution originals. Add `width`/`height` attributes alongside to avoid
  layout shift.
- **`public/__forms.html` must exist** and must list every field the React form
  submits. TanStack Start renders forms client-side, so Netlify's build-time
  form detection would otherwise never see the contact form. The React form
  POSTs to `/__forms.html`, not `/` — posting to `/` is swallowed by the SSR
  handler. Netlify Forms has already been enabled for this site.
- **`src/components/ui/`** still holds unused template primitives (card, badge,
  separator, hover-card). Nothing imports them; delete rather than adopt them if
  you need a new primitive, since they carry the old shadcn token names.

## Conventions

- Components PascalCase, utilities camelCase, route files kebab-case.
- Imports use the `@/` alias for `src/`.
- Tailwind utilities inline; `cn()` for conditional classes; project-level
  patterns promoted to a class in `styles.css`.
- Interactive state is local `useState` with `useMemo` for derived lists. There
  is no global store and none is needed.
- Every filter surface ships an empty state and a reset path. Keep that.

## Commands

```bash
pnpm dev      # dev server on :3000
pnpm build    # production build
```
