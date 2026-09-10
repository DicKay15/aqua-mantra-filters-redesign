"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const cityData = [
  { id: "perth", city: "Perth", line: "Water conditions can vary by source and suburb.", link: "/perth-water-filtration", position: "18%" },
  { id: "sydney", city: "Sydney", line: "Taste, odour and property conditions shape the conversation.", link: "/sydney-water-filtration", position: "48%" },
  { id: "adelaide", city: "Adelaide", line: "Start with the postcode profile and the result you want.", link: "/adelaide-water-filtration", position: "82%" },
] as const;

export function CitySwitcher() {
  const [active, setActive] = useState(0);
  const city = cityData[active];
  return (
    <section className="city-switcher shell" aria-labelledby="city-title">
      <div className="city-copy">
        <p className="v2-kicker">Local context</p>
        <h2 id="city-title">Designed around<br />where you live.</h2>
        <div className="city-tabs" role="tablist" aria-label="Service locations">
          {cityData.map((item, index) => (
            <button type="button" role="tab" aria-selected={active === index} key={item.city} onClick={() => setActive(index)}>{item.city}</button>
          ))}
        </div>
        <div className="city-answer" aria-live="polite"><span>0{active + 1}</span><p>{city.line}</p><Link href={city.link}>Explore {city.city}</Link></div>
      </div>
      <figure className="city-image">
        <Image src="/images/generated/v2-whole-home-water-use-sequence.webp" alt="Illustrative sequence of water used in a kitchen, shower, laundry and garden" fill sizes="(max-width: 900px) 100vw, 55vw" style={{ objectPosition: `${city.position} center` }} />
        <figcaption>Illustrative household water moments</figcaption>
      </figure>
    </section>
  );
}
