"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#projects" },
  { label: "How We Work", href: "/#approach" },
  { label: "Studios", href: "/#studios" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Sahyadri Steel Studio home"
          className="shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <span className="block font-serif text-[21px] leading-none tracking-[-0.06em]">
            SAHYADRI
          </span>
          <span className="mt-1 block text-[10px] font-medium tracking-[0.25em] text-muted">
            STEEL STUDIO
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden items-center gap-3 bg-foreground px-5 py-3 text-[11px] font-medium tracking-wide text-white transition-colors hover:bg-accent sm:inline-flex"
        >
          Discuss Your Project
          <ArrowUpRight size={14} />
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center border border-border lg:hidden"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-[18px] py-5 lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-border py-4 text-sm"
            >
              {item.label}
              <ArrowUpRight size={15} />
            </Link>
          ))}

          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 bg-foreground px-5 py-4 text-sm text-white"
          >
            Discuss Your Project
            <ArrowRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
