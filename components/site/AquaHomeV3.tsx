import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { WaterHero } from "./WaterHero";
import { FiltrationStory } from "./FiltrationStory";
import { MotionSection } from "./MotionSection";
import { ConsultationBand, SectionHeading } from "./Blocks";
import { InstallationDocumentary, LocalSelector, ProductSelector } from "./PremiumInteractions";
import { guides, reviews } from "@/lib/site";

const facts = [
  ["02", "Whole-house system paths"],
  ["03", "Current cartridge types"],
  ["24", "Authentic job photographs"],
  ["03", "Service regions"],
];

const faqs = [
  ["What does a whole-house filter cover?", "It is installed on the property supply before water branches through the home, so the system can serve taps, showers and connected appliances downstream of that point."],
  ["What is the difference between PureFlow 2 and the three-stage system?", "PureFlow 2 is the current two-housing option. The three-stage system uses the APF, SCF and CCF cartridge sequence. The exact fit depends on the property and verified product documentation."],
  ["Does the system soften hard water?", "Filtration, scale management and true softening are different processes. Aqua Mantra should confirm which process the proposed configuration uses before describing the outcome."],
  ["Will installation affect water pressure?", "Pressure, household demand and the proposed configuration need to be considered together. The installation plan should record the applicable product limits and checks."],
  ["How do I know which replacement cartridges I need?", "Use the APF, SCF and CCF model details recorded for the installed system. If those are missing, send Aqua Mantra a photograph before ordering."],
];

export function AquaHomeV3() {
  return (
    <main id="main-content" className="premium-home">
      <WaterHero />

      <section className="premium-fact-band" aria-label="Aqua Mantra at a glance">
        <div className="shell">{facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <MotionSection className="premium-section premium-products">
        <div className="shell">
          <SectionHeading eyebrow="Choose the right path" title="A new system, or the filters you already need." text="Start with the job you need done. Aqua Mantra can then narrow the configuration around the property and the existing equipment." />
          <ProductSelector />
        </div>
      </MotionSection>

      <MotionSection className="premium-section premium-filtration">
        <div className="shell premium-heading-row">
          <SectionHeading eyebrow="Inside the three-stage system" title="Follow the cartridge sequence." text="Select a stage to see its place in the system and the plain-language role it performs." />
          <Link className="premium-link" href="/products">View products <ArrowUpRight /></Link>
        </div>
        <div className="shell"><FiltrationStory /></div>
      </MotionSection>

      <MotionSection className="premium-section premium-installation">
        <div className="shell premium-heading-row">
          <SectionHeading eyebrow="Supplied, installed and supported" title="See how the work comes together." text="One active piece of real job media at a time. Choose a step to follow the installation sequence." />
          <div className="premium-inline-links"><Link className="premium-link light" href="/gallery">Installation gallery <ArrowUpRight /></Link><Link className="premium-link light" href="/videos">All videos <ArrowUpRight /></Link></div>
        </div>
        <div className="shell"><InstallationDocumentary /></div>
      </MotionSection>

      <MotionSection className="premium-section premium-local">
        <div className="shell premium-heading-row">
          <SectionHeading eyebrow="Local water context" title="Advice for Perth, Sydney and Adelaide." text="Choose a city to see the current authority-led context and continue to the relevant local guide." />
        </div>
        <div className="shell"><LocalSelector /></div>
      </MotionSection>

      <MotionSection className="premium-section premium-proof">
        <div className="shell proof-composition">
          <figure className="proof-main-image"><Image src="/images/installations/install-22.jpg" alt="Completed Aqua Mantra filtration enclosure installed beside a home" fill sizes="(max-width: 800px) 100vw, 58vw" /><figcaption>Authentic completed Aqua Mantra installation. Location and system details await client confirmation.</figcaption></figure>
          <div className="proof-copy">
            <p className="premium-kicker">Customer and installation proof</p>
            <h2>Judge the work, not the water imagery.</h2>
            <blockquote>“{reviews[1].quote}”</blockquote>
            <p className="proof-source">Excerpt carried from Aqua Mantra’s current website. Reviewer attribution and Google source link require client confirmation.</p>
            <div className="premium-inline-links"><Link className="premium-link" href="/gallery">See 24 job photographs <ArrowUpRight /></Link><Link className="premium-link" href="/google-review">Customer reviews <ArrowUpRight /></Link></div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="premium-section premium-guides">
        <div className="shell premium-heading-row"><SectionHeading eyebrow="Before you choose" title="Understand the water and the options." /><Link className="premium-link" href="/guides">All water guides <ArrowUpRight /></Link></div>
        <div className="shell premium-guide-layout">
          <Link className="premium-guide-feature" href={`/guides/${guides[0].slug}`}><div><Image src={guides[0].image} alt="" fill sizes="(max-width: 800px) 100vw, 52vw" /></div><span>{guides[0].location}</span><h3>{guides[0].title}</h3><p>{guides[0].summary}</p></Link>
          <div className="premium-guide-list">{guides.slice(1).map(guide => <Link href={`/guides/${guide.slug}`} key={guide.slug}><span><i className="list-dot" aria-hidden="true" />{guide.location}</span><h3>{guide.title}</h3><ArrowUpRight /></Link>)}</div>
        </div>
      </MotionSection>

      <MotionSection className="premium-section premium-faq">
        <div className="shell premium-faq-layout"><SectionHeading eyebrow="Questions before installation" title="The practical answers matter." /><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
      </MotionSection>

      <ConsultationBand title="Tell us your postcode and what you need help with." />
    </main>
  );
}
