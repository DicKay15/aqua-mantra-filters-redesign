"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const outlets = [
  { id: "kitchen", label: "Kitchen", note: "Drinking and cooking" },
  { id: "shower", label: "Shower", note: "Bathing and daily routines" },
  { id: "laundry", label: "Laundry", note: "Washing and appliances" },
  { id: "garden", label: "Garden", note: "Outdoor tap" },
] as const;

type Outlet = (typeof outlets)[number]["id"];

const routePaths: Record<Outlet, string> = {
  kitchen: "M28 376H102C120 376 123 335 148 335H378C382 301 374 239 391 215C405 197 424 202 446 202",
  shower: "M28 376H102C120 376 123 335 148 335H378C427 335 516 337 551 299C574 274 580 231 580 182",
  laundry: "M28 376H102C120 376 123 335 148 335H378C407 335 438 342 448 369C452 380 450 393 450 408",
  garden: "M28 376H102C120 376 123 335 148 335H378C440 335 543 336 580 361C597 372 604 389 604 408",
};

export function WaterPathHero() {
  const [active, setActive] = useState<Outlet>("kitchen");
  const [interacted, setInteracted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    import("gsap").then(({ gsap }) => {
      const svg = svgRef.current;
      if (!svg) return;
      const timeline = gsap.timeline();
      timeline
        .fromTo(svg.querySelectorAll(".flow-draw"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.out" })
        .fromTo(svg.querySelectorAll(".flow-stage"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.36, stagger: 0.08 }, "-=.7");
      cleanup = () => timeline.kill();
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (interacted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive(current => outlets[(outlets.findIndex(item => item.id === current) + 1) % outlets.length].id);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [interacted]);

  return (
    <section className="v2-hero">
      <div className="v2-hero-water" aria-hidden="true" />
      <div className="v2-hero-inner shell">
        <div className="v2-hero-copy">
          <p className="v2-kicker">Whole-house water filtration</p>
          <h1>Filtered water.<br />Every tap.</h1>
          <p>Systems supplied and professionally installed across Perth, Sydney and Adelaide.</p>
          <div className="v2-actions">
            <Link className="v2-button v2-button-solid" href="/contact-us">Find my system</Link>
            <Link className="v2-button v2-button-line" href="/products">Explore systems</Link>
          </div>
        </div>

        <div className="water-path-card">
          <div className="water-path-heading">
            <span>How it reaches the home</span>
            <strong>{outlets.find(item => item.id === active)?.label}</strong>
          </div>
          <svg ref={svgRef} className={`water-path-svg active-${active}`} viewBox="0 0 720 490" role="img" aria-labelledby="water-path-title water-path-desc">
            <title id="water-path-title">Whole-house water filtration path</title>
            <desc id="water-path-desc">Water enters the property, passes through three filter stages and continues to the kitchen, shower, laundry and garden tap.</desc>
            <path className="house-line flow-draw" pathLength="1" d="M180 410V167L360 62l180 105v243M225 410h270" />
            <path className="pipe-muted flow-draw" pathLength="1" d="M28 376h96" />
            <path className="pipe-main flow-draw" pathLength="1" d="M28 376H102C120 376 123 335 148 335H378" />
            <g className="filter-bank" transform="translate(126 297)">
              {[0, 1, 2].map((stage) => (
                <g className="flow-stage" key={stage} transform={`translate(${stage * 54} 0)`}>
                  <rect x="0" y="0" width="42" height="76" rx="18" />
                  <path d="M8 18h26M8 56h26" />
                  <text x="21" y="47" textAnchor="middle">{stage + 1}</text>
                </g>
              ))}
            </g>
            <text className="supply-label" x="28" y="356">STREET SUPPLY</text>
            <text className="system-label" x="126" y="288">AQUA MANTRA SYSTEM</text>

            <path className="pipe-branch kitchen" pathLength="1" d="M378 335C382 301 374 239 391 215C405 197 424 202 446 202" />
            <path className="pipe-branch shower" pathLength="1" d="M378 335C427 335 516 337 551 299C574 274 580 231 580 182" />
            <path className="pipe-branch laundry" pathLength="1" d="M378 335C407 335 438 342 448 369C452 380 450 393 450 408" />
            <path className="pipe-branch garden" pathLength="1" d="M378 335C440 335 543 336 580 361C597 372 604 389 604 408" />

            <g className="travelling-water" key={active} aria-hidden="true">
              <path id={`active-water-route-${active}`} className="active-water-route" pathLength="1" d={routePaths[active]} />
              {[0, 1, 2].map((particle) => (
                <circle className={`water-particle particle-${particle + 1}`} r={particle === 1 ? 4 : 3} key={particle}>
                  <animateMotion dur="3.2s" begin={`${particle * -1.06}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#active-water-route-${active}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>

            <g className="outlet kitchen" transform="translate(448 175)">
              <path d="M0 22h34V7h25v16M8 22v23M52 22v23" /><circle cx="29" cy="53" r="4" />
              <text x="30" y="76" textAnchor="middle">KITCHEN</text>
            </g>
            <g className="outlet shower" transform="translate(551 111)">
              <path d="M0 33V9h33c13 0 21 7 21 20" /><path d="M46 31l18 8M42 40l17 8M37 49l17 8" />
              <text x="31" y="78" textAnchor="middle">SHOWER</text>
            </g>
            <g className="outlet laundry" transform="translate(418 408)">
              <rect x="0" y="0" width="64" height="58" rx="3" /><circle cx="32" cy="32" r="17" /><path d="M8 9h18" />
              <text x="32" y="78" textAnchor="middle">LAUNDRY</text>
            </g>
            <g className="outlet garden" transform="translate(574 407)">
              <path d="M0 14h37V1h16v19H36v20" /><path d="M26 40c0 8-6 14-13 14S0 48 0 40" />
              <text x="26" y="78" textAnchor="middle">GARDEN</text>
            </g>
          </svg>
          <div className="outlet-controls" aria-label="Explore water outlets">
            {outlets.map(item => (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "active" : undefined}
                aria-pressed={active === item.id}
                onClick={() => { setActive(item.id); setInteracted(true); }}
                onPointerEnter={() => { setActive(item.id); setInteracted(true); }}
                onFocus={() => { setActive(item.id); setInteracted(true); }}
              >
                <span>{item.label}</span><small>{item.note}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="v2-trust-line shell"><span>Property-led advice</span><span>Professional installation</span><span>Ongoing filter support</span></div>
    </section>
  );
}
