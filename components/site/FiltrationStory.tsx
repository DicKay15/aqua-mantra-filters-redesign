"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stage = {
  key: string;
  code: string;
  title: string;
  text: string;
  media: string;
};

const stages: Stage[] = [
  {
    key: "sediment",
    code: "APF",
    title: "Pleated sediment stage",
    text: "The first cartridge is a pleated element. Its job is to hold back visible sediment so the carbon stages behind it are not asked to do work they were not designed for.",
    media: "Pleated element",
  },
  {
    key: "scale",
    code: "SCF",
    title: "Scale carbon stage",
    text: "The middle cartridge combines carbon treatment with scale-management media. What it is rated to reduce, and by how much, stays subject to the product documentation.",
    media: "Carbon block with scale media",
  },
  {
    key: "carbon",
    code: "CCF",
    title: "Coconut carbon stage",
    text: "The final carbon stage is where taste and odour treatment sits, within the limits its own verified evidence supports.",
    media: "Coconut shell carbon block",
  },
  {
    key: "home",
    code: "Home",
    title: "Whole-home distribution",
    text: "Treated water rejoins the home's normal plumbing and continues to every tap, shower and connected appliance. Nothing is fitted at the point of use.",
    media: "Existing house plumbing",
  },
];

const CARTRIDGE_X = [258, 452, 646];

// Water is drawn as four separate runs rather than one gradient stroke, so each
// step between cartridges can carry its own tone. Untreated on the left, clearer
// at every gap, clearest on the way out to the house.
const FLOW_RUNS = [
  { d: "M8 140 H258", stroke: "#8d8b74", length: 250 },
  { d: "M354 140 H452", stroke: "#6b9099", length: 98 },
  { d: "M548 140 H646", stroke: "#3f93ad", length: 98 },
  { d: "M742 140 H1000", stroke: "#7ecbd6", length: 258 },
];

export function FiltrationStory() {
  const root = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-filled");
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const fill = () => {
      node.classList.add("is-filled");
      // GSAP drives the one-shot fill so the flow reads left to right the first
      // time the diagram is actually on screen, rather than on mount.
      import("gsap").then(({ gsap }) => {
        if (cancelled || !root.current) return;
        ctx = gsap.context(() => {
          // Start values are read from each run's own pathLength rather than from
          // computed style: `.is-filled` has already set the CSS end state as the
          // no-JS fallback, so GSAP would otherwise animate 0 to 0.
          gsap.fromTo(
            ".flow-water",
            { strokeDashoffset: (_i: number, target: SVGPathElement) => Number(target.getAttribute("pathLength")) },
            { strokeDashoffset: 0, duration: 0.62, stagger: 0.34, ease: "power1.inOut" },
          );
          gsap.fromTo(
            ".cartridge",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.34, delay: 0.5, ease: "power2.out" },
          );
        }, root);
      });
    };

    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      fill();
      return () => { cancelled = true; ctx?.revert(); };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        fill();
      },
      // No ratio threshold: the diagram can be taller than a short viewport,
      // which would stop a ratio-based observer from ever firing.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (activeIndex + keys[event.key] + stages.length) % stages.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stages.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabsRef.current[next]?.focus();
  }, [activeIndex]);

  return (
    <div className="filtration-story" ref={root} data-active={active.key}>
      <div className="flow-visual">
        <svg viewBox="0 0 1000 250" role="img" aria-label="Cross-section of the three-stage housing: untreated water enters on the left, passes a pleated sediment cartridge, a scale carbon cartridge and a coconut carbon cartridge, then leaves on the right toward the home, growing clearer at each step.">
          <defs>
            <pattern id="pleats" width="9" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 8 L4.5 0 L9 8" fill="none" stroke="#7d9aa2" strokeWidth="1.2" />
            </pattern>
            <pattern id="granules" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.7" fill="#5c757e" />
              <circle cx="8" cy="8" r="1.3" fill="#7b929a" />
            </pattern>
            <pattern id="carbonbands" width="8" height="7" patternUnits="userSpaceOnUse">
              <rect y="0" width="8" height="2.6" fill="#4d666f" />
            </pattern>
          </defs>

          <path className="flow-track" d="M8 140 H1000" />
          <rect className="housing" x="196" y="52" width="612" height="176" rx="4" />

          {FLOW_RUNS.map((run, i) => (
            <path
              key={run.d}
              className="flow-water"
              style={{ ["--run-length" as string]: run.length }}
              d={run.d}
              stroke={run.stroke}
              pathLength={run.length}
              strokeDasharray={run.length}
              strokeDashoffset={run.length}
              data-run={i}
            />
          ))}

          <text className="flow-caption" x="8" y="182">Untreated supply</text>
          <text className="flow-caption flow-caption-end" x="992" y="182">To every outlet in the home</text>

          {/* Pressure gauges, as fitted on the real housing */}
          {CARTRIDGE_X.map((x, i) => (
            <circle key={`gauge-${x}`} className={`gauge${activeIndex === i ? " is-active" : ""}`} cx={x + 48} cy={52} r="13" />
          ))}

          {CARTRIDGE_X.map((x, i) => (
            <g
              key={stages[i].key}
              className={`cartridge${activeIndex === i ? " is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <rect className="cartridge-body" x={x} y="78" width="96" height="124" rx="3" />
              <rect
                className="cartridge-media"
                x={x + 9}
                y="87"
                width="78"
                height="106"
                fill={`url(#${["pleats", "granules", "carbonbands"][i]})`}
              />
              <text className="cartridge-index" x={x + 48} y="222">{stages[i].code}</text>
            </g>
          ))}

          <g className={`outlet-marker${activeIndex === 3 ? " is-active" : ""}`}>
            <path d="M846 104 h40 v-20 l20 17 -20 17 v-20 h-40 z" />
          </g>
        </svg>
      </div>

      <div className="stage-tabs" role="tablist" aria-label="Filtration stages" onKeyDown={onKeyDown}>
        {stages.map((stage, index) => (
          <button
            key={stage.key}
            type="button"
            role="tab"
            id={`stage-tab-${stage.key}`}
            aria-selected={index === activeIndex}
            aria-controls={`stage-panel-${stage.key}`}
            tabIndex={index === activeIndex ? 0 : -1}
            ref={element => { tabsRef.current[index] = element; }}
            className={index === activeIndex ? "is-active" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <span className="stage-tab-index list-dot" aria-hidden="true" />
            <span className="stage-tab-label">{stage.title}</span>
          </button>
        ))}
      </div>

      {stages.map((stage, index) => (
        <div
          key={stage.key}
          role="tabpanel"
          id={`stage-panel-${stage.key}`}
          aria-labelledby={`stage-tab-${stage.key}`}
          hidden={index !== activeIndex}
          className="stage-panel"
        >
          <p className="stage-panel-media">{stage.media}</p>
          <p className="stage-panel-text">{stage.text}</p>
        </div>
      ))}
    </div>
  );
}
