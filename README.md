# amoakofrimpsdev.github.io

Personal portfolio for **Daniel Amoako Frimpong** — software engineer, Los Angeles.

Live at <https://amoakofrimpsdev.github.io>.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Fonts | Geist, Geist Mono |
| Hosting | GitHub Pages via GitHub Actions |

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so the build emits a fully static site
into `out/`. Every page is prerendered, so the HTML contains real content for
crawlers even though the page animates on the client.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `out/` to GitHub Pages.

**One-time setup:** in the repository's *Settings → Pages*, set **Source** to
**GitHub Actions**.

## Project layout

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata, chrome
    page.tsx          Home
    work/             Projects, ML benchmark, research
    about/            Story, experience, skills, teaching
    photography/      Photo practice and tutorials
    globals.css       Design tokens and utilities
  components/         Nav, Hero, Timeline, ProjectCard, motion primitives
  lib/content.ts      All site content in one typed module
public/images/        Research figures and photos
```

## Editing content

Copy, projects, jobs, skills, and links all live in
[`src/lib/content.ts`](src/lib/content.ts). Adding a project means adding one
object to the `projects` array — the home page and `/work` pick it up
automatically. Set `kind: "featured"` to give it a large card.

## Accessibility & motion

- Every animation is gated behind `prefers-reduced-motion`.
- A `<noscript>` fallback reveals content if JavaScript never runs.
- Skip-to-content link, visible focus rings, and labelled icon links throughout.
