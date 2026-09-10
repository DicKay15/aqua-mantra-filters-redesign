# V2 redesign: water through the home

## User feedback captured

- Rebuild the experience as a genuinely new version, not a cosmetic variation.
- Study Water Analytics for its large section sizing, strong page rhythm and consistent use of images and video.
- Do not copy its design language or assets.
- Reduce visible copy and let media explain more of the story.
- Remove the unexplained circular visual in the hero.
- Remove the upper hero visual layer; retain the lower water-caustic atmosphere.
- Replace decoration with a business-specific SVG animation.
- Add meaningful, enjoyable interactions throughout the page.
- Use generated or responsibly sourced stock media where authentic Aqua Mantra media is unavailable.
- Keep the homeowner audience and the reasons they continue scrolling central to every section.
- Create distinctive sections rather than repeating cards and standard split layouts.
- Continue testing, fixing and retesting until the result is stable.

## Reference analysis

Water Analytics works because it treats the homepage as a sequence of large visual chapters. Full-bleed water, dark-to-light transitions, alternating editorial splits, product media and muted video create a cinematic pace. Its strongest sections explain one idea per viewport. Its weaknesses are repeated 50/50 layouts, long generic copy, too many looping videos, fragmented calls to action and technical claims that are not always visibly tied to evidence.

V2 adapts these industry mechanics:

- one idea per chapter;
- generous 75–100vh section sizing where the visual earns it;
- authentic installation footage used as proof;
- lifestyle imagery used only for atmosphere;
- a consistent primary action;
- motion that explains the system.

V2 does not copy the reference's centred hero typography, black-and-white sequence, university/award presentation, footage, campaign graphics or exact section layouts.

## Audience and retention logic

Primary audience: homeowners in Perth, Sydney and Adelaide considering a professionally installed whole-house system.

They continue because the site quickly answers:

1. Does this cover the whole house?
2. How does water move through the system?
3. Which everyday moments may feel different?
4. What does real installation involve?
5. Is the advice relevant to my city and property?
6. What is the next low-pressure step?

## Emotional direction

The experience should feel calm, assured and quietly premium. Homeowners are considering permanent plumbing work, so confidence comes from clarity, real proof and an understandable process rather than technical theatre or fear-led claims.

## Homepage flow

1. `Filtered water. Every tap.` Single-layer water hero with an interactive house-and-pipe SVG.
2. `Water, where life happens.` Expanding image triptych for kitchen, shower and whole-home use.
3. `Three stages. One continuous path.` Interactive system-stage explanation.
4. `Real work. No showroom.` Authentic vertical installation films.
5. `Designed around where you live.` Interactive Perth, Sydney and Adelaide selector.
6. `From ground to flowing.` Horizontal visual installation story using real job photography.
7. `Useful answers, visually told.` Compact guide rail.
8. `Start with the postcode.` Direct conversion section.

## Interaction system

- Hero water pulse travels from street supply through APF, SCF and CCF stages to kitchen, shower, laundry and garden.
- Outlet controls are keyboard accessible and isolate the relevant pipe route.
- System stage controls expand the selected cartridge and animate only the relevant water path.
- Lifestyle panels expand on hover, focus or tap to show one sentence.
- Installation films play muted inline and pause when offscreen; reduced-motion users receive posters.
- City controls update one sourced local insight, image and route.
- Installation proof uses a horizontal scroll rail with explicit previous/next controls.
- Motion is never required to access copy or navigation.

## Media rules

- Real Aqua Mantra installation images and videos are proof.
- Generated lifestyle imagery is labelled illustrative and never placed as customer evidence.
- Current installation footage is self-hosted for reliability.
- No stock or generated product representations.
- No city label is attached to installation proof until the client verifies the actual location.
- No visual contaminant-removal or health claim is invented.

## Success checklist

- [x] Hero contains only the retained water atmosphere and meaningful SVG.
- [x] No unexplained orb, circle, extra shader or decorative 3D object.
- [x] Home page uses less copy than V1 while preserving crawlable headings, captions and links.
- [x] At least one useful interaction appears in the first viewport.
- [x] At least three section silhouettes are visibly distinct.
- [x] Real imagery and video recur throughout the page without overwhelming performance.
- [x] All interactions work by keyboard and touch.
- [x] Reduced-motion and no-script fallbacks remain understandable.
- [x] All existing routes remain available.
- [x] Lint, production build, route, accessibility-code and interaction checks pass.
- [x] Anti-slop review passes: no glassmorphism, radial gradients, arbitrary floating objects, generic card grids, pure-white canvas or decorative Three.js remains on the homepage.
- [x] Public-host smoke tests pass after V2 deployment.

## Generated V2 image record

Mode: built-in image generation, photorealistic-natural. The WebP is the production asset; the PNG is retained as the editable master.

- `public/images/generated/v2-whole-home-water-use-sequence.webp`
- `public/images/generated/v2-whole-home-water-use-sequence.png`

Exact prompt:

```text
Use case: photorealistic-natural
Asset type: wide in-page editorial sequence for a premium Australian whole-home water filtration website; atmospheric lifestyle image, never product or installation proof
Primary request: create one coherent panoramic editorial image showing four quiet water-use moments within the same believable contemporary Australian home: a kitchen tap filling a clear drinking glass, clean water falling from a modern shower, a close laundry water detail beside a practical washing machine, and a garden tap running gently outdoors
Scene/backdrop: all four moments belong to one restrained Australian home with consistent architecture, materials, daylight and styling; present them as a refined cinematic four-moment sequence with subtle visual transitions, not a loud boxed collage
Subject: clear water in ordinary everyday household use; a natural hand may appear only if essential to hold the glass, but no identifiable person, face or body
Style/medium: premium photorealistic architectural lifestyle photography, believable and understated rather than glossy advertising
Composition/framing: wide 16:9; four clearly readable moments flowing left to right; balanced rhythm; preserve generous safe crop space around the outer edges and central subjects so desktop and mobile crops remain usable; no important tap, glass, shower head, laundry detail or garden tap cut off
Lighting/mood: consistent soft natural daylight, calm, fresh and lived-in
Color palette: pale stone, light timber, brushed metal, garden green and a restrained mineral-blue accent
Materials/textures: honed stone, brushed stainless steel, clear glass, cotton laundry textile, natural foliage and physically plausible clear water
Constraints: no identifiable people or faces; no text, logos, labels, watermarks or visible brands; no water filters, filtration systems or product housings; no luxury mansion styling; no laboratory cues; no dramatic sparkle; no before-and-after implication; no health, purity or performance claims
Avoid: split-screen borders, hard collage dividers, repeated fixtures, distorted plumbing, duplicate objects, impossible water flow, excessive blue tint, artificial CGI sheen
```

## V2 verification record

- `npm run lint`: passed.
- `npm run build`: passed.
- Production dependency audit: zero known vulnerabilities.
- All 18 required routes: HTTP 200 in the local preview.
- New self-hosted video and generated WebP: HTTP 200 with correct media types.
- Browser structure: one H1, semantic main, labelled tabs, SVG title/description and labelled media.
- Hero outlet selection: kitchen, shower, laundry and garden states update correctly.
- Stage selector: active cartridge, description and selected state update correctly.
- City selector: local summary, route and crop update correctly.
- Reduced-motion stylesheet disables animation and preserves readable states.
- Public deployment: `https://aqua-mantra-filters-v2.dhrumil-kherde.workers.dev`.
- Public smoke test: all 18 required routes plus robots and sitemap return HTTP 200; an invalid route returns 404.
