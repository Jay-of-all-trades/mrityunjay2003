# Mrityunjay Chakraborty — portfolio & interactive transcript

A personal portfolio site and small web app for Mrityunjay Chakraborty (BS in Data
Science and Applications, IIT Madras, roll 21F3001385).

The centrepiece is an **interactive transcript**: all 31 IITM BS entries — taught
courses and graded build projects — filterable by level, domain and grade,
searchable, sortable, with a grade-distribution chart and summary statistics that
recompute live from the current selection.

## Screens

| Route | What it is |
|-------|------------|
| `/` | Hero with the Samvidhan Sadan photograph, fact ticker, bio, transcript snapshot, five featured projects, speaking honours, toolkit |
| `/coursework` | The interactive transcript explorer |
| `/projects` | All ten projects, filterable by track and searchable, each expandable to full detail |
| `/journey` | Roles across six organisations plus honours and speaking engagements |
| `/contact` | Validated contact form backed by Netlify Forms |

## Design

A "field notebook" direction — warm paper (`#faf6ee`), ink type, graph-paper
texture, a fixed grain overlay, hard-offset card shadows, and ledger rules.
Type is Fraunces (display), Karla (body) and IBM Plex Mono (data labels).
Grades use a warm ordinal colour ramp, teal at the top through to wine.

## Tech

- **TanStack Start** (React 19, TanStack Router v1, file-based routing)
- **Vite 7** build
- **Tailwind CSS 4** with a custom `@theme` token set in `src/styles.css`
- **lucide-react** icons
- **Netlify Forms** for the contact form
- **Netlify Image CDN** for all imagery (see `src/lib/img.ts`)
- TypeScript, strict mode

## Running locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Or through the Netlify CLI, which emulates Image CDN and Forms:

```bash
netlify dev --port 8889
```

Note: Netlify Forms only accept submissions from a deployed site. Locally the
contact form surfaces an inline error explaining this — test it on a deploy
preview.

## Content

All content lives in plain TypeScript modules under `src/data/` — there is no CMS
and no database. To add a course, project, role or honour, edit the relevant file
and the pages, filters, counts and charts all follow automatically.

- `src/data/courses.ts` — the transcript, grade scale, grade colours, stats helpers
- `src/data/projects.ts` — the ten projects
- `src/data/journey.ts` — organisations, roles, honours
- `src/data/profile.ts` — name, links, bio, ticker facts, toolkit

## Possible next steps

- A downloadable CV generated from the same `src/data/` modules, so the PDF can
  never drift from the site.
- Per-project detail pages with charts and write-ups, especially for the BSE
  volatility capstone.
- A writing section for research notes.
