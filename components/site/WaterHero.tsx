"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { concerns } from "@/lib/site";

export function WaterHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [concern, setConcern] = useState<string | null>(null);
  const active = concerns.find(item => item.id === concern);

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

  const consultHref = concern ? `/contact-us/?concern=${concern}` : "/contact-us/";

  return (
    <section className={`water-hero${webgl ? " webgl-ready" : ""}`}>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Whole-house filtration · Perth, Sydney, Adelaide</p>
          <h1>Better water starts with the right questions.</h1>
          <p className="hero-intro">
            We help homeowners choose, install and maintain a whole-house filtration system suited to
            the property, not to a standard package.
          </p>

          <fieldset className="concern-picker">
            <legend>What are you noticing at home?</legend>
            <div className="concern-options">
              {concerns.map(item => (
                <label key={item.id} className={concern === item.id ? "is-active" : undefined}>
                  <input
                    type="radio"
                    name="concern"
                    value={item.id}
                    checked={concern === item.id}
                    onChange={() => setConcern(item.id)}
                  />
                  <span className="concern-index">{item.n}</span>
                  <span className="concern-label">{item.label}</span>
                </label>
              ))}
            </div>
            <p className="concern-answer" aria-live="polite">
              {active ? active.answer : "Choose one and we will tell you where the conversation actually starts."}
            </p>
          </fieldset>

          <div className="button-row">
            <Link className="button button-primary" href={consultHref}>
              Book a free consultation
            </Link>
            <Link className="button button-secondary" href="/products/">
              Compare systems
            </Link>
          </div>
          <p className="hero-note">Supply · professional installation · ongoing filter support</p>
        </div>
      </div>

      <div className="hero-frame">
        <div className="hero-water" ref={mountRef} aria-hidden="true" />
        <div className="hero-water-fallback" aria-hidden="true" />
        <figure className="hero-proof">
          <Image
            src="/images/installations/install-18.jpg"
            alt="An installed Aqua Mantra whole-house filtration enclosure with three pressure gauges and copper pipework, mounted in a garden bed beside a home."
            width={675}
            height={1200}
            priority
            sizes="(max-width: 1050px) 100vw, 42vw"
          />
          <figcaption>An installed Aqua Mantra system. Property details pending client confirmation.</figcaption>
        </figure>
      </div>
    </section>
  );
}
