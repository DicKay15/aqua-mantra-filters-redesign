"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { locations, type LocationKey } from "@/lib/site";

const systems = [
  {
    id: "pureflow",
    tab: "PureFlow 2",
    eyebrow: "Two-stage option",
    title: "A simpler whole-house configuration.",
    text: "PureFlow 2 is Aqua Mantra’s current two-housing option. The property consultation confirms its cartridge configuration, installation fit and documented capabilities.",
    facts: ["Two-housing configuration", "Whole-house installation path", "Exact specifications confirmed before quoting"],
    image: "/images/current/three-stage-filter.jpeg",
    alt: "Aqua Mantra branded protective system enclosure",
    caption: "Aqua Mantra enclosure detail. Exact PureFlow 2 product photography is still required.",
    action: "Ask about PureFlow 2",
  },
  {
    id: "three-stage",
    tab: "Three-stage system",
    eyebrow: "Three-stage option",
    title: "APF, SCF and CCF in sequence.",
    text: "The current three-housing system places the pleated, scale-carbon and coconut-carbon cartridges in sequence inside a protective enclosure with pressure gauges.",
    facts: ["Three current cartridge types", "Protective stainless enclosure", "Replacement bundle available"],
    image: "/images/installations/install-19.jpg",
    alt: "Completed Aqua Mantra three-stage system with stainless enclosure, gauges and copper pipework",
    caption: "Authentic completed Aqua Mantra installation.",
    action: "View the three-stage system",
  },
  {
    id: "replacement",
    tab: "Replacement filters",
    eyebrow: "Existing customers",
    title: "Find the cartridge already recorded for your system.",
    text: "APF, SCF and CCF cartridges are available individually or as the current three-cartridge set. Confirm compatibility before ordering.",
    facts: ["APF pleated cartridge", "SCF scale-carbon block", "CCF coconut-carbon block"],
    image: "/images/installations/install-1-alt.jpg",
    alt: "Three Aqua Mantra replacement cartridges standing side by side",
    caption: "Authentic Aqua Mantra replacement-cartridge photograph.",
    action: "Find replacement filters",
  },
] as const;

export function ProductSelector() {
  const [selected, setSelected] = useState(1);
  const item = systems[selected];
  const reduceMotion = useReducedMotion();

  return (
    <div className="premium-selector">
      <div className="premium-selector-tabs" role="tablist" aria-label="Aqua Mantra product paths">
        {systems.map((system, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`system-panel-${system.id}`}
            key={system.id}
            onClick={() => setSelected(index)}
          >
            <span className="list-dot" aria-hidden="true" />{system.tab}
          </button>
        ))}
      </div>
      <div className="premium-selector-panel" id={`system-panel-${item.id}`} role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="premium-selector-copy"
            key={`${item.id}-copy`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
            transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="premium-kicker">{item.eyebrow}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <ul>{item.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
            <Link className="premium-link" href={item.id === "replacement" ? "/products#replacement-cartridges" : "/products"}>{item.action} <ArrowUpRight /></Link>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={`${item.id}-image`}
            initial={reduceMotion ? false : { opacity: 0, scale: .985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>{item.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}

const installationSteps = [
  { label: "Assess", title: "Start with the property", text: "The water source, available space, plumbing route and household priorities shape the recommendation.", kind: "image", media: "/images/installations/install-1.jpg", poster: "/images/installations/install-1.jpg" },
  { label: "Prepare", title: "Prepare the equipment", text: "The housings, enclosure, fittings and tools are set out before the plumbing work begins.", kind: "video", media: "/videos/installation-prep.mp4", poster: "/images/installations/install-3.jpg" },
  { label: "Connect", title: "Fit the system", text: "Copper pipework and the enclosure are fitted around the property’s available service route.", kind: "video", media: "/videos/property-pipework.mp4", poster: "/images/installations/install-14.jpg" },
  { label: "Complete", title: "Check and hand over", text: "The completed enclosure, gauges and pipework are checked before the replacement-filter details are handed over.", kind: "video", media: "/videos/completed-system.mp4", poster: "/images/installations/install-19.jpg" },
] as const;

export function InstallationDocumentary() {
  const [selected, setSelected] = useState(0);
  const step = installationSteps[selected];
  const reduceMotion = useReducedMotion();

  return (
    <div className="installation-documentary">
      <div className="documentary-media">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.label}
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.kind === "video" && !reduceMotion ? (
              <video key={step.media} autoPlay muted loop playsInline controls preload="metadata" poster={step.poster}>
                <source src={step.media} type="video/mp4" />
              </video>
            ) : (
              <Image src={step.poster} alt={`Authentic Aqua Mantra installation step: ${step.label}`} fill sizes="(max-width: 900px) 100vw, 60vw" />
            )}
          </motion.div>
        </AnimatePresence>
        <span className="documentary-authentic">Authentic Aqua Mantra job media</span>
      </div>
      <div className="documentary-controls">
        <div className="documentary-progress" aria-hidden="true"><span style={{ width: `${((selected + 1) / installationSteps.length) * 100}%` }} /></div>
        <div className="documentary-tabs" role="tablist" aria-label="Installation sequence">
          {installationSteps.map((item, index) => (
            <button type="button" role="tab" aria-selected={selected === index} key={item.label} onClick={() => setSelected(index)}>
              <span className="list-dot" aria-hidden="true" />{item.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div className="documentary-copy" key={step.title} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: .25 }}>
            <h3>{step.title}</h3><p>{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const cityOrder: LocationKey[] = ["perth", "sydney", "adelaide"];

export function LocalSelector() {
  const [selected, setSelected] = useState<LocationKey>("perth");
  const current = locations[selected];
  const reduceMotion = useReducedMotion();
  const points: Record<LocationKey, { cx: number; cy: number }> = {
    perth: { cx: 107, cy: 198 },
    adelaide: { cx: 231, cy: 224 },
    sydney: { cx: 294, cy: 207 },
  };

  return (
    <div className="local-selector">
      <div className="local-map" aria-label="Service locations in Perth, Adelaide and Sydney">
        <svg viewBox="0 0 390 310" role="img" aria-label="Simplified map of Australia marking Aqua Mantra service cities">
          <path className="australia-shape" d="M66 89 111 51l62 8 39-20 48 20 22 43 40 42-11 79-49 30-30 22-78-6-35-27-49-13-13-59 24-34Z" />
          {cityOrder.map(city => <g key={city} className={selected === city ? "city-point active" : "city-point"} onClick={() => setSelected(city)}><circle {...points[city]} r="9" /><circle {...points[city]} r="20" /><text x={points[city].cx} y={points[city].cy - 28}>{locations[city].city}</text></g>)}
        </svg>
      </div>
      <div className="local-copy">
        <div className="local-tabs" role="tablist" aria-label="Choose a service city">
          {cityOrder.map(city => <button type="button" role="tab" aria-selected={selected === city} key={city} onClick={() => setSelected(city)}>{locations[city].city}</button>)}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: .25 }}>
            <h3>{current.city} water context</h3>
            <p>{current.context}</p>
            <a className="local-source" href={current.source.href} target="_blank" rel="noreferrer">Authority source <ArrowUpRight /></a>
            <Link className="premium-link" href={`/${selected}-water-filtration`}>Explore {current.city} advice <ArrowUpRight /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
