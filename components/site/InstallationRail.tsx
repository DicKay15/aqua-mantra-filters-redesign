"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const steps = [
  ["install-1.jpg", "01", "Prepare", "The installation area and service route are assessed."],
  ["install-3.jpg", "02", "Set out", "The enclosure, cartridges and fittings are prepared."],
  ["install-16.jpg", "03", "Connect", "Copper pipework is measured and fitted around the property."],
  ["install-19.jpg", "04", "Hand over", "The completed enclosure is checked and ready for support."],
] as const;

export function InstallationRail() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(rail.current.clientWidth * .78, 620), behavior: "smooth" });
  return (
    <section className="installation-story" aria-labelledby="install-story-title">
      <div className="shell installation-story-head">
        <div><p className="v2-kicker">From ground to flowing</p><h2 id="install-story-title">The work behind<br />the finished system.</h2></div>
        <div className="rail-actions"><button type="button" onClick={() => move(-1)} aria-label="Previous installation step"><ArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next installation step"><ArrowRight /></button></div>
      </div>
      <div className="installation-rail" ref={rail}>
        {steps.map(([image, n, title, text]) => (
          <figure key={image}>
            <Image src={`/images/installations/${image}`} alt={`Authentic Aqua Mantra installation step: ${title}`} width={900} height={1200} />
            <figcaption><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></figcaption>
          </figure>
        ))}
        <Link href="/gallery" className="rail-end"><span>See all<br />24 photographs</span><small>Open installation gallery</small></Link>
      </div>
    </section>
  );
}
