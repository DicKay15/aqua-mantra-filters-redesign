# Website preflight report

Verdict: **Ready as a publicly accessible stakeholder-review build. Not ready for indexed commercial launch.**

The redesign is complete and the implemented review experience passes the available route, build, browser, responsive, form, console, SEO, accessibility-code and dependency checks. The remaining blockers are business, evidence and legal inputs that cannot be safely invented in code.

| Issue | Severity | Why it matters | Evidence | Recommended fix | Status |
|---|---|---|---|---|---|
| Certification and product performance details are unverified | High | Unsupported water-treatment claims can mislead buyers | Current-site audit and missing product documentation | Client supplies certificate numbers, covered products, test data and approved wording | Needs human input |
| State plumber-licence details are unverified | High | Installation trust and legal presentation depend on accurate credentials | Current-site claims do not expose licence details | Client supplies licence holder/details per service state | Needs human input |
| Privacy, terms and form-consent wording are not approved | High | Contact forms collect personal and property information | Current site has no visible policy links | Obtain appropriate Australian legal review and publish approved text | Needs human input |
| Warranty, service coverage and response-time claims are unverified | Medium | Buyers need clear operational expectations | Current pages omit or generalise these details | Client confirms warranty owner, duration, exclusions, areas and response times | Needs human input |
| Contact form is intentionally disconnected | High | A public form needs an approved destination, privacy process and operational owner | Form clearly states review-only mode and retains no submitted data | Approve destination, server-side validation, spam controls, retention, consent and response process | Needs human input |
| Review excerpts and video descriptions need source approval | Medium | Proof must remain accurate and attributable | Reviews and videos are explicitly marked as pending verification | Approve exact Google source link, excerpts, names/dates, video titles, captions and transcripts | Needs human input |
| Public indexation is disabled | Medium | Search engines cannot index the stakeholder-review build | Global metadata uses `noindex`; robots disallows `/` | Enable index/follow and production robots only after public-launch approval and evidence/legal conditions pass | Needs human input |
| Three.js library is a 512 KB lazy chunk | Low | WebGL can be costly on low-power devices | Build chunk report; module is dynamically imported only by the hero | Keep lazy loading, pixel-ratio cap, offscreen pause and static reduced-motion fallback; validate field data after public launch | Fixed with mitigation |

## Fixed and verified findings

| Issue | Severity | Evidence | Status |
|---|---|---|---|
| Missing semantic page hierarchy | High | Browser audit of 18 routes found exactly one H1 and a main landmark on each | Fixed |
| Missing titles/descriptions/canonicals | High | Browser audit confirmed unique title, description and self-consistent canonical for all 18 routes | Fixed |
| Thin or missing route content | Medium | All 11 required routes plus Guides, four articles, Privacy, Terms and 404 render | Fixed |
| Weak navigation and hidden review/location paths | Medium | Desktop grouped navigation, mobile disclosure menu and complete footer verified | Fixed |
| Contact form semantics and states | Medium | Empty submit produced six field errors; valid test data produced a clear success state without transmitting data | Fixed |
| Malformed phone action | Medium | Header/footer/contact use `tel:+61450864647` | Fixed |
| Gallery privacy metadata | Medium | 24 site-used copies were re-encoded without GPS EXIF; raw downloads are ignored | Fixed |
| Missing gallery context | Medium | Authentic photos are labelled as real work and unverified city/system details are not fabricated | Fixed with client-caption condition |
| Heavy eager video loading | Medium | Five existing videos use `preload="none"`, controls and poster images | Fixed with caption/transcript condition |
| Motion accessibility | Medium | CSS, Three.js and Framer Motion respect reduced motion; SVG stages remain visible as semantic ordered content | Fixed |
| Dependency advisories | Critical | `npm audit --omit=dev --audit-level=high` returned zero vulnerabilities after safe updates and Next.js 16.3.4 patch | Fixed |
| Browser console errors | Medium | Representative Home, Products, Gallery and Contact testing returned no warnings/errors | Fixed |
| Broken routes | High | All required final routes returned 200; invalid route returned 404; sitemap and robots returned 200 | Fixed |
| Horizontal overflow | Medium | Automated DOM checks across all routes and representative breakpoints reported no overflow | Fixed |

## Verification performed

- `npm run lint`: pass.
- `npm run build`: pass after dependency patches.
- Production dependency audit: zero known vulnerabilities.
- All 18 content/legal routes: title, description, canonical, one H1, main landmark, footer and no horizontal overflow.
- Sitemap and robots endpoints: successful.
- Invalid-route response: 404.
- Mobile menu: accessible expanded/collapsed state and complete navigation.
- Contact form: empty validation, preserved input model and success simulation.
- Visual inspection: Home at desktop/mobile, Products desktop and Gallery tablet.
- Console: no errors or warnings in representative browser journey.
- Generated imagery: no visible text, logos, watermarks, anatomical problems or unsupported claims.
- Real installation imagery: dimensions reserved; metadata-stripped proof copies used.
- Private deployment: published successfully; authenticated production smoke tests returned 200 for every required route, all four guides, sitemap and robots, with 404 for an invalid route.

## Not applicable in this review build

- Authentication, accounts, permissions, payments, uploads and user-owned data: not part of the requested marketing site.
- Live email/CRM submission: deliberately not connected before privacy and operational approval.
- Analytics/cookie consent: no analytics or advertising scripts were added.
- Ecommerce checkout: current cartridge prices are presented for context, but no purchase or payment flow was requested or invented.
- Field Core Web Vitals: requires a stable public origin and real-user data. Lab-oriented layout/performance safeguards are implemented.

## Launch decision

The implementation is suitable for review through its public URL, but is intentionally excluded from search indexing. Indexed commercial launch remains blocked until Aqua Mantra supplies and approves the certification, licence, product evidence, warranty, coverage, proof attribution, form/privacy and legal inputs listed above. After those inputs are integrated, re-enable indexation, connect the form, run a final assistive-technology check and repeat the production preflight.
