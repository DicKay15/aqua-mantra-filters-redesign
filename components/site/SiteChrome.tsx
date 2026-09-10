"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, Phone, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contact } from "@/lib/site";

const nav = [
  { label: "Systems", href: "/products/" },
  { label: "How it works", href: "/services/" },
  { label: "Perth", href: "/perth-water-filtration/", mobileOnly: true },
  { label: "Sydney", href: "/sydney-water-filtration/", mobileOnly: true },
  { label: "Adelaide", href: "/adelaide-water-filtration/", mobileOnly: true },
  { label: "Installations", href: "/gallery/" },
  { label: "Reviews", href: "/google-review/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about-us/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="utility-bar">
          <div className="shell utility-inner">
            <span>Whole-house water filtration, supplied and installed</span>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          </div>
        </div>
        <div className="shell nav-row">
          <Link className="brand" href="/" aria-label="Aqua Mantra Filters home">
            <Image src="/brand/aqua-mantra-logo.jpg" alt="Aqua Mantra Filters" width={125} height={86} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.filter(item => !item.mobileOnly).map(item => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
            ))}
            <details className="location-menu">
              <summary>Locations</summary>
              <div>
                <Link href="/perth-water-filtration/">Perth</Link>
                <Link href="/sydney-water-filtration/">Sydney</Link>
                <Link href="/adelaide-water-filtration/">Adelaide</Link>
              </div>
            </details>
          </nav>
          <div className="nav-actions">
            <a className="icon-call" href={contact.phoneHref} aria-label={`Call Aqua Mantra on ${contact.phoneDisplay}`}><Phone size={20} weight="regular" /></a>
            <Link className="button button-primary desktop-cta" href="/contact-us/">Book a consultation</Link>
            <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
              <span>{open ? "Close" : "Menu"}</span>{open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="shell mobile-nav-inner">
              {nav.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
              <Link className="button button-primary" href="/contact-us/" onClick={() => setOpen(false)}>Book a consultation</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Image src="/brand/aqua-mantra-logo.jpg" alt="Aqua Mantra Filters" width={126} height={87} />
          <p>Whole-house filtration advice, professional installation and ongoing filter support across Perth, Sydney and Adelaide.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/products/">Systems and filters</Link>
          <Link href="/services/">How it works</Link>
          <Link href="/gallery/">Installations</Link>
          <Link href="/guides/">Water guides</Link>
        </div>
        <div>
          <h2>Locations</h2>
          <Link href="/perth-water-filtration/">Perth</Link>
          <Link href="/sydney-water-filtration/">Sydney</Link>
          <Link href="/adelaide-water-filtration/">Adelaide</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <Link href="/contact-us/">Book a consultation</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Aqua Mantra Filters</span>
        <div><Link href="/privacy-policy/">Privacy</Link><Link href="/terms/">Terms</Link></div>
      </div>
    </footer>
  );
}
