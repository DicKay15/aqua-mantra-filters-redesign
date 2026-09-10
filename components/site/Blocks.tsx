import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { siteUrl } from "@/lib/site";

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-lede">{text}</p>}</div>;
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return <section className={`page-hero${image ? " has-image" : ""}`} style={image ? { backgroundImage: `url(${image})` } : undefined}><div className="shell"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}

/**
 * A note addressed to Aqua Mantra, not to the visitor.
 *
 * Anything the client still has to verify belongs in here. It must never be
 * written as body copy or as a heading, because a homeowner reading the page
 * should not be told, section after section, that nothing on the site is
 * confirmed. One note per section, not one per item.
 */
export function ReviewNote({ children }: { children: React.ReactNode }) {
  return <aside className="review-note"><span className="review-note-tag">Review build</span><p>{children}</p></aside>;
}

export function ConsultationBand({ title = "Every recommendation starts with your property." }: { title?: string }) {
  return <section className="consultation-band"><div className="shell"><div><p className="eyebrow light">Free water consultation</p><h2>{title}</h2><p>Tell us your postcode, water source and priorities. We will use those details to shape the next conversation.</p></div><Link className="button button-light" href="/contact-us">Book a consultation <ArrowUpRight size={18} /></Link></div></section>;
}

/**
 * Breadcrumb trail and its BreadcrumbList schema, emitted together so the
 * markup and the structured data cannot drift apart.
 */
export function Breadcrumbs({ current, path }: { current: string; path: string }) {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: current, item: new URL(path, siteUrl).toString() },
      ],
    }} />
    <nav className="shell breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>
  </>;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
