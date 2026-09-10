import type { Metadata } from "next";
import Link from "next/link";

/**
 * Its own title and description, and `canonical: null` so this page does not
 * inherit the homepage canonical from app/layout.tsx and point every missing
 * URL at "/".
 */
export const metadata: Metadata = {
  title: "Page not found | Aqua Mantra Filters",
  description: "That page is not here. Return home, compare whole-house systems or book a water consultation with Aqua Mantra Filters.",
  alternates: { canonical: null },
};

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><p className="eyebrow">404 · Page not found</p><h1>This path does not hold water.</h1><p>The page may have moved. Return home, compare systems or book a water consultation.</p><div className="button-row"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/contact-us">Book a consultation</Link></div></div></main>;
}
