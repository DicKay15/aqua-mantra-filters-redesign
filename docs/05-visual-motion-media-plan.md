# Visual, motion and media plan

## Visual thesis

**Engineered calm.** The experience combines the clarity and precision of a professionally installed home system with the softness and movement of clean water. It should feel premium and trustworthy without becoming clinical or visually loud.

## Brand direction

- Preserve the existing Aqua Mantra logo and blue brand recognition.
- Use deep mineral blue as the primary hue, pale cool stone as the canvas and a restrained clear-aqua accent.
- Use an off-white/cool-bone background instead of pure white.
- Typography should feel editorial and technical: a characterful display face paired with a clean, non-default body face.
- Use borders, spacing and strong composition before shadows.
- Use authentic installation photography as proof and generated imagery only as atmosphere/education.

## Image inventory and generation plan

All images are planned before generation. The final mix deliberately separates illustration from evidence.

| ID | Asset | Source | Placement | Purpose | Generation rule |
|---|---|---|---|---|---|
| IMG-01 | Water-caustic hero texture, wide | Generate | Home hero/WebGL fallback | Create the core “engineered calm” atmosphere | Abstract water only; no people, product, logo or text |
| IMG-02 | Australian kitchen water moment, wide | Generate | Home/about editorial section | Show everyday household use | Clearly illustrative; no fake customer or installer story |
| IMG-03 | Clean shower/water detail, portrait | Generate | Benefits/location editorial modules | Support skin/hair comfort context without medical claims | No brand, text or before/after claims |
| IMG-04 | Filtration media macro texture, square | Generate | Guide/product education | Give technical content a tactile visual | No labels or scientific claims embedded in image |
| AUTH-01 | Aqua Mantra logo | Existing client asset | Header/footer | Preserve brand identity | No generated replacement |
| AUTH-02 | Three-stage filter/product photo | Existing client asset | Products/home | Show real product | Do not alter product or imply unverified specifications |
| AUTH-03 to AUTH-26 | 24 installation photographs | Existing client gallery | Gallery/home/results | Prove real installation work | Metadata-stripped local copies; no invented captions/outcomes |
| VID-01 to VID-05 | Existing Aqua Mantra videos | Existing client site | Video library | Product/installation proof | Add titles/context/posters only after content is verified |

## Image prompts

### IMG-01: hero water texture

```text
Use case: stylized-concept
Asset type: full-width website hero texture and WebGL fallback
Primary request: a refined close-up of clear water caustics moving across pale mineral stone
Style/medium: premium photoreal editorial texture
Composition/framing: wide 16:9, quiet central field, subtle depth, no obvious horizon
Lighting/mood: natural refracted daylight, calm, clean, sophisticated
Color palette: mineral blue, clear aqua, cool bone
Constraints: no text, no logo, no people, no product, no bubbles covering the frame, no neon, no harsh gradient, no watermark
```

### IMG-02: kitchen household moment

```text
Use case: photorealistic-natural
Asset type: wide website editorial image
Primary request: a contemporary Australian kitchen with a hand filling a clear drinking glass from a normal tap
Style/medium: candid premium architectural lifestyle photography
Composition/framing: wide landscape, human presence limited to a natural hand and forearm, generous negative space
Lighting/mood: soft morning daylight, calm, lived-in, credible
Color palette: cool natural stone, pale timber, clear water, restrained blue accents
Constraints: no identifiable face, no visible brand, no text, no luxury excess, no exaggerated water sparkle, no watermark
```

### IMG-03: shower detail

```text
Use case: photorealistic-natural
Asset type: portrait editorial image for a water-comfort section
Primary request: close architectural detail of clean shower water falling through soft daylight in a modern Australian bathroom
Style/medium: premium editorial photography, tactile and realistic
Composition/framing: portrait, water and material detail, no person required
Lighting/mood: calm diffuse daylight, refreshing and understated
Color palette: cool stone, brushed metal, clear water
Constraints: no text, no logo, no medical or before-and-after implication, no excessive mist, no watermark
```

### IMG-04: filtration material macro

```text
Use case: scientific-educational
Asset type: square editorial image for filtration guides
Primary request: highly detailed macro still life of layered water-filtration materials, including pleated white filter media, dark activated carbon texture and clean mineral granules
Style/medium: precise studio macro photography
Composition/framing: square, layered diagonal composition with clear material separation
Lighting/mood: controlled soft studio light, technical, clean and trustworthy
Color palette: white, charcoal, mineral grey and restrained aqua reflection
Constraints: no labels, no text, no logo, no unsupported scientific diagram, no loose dust, no watermark
```

## Three.js hero

- Full-bleed water-caustic plane behind the hero copy.
- Pointer movement changes refraction very slightly; scroll shifts light direction and depth.
- Copy and CTA sit on a solid readable surface, not transparent glass.
- Cap pixel ratio, lazy-load the scene and pause when offscreen.
- If WebGL is unavailable, use IMG-01 with a light CSS transform only.
- With reduced motion, show a still image and no pointer reaction.

## GSAP filtration/process story

```text
Source water
  -> sediment stage
  -> scale/carbon stage
  -> coconut carbon stage
  -> whole-home distribution
```

- A single SVG flow line advances through the system while the relevant stage gains focus.
- The water tone becomes visually clearer as it moves, without implying laboratory results.
- Each stage exposes one verified function and has a semantic text equivalent.
- The sequence can be scrubbed by scroll on larger screens and advances in stacked blocks on mobile.
- Reduced-motion mode shows all stages without animation.

## Framer Motion use

- Route transition: short fade and 8 px vertical settle.
- Mobile navigation: controlled reveal and focus-safe exit.
- Section entrances: limited stagger for headings and one supporting element.
- Product comparison: selected state and details reveal.
- Gallery: image reveal and accessible lightbox state.
- Form: error/success feedback and confirmation transition.

## Video plan

- Do not create a decorative video merely to fill space.
- The existing five client videos are the priority because they can prove real work.
- Add poster image, title, purpose, duration, captions/transcript path and related CTA.
- Lazy-load video sources after user intent.
- A short muted hero loop is optional only if the client supplies authentic high-quality footage and a static fallback.
- A generated video is deferred because an invented installation scene would weaken trust.

