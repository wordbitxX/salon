"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site, waLink, waMessages, wordbitx } from "@/lib/site";
import { ArrowIcon, MenuIcon, XIcon, WhatsAppIcon, PhoneIcon } from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/bridal", label: "Bridal" },
  { href: "/our-team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const isActive = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a href="#main" onClick={() => setOpen(false)} className="site-header__skip">Skip to content</a>
      <div className="site-header__surface">
        <div className="site-header__topbar">
          <div className="site-header__topbar-inner">
            <p className="site-header__address">{site.address.street}, {site.address.city} · Mon–Sat 10 AM – 9 PM · Sun 12–8 PM</p>
            <div className="site-header__meta">
              <a href={site.phoneHref}><PhoneIcon width={13} height={13} /> {site.phone}</a>
              <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="site-header__attribution">Salon Website Demo · Powered by WordbitX</a>
            </div>
          </div>
        </div>

        <div className="site-header__row">
          <Link href="/" onClick={() => setOpen(false)} className="site-header__brand" aria-label="ÉLAN Beauty Studio home">
            <span className="site-header__monogram" aria-hidden="true">É</span>
            <span className="site-header__wordmark" aria-hidden="true">
              <span className="site-header__name">ÉLAN</span>
              <span className="site-header__subtitle">Beauty Studio</span>
            </span>
          </Link>

          <nav aria-label="Main" className="site-header__desktop-nav">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              href={waLink(waMessages.book)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat and book on WhatsApp"
              title="WhatsApp Us"
              className="site-header__whatsapp"
            >
              <WhatsAppIcon width={21} height={21} />
              <span className="site-header__whatsapp-label">WhatsApp</span>
            </a>
            <Link href="/booking" onClick={() => setOpen(false)} className="site-header__book">
              Book Appointment
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="site-header__menu-toggle"
            >
              {open ? <XIcon width={21} height={21} /> : <MenuIcon width={21} height={21} />}
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className="site-header__panel" hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="site-header__mobile-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}<ArrowIcon width={17} height={17} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-header__mobile-contact">
            <a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={18} height={18} /> Chat on WhatsApp</a>
            <a href={site.phoneHref}><PhoneIcon width={18} height={18} /> {site.phone}</a>
          </div>
          <p className="site-header__mobile-credit">A <a href={wordbitx.url} target="_blank" rel="noopener noreferrer">WordbitX</a> Digital Experience</p>
        </nav>
      </div>
    </header>
  );
}
