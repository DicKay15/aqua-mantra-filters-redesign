# Review findings and changes

Date: 10 September 2026. This pass audited the delivered build, fixed what it found, and rebuilt the hero and the interaction layer. It supersedes the motion sections of `05-visual-motion-media-plan.md` and the routing claims in `08-preflight-report.md` where they disagree.

## Verdict on the build as delivered

The content discipline was the strongest part: no fabricated claims, no invented certifications or reviews, correctly hedged product language, unique metadata on all 18 routes, and a real reduced-motion path. The problems were concentrated in three places: the hero had no point of view, the interaction layer was mostly decorative, and the "client still needs to confirm this" notes had been written into body copy where a customer reads them as the product.

## Blocking issues found and fixed

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Every section below the hero was invisible without JavaScript.** Framer Motion's `initial={{ opacity: 0 }}` was server-rendered as an inline style on eight sections. If the bundle failed, the page was a hero and nothing else. It also contradicted the PRD's own "static content remains readable if enhanced motion fails". | `curl / \| grep 'opacity:0'` returned 8 matches in the SSR HTML | Replaced Framer Motion in `MotionSection` with a CSS reveal scoped behind a `.js` class that `app/layout.tsx` sets before paint. No JS, no hidden state. Anything already on screen at mount reveals immediately instead of waiting for an observer that a hidden document never fires. |
| 2 | **The WebGL hero leaked animation loops.** The re-entry guard set `active = true` and then back to `false` in the same synchronous block, so it never guarded anything. Every scroll in and out of view started another `requestAnimationFrame` loop while `cancelAnimationFrame` only ever cancelled the newest. | `components/site/WaterHero.tsx`, previous `animate()` | Single loop with a real `running` flag, started and stopped by the intersection observer. |
| 3 | **The filtration animation had already finished before anyone scrolled to it.** `scrollTrigger: undefined` was passed to GSAP, so ScrollTrigger was never registered. The tween ran on mount, roughly two screens above where the diagram sits. | `components/site/FiltrationStory.tsx`, previous `useEffect` | The fill now starts when the diagram enters the viewport, and the stage sequence is explorable by click and keyboard rather than watched. |
| 4 | **The active navigation state never appeared on any page.** `usePathname()` returns `/products`; the nav data held `/products/`. The comparison never matched, so the blue current-page underline was dead CSS on all 18 routes. | `SiteChrome.tsx`, `.desktop-nav > a[aria-current="page"]` | Paths are normalised before comparing, and every internal href across the site is now slash-free, matching the canonicals and the sitemap. |
| 5 | **One video was published twice under two invented titles.** `aquamantrafilters3.mp4` and `4.mp4` are byte-identical at 8,193,996 bytes. They were labelled "Equipment detail" and "Site installation", both titles invented. | `curl -sI` on both URLs; matching MD5 of the first 2 MB | Four clips, numbered `Video 01` to `Video 04` until the client supplies real titles. The reason the fifth was dropped is recorded on the page. |
| 6 | **`/videos/` had no route into the site.** The page existed but appeared in no navigation. | Header nav data | Added under a new "Results" group with Installations and Customer reviews. |

## The hero

The delivered hero was a full-bleed WebGL plane running three summed sine waves under a dark scrim, with a decorative ring reading "3-stage / whole-home flow". Rendered, it was a soft blue-to-teal gradient wash: the most recognisable machine-made hero there is, and it could have belonged to any water brand. Meanwhile the 24 authentic installation photographs, the only thing on the site a competitor cannot copy, were desaturated to 82% and buried in a four-up strip near the bottom.

What changed:

- **Light ground.** Every competitor in Australian whole-house filtration opens on dark blue. Opening on the paper tone is the cheapest available distinction and it lets the headline set in Newsreader carry the page.
- **The real installed system is the hero image.** `install-18.jpg`: the stainless enclosure, three pressure gauges, copper pipework, mulched garden bed, Perth sky. Full saturation, no treatment.
- **The water is real water, and it is not behind the copy.** The caustic shader now renders into the navy panel *around* the photograph, so the live water frames the evidence instead of distorting it. The shader is an iterative caustic field, not a gradient, and the pointer sends a ripple through it. Cell size is derived from `gl_FragCoord` so the pattern holds its scale however narrow the frame gets.
- **The picker is the site's argument, made operable.** The brief's thesis is that a system should answer a specific concern. Choosing one of the four rows swaps the answer line and carries the concern to `/contact-us?concern=…`, where the consultation form names it back and pre-fills the message. It is the first screen and it already does something.
- **Removed:** the decorative ring, the dark scrim, the gradient.

## Interactions

| Area | Before | After |
|---|---|---|
| Filtration story | A decorative SVG squiggle with four numbered circles and four cards, animated once on mount | A cross-section of the actual three-stage housing: three cartridges with distinct media textures (pleated, granular, banded), the pressure gauges that are on the real unit, and water drawn as four separate runs so it visibly clarifies from untreated olive at the inlet to clear aqua on the way to the house. GSAP fills it once on entry; after that it is a keyboard-navigable tablist. |
| Gallery | A static grid, despite the media plan specifying "gallery image reveal and accessible lightbox state" | A real lightbox: `role="dialog"`, focus moved in and restored on close, Tab trapped, arrow keys between photographs, Escape to close, background scroll locked. Framer Motion drives its enter and exit, which is where that library earns its weight. |
| Section reveals | Every section did the same 18 px fade-up, and the SSR problem above | CSS-driven, safe without JS, with a stagger variant for list content so a four-row list does not arrive as one block |
| Consultation form | Errors were rendered with an id nothing referenced; the two selects were validated but never marked invalid; focus stayed on the submit button after a failed submit | `aria-describedby` wired, `aria-invalid` on every validated control, focus moves to the first field that needs attention, and a skeleton with real dimensions covers the Suspense boundary |
| Navigation | A bare `<details>` element for Locations, no outside-click or Escape handling, and `aria-controls` pointing at an element that only existed while the menu was open | Two grouped menus with Escape, outside-click and blur handling; the mobile panel is always in the DOM so `aria-controls` always resolves, and it locks background scroll while open |

## Anti-slop pass

| Tell | Where it was | Change |
|---|---|---|
| Three feature cards in a row, icon plus bold title plus grey line | The trust band under the hero | Four asymmetric cells: a label cell and three numbered commitments, no icons |
| The same icon repeated four times | `<Drop />` on all four process steps | Icons removed; the steps are a timeline with a rule and a marker per step, which is what a process actually looks like |
| Four cards in a row | The filtration stage cards | Replaced by the tablist, one panel at a time |
| Desaturated photography | `filter: saturate(.85)` on the proof strip and gallery | Removed. The proof strip is also now asymmetric and ordered as the job runs: kit delivered, pipework, finished enclosure, cartridges |
| Purple on black | `#8e51ff` and `#ad46ff` in the untouched shadcn starter dark palette | 42 lines of dead starter CSS removed |
| Glassmorphism, `rounded-2xl`, heavy shadows | `StarterArchive`, a dead scaffold exported but never rendered in `app/page.tsx` | Removed |
| No loading states | Nothing acknowledged any wait | Skeleton for the consultation form with the real field dimensions |

## Accessibility and layout

- Seven text-contrast failures were the same near-identical grey repeated six times. All replaced with one token, `#5a7078`, at 4.90:1 on the paper background.
- Control boundaries raised to 3:1: form fields and the secondary button border to `#7b939b`, the focus ring to `#0f8cb6`.
- Every link and button now clears 44 px at 390 px wide. Verified: 13 routes scanned, zero targets under 44 px.
- No horizontal overflow across 13 routes at 360, 390, 768, 1024 and 1440 px.
- The guides grid was collapsing to one column only at 760 px, leaving an 87 px text column beside a fixed 210 px image at tablet width. It now collapses at 1050 px.
- `.principle-list` and `.two-column-list` kept desktop `min-height` and heading offsets on mobile, leaving large empty blocks. Both reset at the phone breakpoint.

## Content

Client-verification notes had become body copy and section headings. `/gallery/` repeated "City, system and property details pending" under all 24 photographs; `/about-us/` had a Credentials section whose four cards each said the credential was missing; all four guides carried a "What Aqua Mantra still needs to verify" heading. A customer reading the site was told, repeatedly, that nothing was confirmed.

Every one of those notes still exists and none lost its substance. They now render in a `ReviewNote` block that is visibly an annotation, once per section rather than once per item, with customer-facing copy written in their place. `/google-review/` was restructured to lead with the three themes that repeat across the reviews, with the attribution caveat in one note and a labelled slot for the Google Business Profile URL the client must supply.

Also: `BreadcrumbList` schema moved inside the `Breadcrumbs` component so it cannot drift from what is rendered, `Article` schema added to the four guides, alt text rewritten for all 37 images against the actual photographs, heading levels corrected on four routes, and `og:image` added.

## Hosting

Both versions are on Cloudflare Pages so the change can be judged rather than described:

- **Current:** https://aqua-mantra-redesign.pages.dev (`scripts/deploy-static.sh` builds and publishes it)
- **Before this pass:** https://aqua-mantra-v1.pages.dev (commit `1d27f6e`, built as-is apart from static-export plumbing)

A quick way to see the most serious defect: `curl -s https://aqua-mantra-v1.pages.dev/ | grep -o 'opacity:0' | wc -l` returns 8. The same command against the current build returns 0.

GitHub Pages was the original request and is not available: the repository is private and the account's plan does not serve Pages from private repositories. Making it public would put the client's logo, phone number, email, address and 24 installation photographs on a public URL, which is the client's call and not ours.

The site remains `noindex` with `Disallow: /`. Both now read one variable, `SITE_LIVE`, so launch is a single environment change rather than two hand-edits in two files.

## Still open, and still the client's to answer

Unchanged from `08-preflight-report.md`: WaterMark certificate numbers and covered components, plumber licence details per state, product specifications and reduction evidence, warranty terms and owner, confirmed suburb-level coverage, whether commercial properties are supported, installation pricing, the legal entity and ABN, permission to publish each review, photograph and video, the Google Business Profile URL, real video titles and transcripts, and legally reviewed privacy and terms copy.

Two new ones from this pass:

- The form still sends nothing. It needs an approved destination, server-side validation, spam handling, a retention policy and consent wording before it goes anywhere public.
- The five videos are hot-linked from `aquamantrafilters.com.au/wp-content/uploads/`. They load today, but they are on the client's WordPress install and will break the day it changes. Host local copies before launch.
