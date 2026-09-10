import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { WaterPathHero } from "./WaterPathHero";
import { StageJourney } from "./StageJourney";
import { InstallationCinema } from "./InstallationCinema";
import { CitySwitcher } from "./CitySwitcher";
import { InstallationRail } from "./InstallationRail";
import { MotionSection } from "./MotionSection";
import { guides } from "@/lib/site";

const moments = [
  { title: "Drink", note: "At the kitchen tap", image: "/images/generated/kitchen-water-moment.webp", position: "center" },
  { title: "Shower", note: "Across daily routines", image: "/images/generated/shower-water-detail.webp", position: "center" },
  { title: "Live", note: "Through the whole home", image: "/images/generated/v2-whole-home-water-use-sequence.webp", position: "22% center" },
];

export function AquaHomeV2() {
  return (
    <main id="main-content" className="v2-home">
      <WaterPathHero />
      <MotionSection className="v2-moments" variant="stagger">
        <div className="shell v2-section-intro">
          <p className="v2-kicker">One inlet. Everyday impact.</p>
          <h2>Water, where<br />life happens.</h2>
          <p>A whole-house system treats water before it branches through the property.</p>
        </div>
        <div className="moment-panels stagger">
          {moments.map((moment, index) => (
            <article className="moment-panel" key={moment.title} tabIndex={0}>
              <Image src={moment.image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectPosition: moment.position }} />
              <span className="moment-number">0{index + 1}</span>
              <div><h3>{moment.title}</h3><p>{moment.note}</p></div>
            </article>
          ))}
        </div>
        <p className="media-disclosure shell">Illustrative lifestyle imagery. Installation media below is authentic Aqua Mantra footage.</p>
      </MotionSection>
      <MotionSection className="v2-stage-wrap"><div className="shell"><StageJourney /></div></MotionSection>
      <MotionSection className="v2-system-proof">
        <div className="system-proof-image">
          <Image src="/images/installations/install-11.jpg" alt="Aqua Mantra three-stage whole-house system and protective enclosure prepared on site" fill sizes="(max-width: 800px) 100vw, 50vw" />
          <span>Authentic Aqua Mantra installation</span>
        </div>
        <div className="system-proof-copy">
          <p className="v2-kicker">The system</p><h2>Built for the<br />whole property.</h2>
          <p>Three cartridge stages, a protective enclosure and professional installation planned around the home.</p>
          <Link className="v2-text-link" href="/products">Explore the current system <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </MotionSection>
      <MotionSection className="v2-cinema-wrap"><InstallationCinema /></MotionSection>
      <MotionSection className="v2-city-wrap"><CitySwitcher /></MotionSection>
      <MotionSection className="v2-rail-wrap"><InstallationRail /></MotionSection>
      <MotionSection className="v2-guides" variant="stagger">
        <div className="shell v2-guides-head">
          <div><p className="v2-kicker">Useful before a sales call</p><h2>Read the water.<br />Then choose.</h2></div>
          <Link className="v2-text-link" href="/guides">View all guides <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="shell guide-ribbon stagger">
          {guides.slice(0, 4).map((guide, index) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug} className="guide-ribbon-card">
              <div><Image src={guide.image} alt="" fill sizes="(max-width: 700px) 82vw, 28vw" /></div>
              <span>{guide.location} · 0{index + 1}</span><h3>{guide.title}</h3>
            </Link>
          ))}
        </div>
      </MotionSection>
      <section className="v2-final"><div className="shell">
        <p className="v2-kicker light">Start with the postcode</p><h2>Your home tells us<br />what comes next.</h2>
        <p>Share the location, household and what you want to change. We’ll narrow the options from there.</p>
        <Link className="v2-button v2-button-light" href="/contact-us">Find my system <ArrowUpRight aria-hidden="true" /></Link>
      </div></section>
    </main>
  );
}
