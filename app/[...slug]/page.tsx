import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Drop, Gauge, HouseLine, Phone, ShieldCheck, Wrench } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, ConsultationBand, JsonLd, PageHero, ReviewNote, SectionHeading } from "@/components/site/Blocks";
import { FiltrationStory } from "@/components/site/FiltrationStory";
import { GalleryLightbox } from "@/components/site/GalleryLightbox";
import { LeadForm } from "@/components/site/LeadForm";
import { MotionSection } from "@/components/site/MotionSection";
import { contact, guides, locations, reviews, routes, siteUrl, videoUrls, type LocationKey } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string[] }> };

/** Guides carry a single reviewed date, used in the byline and in Article schema. */
const GUIDE_REVIEWED = "2026-09-10";

/** Internal links are written without a trailing slash so nothing 308-redirects. */
const clean = (href: string) => (href.length > 1 ? href.replace(/\/+$/, "") : href);

const galleryPhotos = [
  ...Array.from({ length: 22 }, (_, i) => `install-${i + 1}.jpg`),
  "install-1-alt.jpg",
  "install-2-alt.jpg",
];

/**
 * Written from the photographs themselves. Each line describes what is visible
 * and nothing else: no suburb, no system model, no outcome, because none of
 * that has been confirmed by Aqua Mantra.
 */
const installAlt: Record<string, string> = {
  "install-1.jpg": "A trench dug through a garden bed beside a dark boundary fence, with a spade standing in the loose soil.",
  "install-2.jpg": "A technician in a hi-vis shirt crouching on a lawn beside three blue filter housings, with the stainless gauge frame set up behind him.",
  "install-3.jpg": "Three blue filter housings and a stainless mounting frame laid out on a lawn in front of a hedge, with tool cases waiting alongside.",
  "install-4.jpg": "The full kit laid out on the grass before fitting: three blue housings, the stainless cover panel, the gauge frame and open tool cases.",
  "install-5.jpg": "Three blue filter housings resting on the grass, with a bucket, a drill case and the stainless cover panel arranged behind them.",
  "install-6.jpg": "Three blue filter housings lined up on a lawn, brass fittings still bagged, the stainless frame and cover panel standing behind.",
  "install-7.jpg": "A technician kneeling on the grass working a length of copper pipe, with the stainless gauge frame and the blue housings beside him.",
  "install-8.jpg": "Hand tools, a pipe cutter and brass fittings spread across a lawn next to the stainless enclosure frame and the blue housings.",
  "install-9.jpg": "A technician leaning into a filter enclosure over an open trench beside a fence, with a spade standing in the soil.",
  "install-10.jpg": "The enclosure being fitted above an open trench in a garden bed, the technician working inside the housing bay.",
  "install-11.jpg": "Three blue filter housings standing on a lawn in front of the brushed stainless cover panel, which carries the Aqua Mantra logo and a QR code.",
  "install-12.jpg": "Three blue filter housings on the grass in front of the stainless cover panel, photographed before installation begins.",
  "install-13.jpg": "The stainless cover panel propped upright with three blue filter housings lying on the grass in front of it.",
  "install-14.jpg": "A technician working at a filter enclosure beside a driveway, with the trench still open in the garden bed.",
  "install-15.jpg": "A technician sitting on a lawn assembling copper pipe, with a pipe cutter, fittings and hand tools around him.",
  "install-16.jpg": "A technician marking and cutting copper pipe on the grass, the stainless panel and blue housings waiting behind.",
  "install-17.jpg": "A technician preparing a length of copper pipe on a lawn, hand tools laid out and the stainless panel propped behind.",
  "install-18.jpg": "An installed Aqua Mantra enclosure in a mulched garden bed, three pressure gauges across the top and copper pipework running down each side.",
  "install-19.jpg": "The finished stainless enclosure seen straight on, three pressure gauges along the top and copper pipework connected at both ends.",
  "install-20.jpg": "The completed enclosure in a mulched bed against a fence, its three pressure gauges and copper pipework in view.",
  "install-21.jpg": "The completed enclosure photographed at an angle, copper pipe rising into the housing on both sides.",
  "install-22.jpg": "The finished enclosure standing against a boundary fence with the roofline of the house behind it.",
  "install-1-alt.jpg": "Three replacement cartridges standing side by side against a wall: two carbon block filters and the blue antibacterial pleated PP filter.",
  "install-2-alt.jpg": "The three replacement cartridges stood upright against a wall, showing the printed label on each one.",
};

const altFor = (file: string) => installAlt[file] ?? "An Aqua Mantra whole-house filtration installation.";

const meta: Record<string, { title: string; description: string }> = {
  "about-us": { title: "About Aqua Mantra Filters | Whole-Home Water Specialists", description: "Learn about Aqua Mantra Filters, our whole-home filtration approach, professional installation and ongoing support." },
  products: { title: "Whole House Water Filter Systems & Cartridges", description: "Compare Aqua Mantra whole-house systems and replacement cartridges, filtration stages and installation options." },
  "perth-water-filtration": { title: "Whole House Water Filters Perth | Aqua Mantra", description: "Explore whole-house water filtration for Perth homes, with system supply, professional installation and filter support." },
  "sydney-water-filtration": { title: "Whole House Water Filters Sydney | Aqua Mantra", description: "Find whole-house water filtration for Sydney homes, professionally supplied and installed with ongoing support." },
  "adelaide-water-filtration": { title: "Whole House Water Filters Adelaide | Aqua Mantra", description: "Explore whole-house filtration for Adelaide homes, matched to your water, property and priorities." },
  services: { title: "Water Filter Installation & Servicing | Aqua Mantra", description: "See how Aqua Mantra supports system selection, installation, replacement cartridges and ongoing servicing." },
  gallery: { title: "Whole House Water Filter Installation Gallery", description: "View real Aqua Mantra whole-house water filtration installations and completed projects." },
  videos: { title: "Water Filtration Videos, Guides & Demonstrations", description: "Watch Aqua Mantra product demonstrations, installation walkthroughs and practical filtration guides." },
  "contact-us": { title: "Contact Aqua Mantra Filters | Request a Quote", description: "Tell Aqua Mantra about your home, location and water priorities to discuss a suitable filtration system." },
  "google-review": { title: "Aqua Mantra Filters Customer Reviews", description: "Read genuine customer feedback about Aqua Mantra products, installation and service." },
  guides: { title: "Whole House Water Filtration Guides", description: "Practical guides to local water conditions, system selection, installation and filter maintenance." },
  "privacy-policy": { title: "Privacy Policy | Aqua Mantra Filters", description: "How Aqua Mantra Filters intends to handle personal information submitted through this website." },
  terms: { title: "Website Terms | Aqua Mantra Filters", description: "Provisional website terms for the Aqua Mantra Filters redesign review build." },
};

for (const guide of guides) meta[`guides/${guide.slug}`] = { title: `${guide.title} | Aqua Mantra`, description: guide.summary };

/** Every route is known ahead of time, so the export can pre-render all of them. */
export function generateStaticParams() {
  return routes
    .filter(route => route !== "/")
    .map(route => ({ slug: route.replace(/^\/|\/$/g, "").split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const entry = meta[key];
  if (!entry) return {};
  return { title: entry.title, description: entry.description, alternates: { canonical: `/${key}` }, openGraph: { title: entry.title, description: entry.description, type: key.startsWith("guides/") ? "article" : "website", url: `/${key}` } };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const key = slug.join("/");
  if (key === "about-us") return <AboutPage />;
  if (key === "products") return <ProductsPage />;
  if (key === "services") return <ServicesPage />;
  if (key === "gallery") return <GalleryPage />;
  if (key === "videos") return <VideosPage />;
  if (key === "contact-us") return <ContactPage />;
  if (key === "google-review") return <ReviewsPage />;
  if (key === "guides") return <GuidesPage />;
  if (key === "privacy-policy") return <LegalPage type="privacy" />;
  if (key === "terms") return <LegalPage type="terms" />;
  const location = key.replace("-water-filtration", "") as LocationKey;
  if (location in locations) return <LocationPage location={location} />;
  if (slug[0] === "guides" && guides.some(guide => guide.slug === slug[1])) return <GuidePage slug={slug[1]} />;
  notFound();
}

function AboutPage() {
  return <main id="main-content"><PageHero eyebrow="About Aqua Mantra" title="Straight advice, correctly fitted systems and support that continues." intro="Aqua Mantra Filters was founded in July 2025 by four partners with a shared aim: make whole-house filtration easier to understand, install and maintain." image="/images/generated/kitchen-water-moment.webp" /><Breadcrumbs current="About us" path="/about-us" />
    <MotionSection className="section shell editorial-grid"><div><SectionHeading eyebrow="Why the company exists" title="A more accountable way to improve water throughout the home." /><p className="large-copy">Aqua Mantra brings system supply and installation into one conversation. The recommendation begins with the property, water source and household priorities, then continues through installation and replacement-filter support.</p></div><figure><Image src="/images/generated/kitchen-water-moment.webp" alt="Illustrative contemporary kitchen with a glass being filled from a tap" width={1536} height={1024} /><figcaption>Illustrative lifestyle image, not a client installation.</figcaption></figure></MotionSection>
    <MotionSection className="section shell"><SectionHeading eyebrow="Operating principles" title="What good advice should feel like." /><div className="principle-list">{[
      ["01", "Ask before recommending", "The postcode, source, property and goal shape the conversation."],
      ["02", "Explain without pressure", "Capabilities, limits and maintenance should be clear before a decision."],
      ["03", "Install around the home", "Placement, plumbing, pressure and access deserve proper planning."],
      ["04", "Stay useful after handover", "Compatible filters and service support remain easy to find."],
    ].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></MotionSection>
    <MotionSection className="section credentials-section"><div className="shell"><SectionHeading eyebrow="Credentials and evidence" title="The paperwork you are entitled to see." text="A whole-house system is plumbing work on your property. These are the four things worth having in writing before you agree to anything." /><div className="credential-grid"><div><ShieldCheck size={28} /><h3>WaterMark</h3><p>Request the certificate number and the list of components it covers for the system you have been quoted.</p></div><div><Wrench size={28} /><h3>Licensed installation</h3><p>Plumbing work is licensed work. We will name the licence holder responsible for your installation before it is booked.</p></div><div><HouseLine size={28} /><h3>Service footprint</h3><p>We work across Perth, Sydney and Adelaide. Give us your suburb and we will tell you whether it is covered.</p></div><div><Gauge size={28} /><h3>Product performance</h3><p>Every cartridge claim should arrive with a test sheet, the conditions it was tested under and the warranty terms.</p></div></div>
      <ReviewNote>Certificate numbers, WaterMark component coverage, state licence-holder details, suburb-level service areas and the product test and warranty documents are all client evidence items. They belong on this page once Aqua Mantra supplies them, and none of them has been assumed here.</ReviewNote></div></MotionSection>
    <ConsultationBand title="Talk through the home and the result you want." /></main>;
}

function ProductsPage() {
  const filters = [
    ["APF", "Antibacterial pleated PP cartridge", "$80", "The pleated first stage, aimed at visible sediment before water reaches the carbon stages."],
    ["SCF", "Scale carbon block cartridge", "$110", "A carbon block positioned for scale management. It is not a water softener and it does not remove hardness minerals."],
    ["CCF", "Coconut carbon block cartridge", "$110", "The final carbon stage, used where the concern is taste or odour at the tap."],
    ["Bundle", "APF + SCF + CCF replacement set", "$300", "The full current cartridge set for a three-stage system. Check the model details recorded at handover before you order."],
  ];
  return <main id="main-content"><PageHero eyebrow="Systems and replacement filters" title="Compare the role of each product before choosing." intro="Installed systems and replacement cartridges are separated here so first-time buyers and existing customers can each find the right next step." /><Breadcrumbs current="Products" path="/products" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Whole-house systems" title="Built for water across the home." text="Two whole-house configurations. A consultation decides which one suits the property, the plumbing and how much water the household actually uses." /><div className="product-feature"><div><span className="index">Three-stage system</span><h3>Aqua Mantra three-stage whole-house filtration system</h3><p>A protected three-housing configuration running the APF, SCF and CCF cartridges in sequence. A consultation confirms property fit, installation scope and the documented performance of each stage.</p><ul><li>Supply and professional installation path</li><li>Three current replacement-cartridge types</li><li>Ongoing replacement and maintenance support</li></ul><Link className="button button-primary" href="/contact-us">Check my property</Link></div><Image src="/images/current/three-stage-filter.jpeg" alt="The curved cover panel of an Aqua Mantra whole-house system standing on a pallet, printed with the company logo and a QR code." width={900} height={1200} /></div>
      <div className="product-feature reverse"><div><span className="index">Two-stage system</span><h3>Aqua Mantra PureFlow 2</h3><p>PureFlow 2 is the two-housing option. If the installation area is tight, or the household wants a simpler setup to maintain, ask us to compare it against the three-stage system for your property.</p><Link className="button button-secondary" href="/contact-us">Ask about PureFlow 2</Link></div><Image src="/images/installations/install-1-alt.jpg" alt={altFor("install-1-alt.jpg")} width={675} height={1200} /></div>
      <ReviewNote>System pricing and full technical specifications are absent here because they have not been supplied. Before launch, Aqua Mantra needs to provide, for both systems: cartridge configuration, dimensions, rated flow, capacity, inlet pressure range, installation requirements and warranty terms. The PureFlow 2 name is taken from the current website and nothing further about it has been assumed.</ReviewNote></MotionSection>
    <MotionSection className="section product-table-section"><div className="shell"><SectionHeading eyebrow="Replacement filters" title="Keep compatibility and maintenance clear." /><div className="product-table" role="table" aria-label="Replacement cartridge overview">{filters.map(([code,name,price,text]) => <div role="row" key={code}><div role="cell"><span>{code}</span><h3>{name}</h3></div><p role="cell">{text}</p><strong role="cell">{price}</strong><Link role="cell" href="/contact-us">Confirm compatibility</Link></div>)}</div>
      <ReviewNote>Micron ratings, rated capacity, service intervals and the evidence behind the antibacterial and substance-reduction wording on these cartridges are still to come from Aqua Mantra. The prices are carried across from the existing website and need reconfirming before launch.</ReviewNote></div></MotionSection>
    <MotionSection className="section shell"><SectionHeading eyebrow="Filtration sequence" title="See how the current three-stage configuration is described." /><FiltrationStory /></MotionSection>
    <ConsultationBand /></main>;
}

function ServicesPage() {
  return <main id="main-content"><PageHero eyebrow="Supply, installation and aftercare" title="One clear service from assessment to replacement filters." intro="Aqua Mantra helps with system selection, supply, installation planning, pressure checks, handover and ongoing cartridge support." image="/images/installations/install-8.jpg" /><Breadcrumbs current="Services" path="/services" />
    <MotionSection className="section shell"><SectionHeading eyebrow="How it works" title="The system is only one part of a good result." /><ol className="service-timeline">{[
      ["01", "Water and property assessment", "Share the postcode, water source, property type, available installation area and the concern you want to address."],
      ["02", "Evidence-led recommendation", "Review a suitable configuration, what each stage is designed to do, its limitations and the documented maintenance needs."],
      ["03", "Supply and installation plan", "Confirm delivery, placement, plumbing requirements, timing, inclusions and the responsible licensed installer."],
      ["04", "Pressure check and handover", "Check the installed system, explain normal operation and record the compatible replacement filters."],
      ["05", "Maintenance and support", "Use clear replacement guidance and request help if pressure, flow or water experience changes."],
    ].map(([n,t,d]) => <li key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ol></MotionSection>
    <MotionSection className="section service-options"><div className="shell"><SectionHeading eyebrow="Service paths" title="Help for new and existing customers." /><div className="two-column-list"><article><Wrench size={30} /><h3>New system consultation</h3><p>Property-fit discussion, system recommendation, supply and professional installation planning.</p><Link className="text-link" href="/contact-us">Discuss a new system <ArrowUpRight size={18} /></Link></article><article><Drop size={30} /><h3>Replacement and maintenance</h3><p>Compatibility checks, current replacement cartridges and support around normal maintenance.</p><Link className="text-link" href="/products">View replacement filters <ArrowUpRight size={18} /></Link></article></div></div></MotionSection>
    <MotionSection className="section shell faq-section"><SectionHeading eyebrow="Common questions" title="What to expect around installation day." /><div className="faq-list">{[
      ["How long does installation take?", "It depends on the system, where it is going and what plumbing is already in the ground. You get a time estimate with your quote, once we have the property details."],
      ["What is included?", "A quote separates system supply from standard installation, and calls out any plumbing variation or site work your property needs."],
      ["Who completes the plumbing work?", "A licence holder for your state. We name them before the booking is confirmed."],
      ["How often are filters replaced?", "It depends on the cartridge documentation, how much water the household uses and the inlet conditions. There is no universal interval, so the right one for your system is recorded at handover."],
    ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      <ReviewNote>Aqua Mantra still needs to confirm the installation time ranges for each system and property condition, exactly what a standard installation includes and excludes, and the licence-holder details for every state it services. Those answers are described here in general terms only until it does.</ReviewNote></MotionSection><ConsultationBand /></main>;
}

function LocationPage({ location }: { location: LocationKey }) {
  const data = locations[location];
  const first = location === "perth" ? 3 : location === "sydney" ? 12 : 18;
  const proof = [first, first + 1, first + 2].map(n => `install-${Math.min(n, 22)}.jpg`);
  return <main id="main-content"><PageHero eyebrow={data.eyebrow} title={data.title} intro={data.intro} image={`/images/installations/install-${first}.jpg`} /><Breadcrumbs current={`${data.city} water filtration`} path={`/${location}-water-filtration`} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Whole-house water filtration in ${data.city}`, provider: { "@type": "Organization", name: "Aqua Mantra Filters" }, areaServed: data.city, url: `${siteUrl}/${location}-water-filtration` }} />
    <MotionSection className="section shell location-context"><div><SectionHeading eyebrow="Local context" title={`Begin with current ${data.city} information.`} /><p className="large-copy">{data.context}</p><a className="source-link" href={data.source.href} target="_blank" rel="noreferrer">Source: {data.source.label} <ArrowUpRight size={17} /></a></div><Image src={location === "sydney" ? "/images/generated/kitchen-water-moment.webp" : "/images/generated/shower-water-detail.webp"} alt={location === "sydney" ? "Illustrative hand filling a glass in a contemporary kitchen" : "Illustrative modern shower with clear water in daylight"} width={1024} height={1536} /></MotionSection>
    <MotionSection className="section location-concerns"><div className="shell"><SectionHeading eyebrow="What the consultation covers" title="Turn a broad concern into useful questions." /><div className="concern-list">{data.concerns.map((item,i) => <article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></MotionSection>
    <MotionSection className="section shell local-proof"><SectionHeading eyebrow={`Aqua Mantra in ${data.city}`} title="Installed work, photographed on the job." text="These are Aqua Mantra photographs from real installations: the kit laid out before fitting, pipework made up on site and the finished enclosure in place." /><div className="local-proof-grid">{proof.map(file => <figure key={file}><Image src={`/images/installations/${file}`} alt={altFor(file)} width={900} height={1200} /></figure>)}</div>
      <ReviewNote>No suburb, system model or installation date is claimed for these three photographs, because Aqua Mantra has not confirmed them or checked which details each customer is happy to publish. Captions can be added once it has.</ReviewNote></MotionSection>
    <MotionSection className="section shell guide-callout"><Image src="/images/generated/filtration-media-macro.webp" alt="Illustrative macro image of layered filtration materials" width={1254} height={1254} /><div><p className="eyebrow">Local water guide</p><h2>Read the full {data.city} guide.</h2><p>Understand the local context, treatment terms and the evidence to ask for before choosing a system.</p><Link className="button button-secondary" href={clean(data.guide)}>Open the guide</Link></div></MotionSection>
    <ConsultationBand title={`Discuss filtration for your ${data.city} home.`} /></main>;
}

function GalleryPage() {
  return <main id="main-content"><PageHero eyebrow="Installation gallery" title="Twenty-four photographs from Aqua Mantra jobs." intro="Cartridges and housings laid out on the lawn before fitting, copper pipework made up on site, and the finished stainless enclosure standing in the garden bed." /><Breadcrumbs current="Installations" path="/gallery" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Installation photographs" title="What an Aqua Mantra installation actually looks like." text="Nothing here is stock imagery. If you want to see how a system is likely to sit on your own property, these are the closest thing to a walk-around." /><GalleryLightbox items={galleryPhotos.map(file => ({ src: `/images/installations/${file}`, alt: altFor(file) }))} />
      <ReviewNote>Camera location metadata has been stripped from every copy used here. Suburb, system configuration and property details are deliberately absent: Aqua Mantra needs to confirm the facts, and confirm which of them each customer is willing to have published, before any caption goes on these photographs.</ReviewNote></MotionSection><ConsultationBand title="Planning a similar installation? Start with the property." /></main>;
}

function VideosPage() {
  const posters = ["install-2.jpg", "install-7.jpg", "install-15.jpg", "install-19.jpg"];
  return <main id="main-content"><PageHero eyebrow="Video library" title="See the equipment and installation work in context." intro="Four Aqua Mantra clips, each loaded only when you press play so the page stays light on mobile data." /><Breadcrumbs current="Videos" path="/videos" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Four clips" title="Footage from Aqua Mantra jobs." text="Nothing plays automatically and nothing downloads until you choose a clip." /><div className="video-grid">{videoUrls.map((url,i) => <article key={url}><video controls preload="none" playsInline poster={`/images/installations/${posters[i]}`}><source src={url} type="video/mp4" /></video><h3>Video {String(i+1).padStart(2,"0")}</h3></article>)}</div>
      <ReviewNote>These clips are numbered rather than titled because Aqua Mantra has not supplied titles, summaries, captions or transcripts, and inventing them would misdescribe the footage. A fifth file on the current website was dropped from this library: aquamantrafilters4.mp4 is byte-identical to aquamantrafilters3.mp4, so publishing both would present one recording as two pieces of evidence. Captions are required on all four before public launch.</ReviewNote></MotionSection><ConsultationBand /></main>;
}

function ContactPage() {
  return <main id="main-content"><PageHero eyebrow="Free water consultation" title="Tell us about the home and what you want to improve." intro="A few practical details make the first conversation more useful. You can also call, email or use WhatsApp." /><Breadcrumbs current="Contact" path="/contact-us" />
    <section className="section shell contact-layout"><div><SectionHeading eyebrow="Request a consultation" title="Start with the essentials." text="Postcode, water source and the result you want are enough for us to come back with something specific about your property." /><LeadForm />
      <ReviewNote>The form validates and reports its own states, but it is not connected to anything. Submissions go nowhere until Aqua Mantra approves the destination, the consent wording and the privacy policy.</ReviewNote></div><aside className="contact-aside"><h2>Prefer another channel?</h2><a href={contact.phoneHref}><Phone size={24} /><span><small>Call</small>{contact.phoneDisplay}</span></a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Drop size={24} /><span><small>WhatsApp</small>Start a conversation</span></a><a href={contact.emailHref}><ArrowUpRight size={24} /><span><small>Email</small>{contact.email}</span></a><div><small>Listed address</small><p>{contact.address}</p></div>
      <ReviewNote>The listed address is carried across from the current website. Aqua Mantra needs to confirm that it should be shown publicly and say whether the site accepts visitors, before this block goes live.</ReviewNote></aside></section></main>;
}

function ReviewsPage() {
  return <main id="main-content"><PageHero eyebrow="Customer reviews" title="What customers value about the Aqua Mantra experience." intro="The same three things come up again and again in the feedback: the advice was clear, the installation was handled properly, and nobody was pushed into buying." /><Breadcrumbs current="Customer reviews" path="/google-review" />
    <MotionSection className="section shell"><SectionHeading eyebrow="What the reviews keep saying" title="Advice and value, the installation itself, and service without a hard sell." text="Individual reviews vary. The themes below are the ones that repeat, which makes them the more useful signal." /><div className="reviews-page">{reviews.map((review,i) => <blockquote key={review.quote}><span>0{i+1} · {review.theme}</span><p>“{review.quote}”</p></blockquote>)}</div>
      <ReviewNote>The quotes above were taken from the current Aqua Mantra website. Reviewer names, dates, star ratings and the total review count are not shown because none of them has been checked against the source, and review schema is deliberately left off this page until they are.</ReviewNote></MotionSection>
    <MotionSection className="section shell"><SectionHeading eyebrow="Read them at the source" title="Check the reviews yourself on Google." text="Every quote on this page should sit one click away from the profile it came from." /><div className="legal-notice"><strong>Google Business Profile link: pending</strong><p>Aqua Mantra needs to supply the public Google Business Profile URL for this slot. No link has been guessed or constructed, so it stays empty until the real one arrives.</p></div></MotionSection>
    <MotionSection className="section shell review-proof"><div><p className="eyebrow">What to look for</p><h2>Three questions worth asking any installer.</h2><p>Was the advice clear before money changed hands? Was the plumbing work done properly? Did anyone answer the phone afterwards? Those are the things the feedback above keeps returning to, and they are fair questions to put to us as well.</p></div><Image src="/images/installations/install-2-alt.jpg" alt={altFor("install-2-alt.jpg")} width={675} height={1200} /></MotionSection><ConsultationBand /></main>;
}

function GuidesPage() {
  return <main id="main-content"><PageHero eyebrow="Water guides" title="Clearer questions lead to better filtration decisions." intro="These guides explain local context, treatment terms and maintenance without fear-based or unsupported claims." /><Breadcrumbs current="Guides" path="/guides" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Four practical starting points" title="Choose by location or by ownership stage." /><div className="guide-grid large">{guides.map(guide => <Link href={`/guides/${guide.slug}`} className="guide-card" key={guide.slug}><Image src={guide.image} alt="" width={900} height={650} /><span>{guide.location}</span><h3>{guide.title}</h3><p>{guide.summary}</p><small>Read guide</small></Link>)}</div></MotionSection><ConsultationBand /></main>;
}

function GuidePage({ slug }: { slug: string }) {
  const guide = guides.find(item => item.slug === slug)!;
  const content: Record<string, { intro: string; sections: [string,string][]; source?: [string,string] }> = {
    "perth-hard-water-filtration-vs-softening": { intro: "Hardness, scale management and filtration describe different things. Understanding the distinction prevents an expensive mismatch between the problem and the equipment.", sections: [["What hard water means", "Hardness usually refers to dissolved calcium and magnesium. It can contribute to scale and spots, but the level can vary by water source and location."],["What sediment and carbon filtration do", "A sediment stage targets suspended particles. Activated carbon can be used for selected taste, odour and substance-reduction purposes where the exact product evidence supports the claim."],["Scale management differs from softening", "Scale-management media may change how scale behaves under stated conditions. A true softener uses a different process to remove hardness minerals. Ask which process the proposed system actually uses."],["What to bring to a consultation", "Share the postcode, water source, household size, current plumbing concerns, photographs of the intended installation area and the outcome you want." ]], source:["Water Corporation: hard water", "https://www.watercorporation.com.au/Help-and-advice/Water-issues/Water-quality/Hard-water"] },
    "sydney-tap-water-chlorine-taste-filtration": { intro: "Sydney Water describes the supply as filtered, monitored and safe to drink. A filtration conversation can therefore focus on household preference, taste, odour, sediment and whole-home convenience.", sections: [["How Sydney water is managed", "Treatment and monitoring information should come from the utility's current reporting, not a general sales claim."],["Why taste or odour may be noticed", "Disinfectants help manage the distribution system. Individual sensitivity, temperature and plumbing can affect the experience at the tap."],["Where carbon filtration may fit", "Activated carbon is used for selected taste, odour and substance-reduction purposes. The exact cartridge test sheet, flow and capacity must support the final claim."],["Whole-house planning questions", "A useful recommendation also considers water source, inlet pressure, household demand, installation space and replacement access." ]], source:["Sydney Water: water analysis", "https://www.sydneywater.com.au/water-the-environment/how-we-manage-sydneys-water/safe-drinking-water/water-analysis.html"] },
    "adelaide-water-quality-home-filtration-guide": { intro: "Adelaide's drinking-water profile can vary with source and postcode. Start with the current local profile, then decide which household experience you actually want to change.", sections: [["Use the postcode profile", "SA Water provides local profile information because sources and treatment conditions can vary. This is more useful than one citywide assumption."],["Name the household priority", "Taste, odour, visible sediment, scale experience and every-tap convenience lead to different questions and sometimes different treatment processes."],["Match claims to the cartridge", "A product should be described by its applicable test evidence, operating conditions and maintenance requirements."],["Prepare for the property discussion", "Share the postcode, water source, occupants, plumbing layout, intended installation area and any known pressure or access constraints." ]], source:["SA Water: drinking-water profile", "https://www.sawater.com.au/water-and-the-environment/safe-and-clean-drinking-water/your-drinking-water-profile"] },
    "how-often-replace-whole-house-water-filters": { intro: "There is no honest universal replacement interval. Product ratings, household use, inlet conditions and observed pressure all influence the maintenance plan.", sections: [["Start with the product documentation", "Use the cartridge maker's applicable service interval or rated capacity for the actual configuration, not a generic number from another system."],["Household use matters", "A larger household or higher water demand can reach a rated capacity sooner than a lower-use property."],["Watch for changes", "Changes in pressure, flow, taste, odour or visible condition can justify inspection. They do not prove a specific contaminant result."],["Keep compatibility recorded", "At handover, record the APF, SCF and CCF model details, safe replacement process and who to contact when the installation needs professional attention." ]] },
  };
  const article = content[slug];
  return <main id="main-content">
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.summary,
      inLanguage: "en-AU",
      datePublished: GUIDE_REVIEWED,
      dateModified: GUIDE_REVIEWED,
      image: new URL(guide.image, siteUrl).toString(),
      author: { "@type": "Organization", name: "Aqua Mantra Filters", url: siteUrl },
      publisher: { "@type": "Organization", name: "Aqua Mantra Filters", url: siteUrl },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/guides/${slug}` },
    }} />
    <article><header className="article-hero"><div className="shell"><p className="eyebrow light">{guide.location} guide</p><h1>{guide.title}</h1><p>{article.intro}</p><span>Reviewed 10 September 2026</span></div></header><Breadcrumbs current={guide.title} path={`/guides/${slug}`} />
    <div className="article-layout shell"><div className="article-body">{article.sections.map(([title,text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}{article.source && <aside className="article-source"><h2>Authority source</h2><p>Use the latest source information and local profile when discussing a property.</p><a href={article.source[1]} target="_blank" rel="noreferrer">{article.source[0]} <ArrowUpRight size={17} /></a></aside>}
      <ReviewNote>This guide stops short of exact system specifications, test standards, WaterMark coverage, warranty terms and replacement intervals. Those are client evidence items and the supporting documentation has not been supplied, so stating them here would invent them.</ReviewNote></div><aside className="article-side"><Image src={guide.image} alt="" width={900} height={900} /><h2>Discuss your home</h2><p>A postcode, water source and the result you want are enough to start.</p><Link className="button button-primary" href="/contact-us">Book a consultation</Link></aside></div></article><ConsultationBand /></main>;
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <main id="main-content"><PageHero eyebrow="Human approval required" title={privacy ? "Privacy policy" : "Website terms"} intro={privacy ? "A transparent explanation of how contact and property details are collected, used, stored and disclosed." : "The terms that govern use of the website, enquiries and any product or service information."} /><Breadcrumbs current={privacy ? "Privacy policy" : "Website terms"} path={privacy ? "/privacy-policy" : "/terms"} /><section className="section shell legal-copy"><div className="legal-notice"><strong>Review-build placeholder</strong><p>This page is intentionally not presented as final legal advice. Aqua Mantra must supply or approve jurisdiction-appropriate wording before public launch.</p></div>{(privacy ? [
    ["Information collected", "Document only the information genuinely collected through forms, calls, analytics and connected services."],
    ["Why it is collected", "Explain enquiry handling, quoting, installation planning, service support and any separately consented marketing."],
    ["Storage and disclosure", "Name the approved form destination, service providers, retention approach and relevant cross-border handling."],
    ["Access and contact", "Provide the approved privacy contact and the process for access, correction or a complaint."],
  ] : [
    ["Website information", "Explain that general content is not a property-specific recommendation and that current product documentation prevails."],
    ["Quotes and availability", "Define how pricing, installation scope, location coverage and acceptance are confirmed."],
    ["Intellectual property", "Confirm permitted use of the Aqua Mantra brand, site content, photographs and guides."],
    ["Liability and governing terms", "Have an Australian legal professional provide language suited to the business and transaction model."],
  ]).map(([heading,text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</section></main>;
}
