"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Reveal treatment. "rise" settles the block, "stagger" walks its direct children in. */
  variant?: "rise" | "stagger";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

/**
 * Scroll reveal that is safe to server-render.
 *
 * The hidden state lives in CSS inside a `scripting: enabled` query, so a visitor
 * without JavaScript still gets the full page instead of eight empty sections, and
 * nothing has to be stamped onto the document before hydration.
 */
export function MotionSection({ children, className, variant = "rise", ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-revealed");
      return;
    }
    const reveal = () => node.classList.add("is-revealed");

    // A hidden document (a background tab, a collapsed preview pane) does not
    // compute intersections, so anything already on screen at mount is revealed
    // outright rather than waiting for a callback that may never come.
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={[className, "reveal", `reveal-${variant}`].filter(Boolean).join(" ")} {...rest}>
      {children}
    </section>
  );
}
