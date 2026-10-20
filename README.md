# Daniel Amoako Frimpong, portfolio

My portfolio site: who I am, what I have built, and where I have worked. Each project page has a working demo of the core idea or the real data behind it, running in the browser.

## Pages

| Route | What is on it |
|---|---|
| `/` | Hero, results in numbers, three featured projects, a short experience list, contact |
| `/work` | All seven case studies, plus smaller projects and a research paper |
| `/work/[slug]` | One case study: the problem, what I built, a live demo, screenshots or figures |
| `/experience` | Roles, teaching and community work, and the toolkit |
| `/about` | Background, portrait, and education |
| `/resume` | A one-page résumé laid out for printing or saving as a PDF |

## Case studies and their demos

| Project | Demo on its page |
|---|---|
| Jobhunt | The match score: role 45%, skills 35%, level 20%, with both caps. Change the inputs and watch each part move. |
| RCW Media | A day in the team's Telegram group: drag through a service day to see what the bot posts, and when. |
| School Parent Portal | An animated request flow from sign in to a JWT-checked grade read. |
| Adaptive Cruise Control | A live car-following simulation of the zone controller, with three lead vehicle scenarios. |
| Jute Pest Classifier | The real test set results for five backbones, switchable by metric. |
| Prime Engine | AABB collision and frustum culling on a canvas. Move the pointer to aim the camera. |
| CoursePilot | The flow from an uploaded syllabus to a study plan and flashcards. |

The demos re-create each project's core logic in TypeScript, so they run without the original stack. Each page says what is simplified.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. No animation library: scroll reveals use CSS view timelines, page changes use React's `<ViewTransition>`, and the demos draw with SVG or canvas. Fonts are Instrument Serif, Inter, and JetBrains Mono through `next/font`. Hosted on Vercel with Vercel Web Analytics.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run build` | Production build. Every page is prerendered. |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, strict |
| `npm test` | Unit tests for the demo logic, on Node's own test runner |

The tests pin down the logic the demos depend on: the cruise controller never collides in any scenario, the frustum test keeps and culls the right boxes, the match score follows Jobhunt's rules, and the church bot posts and tags the right people at the right times.

## Editing content

All copy lives in two files, so a content change never touches a component.

- `src/content/site.ts`: profile, roles, teaching, education, toolkit, smaller projects, photos
- `src/content/case-studies.ts`: the case studies, their metrics, sections, links, and figures

To add a case study, add an object to `caseStudies` with a `demo` kind, then add its cover in `src/components/Cover.tsx` and its demo in `src/components/demos/`. The home page, `/work`, the résumé, the sitemap, and the ⌘K menu pick it up.

## Layout

```
src/app/              pages, plus generated icon, Open Graph image, sitemap and robots
src/components/       header, footer, command menu, work cards, cover art
src/components/demos/ one interactive demo per case study
src/content/          all site copy
src/lib/              demo logic (pure, tested), theme, hooks
public/images/        photos, screenshots, and research figures
```

## Details

- **Theme.** Light by default, dark through the toggle or the system setting. An inline script sets the theme before first paint, so there is no flash.
- **Accessibility.** Skip link, visible focus rings, labelled controls, and every animation turned off under `prefers-reduced-motion`. Content never depends on JavaScript to become visible.
- **Site URL.** Canonical links and the sitemap use `NEXT_PUBLIC_SITE_URL` if set, otherwise Vercel's production URL.
