"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site, whatsappUrl } from "@/data/site";
import Wordmark from "./Wordmark";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [veiled, setVeiled] = useState(false);
  const [nameGone, setNameGone] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // These pages open with a full-bleed dark image, so the header sits
  // transparently over it until the visitor scrolls.
  const hasHero = pathname === "/" || pathname.startsWith("/services/");

  // Over a hero the header stays dark until the hero has scrolled out from
  // under it. Once the hero starts to move, a dark veil keeps its content from
  // showing through the nav.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      const height = headerRef.current?.offsetHeight ?? 0;
      setScrolled(
        hero ? hero.getBoundingClientRect().bottom <= height + 1 : window.scrollY > 24
      );
      setVeiled(hero ? hero.getBoundingClientRect().top < -24 : false);
      // The home page's hero carries the studio's name itself, so the logo here
      // waits until that has left: scrolled past, or faded out by 420px.
      const name = document.querySelector("[data-hero-name]");
      setNameGone(
        !name || name.getBoundingClientRect().bottom <= height || window.scrollY >= 420
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    // The menu is xl:hidden, so close it if the window grows past that,
    // or the page would stay inert behind a menu nobody can see.
    const wide = window.matchMedia("(min-width: 80rem)");
    const onWide = () => wide.matches && setMenuOpen(false);

    // Keep keyboard and screen-reader focus inside the open menu: everything
    // beside the header (page, footer, WhatsApp button) goes inert.
    const header = headerRef.current;
    const behind = Array.from(header?.parentElement?.children ?? []).filter(
      (el): el is HTMLElement =>
        el !== header &&
        el instanceof HTMLElement &&
        !["SCRIPT", "NOSCRIPT", "STYLE", "LINK", "TEMPLATE"].includes(el.tagName)
    );
    behind.forEach((el) => (el.inert = true));
    header?.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      behind.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const transparent = hasHero && !scrolled && !menuOpen;
  const logoHidden = pathname === "/" && !nameGone && !menuOpen;
  const isCurrent = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header
      ref={headerRef}
      // No backdrop-filter while the menu is open: it would become the
      // containing block for the fixed menu panel and collapse it.
      data-solid={transparent || menuOpen ? undefined : ""}
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        transparent
          ? `on-dark border-b text-ivory ${
              veiled ? "border-ivory/10 bg-[#060908]/85 backdrop-blur-md" : "border-transparent"
            }`
          : menuOpen
            ? "border-b border-line bg-ivory text-graphite"
            : "border-b border-line bg-ivory/90 text-graphite backdrop-blur-md"
      }`}
    >
      <div className="shell flex h-[var(--header-height)] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Sahyadri Steel Studio, home"
          tabIndex={logoHidden ? -1 : undefined}
          className={`relative z-10 shrink-0 py-1 transition-opacity duration-500 ${
            logoHidden ? "header-wordmark" : ""
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className={`hidden xl:block ${transparent && !veiled ? "hero-nav" : ""}`}>
          <ul className="flex items-center gap-7 text-[12.5px] tracking-[0.04em]">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`nav-link transition-[color,opacity] duration-500 ${
                    transparent ? "opacity-90 hover:opacity-100" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/#contact"
            className={`btn btn-sm px-4 sm:px-[18px] ${
              transparent ? "btn-outline-light" : "btn-dark"
            }`}
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a Quote</span>
          </Link>

          <button
            ref={menuButton}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={`menu-toggle flex h-11 w-11 items-center justify-center border transition-colors xl:hidden ${
              transparent ? "border-ivory/40" : "border-line-strong"
            }`}
          >
            {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[var(--header-height)] overflow-y-auto bg-ivory xl:hidden"
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pb-10 pt-6">
          <ul>
            {navigation.map((item, i) => (
              <li
                key={item.label}
                className="fade-up border-b border-line"
                style={{ animationDelay: `${60 + i * 45}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-serif text-[1.9rem] leading-tight tracking-[-0.01em]"
                >
                  {item.label}
                  <ArrowUpRight size={18} strokeWidth={1.4} className="text-champagne-ink" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-dark"
            >
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
          </div>

          <p className="caption mt-auto pt-10 uppercase tracking-[0.2em]">
            Shivamogga · Udupi · Karnataka
          </p>
        </nav>
      </div>
    </header>
  );
}
