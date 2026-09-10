import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-lede">{text}</p>}</div>;
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return <section className={`page-hero${image ? " has-image" : ""}`} style={image ? { backgroundImage: `linear-gradient(rgba(5,33,49,.62), rgba(5,33,49,.72)), url(${image})` } : undefined}><div className="shell"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}

export function ConsultationBand({ title = "Start with your home, not a generic package." }: { title?: string }) {
  return <section className="consultation-band"><div className="shell"><div><p className="eyebrow light">Free water consultation</p><h2>{title}</h2><p>Tell us your postcode, water source and priorities. We will use those details to shape the next conversation.</p></div><Link className="button button-light" href="/contact-us/">Book a consultation <ArrowUpRight size={18} /></Link></div></section>;
}

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="shell breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

