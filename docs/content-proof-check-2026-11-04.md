# Portfolio 4.0 — Content Proof Check (2026-11-04)

## Source priority

1. Latest user-uploaded two-page résumé: `Adi_Narayana_Manga_OSU_Intermediate_Application_Developer_R156984_Resume(1).pdf`, received 2026-11-04. Its body is a general-purpose software engineer résumé.
2. User's explicit correction in this conversation: Innovision is now a **full-time employment** position; the profile photo is too small.
3. Existing approved portfolio case-study content and earlier user-supplied project documentation.
4. Public GitHub source, used to validate implementation evidence, not employer-private deployment claims.

No independent HR, academic transcript, TCS employment certificate or AI-platform contract records were verified in this release. Self-reported résumé facts are not equivalent to external verification.

## Reconciled items in this change

| Field | Before | After | Basis |
|---|---|---|---|
| Innovision current title | Software Engineering Intern | Software Engineer (Full-time), October 2026 to present | Latest résumé p.1 and explicit user correction |
| Innovision earlier title | Implied ongoing internship | Software Engineering Intern, January–September 2026 | Latest résumé p.1 |
| Innovision chronology | One timeline entry | Two distinct positions at one employer | Same |
| TCS location | Hyderabad, India | Kolkata, India | Latest résumé p.1; see conflict note |
| High-resolution images | 180×235 px embedded WebP-in-SVG | Formal 550×735 WebP, alternate 720×953 WebP | Original user-provided photos |
| Downloadable résumé | Print-view only | Direct PDF download plus printable live résumé page | Latest provided résumé; general-public filename and metadata |
| Portfolio summary | Ambiguous current job | Full-time Innovision role and 4+ years combined experience | Latest résumé p.1 |

## Items verified against the uploaded résumé but not modified

- UC: M.S. Information Technology, December 2025, GPA 3.97/4.0.
- Bachelor's: B.Tech Electrical & Electronics Engineering, Vignan's Foundation for Science, Technology & Research (Vignan University), 2017–June 2020.
- TCS: Software Engineer, November 2020–August 2024; CFMS 2.0 **Comprehensive Financial Management System**, treasury, payee, e-billing, Java/Spring Boot, PostgreSQL, reporting/testing/CI-CD.
- Innovision stack: React/Next.js, Python/FastAPI, Supabase/PostgreSQL, RBAC and software testing.
- Handshake AI quality evaluation experience (user résumé p.2). Other platforms (Mercor, Appen CrowdGen, Outlier) retained because explicitly supplied by user in earlier instructions, but their task details/dates remain nonpublic.

## Follow-up confirmation needed before further factual changes

- **TCS city conflict:** A prior résumé and portfolio copy listed **Hyderabad**; the latest uploaded résumé says **Kolkata**. This release follows the latest résumé, but the correct on-site/office city should be confirmed.
- **Diploma college name:** currently not evidenced; keep generic.
- **Cross-platform AI evaluator dates:** no verified date breakdown for Mercor, Appen CrowdGen, Outlier in the latest résumé; do not invent dates.
- **Academic project naming:** earlier documentation calls one project Advanced Home Automation while the latest résumé lists IoT Home Automation System. Preserve each source's label until project identity is confirmed.
- **CodeVita ranking:** latest résumé self-reports rank 9,732 (July 2026), but no public verification attempted; not added to homepage as a validated prize.
- **Employer screenshots and confidential details:** do not use without authorization.
- **Claims of guaranteed FPS or quantified performance:** keep out unless supported by test logs.
- **Certifications:** require certificate records before publishing detailed claims.

## Asset and privacy checks

- `public/portfolio-formal-hq.webp` is a resized/cropped rendition of the user's own original suit photograph, not an AI-synthesized face.
- `public/portfolio-headshot-hq.webp` is a resized/cropped rendition of the user's own original blue-shirt photograph.
- `public/Adi_Narayana_Manga_Resume.pdf` is an optimized copy of the uploaded two-page résumé, with title/subject metadata changed to a generic software-engineer résumé. The body content was not rewritten.
- The downloadable PDF intentionally includes the professional phone/email already published in the submitted résumé.
- No proprietary Innovision, government, patient or AI-client data was added.

## Testing and release

The pull request quality gate should run full-repo TypeScript, lint, production static export and Playwright. New assertions check updated Innovision roles, higher-resolution image loading and the public PDF's PDF signature. Verify GitHub Pages deploy and public URL after merging.
