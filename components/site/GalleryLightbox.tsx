"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

export type GalleryItem = { src: string; alt: string };

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => {
    setOpenIndex(null);
    opener.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => setOpenIndex(current => (current === null ? null : (current + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      if (event.key !== "Tab") return;
      // Keep Tab inside the dialog while it is open.
      const focusable = overlay.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className="gallery-grid stagger">
        {items.map((item, index) => (
          <figure key={item.src}>
            <button
              type="button"
              className="gallery-open"
              aria-haspopup="dialog"
              onClick={event => {
                opener.current = event.currentTarget;
                setOpenIndex(index);
              }}
            >
              <Image src={item.src} alt={item.alt} width={900} height={1200} sizes="(max-width: 760px) 50vw, 25vw" />
              <span className="gallery-open-hint" aria-hidden="true">Enlarge</span>
              <span className="sr-only">Enlarge photograph {index + 1} of {items.length}</span>
            </button>
            <figcaption><span>Installation {String(index + 1).padStart(2, "0")}</span></figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox"
            ref={overlay}
            role="dialog"
            aria-modal="true"
            aria-label={`Installation photograph ${(openIndex ?? 0) + 1} of ${items.length}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={event => { if (event.target === event.currentTarget) close(); }}
          >
            <motion.figure
              key={current.src}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={current.src} alt={current.alt} width={900} height={1200} sizes="90vw" />
              <figcaption>
                <span>{(openIndex ?? 0) + 1} / {items.length}</span>
                <p>{current.alt}</p>
              </figcaption>
            </motion.figure>

            <div className="lightbox-controls">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photograph"><ArrowLeft size={20} /></button>
              <button type="button" onClick={() => step(1)} aria-label="Next photograph"><ArrowRight size={20} /></button>
              <button type="button" ref={closeButton} onClick={close} aria-label="Close"><X size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
