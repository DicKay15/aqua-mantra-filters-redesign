import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Drop, HouseLine, ShieldCheck, Wrench } from "@phosphor-icons/react/dist/ssr";
import { WaterHero } from "./WaterHero";
import { FiltrationStory } from "./FiltrationStory";
import { MotionSection } from "./MotionSection";
import { ConsultationBand, SectionHeading } from "./Blocks";
import { guides, reviews } from "@/lib/site";

export function AquaHome() {
  return <main id="main-content">
    <WaterHero />
    <section className="trust-band" aria-label="Service commitments"><div className="shell trust-grid">
      <div><ShieldCheck size={24} /><span><strong>Evidence before claims</strong><small>Capabilities stay tied to verified documentation</small></span></div>
      <div><Wrench size={24} /><span><strong>Professional installation</strong><small>Planned around the home and service area</small></span></div>
      <div><HouseLine size={24} /><span><strong>Whole-home support</strong><small>From system choice to replacement filters</small></span></div>
    </div></section>

    <MotionSection className="section shell concern-section">
      <SectionHeading eyebrow="Start with the home" title="A system should answer your water concern, not create more questions." text="Taste, odour, sediment, scale and household demand are different considerations. The first step is understanding the property and the result you want." />
      <div className="concern-list">{[
        ["01", "Taste and odour", "Discuss what you notice and whether a tested carbon stage is relevant."],
        ["02", "Visible sediment", "Consider inlet conditions and the role of a pleated first stage."],
        ["03", "Scale and hardness", "Separate scale management from true hardness removal before buying."],
        ["04", "Every-tap convenience", "Plan the system around household flow, space and ongoing maintenance."],
      ].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </MotionSection>

    <MotionSection className="section systems-preview"><div className="shell split-heading">
      <SectionHeading eyebrow="Systems and replacements" title="Two clear paths, depending on what you need today." text="Explore the current Aqua Mantra range or ask us to narrow the choice around your home." />
      <Link className="text-link" href="/products/">Compare all products <ArrowUpRight size={18} /></Link>
    </div><div className="shell system-showcase">
      <div className="system-copy"><span className="index">Installed system</span><h3>Aqua Mantra three-stage whole-house system</h3><p>Three cartridge stages in a protective housing, supplied for professional whole-home installation. Final specifications, WaterMark coverage and warranty remain subject to client documentation.</p><Link className="button button-primary" href="/contact-us/">Ask if it suits my home</Link></div>
      <div className="system-image"><Image src="/images/current/three-stage-filter.jpeg" alt="Aqua Mantra three-stage whole-house filter housing" width={900} height={1200} /></div>
      <div className="replacement-list"><span className="index">Replacement filters</span>{["APF pleated cartridge", "SCF scale carbon block", "CCF coconut carbon block", "Three-cartridge bundle"].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div>
    </div></MotionSection>

    <MotionSection className="section shell"><SectionHeading eyebrow="How the system is explained" title="Follow the water through each stage." text="The animation makes the sequence easier to understand. It does not replace the exact product evidence required for performance claims." /><FiltrationStory /></MotionSection>

    <MotionSection className="section process-section"><div className="shell"><SectionHeading eyebrow="From first question to aftercare" title="One accountable journey around your home." />
      <ol className="process-steps">{[
        ["01", "Assess", "Tell us about the postcode, water source, property and priorities."],
        ["02", "Recommend", "Review suitable options and verified capabilities in plain language."],
        ["03", "Install", "Plan supply, placement, pressure checks and professional installation."],
        ["04", "Support", "Keep replacement filters and ongoing maintenance clear after handover."],
      ].map(([n, title, text]) => <li key={n}><span>{n}</span><Drop size={24} weight="light" /><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <Link className="text-link light-link" href="/services/">See how installation and support work <ArrowUpRight size={18} /></Link>
    </div></MotionSection>

    <MotionSection className="section shell locations-section"><SectionHeading eyebrow="Local guidance" title="Water context changes by place. Advice should too." text="Each city page begins with current authority information, then brings the decision back to the property and Aqua Mantra's verified systems." />
      <div className="location-stack">{[
        ["Perth", "Hardness and water source can vary. Understand filtration, scale management and softening as separate choices.", "/perth-water-filtration/"],
        ["Sydney", "Start with taste, odour, sediment and the property's plumbing rather than broad contamination claims.", "/sydney-water-filtration/"],
        ["Adelaide", "Use the postcode water profile and household goal to avoid one-size-fits-all assumptions.", "/adelaide-water-filtration/"],
      ].map(([city, text, href], i) => <Link href={href} key={city}><span>0{i + 1}</span><h3>{city}</h3><p>{text}</p><ArrowUpRight size={22} /></Link>)}</div>
    </MotionSection>

    <MotionSection className="section proof-section"><div className="shell split-heading"><SectionHeading eyebrow="Real installations" title="Proof should look like the work, because it is the work." text="These are authentic Aqua Mantra installation photographs. Project captions stay factual until the client confirms system and location details." /><Link className="text-link" href="/gallery/">View all installations <ArrowUpRight size={18} /></Link></div>
      <div className="proof-strip">{[1, 8, 15, 20].map((n, i) => <figure key={n}><Image src={`/images/installations/install-${n}.jpg`} alt={`Aqua Mantra whole-house filtration installation photograph ${i + 1}`} width={900} height={1200} /><figcaption>Verified Aqua Mantra installation · Details pending client confirmation</figcaption></figure>)}</div>
    </MotionSection>

    <MotionSection className="section shell review-preview"><SectionHeading eyebrow="Customer experiences" title="Straight advice. Professional work. No hard sell." text="Themes from the current Google review feed. Final excerpts and attribution require source verification before public launch." /><div className="review-lines">{reviews.map(review => <blockquote key={review.quote}><span>{review.theme}</span><p>“{review.quote}”</p></blockquote>)}</div><Link className="text-link" href="/google-review/">Read customer reviews <ArrowUpRight size={18} /></Link></MotionSection>

    <MotionSection className="section guides-preview"><div className="shell"><SectionHeading eyebrow="Water guides" title="Useful answers before a sales conversation." text="Location and maintenance content is grounded in authority sources and careful about what filtration can and cannot claim." /><div className="guide-grid">{guides.map(guide => <Link href={`/guides/${guide.slug}/`} className="guide-card" key={guide.slug}><Image src={guide.image} alt="" width={800} height={600} /><span>{guide.location}</span><h3>{guide.title}</h3><p>{guide.summary}</p></Link>)}</div></div></MotionSection>
    <ConsultationBand />
  </main>;
}

