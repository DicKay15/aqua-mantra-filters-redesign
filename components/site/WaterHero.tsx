"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react";

const heroSlides = [
  {
    src: "/images/installations/install-18.jpg",
    alt: "A completed Aqua Mantra whole-house filtration unit with three pressure gauges and copper pipework installed beside a home.",
    label: "Complete whole-house unit",
    position: "center 36%",
  },
  {
    src: "/images/installations/install-1-alt.jpg",
    alt: "Three Aqua Mantra replacement cartridges: coconut carbon, scale carbon and antibacterial pleated filters.",
    label: "APF, SCF and CCF cartridges",
    position: "center 48%",
  },
  {
    src: "/images/installations/install-2.jpg",
    alt: "Aqua Mantra three-stage housings, enclosure and installation hardware arranged beside the open filtration unit.",
    label: "Three-stage system before installation",
    position: "center 58%",
  },
] as const;

export function WaterHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideshowPaused, setSlideshowPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const moveSlide = useCallback((direction: number) => {
    setActiveSlide(current => (current + direction + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (slideshowPaused || interactionPaused || reduceMotion) return;
    const timer = window.setInterval(() => moveSlide(1), 5200);
    return () => window.clearInterval(timer);
  }, [interactionPaused, moveSlide, reduceMotion, slideshowPaused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !mount) return;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false, powerPreference: "low-power" });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);

      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.55) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uCell: { value: 300 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }",
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uCell;
          uniform vec2 uPointer;
          uniform vec2 uResolution;

          const float TAU = 6.28318530718;

          // Iterative caustic field: refracted light folding back on itself into
          // bright ridges, the way sunlight behaves on the floor of a pool.
          // Scaled off gl_FragCoord so the cell size stays constant in pixels
          // however narrow the panel gets.
          float caustics(vec2 cell, float t) {
            vec2 p = mod(cell * TAU, TAU) - 250.0;
            vec2 i = p;
            float c = 1.0;
            const float inten = 0.005;
            for (int n = 0; n < 5; n++) {
              float ft = t * (1.0 - (3.5 / float(n + 1)));
              i = p + vec2(cos(ft - i.x) + sin(ft + i.y), sin(ft - i.y) + cos(ft + i.x));
              c += 1.0 / length(vec2(p.x / (sin(i.x + ft) / inten), p.y / (cos(i.y + ft) / inten)));
            }
            c /= 5.0;
            c = 1.17 - pow(c, 1.4);
            return clamp(pow(abs(c), 6.0), 0.0, 1.0);
          }

          void main() {
            vec2 frag = gl_FragCoord.xy;

            // One ring travelling out from the pointer, fading with distance.
            vec2 pointerPx = uPointer * uResolution;
            float d = distance(frag, pointerPx) / max(uResolution.y, 1.0);
            float ripple = sin(d * 24.0 - uTime * 2.2) * exp(-d * 5.5) * 26.0;

            float light = caustics((frag + ripple) / uCell, uTime * 0.5);
            float depth = smoothstep(0.0, 1.2, vUv.y);

            vec3 deep = vec3(0.016, 0.118, 0.169);   // #041e2b
            vec3 mid  = vec3(0.031, 0.235, 0.325);   // #083c53
            vec3 lit  = vec3(0.663, 0.851, 0.831);   // #a9d9d4

            vec3 color = mix(deep, mid, depth);
            color = mix(color, lit, light * 0.82);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount;
        if (!w || !h) return;
        const ratio = renderer.getPixelRatio();
        uniforms.uResolution.value.set(w * ratio, h * ratio);
        uniforms.uCell.value = 178 * ratio;
        renderer.setSize(w, h, false);
      };

      const pointer = (event: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        uniforms.uPointer.value.set(
          (event.clientX - rect.left) / rect.width,
          1 - (event.clientY - rect.top) / rect.height,
        );
      };

      // One loop, ever. `running` guards re-entry when the observer fires again.
      let frame = 0;
      let running = false;
      const loop = (time: number) => {
        uniforms.uTime.value = time / 1000;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running) return;
        running = true;
        frame = requestAnimationFrame(loop);
      };
      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(frame);
      };

      const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
      observer.observe(mount);

      resize();
      start();
      window.addEventListener("resize", resize);
      // Track the pointer across the whole hero, not just the panel it renders into.
      const surface = mount.closest(".water-hero") ?? mount;
      surface.addEventListener("pointermove", pointer as EventListener, { passive: true });
      setWebgl(true);

      cleanup = () => {
        stop();
        observer.disconnect();
        surface.removeEventListener("pointermove", pointer as EventListener);
        window.removeEventListener("resize", resize);
        material.dispose();
        mesh.geometry.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section className={`water-hero${webgl ? " webgl-ready" : ""}`}>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Whole-home water filtration</p>
          <h1>Better water.<br />Every tap.</h1>
          <p className="hero-intro">
            Supplied and installed across Perth, Sydney and Adelaide.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/contact-us/">
              Find my system
            </Link>
            <Link className="hero-text-link" href="/products/">Explore systems</Link>
          </div>
        </div>
      </div>

      <div
        className="hero-frame"
        aria-roledescription="carousel"
        aria-label="Aqua Mantra systems and cartridges"
        onMouseEnter={() => setInteractionPaused(true)}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={() => setInteractionPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
        }}
      >
        <div className="hero-slides" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <figure
              className={`hero-proof${index === activeSlide ? " is-active" : ""}`}
              key={slide.src}
              aria-hidden={index !== activeSlide}
            >
              <Image
                src={slide.src}
                alt={index === activeSlide ? slide.alt : ""}
                fill
                priority={index === 0}
                sizes="(max-width: 1050px) 100vw, 56vw"
                style={{ objectPosition: slide.position }}
              />
              <figcaption>{slide.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="hero-carousel-controls">
          <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous image"><ArrowLeft /></button>
          <div className="hero-carousel-dots" role="group" aria-label="Choose a hero image">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className={index === activeSlide ? "is-active" : undefined}
                key={slide.src}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${slide.label}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setSlideshowPaused(current => !current)}
              aria-label={slideshowPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {slideshowPaused ? <Play /> : <Pause />}
            </button>
          )}
          <button type="button" onClick={() => moveSlide(1)} aria-label="Next image"><ArrowRight /></button>
        </div>
      </div>

      <div className="hero-flow" aria-label="Water flows from the mains through the filtration system and throughout the home">
        <div className="hero-water" ref={mountRef} aria-hidden="true" />
        <div className="hero-water-fallback" aria-hidden="true" />
        <svg viewBox="0 0 760 82" role="img" aria-hidden="true">
          <path className="flow-pipe" d="M42 41H270C301 41 303 16 334 16H426C457 16 459 41 490 41H718" />
          <path className="flow-water" d="M42 41H270C301 41 303 16 334 16H426C457 16 459 41 490 41H718" />
          <g className="flow-unit" transform="translate(345 4)">
            <rect width="70" height="42" rx="3" />
            <circle cx="15" cy="8" r="5" /><circle cx="35" cy="8" r="5" /><circle cx="55" cy="8" r="5" />
          </g>
          <circle className="flow-node" cx="42" cy="41" r="5" />
          <circle className="flow-node" cx="718" cy="41" r="5" />
        </svg>
        <div className="flow-labels" aria-hidden="true"><span>Mains</span><span>Filtered</span><span>Every tap</span></div>
      </div>
    </section>
  );
}
