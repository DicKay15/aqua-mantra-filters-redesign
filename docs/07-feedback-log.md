# Feedback log

Use this file as the single source of truth for design, content and implementation feedback.

## Status definitions

- **Open:** recorded but not yet actioned.
- **In progress:** implementation or investigation is active.
- **Resolved:** applied and verified.
- **Deferred:** intentionally postponed with a reason.
- **Needs client:** blocked on a factual, legal or business decision.

## Feedback register

| ID | Date | Source | Area/page | Feedback | Decision/action | Status | Verification |
|---|---|---|---|---|---|---|---|
| FB-013 | 2026-09-11 | Dhrumil | Homepage V2 | Rebuild from scratch around Water Analytics' scale and media rhythm; remove the unexplained circle and upper hero layer; use less text, stronger imagery, useful SVG motion, unique sections and authentic or generated media | Created the Water Flow V2 on a separate branch with an interactive whole-home route, single-layer water hero, expanding lifestyle chapter, three-stage system interaction, authentic installation cinema, city switcher, installation rail and compact guides | Resolved | Lint/build/audit pass; all 18 routes 200; hero, stage and city interactions tested in browser; public-host check follows deployment |
| FB-001 | 2026-09-10 | Dhrumil | Whole project | Redesign every supplied page and miss nothing | All routes are mapped in the PRD and implementation checklist | In progress | Route test matrix before delivery |
| FB-002 | 2026-09-10 | Dhrumil | Visual direction | Keep the theme and logo; make the site professional and sophisticated | Preserve logo and blue recognition; use “engineered calm” as the original visual thesis | In progress | Visual QA and anti-slop review |
| FB-003 | 2026-09-10 | Dhrumil | References | Use client-liked sites for working industry elements, not copied design | Benchmark patterns documented separately from original Aqua composition | Resolved | Discovery audit |
| FB-004 | 2026-09-10 | Dhrumil | Motion | Use impactful Three.js, GSAP and Framer Motion interactions | Water hero, filtration sequence and interaction responsibilities planned | In progress | Motion/reduced-motion tests |
| FB-005 | 2026-09-10 | Dhrumil | Media | Plan images first, then generate and integrate them; consider video only where useful | Four-image plan saved; existing real videos take priority over generated footage | In progress | Asset QA and media test |
| FB-006 | 2026-09-10 | Dhrumil | Content/SEO | Add 3–4 relevant blogs and focus on SEO | Four-guide cluster and route plan included | In progress | Metadata, link and content review |
| FB-007 | 2026-09-10 | Dhrumil | QA | Test everything, fix issues and retest until solved | Evidence-based preflight and retest loop added | In progress | Final preflight report |
| FB-008 | 2026-09-10 | Dhrumil | Hosting | Host the site publicly | GitHub Pages is unavailable on a private repository under the current plan; published to Cloudflare Pages instead | Resolved | 18 routes, robots and sitemap return 200 live; invalid route returns 404 |
| FB-009 | 2026-09-10 | Dhrumil | Hero and interactions | Read the documentation, test the build, find what can be better, and implement it | Hero rebuilt on real installation photography with a working concern picker; filtration story rebuilt as an interactive cross-section; gallery lightbox added; six blocking defects fixed | Resolved | `09-review-findings-and-changes.md` |
| FB-012 | 2026-09-10 | Dhrumil | Hosting | Host both versions separately so they can be shared and compared | Previous build republished from commit 1d27f6e at aqua-mantra-v1.pages.dev, current build at aqua-mantra-redesign.pages.dev | Resolved | Both: 18 routes, robots and sitemap return 200, invalid route 404 |
| FB-011 | 2026-09-10 | Dhrumil | QA | Run it locally and test it | Interactive pass in a real browser found five defects a code read had missed: unstyled nav dropdown, ragged gallery grid, undersized lightbox, white box behind the footer logo, and two hydration mismatches | Resolved | Console clean on the deployed build; 13 routes at 5 widths with no overflow and no tap target under 44 px |
| FB-010 | 2026-09-10 | Review pass | Accessibility | Contrast, touch targets and no-JS readability | One grey token at 4.90:1, control boundaries at 3:1, every target 44 px at 390 px, reveal system safe without JavaScript | Resolved | 13 routes scanned at 5 widths: no overflow, no target under 44 px, one H1 each |

## New feedback template

Add the newest entry at the top of the register:

```text
| FB-### | YYYY-MM-DD | Name | Page/area | Exact feedback | Decision/action | Open | Test or review needed |
```
