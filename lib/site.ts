export const siteUrl = "https://aquamantrafilters.com.au";

export const contact = {
  phoneDisplay: "0450 864 647",
  phoneHref: "tel:+61450864647",
  email: "aquamantra25@gmail.com",
  emailHref: "mailto:aquamantra25@gmail.com",
  whatsapp: "https://wa.me/61450864647",
  address: "64 Banrock Drive, Ellenbrook WA 6069",
};

export const routes = [
  "/",
  "/about-us",
  "/products",
  "/perth-water-filtration",
  "/sydney-water-filtration",
  "/adelaide-water-filtration",
  "/services",
  "/gallery",
  "/videos",
  "/contact-us",
  "/google-review",
  "/guides",
  "/guides/perth-hard-water-filtration-vs-softening",
  "/guides/sydney-tap-water-chlorine-taste-filtration",
  "/guides/adelaide-water-quality-home-filtration-guide",
  "/guides/how-often-replace-whole-house-water-filters",
  "/privacy-policy",
  "/terms",
];

/**
 * The four concerns the site is organised around. The hero picker, the homepage
 * concern list and the consultation form all read from this one list so the
 * visitor's answer survives the journey to the form.
 */
export const concerns = [
  {
    id: "taste",
    n: "01",
    label: "Taste and odour",
    short: "Taste and odour",
    answer: "Then the question is which carbon stage has verified evidence behind it, and whether the whole house needs treating or one tap does.",
    detail:
      "We ask what you notice, when you notice it, and at which taps. That points to whether a carbon stage is the right answer for the whole property or whether one outlet is doing the complaining.",
  },
  {
    id: "sediment",
    n: "02",
    label: "Visible sediment",
    short: "Visible sediment",
    answer: "Then we start at the inlet: what is entering the property, and whether a pleated first stage is doing enough on its own.",
    detail:
      "We look at the water source, the age of the service line and what the meter side of the property looks like, because a pleated stage that is sized wrong just blocks more often.",
  },
  {
    id: "scale",
    n: "03",
    label: "Scale and hardness",
    short: "Scale and hardness",
    answer: "Then the first job is separating scale management from true softening. They are different processes with different outcomes.",
    detail:
      "We check what you actually want to change: the marks on glassware and fittings, or the water chemistry itself. Those two goals lead to different equipment and different running costs.",
  },
  {
    id: "every-tap",
    n: "04",
    label: "Every tap in the house",
    short: "Whole-home coverage",
    answer: "Then it is a flow, space and maintenance question before it is a product question. Household demand sets the system size.",
    detail:
      "We size around the number of bathrooms, peak simultaneous demand and where the system can physically sit, then work back to what fits the space and the maintenance you are willing to do.",
  },
] as const;

export type ConcernId = (typeof concerns)[number]["id"];

export type LocationKey = "perth" | "sydney" | "adelaide";

export const locations: Record<LocationKey, {
  city: string;
  eyebrow: string;
  title: string;
  intro: string;
  context: string;
  source: { label: string; href: string };
  concerns: { title: string; text: string }[];
  guide: string;
}> = {
  perth: {
    city: "Perth",
    eyebrow: "Whole-house filtration in Perth",
    title: "A clearer way to choose filtration for your Perth home",
    intro: "Your postcode, water source and priorities matter. We start there, then recommend a whole-house setup that fits the property rather than selling a standard package.",
    context: "Water hardness and aesthetic characteristics can vary across Western Australia. Filtration, scale management and true softening are different processes, so the right recommendation depends on the result you want.",
    source: { label: "Water Corporation: hard water guidance", href: "https://www.watercorporation.com.au/Help-and-advice/Water-issues/Water-quality/Hard-water" },
    concerns: [
      { title: "Taste and odour", text: "Discuss chlorine taste or odour and whether verified carbon filtration is suitable." },
      { title: "Sediment", text: "Understand visible particles, inlet conditions and the role of a sediment stage." },
      { title: "Scale", text: "Separate scale management from hardness removal before choosing equipment." },
      { title: "Whole-home use", text: "Plan flow and placement for taps, showers and appliances across the property." },
    ],
    guide: "/guides/perth-hard-water-filtration-vs-softening",
  },
  sydney: {
    city: "Sydney",
    eyebrow: "Whole-house filtration in Sydney",
    title: "Filtration matched to your Sydney water and home",
    intro: "We help Sydney homeowners move from a general concern about taste, odour or sediment to a system recommendation grounded in the property and the available product evidence.",
    context: "Sydney Water describes the supplied water as filtered, monitored and safe to drink. For many households, filtration is therefore about preference, whole-home convenience and specific aesthetic concerns rather than fear-based claims.",
    source: { label: "Sydney Water: water analysis", href: "https://www.sydneywater.com.au/water-the-environment/how-we-manage-sydneys-water/safe-drinking-water/water-analysis.html" },
    concerns: [
      { title: "Disinfectant taste", text: "Explore verified carbon-stage options for chlorine-related taste and odour." },
      { title: "Property conditions", text: "Consider plumbing, pressure, household demand and installation space." },
      { title: "Sediment", text: "Discuss whether a pleated first stage suits the visible concern and inlet conditions." },
      { title: "Maintenance", text: "Choose a setup with clear cartridge compatibility and an aftercare plan." },
    ],
    guide: "/guides/sydney-tap-water-chlorine-taste-filtration",
  },
  adelaide: {
    city: "Adelaide",
    eyebrow: "Whole-house filtration in Adelaide",
    title: "Start with your Adelaide postcode, source and priorities",
    intro: "Adelaide water characteristics can vary with supply source and location. We use the home, the local profile and the customer's goals to shape the recommendation.",
    context: "SA Water provides postcode-level drinking-water profiles because source and treatment can vary. A useful consultation begins with that local information, then considers taste, odour, scale and the system's verified capabilities.",
    source: { label: "SA Water: your drinking-water profile", href: "https://www.sawater.com.au/water-and-the-environment/safe-and-clean-drinking-water/your-drinking-water-profile" },
    concerns: [
      { title: "Local variation", text: "Check the current postcode profile rather than making a citywide assumption." },
      { title: "Taste and odour", text: "Match the concern to tested carbon-stage performance where evidence exists." },
      { title: "Scale context", text: "Clarify whether the goal is scale management or actual hardness removal." },
      { title: "Ongoing support", text: "Plan replacement filters and servicing as part of the initial recommendation." },
    ],
    guide: "/guides/adelaide-water-quality-home-filtration-guide",
  },
};

export const guides = [
  {
    slug: "perth-hard-water-filtration-vs-softening",
    location: "Perth",
    title: "Perth hard water: filtration, scale management and softening",
    summary: "Three different treatment ideas are often grouped together. Here is what each one means before you choose a system.",
    image: "/images/generated/filtration-media-macro.webp",
  },
  {
    slug: "sydney-tap-water-chlorine-taste-filtration",
    location: "Sydney",
    title: "Sydney tap water, chlorine taste and whole-house filtration",
    summary: "How Sydney water is treated, why taste or odour can still be noticed, and where verified carbon filtration may fit.",
    image: "/images/generated/kitchen-water-moment.webp",
  },
  {
    slug: "adelaide-water-quality-home-filtration-guide",
    location: "Adelaide",
    title: "Adelaide home filtration: choose by source, suburb and goal",
    summary: "A practical way to use the local water profile, the property and the household's priorities to begin the decision.",
    image: "/images/generated/shower-water-detail.webp",
  },
  {
    slug: "how-often-replace-whole-house-water-filters",
    location: "Maintenance",
    title: "How often should whole-house filters be replaced?",
    summary: "Why there is no universal interval, which signs matter and what to confirm in the product documentation.",
    image: "/images/current/three-stage-filter.jpeg",
  },
];

export const reviews = [
  { quote: "Great value and a straightforward explanation of the available options.", theme: "Advice and value" },
  { quote: "The installation was handled professionally and the team was easy to deal with.", theme: "Installation" },
  { quote: "Helpful service without the hard sell.", theme: "Service" },
];

/**
 * The distinct video files published on the current Aqua Mantra website.
 *
 * File 4 is deliberately excluded. `aquamantrafilters4.mp4` and
 * `aquamantrafilters3.mp4` are the same recording: both are 8,193,996 bytes and
 * the leading two megabytes hash identically. Publishing both would present one
 * clip as two separate pieces of evidence, which the brief does not allow.
 */
export const videoUrls = [
  "/videos/installation-prep.mp4",
  "/videos/property-pipework.mp4",
  "/videos/completed-system.mp4",
  "/videos/site-preparation.mp4",
];
