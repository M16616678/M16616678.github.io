# Portfolio 4.0 · Technical Handoff

Prepared: November 4, 2026 · Branch: `feat/portfolio-4` · Base: `main` @ `af69f8e`

## Status

| Item | State |
| --- | --- |
| Implementation | Done on `feat/portfolio-4` |
| Typecheck / lint / build | Pass (lint: 0 errors, 2 warnings, see below) |
| Playwright | 63 passed, 10 intentionally skipped (device-specific), 0 failed |
| PR | **Not opened.** The build session had read-only access to the repo |
| GitHub Pages deploy | **Not done.** Happens automatically after merge to `main`. Verify the Pages run |
| Production URL | https://m16616678.github.io/ (shows Portfolio 3.0 until this is merged and deployed) |

Nothing in this document claims deployment success. Confirm the Pages workflow run after merging.

## How to ship it

```bash
git clone https://github.com/M16616678/M16616678.github.io.git && cd M16616678.github.io
git checkout -b feat/portfolio-4
git am < portfolio-4.patch          # or unzip the source bundle over a clean checkout
npm ci && npm run typecheck && npm run lint && npm run build
npx playwright install chromium && npm test
git push -u origin feat/portfolio-4  # open a PR; the quality gate runs tsc, lint, build, Playwright
```

After review, squash-merge, then watch "Deploy Next.js site to Pages" until build and deploy both pass. Open the site in a private window to confirm.

## What changed

**Homepage (`/`)** rebuilt as one canonical page: sticky header with active-section indicator, ⌘K / Ctrl+K project search, mobile drawer, collapsible desktop section rail (≥1440 px), hero with both photos and an animated SVG orbit, verified highlights, filterable career timeline (employment / education / contract / independent), project bento grid with search, category and "hiring for" role filters, AI Evaluation Studio (code review scoring, response comparison, step-by-step reasoning check, agent tool-use trace, failure taxonomy), arcade teaser, recruiter panel with role views and evidence-linked skills, contact.

**Case studies** now 12 static pages at `/case-studies/<slug>/`, each with overview, problem, responsibilities, interactive architecture diagram (hover, click or Tab), stack, methodology, implementation, challenges, testing, outcomes, lessons, links and related projects.

**Arcade (`/arcade/`)** now renders only the games (cabinet, 16-game library, edit bay) instead of duplicating the homepage. Game engine code is unchanged apart from type-only lint fixes.

**Résumé (`/resume/`)** printable page generated from the same data. "Download as PDF" uses the browser print dialog. No fabricated PDF was added.

**Single source of truth:** `app/data/portfolio.ts` (all claims) and `app/data/evaluation.ts` (synthetic demos and scoring functions).

**Cards:** `TiltCard` uses a spring simulation for tilt, lift and glow. Pointer tracking runs on an untransformed wrapper so the card no longer jitters at its edges. Disabled for touch and for reduced motion (both covered by tests).

**Cleanup:** removed `CareerAtlas` (hidden duplicate with duplicate IDs), `PortfolioPremium`, `PremiumProjectCard`, `SoftwareResume` (subjective skill percentage bars), boilerplate `AddToCart` / `ProductCard`, Next starter SVGs, two identical 853 KB icons, legacy root `index.html` (old pre-Next site, not deployed) and `main.py` (unrelated FastAPI scratch). All remain in git history. `/dashboard/` and `/portfolio-preview/` forward to `/arcade/` and `/` so old links still work. The old terminal that printed unverified "60 FPS / 0 ms lag verified" lines is gone with them.

**PWA:** professional manifest (start URL `/`, new 16 to 53 KB icons, maskable icon, shortcuts). New service worker: network-first HTML, cache-first hashed assets, deletes every old cache including `arcade-cabinet-v1`. The registration script reloads once only when a new worker replaces an existing one (never on first visit).

**Build robustness:** fonts self-hosted through `@fontsource`, so builds no longer fail when Google Fonts is unreachable. `trailingSlash: true` emits `route/index.html` so GitHub Pages serves `/case-studies/` and `/case-studies` correctly.

**CI:** quality gate now blocks on full-repo lint and runs Playwright. README replaced.

## Architecture

```
app/data/portfolio.ts ─┬─> / (homepage components)
app/data/evaluation.ts ┤   /case-studies/ and /case-studies/[slug]/ (generateStaticParams)
                       └─> /resume/
next build (static export, trailingSlash) ─> out/ ─> GitHub Pages
public/service-worker.js: network-first HTML, cache-first /_next/static
```

## Component inventory (`app/Components/v4/`)

| Component | Purpose |
| --- | --- |
| SiteHeader | Sticky nav, active section, mobile drawer (Esc, scroll lock), ⌘K palette with arrow-key navigation |
| SectionRail | Collapsible desktop sidebar with scroll progress, remembers state |
| Hero | Headline, portraits with switcher, SVG orbit, highlights |
| CareerTimeline | Filterable, expandable timeline linking to case studies (inline details on mobile) |
| ProjectGallery | Search, category and role filters, bento grid, expandable details |
| TiltCard | Spring-physics 3D tilt wrapper |
| ProjectVisual | Decorative SVG motif per project (never a screenshot) |
| AIStudio | Four synthetic evaluation demos and failure taxonomy |
| ArchitectureDiagram | Keyboard-accessible interactive SVG diagram |
| HomeSections | ArcadeShowcase, RecruiterPanel, Contact, SiteFooter |
| MovedPage, PrintButton | Legacy route forwarding, résumé print |

## Test results

`npm test` runs `tests/unit.spec.ts` and `tests/site.spec.ts` against the built `out/` at 390, 768, 1280 and 1440 px.

Covered: scoring math and pass gate, content guardrails (M.S. IT not CS, Vignan B.Tech EEE, CFMS state government, IBrace not hand rehab), referential integrity of data, homepage render with no console errors, no duplicate IDs, no horizontal overflow on every page, project filter / search / empty state, card expansion `aria-expanded`, AI studio live scoring and trace diagnosis, keyboard timeline, ⌘K palette, mobile drawer, reduced-motion disables tilt, pointer tilt works, all 12 case studies load with every section, diagram keyboard selection, arcade lists games with a canvas and no errors, résumé, legacy redirects, manifest and service worker identity, all internal links return 200.

Result: **63 passed, 10 skipped** (skips are device-specific tests such as the drawer on desktop), 0 failed.

## Performance (measured, Lighthouse 12, local static server)

| Homepage | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile (simulated throttling) | 89 | 100 | 100 | 100 | 1.2 s | 3.8 s | 40 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.8 s | 0 ms | 0 |

Measured against a local server, not production. Re-run against the live URL after deploy. Mobile LCP is the main thing to improve.

## Needs owner confirmation (content)

1. **Innovision title.** The old résumé component said "Software Engineering Intern, Dayton, OH". The master prompt said "Software Engineering". The site uses the more conservative **Software Engineering Intern**. Change in `timeline` if the title is different.
2. **Diploma institution** still unknown, shown as "Diploma programme".
3. **"Project Alloy"** AI evaluator entry from the old résumé was not carried over (not in the approved handoff). Add it back only if it is a real, shareable engagement.
4. **Certifications:** none are listed because none were provided.
5. **Lessons learned and challenge text** were drafted from existing repo copy and kept general. Please review the wording.
6. **Résumé PDF:** there is no uploaded PDF. The printable page replaces it. Add `public/resume.pdf` if you want a fixed file.
7. **Screenshots:** none added. Add only real, approved images.

## Known limitations

- Lint has 2 warnings (missing hook dependencies in `DashboardPortfolio` and `EditBay`). Left alone on purpose because adding them could restart game loops. Two `set-state-in-effect` resets in `DashboardPortfolio` are suppressed with a comment. `HeroCabinet` has a file-level `no-explicit-any` disable for legacy particle records.
- Per-game automated play tests do not exist. Tests confirm the arcade renders and lists games, not that all 16 are fully playable.
- Portrait files are small (180 × 235). Higher resolution originals would look sharper on the hero.
- No AI portfolio assistant was built. It needs a separate backend for API keys and rate limits. A non-functional chat UI was deliberately not added.
- No preview environment was available. The Vercel check on the PR can act as a preview, but Pages is the canonical deploy.

## Next improvements

1. Merge, deploy, run Lighthouse on production.
2. Higher resolution portraits and approved screenshots.
3. Per-game Playwright smoke tests (launch, input, close).
4. Type the legacy arcade components fully and drop the lint suppressions.
5. Optional grounded assistant on a serverless backend using `portfolio.ts` as its only corpus.

## Rollback

`git revert <squash-merge-commit>` on a branch, PR, merge, verify the Pages run. Do not force-push `main`. The new service worker serves HTML network-first, so a rollback is visible on the next page load.
