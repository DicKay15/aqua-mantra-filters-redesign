import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><p className="eyebrow">404 · Page not found</p><h1>This path does not hold water.</h1><p>The page may have moved. Return home, compare systems or book a water consultation.</p><div className="button-row"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/contact-us/">Book a consultation</Link></div></div></main>;
}

