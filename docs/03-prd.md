# Product requirements document

## Product

Aqua Mantra Filters marketing, education and consultation website redesign.

## Audience

- Homeowners in Perth, Sydney and Adelaide.
- People researching whole-house filtration for taste, odour, sediment, scale or household-use concerns.
- Existing customers who need replacement filters, maintenance help or warranty/support information.

## Jobs to be done

- Help me understand what a whole-house system does and whether it suits my home.
- Help me compare Aqua Mantra's systems without technical overload.
- Show me trustworthy evidence, real installations and customer experiences.
- Explain what assessment, installation and aftercare involve.
- Let me contact Aqua Mantra quickly in the channel I prefer.
- Help me maintain an installed system and find compatible replacement cartridges.

## Functional requirements

### Global

- Responsive header, grouped navigation, mobile menu and complete footer.
- Route-specific metadata, canonical URLs, Open Graph fields and structured data where eligible.
- Accessible skip link, landmarks, headings, focus states and reduced-motion handling.
- Reusable consultation CTA, call link and WhatsApp link.
- Static content works without WebGL and remains readable if enhanced motion fails.

### Home

- Original Three.js water/refraction hero with static fallback.
- System overview and guided-selection entry point.
- Code-native interactive filtration visualization.
- Installation/aftercare process.
- City paths, real installation gallery, authentic review excerpts, guide previews and FAQ.

### Products

- Whole-house systems and replacement filters in separate sections.
- Verified attributes only. Unknown technical fields use “Confirm with Aqua Mantra,” never invented values.
- Clear installed-system consultation and cartridge purchase/contact paths.
- Compatibility and maintenance guidance where verified.

### Locations

- Unique Perth, Sydney and Adelaide content.
- Local concern framing with careful caveats and authoritative sources.
- Relevant systems, service flow, proof, coverage placeholders and FAQs.
- No city-name swapping or doorway-page copy.

### Services

- Assessment, recommendation, delivery, installation, handover and aftercare stages.
- Service-scope and timing placeholders marked for business confirmation.
- Interactive process visualization with semantic text equivalent.

### Results

- Gallery uses the existing authentic installation assets.
- Reviews use only source-backed review content.
- Videos load on demand and include title, purpose and transcript/caption requirement.

### Contact

- Name, email, phone, postcode, city, water source, property type, interest and message.
- Programmatic labels, required-state communication and clear validation.
- Loading, success and error feedback without losing entered data.
- Privacy context and policy link.
- No live external submission until destination, consent wording and privacy policy are approved.

### Guides

- Resource index plus four complete articles.
- Each article has useful headings, summary, related links, source notes and relevant consultation CTA.

## Content requirements

- Australian English and calm, precise language.
- No absolute purity, cure, “removes all,” or unsupported health claims.
- “Designed to reduce” language only when matched to verified product evidence.
- Distinguish authentic installations from generated illustrative lifestyle imagery.
- No fake statistics, case outcomes, customer identities, awards or certifications.

## Interaction requirements

- GSAP powers the filtration/process timeline and selected scroll choreography.
- Framer Motion powers route/section transitions, menu state and restrained component feedback.
- Three.js powers the responsive water hero.
- No scroll-jacking, cursor hijacking, perpetual motion or animation that delays a CTA.
- Motion pauses offscreen where practical and degrades on low-power/reduced-motion conditions.

## Non-functional requirements

- Mobile-first responsive behaviour at representative 360, 768, 1024 and 1440 px widths.
- WCAG 2.2 AA target for implemented code; human assistive-technology verification remains recommended.
- Good Core Web Vitals target with a strict JavaScript and media budget.
- Progressive enhancement and graceful fallbacks.
- No exposed secrets or user data in client logs/URLs.
- All forms and external integrations documented before production connection.

## Success criteria

- Every required current route and four guide routes render correctly.
- Every route has one H1, title, description and canonical metadata.
- All primary navigation, CTA, phone and internal links work.
- Consultation form handles keyboard input, validation, success simulation and failure simulation.
- No console errors on tested core routes.
- No horizontal overflow at tested viewports.
- Interactive hero and process remain understandable in reduced-motion mode.
- Authentic gallery assets are metadata-stripped and responsively presented.
- Preflight returns “Ready with conditions” or better, with only genuine human-owned launch items open.

