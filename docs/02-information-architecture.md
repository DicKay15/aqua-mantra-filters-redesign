# Proposed information architecture and user flow

## Primary customer flow

```text
Water concern
  -> Understand the issue
  -> Compare suitable systems
  -> See evidence and real installations
  -> Understand assessment and installation
  -> Book a free consultation
  -> Receive ongoing maintenance support
```

## Primary navigation

```text
Home
Systems
  Whole-house systems
  Replacement filters
How it works
  Supply and installation
  Maintenance and replacements
Locations
  Perth
  Sydney
  Adelaide
Results
  Customer reviews
  Installations
  Videos
Guides
About
Book a free consultation
```

## Route map

| Route | Role in the journey | Primary action |
|---|---|---|
| `/` | Orient, educate, build trust and route visitors | Book a free consultation |
| `/products/` | Compare systems and replacement filters | Ask which system suits my home |
| `/services/` | Explain the end-to-end service and aftercare | Book an assessment |
| `/perth-water-filtration/` | Answer Perth-specific intent | Get Perth advice |
| `/sydney-water-filtration/` | Answer Sydney-specific intent | Get Sydney advice |
| `/adelaide-water-filtration/` | Answer Adelaide-specific intent | Get Adelaide advice |
| `/gallery/` | Show authentic installations | Discuss an installation |
| `/videos/` | Demonstrate product, installation and maintenance | Talk to an installer |
| `/google-review/` | Reduce trust anxiety with sourced customer proof | Book a consultation |
| `/about-us/` | Explain the company, principles and credentials | Meet the team / contact |
| `/contact-us/` | Capture a qualified consultation request | Send consultation request |
| `/guides/` | Build topical authority and self-education | Read a guide / ask for advice |
| Four guide routes | Answer specific search questions | Explore suitable system |
| `/privacy-policy/` | Explain data handling | None |
| `/terms/` | Explain terms of site/service use | None |

## Homepage content order

1. Minimal navigation and visible call option.
2. Interactive water hero with clear promise, three-city service cue and consultation CTA.
3. Compact verified trust strip.
4. Concern-led education: taste/odour, sediment, scale/hardness and household use.
5. System chooser: “I know what I need” and “Help me choose.”
6. Animated three-stage filtration story.
7. Assessment-to-aftercare service process.
8. Perth, Sydney and Adelaide location paths.
9. Authentic installation proof.
10. Sourced review excerpts.
11. Four guide previews.
12. Objection-handling FAQ.
13. Final consultation CTA and complete footer.

## Navigation behaviour

- Desktop uses restrained grouped dropdowns with descriptive links.
- Mobile uses an accessible disclosure menu, not a hidden hover interaction.
- A skip link appears before navigation.
- Current-route state is visible without relying on colour alone.
- Primary CTA remains visible but does not cover content.
- Phone uses `tel:+61450864647`.

## URL and migration rule

Keep all supplied URLs unchanged in the redesign. New grouping changes labels and relationships, not established paths. If a later production migration changes any URL, create explicit one-to-one permanent redirects and verify them.

