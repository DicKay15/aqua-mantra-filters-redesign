import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { WaterHero } from "./WaterHero";
import { FiltrationStory } from "./FiltrationStory";
import { MotionSection } from "./MotionSection";
import { ConsultationBand, SectionHeading } from "./Blocks";
import { concerns, guides, reviews } from "@/lib/site";

const commitments = [
  ["01", "Evidence before claims", "What a system is said to do stays tied to the documentation behind it."],
  ["02", "Professional installation", "Placement, pressure and pipework are planned around the property."],
  ["03", "Support after handover", "Replacement cartridges and servicing continue once the job is finished."],
];

const process = [
  ["01", "Assess", "Tell us the postcode, water source, property and what you want to change."],
  ["02", "Recommend", "Review the options and their verified capabilities in plain language."],
  ["03", "Install", "Plan supply, placement, pressure checks and professional installation."],
  ["04", "Support", "Keep replacement filters and ongoing maintenance clear after handover."],
];

// Ordered as the job runs: kit delivered, work under way, system fitted, cartridges.
const proof = [
  ["install-3.jpg", "A whole-house system laid out on the lawn before installation, with cartridges, housing and fittings ready."],
  ["install-16.jpg", "An Aqua Mantra installer preparing copper pipework on site."],
  ["install-22.jpg", "A completed stainless enclosure fitted in a garden bed, with pressure gauges and copper pipework."],
  ["install-1-alt.jpg", "Three replacement cartridges standing side by side: pleated sediment, scale carbon and coconut carbon."],
];

export function AquaHome() {
  return (
    <main id="main-content">
      <WaterHero />

      <section className="trust-band" aria-label="What comes with the system">
        <div className="shell trust-grid">
          <p className="trust-lead">What comes with the system</p>
          {commitments.map(([n, title, text]) => (
            <div key={n}><span>{n}</span><strong>{title}</strong><small>{text}</small></div>
          ))}
        </div>
      </section>

      <MotionSection className="section shell concern-section" variant="stagger">
        <SectionHeading
          eyebrow="Start with the home"
          title="What we look at once you tell us what you are noticing."
          text="Taste, odour, sediment, scale and household demand are separate problems with separate answers. Each one sends the conversation somewhere different."
        />
        <div className="concern-list stagger">
          {concerns.map(concern => (
            <article key={concern.id}>
              <span>{concern.n}</span>
              <h3>{concern.label}</h3>
              <p>{concern.detail}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section systems-preview">
        <div className="shell split-heading">
          <SectionHeading
            eyebrow="Systems and replacements"
            title="Two clear paths, depending on what you need today."
            text="Explore the current Aqua Mantra range or ask us to narrow the choice around your home."
          />
          <Link className="text-link" href="/products">Compare all products <ArrowUpRight size={18} /></Link>
        </div>
        <div className="shell system-showcase">
          <div className="system-copy">
            <span className="index">Installed system</span>
            <h3>Aqua Mantra three-stage whole-house system</h3>
            <p>Three cartridge stages in a protective housing, supplied for professional whole-home installation. Final specifications, WaterMark coverage and warranty remain subject to client documentation.</p>
            <Link className="button button-primary" href="/contact-us">Ask if it suits my home</Link>
          </div>
          <div className="system-image">
            <Image src="/images/current/three-stage-filter.jpeg" alt="An Aqua Mantra three-stage whole-house filter housing in its protective enclosure." width={900} height={1200} />
          </div>
          <div className="replacement-list">
            <span className="index">Replacement filters</span>
            {["APF pleated cartridge", "SCF scale carbon block", "CCF coconut carbon block", "Three-cartridge bundle"].map((item, i) => (
              <div key={item}><span>0{i + 1}</span><p>{item}</p></div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section shell">
        <SectionHeading
          eyebrow="How the system is explained"
          title="Follow the water through each stage."
          text="Pick a stage to see what it is there to do. The diagram explains the sequence; it does not stand in for the product evidence a performance claim needs."
        />
        <FiltrationStory />
      </MotionSection>

      <MotionSection className="section process-section" variant="stagger">
        <div className="shell">
          <SectionHeading eyebrow="From first question to aftercare" title="One accountable journey around your home." />
          <ol className="process-steps stagger">
            {process.map(([n, title, text]) => (
              <li key={n}><span className="step-dot" aria-hidden="true" /><span className="step-index">{n}</span><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
          <Link className="text-link light-link" href="/services">See how installation and support work <ArrowUpRight size={18} /></Link>
        </div>
      </MotionSection>

      <MotionSection className="section shell locations-section" variant="stagger">
        <SectionHeading
          eyebrow="Local guidance"
          title="Water context changes by place. Advice should too."
          text="Each city page begins with current authority information, then brings the decision back to the property and Aqua Mantra's verified systems."
        />
        <div className="location-stack stagger">
          {[
            ["Perth", "Hardness and water source can vary. Understand filtration, scale management and softening as separate choices.", "/perth-water-filtration"],
            ["Sydney", "Start with taste, odour, sediment and the property's plumbing rather than broad contamination claims.", "/sydney-water-filtration"],
            ["Adelaide", "Use the postcode water profile and household goal to avoid one-size-fits-all assumptions.", "/adelaide-water-filtration"],
          ].map(([city, text, href], i) => (
            <Link href={href} key={city}>
              <span>0{i + 1}</span><h3>{city}</h3><p>{text}</p><ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section proof-section" variant="stagger">
        <div className="shell split-heading">
          <SectionHeading
            eyebrow="Real installations"
            title="Proof should look like the work, because it is the work."
            text="Photographs from Aqua Mantra jobs, in the order the work happens. Captions stay factual until the client confirms system and location details."
          />
          <Link className="text-link" href="/gallery">View all installations <ArrowUpRight size={18} /></Link>
        </div>
        <div className="shell proof-strip stagger">
          {proof.map(([file, alt]) => (
            <figure key={file}>
              <Image src={`/images/installations/${file}`} alt={alt} width={900} height={1200} />
            </figure>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section shell review-preview">
        <SectionHeading
          eyebrow="Customer experiences"
          title="Straight advice. Professional work. No hard sell."
          text="Themes from the current Google review feed. Final excerpts and attribution require source verification before public launch."
        />
        <div className="review-lines">
          {reviews.map(review => (
            <blockquote key={review.quote}><span>{review.theme}</span><p>“{review.quote}”</p></blockquote>
          ))}
        </div>
        <Link className="text-link" href="/google-review">Read customer reviews <ArrowUpRight size={18} /></Link>
      </MotionSection>

      <MotionSection className="section guides-preview" variant="stagger">
        <div className="shell">
          <SectionHeading
            eyebrow="Water guides"
            title="Useful answers before a sales conversation."
            text="Location and maintenance content is grounded in authority sources and careful about what filtration can and cannot claim."
          />
          <div className="guide-grid stagger">
            {guides.map(guide => (
              <Link href={`/guides/${guide.slug}`} className="guide-card" key={guide.slug}>
                <Image src={guide.image} alt="" width={800} height={600} />
                <span>{guide.location}</span>
                <h3>{guide.title}</h3>
                <p>{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <ConsultationBand />
    </main>
  );
}
