"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDown, List, Phone, X } from "@phosphor-icons/react";
import { contact } from "@/lib/site";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const primary: NavItem[] = [
  { label: "Systems", href: "/products" },
  { label: "How it works", href: "/services" },
];

const groups: NavGroup[] = [
  {
    label: "Locations",
    items: [
      { label: "Perth", href: "/perth-water-filtration" },
      { label: "Sydney", href: "/sydney-water-filtration" },
      { label: "Adelaide", href: "/adelaide-water-filtration" },
    ],
  },
  {
    label: "Results",
    items: [
      { label: "Installations", href: "/gallery" },
      { label: "Customer reviews", href: "/google-review" },
      { label: "Videos", href: "/videos" },
    ],
  },
];

const trailing: NavItem[] = [
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about-us" },
];

const mobileNav: NavItem[] = [
  ...primary,
  ...groups.flatMap(group => group.items),
  ...trailing,
];

/** `/products/` and `/products` are the same page; compare them as such. */
const samePath = (a: string, b: string) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

function NavMenu({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  // A stable id derived from the label, so server and client always agree.
  const menuId = `nav-menu-${group.label.toLowerCase()}`;
  const containsCurrent = group.items.some(item => samePath(pathname, item.href));

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapper.current?.querySelector("button")?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      className="nav-menu"
      ref={wrapper}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-current={containsCurrent ? "true" : undefined}
        onClick={() => setOpen(value => !value)}
      >
        {group.label}
        <CaretDown size={13} weight="bold" aria-hidden="true" />
      </button>
      <div className="nav-menu-list" id={menuId} hidden={!open}>
        {group.items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={samePath(pathname, item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    // Hold the page still while the panel covers it.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = previous;
    };
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
            <Image src="/brand/aqua-mantra-logo.png" alt="Aqua Mantra Filters" width={468} height={321} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {primary.map(item => (
              <Link key={item.href} href={item.href} aria-current={samePath(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            {groups.map(group => <NavMenu key={group.label} group={group} pathname={pathname} />)}
            {trailing.map(item => (
              <Link key={item.href} href={item.href} aria-current={samePath(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="icon-call" href={contact.phoneHref} aria-label={`Call Aqua Mantra on ${contact.phoneDisplay}`}>
              <Phone size={20} weight="regular" />
            </a>
            <Link className="button button-primary desktop-cta" href="/contact-us">Find my system</Link>
            <button
              className="menu-button"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(value => !value)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>
      {/* Always in the DOM so `aria-controls` always resolves. */}
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>
        <div className="shell mobile-nav-inner">
          {mobileNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={samePath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="button button-primary" href="/contact-us" onClick={close}>Find my system</Link>
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Image src="/brand/aqua-mantra-logo.png" alt="Aqua Mantra Filters" width={468} height={321} />
          <p>Whole-house filtration advice, professional installation and ongoing filter support across Perth, Sydney and Adelaide.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/products">Systems and filters</Link>
          <Link href="/services">How it works</Link>
          <Link href="/gallery">Installations</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/guides">Water guides</Link>
        </div>
        <div>
          <h2>Locations</h2>
          <Link href="/perth-water-filtration">Perth</Link>
          <Link href="/sydney-water-filtration">Sydney</Link>
          <Link href="/adelaide-water-filtration">Adelaide</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <Link href="/contact-us">Book a consultation</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Aqua Mantra Filters ·{" "}
          <em>Redesign concept for review. This is not the official Aqua Mantra website.</em>
        </span>
        <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
