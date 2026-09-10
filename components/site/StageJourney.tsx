"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { n: "01", code: "APF", title: "Sediment first", text: "The pleated first stage is designed to capture visible sediment before water reaches the carbon stages." },
  { n: "02", code: "SCF", title: "Scale context", text: "The middle stage combines carbon treatment with scale-management media. Exact performance depends on verified documentation." },
  { n: "03", code: "CCF", title: "Carbon finish", text: "The final coconut-carbon stage supports applicable taste and odour treatment where the cartridge evidence applies." },
] as const;

export function StageJourney() {
  const [active, setActive] = useState(0);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animation: { kill: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      if (!visualRef.current) return;
      animation = gsap.fromTo(visualRef.current.querySelectorAll(".stage-cartridge"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .55, ease: "power3.out" });
    });
    return () => animation?.kill();
  }, []);

  return (
    <section className="stage-journey" aria-labelledby="stage-title">
      <div className="stage-copy">
        <p className="v2-kicker">Inside the system</p>
        <h2 id="stage-title">Three stages.<br />One continuous path.</h2>
        <p className="stage-intro">Choose a stage to follow the water through the current three-cartridge configuration.</p>
        <div className="stage-tabs" role="tablist" aria-label="Filter stages">
          {stages.map((stage, index) => (
            <button key={stage.code} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <span>{stage.n}</span><strong>{stage.title}</strong><small>{stage.code}</small>
            </button>
          ))}
        </div>
      </div>
      <div className={`stage-visual active-stage-${active + 1}`} ref={visualRef}>
        <div className="stage-flow-line" aria-hidden="true"><span /></div>
        {stages.map((stage, index) => (
          <div className={`stage-cartridge cartridge-${index + 1}`} key={stage.code} aria-hidden={active !== index}>
            <span>{stage.code}</span><i /><i /><i />
          </div>
        ))}
        <div className="stage-readout" aria-live="polite">
          <span>Stage {stages[active].n}</span>
          <h3>{stages[active].title}</h3>
          <p>{stages[active].text}</p>
        </div>
      </div>
    </section>
  );
}
