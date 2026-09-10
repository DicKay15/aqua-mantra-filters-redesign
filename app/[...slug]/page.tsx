import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Drop, Gauge, HouseLine, Phone, ShieldCheck, Wrench } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, ConsultationBand, JsonLd, PageHero, SectionHeading } from "@/components/site/Blocks";
import { FiltrationStory } from "@/components/site/FiltrationStory";
import { LeadForm } from "@/components/site/LeadForm";
import { MotionSection } from "@/components/site/MotionSection";
import { contact, guides, locations, reviews, siteUrl, videoUrls, type LocationKey } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string[] }> };

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
  return <main id="main-content"><PageHero eyebrow="About Aqua Mantra" title="Straight advice, correctly fitted systems and support that continues." intro="Aqua Mantra Filters was founded in July 2025 by four partners with a shared aim: make whole-house filtration easier to understand, install and maintain." image="/images/generated/kitchen-water-moment.webp" /><Breadcrumbs current="About us" />
    <MotionSection className="section shell editorial-grid"><div><SectionHeading eyebrow="Why the company exists" title="A more accountable way to improve water throughout the home." /><p className="large-copy">Aqua Mantra brings system supply and installation into one conversation. The recommendation begins with the property, water source and household priorities, then continues through installation and replacement-filter support.</p></div><figure><Image src="/images/generated/kitchen-water-moment.webp" alt="Illustrative contemporary kitchen with a glass being filled from a tap" width={1536} height={1024} /><figcaption>Illustrative lifestyle image, not a client installation.</figcaption></figure></MotionSection>
    <MotionSection className="section shell"><SectionHeading eyebrow="Operating principles" title="What good advice should feel like." /><div className="principle-list">{[
      ["01", "Ask before recommending", "The postcode, source, property and goal shape the conversation."],
      ["02", "Explain without pressure", "Capabilities, limits and maintenance should be clear before a decision."],
      ["03", "Install around the home", "Placement, plumbing, pressure and access deserve proper planning."],
      ["04", "Stay useful after handover", "Compatible filters and service support remain easy to find."],
    ].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></MotionSection>
    <MotionSection className="section credentials-section"><div className="shell"><SectionHeading eyebrow="Credentials and evidence" title="Trust details belong beside the claim." text="The final public site will show exact, client-approved evidence here. We will not invent or generalise it." /><div className="credential-grid"><div><ShieldCheck size={28} /><h3>WaterMark</h3><p>Certificate number and covered components required from the client.</p></div><div><Wrench size={28} /><h3>Licensed installation</h3><p>Licence holder and details required for every active service state.</p></div><div><HouseLine size={28} /><h3>Service footprint</h3><p>Perth, Sydney and Adelaide coverage to be confirmed at suburb level.</p></div><div><Gauge size={28} /><h3>Product performance</h3><p>Specifications, testing conditions and warranty documentation required.</p></div></div></div></MotionSection>
    <ConsultationBand title="Talk through the home and the result you want." /></main>;
}

function ProductsPage() {
  const filters = [
    ["APF", "Antibacterial pleated PP cartridge", "$80", "First-stage pleated cartridge. Exact micron rating, capacity and antibacterial evidence require product documentation."],
    ["SCF", "Scale carbon block cartridge", "$110", "Carbon block with scale-management positioning. It must not be described as a water softener without applicable evidence."],
    ["CCF", "Coconut carbon block cartridge", "$110", "Final carbon stage for verified taste/odour or substance-reduction claims supported by the exact test sheet."],
    ["Bundle", "APF + SCF + CCF replacement set", "$300", "A complete current cartridge set. Compatibility and service interval must be confirmed before purchase."],
  ];
  return <main id="main-content"><PageHero eyebrow="Systems and replacement filters" title="Compare the role of each product before choosing." intro="Installed systems and replacement cartridges are separated here so first-time buyers and existing customers can each find the right next step." /><Breadcrumbs current="Products" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Whole-house systems" title="Built for water across the home." text="System prices and exact technical specifications are intentionally not invented in this review build." /><div className="product-feature"><div><span className="index">Three-stage system</span><h2>Aqua Mantra three-stage whole-house filtration system</h2><p>A protected three-housing configuration using APF, SCF and CCF cartridges. A consultation is used to confirm property fit, installation scope and documented performance.</p><ul><li>Supply and professional installation path</li><li>Three current replacement-cartridge types</li><li>Ongoing replacement and maintenance support</li></ul><Link className="button button-primary" href="/contact-us/">Check my property</Link></div><Image src="/images/current/three-stage-filter.jpeg" alt="Aqua Mantra three-stage filter housing" width={900} height={1200} /></div>
      <div className="product-feature reverse"><div><span className="index">Two-stage system</span><h2>Aqua Mantra PureFlow 2</h2><p>The current website names PureFlow 2 as a whole-house option. Cartridge configuration, dimensions, flow, capacity, installation requirements and warranty need to be supplied before a detailed comparison can be published.</p><Link className="button button-secondary" href="/contact-us/">Ask about PureFlow 2</Link></div><Image src="/images/current/install-1-alt.jpg" alt="Aqua Mantra filtration equipment prepared for installation" width={675} height={1200} /></div></MotionSection>
    <MotionSection className="section product-table-section"><div className="shell"><SectionHeading eyebrow="Replacement filters" title="Keep compatibility and maintenance clear." /><div className="product-table" role="table" aria-label="Replacement cartridge overview">{filters.map(([code,name,price,text]) => <div role="row" key={code}><div role="cell"><span>{code}</span><h3>{name}</h3></div><p role="cell">{text}</p><strong role="cell">{price}</strong><Link role="cell" href="/contact-us/">Confirm compatibility</Link></div>)}</div></div></MotionSection>
    <MotionSection className="section shell"><SectionHeading eyebrow="Filtration sequence" title="See how the current three-stage configuration is described." /><FiltrationStory /></MotionSection>
    <ConsultationBand /></main>;
}

function ServicesPage() {
  return <main id="main-content"><PageHero eyebrow="Supply, installation and aftercare" title="One clear service from assessment to replacement filters." intro="Aqua Mantra helps with system selection, supply, installation planning, pressure checks, handover and ongoing cartridge support." image="/images/installations/install-8.jpg" /><Breadcrumbs current="Services" />
    <MotionSection className="section shell"><SectionHeading eyebrow="How it works" title="The system is only one part of a good result." /><ol className="service-timeline">{[
      ["01", "Water and property assessment", "Share the postcode, water source, property type, available installation area and the concern you want to address."],
      ["02", "Evidence-led recommendation", "Review a suitable configuration, what each stage is designed to do, its limitations and the documented maintenance needs."],
      ["03", "Supply and installation plan", "Confirm delivery, placement, plumbing requirements, timing, inclusions and the responsible licensed installer."],
      ["04", "Pressure check and handover", "Check the installed system, explain normal operation and record the compatible replacement filters."],
      ["05", "Maintenance and support", "Use clear replacement guidance and request help if pressure, flow or water experience changes."],
    ].map(([n,t,d]) => <li key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></li>)}</ol></MotionSection>
    <MotionSection className="section service-options"><div className="shell"><SectionHeading eyebrow="Service paths" title="Help for new and existing customers." /><div className="two-column-list"><article><Wrench size={30} /><h3>New system consultation</h3><p>Property-fit discussion, system recommendation, supply and professional installation planning.</p><Link className="text-link" href="/contact-us/">Discuss a new system <ArrowUpRight size={18} /></Link></article><article><Drop size={30} /><h3>Replacement and maintenance</h3><p>Compatibility checks, current replacement cartridges and support around normal maintenance.</p><Link className="text-link" href="/products/">View replacement filters <ArrowUpRight size={18} /></Link></article></div></div></MotionSection>
    <MotionSection className="section shell faq-section"><SectionHeading eyebrow="Before installation" title="Details the client will confirm." /><div className="faq-list">{[
      ["How long does installation take?", "A time range will be published after Aqua Mantra confirms it for each system and property condition."],
      ["What is included?", "The final site will distinguish system supply, standard installation, plumbing variations and any site-specific work."],
      ["Who completes the plumbing work?", "The final site will show the applicable licence holder and service-area details."],
      ["How often are filters replaced?", "The interval depends on the exact cartridge documentation, usage and inlet conditions. No universal period is assumed."],
    ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></MotionSection><ConsultationBand /></main>;
}

function LocationPage({ location }: { location: LocationKey }) {
  const data = locations[location];
  const image = location === "perth" ? 3 : location === "sydney" ? 12 : 18;
  return <main id="main-content"><PageHero eyebrow={data.eyebrow} title={data.title} intro={data.intro} image={`/images/installations/install-${image}.jpg`} /><Breadcrumbs current={`${data.city} water filtration`} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Whole-house water filtration in ${data.city}`, provider: { "@type": "Organization", name: "Aqua Mantra Filters" }, areaServed: data.city, url: `${siteUrl}/${location}-water-filtration/` }} />
    <MotionSection className="section shell location-context"><div><SectionHeading eyebrow="Local context" title={`Begin with current ${data.city} information.`} /><p className="large-copy">{data.context}</p><a className="source-link" href={data.source.href} target="_blank" rel="noreferrer">Source: {data.source.label} <ArrowUpRight size={17} /></a></div><Image src={location === "sydney" ? "/images/generated/kitchen-water-moment.webp" : "/images/generated/shower-water-detail.webp"} alt={location === "sydney" ? "Illustrative hand filling a glass in a contemporary kitchen" : "Illustrative modern shower with clear water in daylight"} width={1024} height={1536} /></MotionSection>
    <MotionSection className="section location-concerns"><div className="shell"><SectionHeading eyebrow="What the consultation covers" title="Turn a broad concern into useful questions." /><div className="concern-list">{data.concerns.map((item,i) => <article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></MotionSection>
    <MotionSection className="section shell local-proof"><SectionHeading eyebrow={`Aqua Mantra in ${data.city}`} title="Use local proof only when the details are verified." text="The photographs below are genuine Aqua Mantra installations. City, suburb, system and date captions remain pending client confirmation." /><div className="local-proof-grid">{[image, image + 1, image + 2].map((n, i) => <figure key={n}><Image src={`/images/installations/install-${Math.min(n,22)}.jpg`} alt={`Aqua Mantra installation photograph ${i+1}, location awaiting confirmation`} width={900} height={1200} /><figcaption>Installation details awaiting client confirmation</figcaption></figure>)}</div></MotionSection>
    <MotionSection className="section shell guide-callout"><Image src="/images/generated/filtration-media-macro.webp" alt="Illustrative macro image of layered filtration materials" width={1254} height={1254} /><div><p className="eyebrow">Local water guide</p><h2>Read the full {data.city} guide.</h2><p>Understand the local context, treatment terms and the evidence to ask for before choosing a system.</p><Link className="button button-secondary" href={data.guide}>Open the guide</Link></div></MotionSection>
    <ConsultationBand title={`Discuss filtration for your ${data.city} home.`} /></main>;
}

function GalleryPage() {
  return <main id="main-content"><PageHero eyebrow="Installation gallery" title="Real Aqua Mantra work, shown without invented outcomes." intro="The gallery preserves every current installation image. Useful city, system and site-condition captions will be added when the client confirms them." /><Breadcrumbs current="Installations" />
    <MotionSection className="section shell"><SectionHeading eyebrow="24 authentic photographs" title="The strongest proof is the work itself." text="All camera location metadata has been removed from the copies used here. Customer privacy and project facts still require client review." /><div className="gallery-grid">{Array.from({length:24},(_,i) => { const filename = i < 22 ? `install-${i+1}.jpg` : `install-${i-21}-alt.jpg`; return <figure key={filename}><Image src={`/images/installations/${filename}`} alt={`Aqua Mantra whole-house water filtration installation ${i+1}`} width={900} height={1200} /><figcaption><span>Installation {String(i+1).padStart(2,"0")}</span><small>City, system and property details pending</small></figcaption></figure>; })}</div></MotionSection><ConsultationBand title="Planning a similar installation? Start with the property." /></main>;
}

function VideosPage() {
  return <main id="main-content"><PageHero eyebrow="Video library" title="See the equipment and installation work in context." intro="Five existing Aqua Mantra videos are preserved and loaded only when you choose to play them." /><Breadcrumbs current="Videos" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Real video evidence" title="Product, installation and maintenance stories." text="Final titles, recorded locations, captions and transcripts require a client content pass before launch." /><div className="video-grid">{videoUrls.map((url,i) => <article key={url}><video controls preload="none" playsInline poster={`/images/installations/install-${[1,5,9,14,20][i]}.jpg`}><source src={url} type="video/mp4" /><track kind="captions" label="English captions pending" /></video><span>Video {String(i+1).padStart(2,"0")}</span><h2>{["System overview", "Installation walkthrough", "Equipment detail", "Site installation", "Completed system"][i]}</h2><p>Client-supplied title, summary and transcript are required before public launch.</p></article>)}</div></MotionSection><ConsultationBand /></main>;
}

function ContactPage() {
  return <main id="main-content"><PageHero eyebrow="Free water consultation" title="Tell us about the home and what you want to improve." intro="A few practical details make the first conversation more useful. You can also call, email or use WhatsApp." /><Breadcrumbs current="Contact" />
    <section className="section shell contact-layout"><div><SectionHeading eyebrow="Request a consultation" title="Start with the essentials." text="The form includes complete validation and feedback states. It remains disconnected until the client approves the destination and privacy process." /><LeadForm /></div><aside className="contact-aside"><h2>Prefer another channel?</h2><a href={contact.phoneHref}><Phone size={24} /><span><small>Call</small>{contact.phoneDisplay}</span></a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Drop size={24} /><span><small>WhatsApp</small>Start a conversation</span></a><a href={contact.emailHref}><ArrowUpRight size={24} /><span><small>Email</small>{contact.email}</span></a><div><small>Listed address</small><p>{contact.address}</p><p className="fine-print">Business-address suitability and public display require client confirmation.</p></div></aside></section></main>;
}

function ReviewsPage() {
  return <main id="main-content"><PageHero eyebrow="Customer reviews" title="What customers value about the Aqua Mantra experience." intro="The current Google feed highlights straightforward advice, value, installation quality and a low-pressure approach." /><Breadcrumbs current="Customer reviews" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Source transparency" title="Authentic proof, carefully presented." text="These review themes were observed on the current website. Final quote wording, names, dates, rating count and Google profile link need source verification before public launch." /><div className="reviews-page">{reviews.map((review,i) => <blockquote key={review.quote}><span>0{i+1} · {review.theme}</span><p>“{review.quote}”</p><footer>Google review attribution pending verification</footer></blockquote>)}</div></MotionSection>
    <MotionSection className="section shell review-proof"><div><p className="eyebrow">What reviews should answer</p><h2>Was the advice clear? Was the installation professional? Did support continue?</h2><p>Future review curation will connect real feedback to real installation context, without altering a customer&apos;s meaning or adding self-serving review schema.</p></div><Image src="/images/installations/install-2-alt.jpg" alt="Authentic Aqua Mantra filtration installation" width={675} height={1200} /></MotionSection><ConsultationBand /></main>;
}

function GuidesPage() {
  return <main id="main-content"><PageHero eyebrow="Water guides" title="Clearer questions lead to better filtration decisions." intro="These guides explain local context, treatment terms and maintenance without fear-based or unsupported claims." /><Breadcrumbs current="Guides" />
    <MotionSection className="section shell"><SectionHeading eyebrow="Four practical starting points" title="Choose by location or by ownership stage." /><div className="guide-grid large">{guides.map(guide => <Link href={`/guides/${guide.slug}/`} className="guide-card" key={guide.slug}><Image src={guide.image} alt="" width={900} height={650} /><span>{guide.location}</span><h2>{guide.title}</h2><p>{guide.summary}</p><small>Read guide</small></Link>)}</div></MotionSection><ConsultationBand /></main>;
}

function GuidePage({ slug }: { slug: string }) {
  const guide = guides.find(item => item.slug === slug)!;
  const content: Record<string, { intro: string; sections: [string,string][]; source?: [string,string] }> = {
    "perth-hard-water-filtration-vs-softening": { intro: "Hardness, scale management and filtration describe different things. Understanding the distinction prevents an expensive mismatch between the problem and the equipment.", sections: [["What hard water means", "Hardness usually refers to dissolved calcium and magnesium. It can contribute to scale and spots, but the level can vary by water source and location."],["What sediment and carbon filtration do", "A sediment stage targets suspended particles. Activated carbon can be used for selected taste, odour and substance-reduction purposes where the exact product evidence supports the claim."],["Scale management is not softening", "Scale-management media may change how scale behaves under stated conditions. A true softener uses a different process to remove hardness minerals. Ask which process the proposed system actually uses."],["What to bring to a consultation", "Share the postcode, water source, household size, current plumbing concerns, photographs of the intended installation area and the outcome you want." ]], source:["Water Corporation: hard water", "https://www.watercorporation.com.au/Help-and-advice/Water-issues/Water-quality/Hard-water"] },
    "sydney-tap-water-chlorine-taste-filtration": { intro: "Sydney Water describes the supply as filtered, monitored and safe to drink. A filtration conversation can therefore focus on household preference, taste, odour, sediment and whole-home convenience.", sections: [["How Sydney water is managed", "Treatment and monitoring information should come from the utility's current reporting, not a general sales claim."],["Why taste or odour may be noticed", "Disinfectants help manage the distribution system. Individual sensitivity, temperature and plumbing can affect the experience at the tap."],["Where carbon filtration may fit", "Activated carbon is used for selected taste, odour and substance-reduction purposes. The exact cartridge test sheet, flow and capacity must support the final claim."],["Whole-house planning questions", "A useful recommendation also considers water source, inlet pressure, household demand, installation space and replacement access." ]], source:["Sydney Water: water analysis", "https://www.sydneywater.com.au/water-the-environment/how-we-manage-sydneys-water/safe-drinking-water/water-analysis.html"] },
    "adelaide-water-quality-home-filtration-guide": { intro: "Adelaide's drinking-water profile can vary with source and postcode. Start with the current local profile, then decide which household experience you actually want to change.", sections: [["Use the postcode profile", "SA Water provides local profile information because sources and treatment conditions can vary. This is more useful than one citywide assumption."],["Name the household priority", "Taste, odour, visible sediment, scale experience and every-tap convenience lead to different questions and sometimes different treatment processes."],["Match claims to the cartridge", "A product should be described by its applicable test evidence, operating conditions and maintenance requirements."],["Prepare for the property discussion", "Share the postcode, water source, occupants, plumbing layout, intended installation area and any known pressure or access constraints." ]], source:["SA Water: drinking-water profile", "https://www.sawater.com.au/water-and-the-environment/safe-and-clean-drinking-water/your-drinking-water-profile"] },
    "how-often-replace-whole-house-water-filters": { intro: "There is no honest universal replacement interval. Product ratings, household use, inlet conditions and observed pressure all influence the maintenance plan.", sections: [["Start with the product documentation", "Use the cartridge maker's applicable service interval or rated capacity for the actual configuration, not a generic number from another system."],["Household use matters", "A larger household or higher water demand can reach a rated capacity sooner than a lower-use property."],["Watch for changes", "Changes in pressure, flow, taste, odour or visible condition can justify inspection. They do not prove a specific contaminant result."],["Keep compatibility recorded", "At handover, record the APF, SCF and CCF model details, safe replacement process and who to contact when the installation needs professional attention." ]] },
  };
  const article = content[slug];
  return <main id="main-content"><article><header className="article-hero"><div className="shell"><p className="eyebrow light">{guide.location} guide</p><h1>{guide.title}</h1><p>{article.intro}</p><span>Reviewed 10 September 2026 · Evidence update required before production</span></div></header><Breadcrumbs current={guide.title} />
    <div className="article-layout shell"><div className="article-body">{article.sections.map(([title,text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}{article.source && <aside className="article-source"><h2>Authority source</h2><p>Use the latest source information and local profile when discussing a property.</p><a href={article.source[1]} target="_blank" rel="noreferrer">{article.source[0]} <ArrowUpRight size={17} /></a></aside>}<section><h2>What Aqua Mantra still needs to verify</h2><p>Exact system specifications, test standards, WaterMark coverage, warranty and replacement intervals remain client evidence items. They should be added here only when the supporting documentation applies to the proposed system.</p></section></div><aside className="article-side"><Image src={guide.image} alt="" width={900} height={900} /><h2>Discuss your home</h2><p>A postcode, water source and the result you want are enough to start.</p><Link className="button button-primary" href="/contact-us/">Book a consultation</Link></aside></div></article><ConsultationBand /></main>;
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <main id="main-content"><PageHero eyebrow="Human approval required" title={privacy ? "Privacy policy" : "Website terms"} intro={privacy ? "A transparent explanation of how contact and property details are collected, used, stored and disclosed." : "The terms that govern use of the website, enquiries and any product or service information."} /><Breadcrumbs current={privacy ? "Privacy policy" : "Website terms"} /><section className="section shell legal-copy"><div className="legal-notice"><strong>Review-build placeholder</strong><p>This page is intentionally not presented as final legal advice. Aqua Mantra must supply or approve jurisdiction-appropriate wording before public launch.</p></div>{(privacy ? [
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
