# Adi Narayana Manga · Portfolio 4.0

Live: https://m16616678.github.io/

Personal engineering portfolio: enterprise Java (CFMS 2.0 at TCS), healthcare full-stack software (Innovision), technical AI evaluation, engineering case studies and a 16-game browser arcade.

## Stack

- Next.js 16 (App Router, `output: "export"`, `trailingSlash: true`), React 19, TypeScript (strict)
- Tailwind CSS 4 plus a small scoped design system in `app/v4.css`
- Self-hosted fonts via `@fontsource` (no network call at build time)
- Playwright for end-to-end, responsive and unit tests
- GitHub Actions → GitHub Pages (static hosting, no server)

No animation, 3D or diagram libraries: the tilt cards use a small spring simulation and the architecture diagrams are hand-built SVG.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, career timeline, project bento grid, AI Evaluation Studio, arcade teaser, recruiter view, contact |
| `/case-studies/` | Case study index grouped by category |
| `/case-studies/<slug>/` | 12 statically generated case studies (problem, responsibilities, interactive architecture, stack, testing, outcomes, lessons) |
| `/arcade/` | The 16 playable games, cabinet and edit bay |
| `/resume/` | Printable résumé generated from the same data (browser "Save as PDF") |
| `/dashboard/`, `/portfolio-preview/` | Legacy URLs that forward to `/arcade/` and `/` |

## Where things live

```
app/
  data/portfolio.ts      # single source of truth: profile, timeline, projects, skills, roles
  data/evaluation.ts     # synthetic AI-eval demos + pure scoring functions
  v4.css                 # design tokens and component styles (in @layer components)
  page.tsx               # homepage composition
  case-studies/          # index + [slug] static pages
  arcade/page.tsx        # games
  resume/page.tsx        # printable résumé
  Components/v4/         # SiteHeader (nav, drawer, ⌘K search), SectionRail, Hero, CareerTimeline,
                         # ProjectGallery, TiltCard, ProjectVisual, AIStudio, ArchitectureDiagram, HomeSections
  Components/            # arcade: DashboardPortfolio, HeroCabinet, EditBay
  utils/                 # gameEngines.ts (canvas runner + 16 games), soundSynth.ts (Web Audio)
public/
  manifest.json, service-worker.js, icon-*.png, portfolio-*.svg (portraits)
tests/
  unit.spec.ts           # scoring math + content guardrails
  site.spec.ts           # E2E at 390 / 768 / 1280 / 1440 px
```

## Develop

```bash
npm ci
npm run dev            # http://localhost:3000
```

## Verify (same as CI)

```bash
npm run typecheck
npm run lint           # blocking in CI
npm run build          # static export to ./out
npx playwright install chromium   # first time only
npm test               # serves ./out on :4173 and runs all tests
```

To use an already installed Chrome instead of downloading one: `PW_CHROME_PATH=/usr/bin/google-chrome npm test`.

## Content policy

Every public claim comes from `app/data/portfolio.ts`. Before adding anything:

- No invented metrics, benchmarks, adoption numbers, dates or employer relationships.
- No employer source code, government data, patient data, client prompts or rubrics.
- Architecture diagrams are illustrative and say so. Screenshots only when real and approved.
- Each project states its evidence level (professional, contract, academic, independent, open-source derived).
- AI Evaluation Studio examples are original and synthetic, labelled "Response A / B", never real model names.

`tests/unit.spec.ts` enforces a few of these (for example, the M.S. is Information Technology, not Computer Science).

## Deploy

Push or merge to `main`. `.github/workflows/deploy.yml` builds and deploys `./out` to GitHub Pages. Confirm the Pages run succeeds (build and deploy jobs) before calling a release done. A Vercel status check is not proof that Pages published.

The service worker serves HTML network-first and deletes old caches on activate, so a new deploy shows up on the next load. Bump `VERSION` in `public/service-worker.js` when you change it.

## Rollback

Revert the bad merge on a branch (`git revert <merge-commit>`), open a PR, merge, and watch the Pages run. Do not force-push `main`.
