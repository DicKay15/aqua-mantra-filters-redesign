"use client";

import { useEffect, useRef } from "react";

const stages = [
  { n: "01", title: "Pleated sediment stage", text: "The first stage is designed to capture visible sediment before water reaches the carbon stages." },
  { n: "02", title: "Scale carbon stage", text: "The middle cartridge combines carbon treatment with scale-management media. Exact performance remains subject to product documentation." },
  { n: "03", title: "Coconut carbon stage", text: "The final carbon stage supports taste and odour treatment where the cartridge's verified evidence applies." },
  { n: "04", title: "Whole-home distribution", text: "Filtered water continues through the home's normal plumbing to taps, showers and connected appliances." },
];

export function FiltrationStory() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      if (!root.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(".flow-path", { strokeDashoffset: 920 }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.out", scrollTrigger: undefined });
        gsap.fromTo(".stage-card", { opacity: 0.25, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.16, ease: "power2.out", delay: 0.2 });
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <div className="filtration-story" ref={root}>
      <div className="flow-visual" aria-hidden="true">
        <svg viewBox="0 0 980 250" role="presentation">
          <path className="flow-track" d="M20 130 C120 20 195 235 300 125 S485 20 590 125 S780 230 960 120" />
          <path className="flow-path" pathLength="920" d="M20 130 C120 20 195 235 300 125 S485 20 590 125 S780 230 960 120" />
          {[105, 325, 555, 815].map((cx, i) => <g key={cx}><circle cx={cx} cy={i % 2 ? 132 : 105} r="32" /><text x={cx} y={(i % 2 ? 132 : 105) + 6}>{i + 1}</text></g>)}
        </svg>
      </div>
      <ol className="stage-grid">
        {stages.map(stage => <li className="stage-card" key={stage.n}><span>{stage.n}</span><h3>{stage.title}</h3><p>{stage.text}</p></li>)}
      </ol>
    </div>
  );
}

