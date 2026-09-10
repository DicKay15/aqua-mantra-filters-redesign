"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const films = [
  { src: "/videos/installation-prep.mp4", poster: "/images/installations/install-2.jpg", label: "Prepare" },
  { src: "/videos/property-pipework.mp4", poster: "/images/installations/install-7.jpg", label: "Connect" },
  { src: "/videos/completed-system.mp4", poster: "/images/installations/install-19.jpg", label: "Complete" },
] as const;

export function InstallationCinema() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const videos = [...section.querySelectorAll("video")];
    const observer = new IntersectionObserver(([entry]) => {
      videos.forEach(video => entry.isIntersecting ? video.play().catch(() => {}) : video.pause());
    }, { threshold: .25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="installation-cinema" ref={sectionRef} aria-labelledby="cinema-title">
      <div className="cinema-copy">
        <p className="v2-kicker light">On site</p>
        <h2 id="cinema-title">Real work.<br />No showroom.</h2>
        <p>Actual Aqua Mantra installation footage, from preparing the property to the completed enclosure.</p>
        <Link href="/videos" className="v2-text-link light">Watch every installation film</Link>
      </div>
      <div className="cinema-films">
        {films.map(film => (
          <figure key={film.src}>
            <video muted loop playsInline preload="metadata" poster={film.poster} aria-label={`${film.label} installation footage`}>
              <source src={film.src} type="video/mp4" />
            </video>
            <figcaption><span>{film.label}</span><small>Authentic client footage</small></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
