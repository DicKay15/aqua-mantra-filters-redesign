"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function WaterHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !mount) return;
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);
      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      };
      const material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms,
        vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
        fragmentShader: `
          precision mediump float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uPointer;
          float wave(vec2 p){
            return sin(p.x*8.0+uTime*.55)+sin(p.y*11.0-uTime*.42)+sin((p.x+p.y)*7.0+uTime*.31);
          }
          void main(){
            vec2 p=vUv;
            float d=distance(p,uPointer);
            float w=wave(p+vec2(sin(uTime*.12),cos(uTime*.1))*.05);
            float caustic=smoothstep(.45,.95,abs(sin(w*1.45+d*2.0)));
            vec3 deep=vec3(.025,.20,.30);
            vec3 clear=vec3(.20,.66,.73);
            vec3 light=vec3(.84,.96,.94);
            vec3 color=mix(deep,clear,p.y*.8+caustic*.18);
            color=mix(color,light,caustic*.18);
            gl_FragColor=vec4(color,.94);
          }
        `,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);
      const resize = () => renderer.setSize(mount.clientWidth, mount.clientHeight, false);
      const pointer = (event: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        uniforms.uPointer.value.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
      };
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) cancelAnimationFrame(frame);
        else animate();
      });
      let active = false;
      const animate = () => {
        if (active) return;
        active = true;
        const loop = (time: number) => {
          uniforms.uTime.value = time / 1000;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        active = false;
      };
      resize(); animate(); observer.observe(mount); mount.addEventListener("pointermove", pointer, { passive: true }); window.addEventListener("resize", resize);
      setWebgl(true);
      cleanup = () => {
        cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener("pointermove", pointer); window.removeEventListener("resize", resize);
        material.dispose(); mesh.geometry.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section className={`water-hero${webgl ? " webgl-ready" : ""}`}>
      <div className="hero-fallback" aria-hidden="true" />
      <div className="water-canvas" ref={mountRef} aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow light">Whole-house filtration, thoughtfully fitted</p>
          <h1>Better water starts with the right questions.</h1>
          <p className="hero-intro">We help homeowners in Perth, Sydney and Adelaide choose, install and maintain a whole-house filtration system suited to their home and priorities.</p>
          <div className="button-row">
            <Link className="button button-light" href="/contact-us/">Book a free consultation</Link>
            <Link className="button button-ghost-light" href="/products/">Compare systems</Link>
          </div>
          <p className="hero-note">Supply · professional installation · ongoing filter support</p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring"><span>3-stage</span><small>whole-home flow</small></div>
        </div>
      </div>
    </section>
  );
}

