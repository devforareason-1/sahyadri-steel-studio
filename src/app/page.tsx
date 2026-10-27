"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
ArrowDown,
ArrowRight,
ArrowUpRight,
Menu,
X,
} from "lucide-react";

const WHATSAPP_NUMBER = "916362689220"; 

const services = [
  {
    number: "01",
    title: "Modular Kitchens",
    description:
      "Thoughtfully planned kitchens where refined materials meet everyday functionality.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    alt: "Contemporary residential interior with warm natural finishes",
    href: "/services/modular-kitchens",
  },
  {
    number: "02",
    title: "Wardrobes & Storage",
    description:
      "Purpose-built storage solutions designed around your space and lifestyle.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    alt: "Contemporary interior with coordinated furniture and finishes",
    href: "/services/wardrobes",
  },
  {
    number: "03",
    title: "Interior Upgrades",
    description:
      "Considered improvements that bring a fresh perspective to existing spaces.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern interior featuring a warm, understated design",
    href: "/services/interior-upgrades",
  },
];

const projects = [
  {
    title: "The Quiet Residence",
    category: "Residential Interiors",
    location: "Project location to be confirmed",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary residential architecture",
    size: "large",
  },
  {
    title: "Natural Living",
    category: "Living Room",
    location: "Project location to be confirmed",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    alt: "Warm contemporary living room",
    size: "small",
  },
  {
    title: "Everyday Elegance",
    category: "Interior Design",
    location: "Project location to be confirmed",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    alt: "Minimal contemporary interior",
    size: "small",
  },
];

const process = [
{
number: "01",
title: "Understand",
description:
"We begin by understanding your space, preferences, requirements, and budget.",
},
{
number: "02",
title: "Design",
description:
"We explore layouts, materials, finishes, and solutions suited to your needs.",
},
{
number: "03",
title: "Execute",
description:
"The agreed design moves into execution with attention to detail and quality.",
},
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow text-[var(--accent)]">
      {children}
    </span>
  );
}

function SiteHeader() {
const [menuOpen, setMenuOpen] = useState(false);

const navigation = [
{ label: "Services", href: "#services" },
{ label: "Our Work", href: "#projects" },
{ label: "Our Approach", href: "#approach" },
{ label: "About", href: "#about" },
];

return (
<header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
<div className="container-shell flex h-[76px] items-center justify-between gap-6">
<Link
href="/"
aria-label="Sahyadri Steel Studio home"
className="shrink-0"
onClick={() => setMenuOpen(false)}
>
<span className="block font-serif text-[21px] leading-none tracking-[-0.06em]">
SAHYADRI
</span>
<span className="mt-1 block text-[9px] font-medium tracking-[0.25em] text-[var(--muted)]">
STEEL STUDIO
</span>
</Link>

    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-8 lg:flex"
    >
      {navigation.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          {item.label}
        </a>
      ))}
    </nav>

    <a
      href="#contact"
      className="hidden items-center gap-3 bg-[var(--foreground)] px-5 py-3 text-[11px] font-medium tracking-wide text-white transition-colors hover:bg-[var(--accent)] sm:inline-flex"
    >
      Discuss Your Project
      <ArrowUpRight size={14} />
    </a>

    <button
      type="button"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((open) => !open)}
      className="flex h-10 w-10 items-center justify-center border border-[var(--border)] lg:hidden"
    >
      {menuOpen ? <X size={19} /> : <Menu size={19} />}
    </button>
  </div>

  {menuOpen && (
    <nav
      aria-label="Mobile navigation"
      className="border-t border-[var(--border)] bg-[var(--background)] px-[18px] py-5 lg:hidden"
    >
      {navigation.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-between border-b border-[var(--border)] py-4 text-sm"
        >
          {item.label}
          <ArrowUpRight size={15} />
        </a>
      ))}

      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className="mt-5 flex items-center justify-center gap-2 bg-[var(--foreground)] px-5 py-4 text-sm text-white"
      >
        Discuss Your Project
        <ArrowRight size={16} />
      </a>
    </nav>
  )}
</header>

);
}

function HeroSection() {
return (
<section className="container-shell pt-8 sm:pt-10">
<div className="relative min-h-[590px] overflow-hidden bg-[#c6bcae] sm:min-h-[650px] lg:min-h-[690px]">
<Image
  src="https://placehold.co/2400x1400/F0ECE5/292A25?text=Sahyadri+Steel+Studio"
  alt="Sahyadri Steel Studio interior design"
  fill
  priority
  unoptimized
  sizes="100vw"
  className="object-cover object-center"
/>
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

    <div className="relative z-10 flex min-h-[590px] flex-col justify-between p-7 text-white sm:min-h-[650px] sm:p-12 lg:min-h-[690px] lg:p-16">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-white/85">
          Interior Design & Spaces
        </span>
        <span className="hidden text-[10px] tracking-[0.15em] text-white/75 sm:block">
          SHIMOGA · KARNATAKA
        </span>
      </div>

      <div className="max-w-[800px] pb-3">
        <p className="mb-5 text-[11px] uppercase tracking-[0.23em] text-white/80 sm:text-xs">
          Thoughtful spaces. Considered living.
        </p>

        <h1 className="display-heading text-balance text-[clamp(3.4rem,8vw,7.4rem)]">
          Designed for
          <br />
          the way you
          <br />
          <span className="italic text-[#e4d6c1]">live.</span>
        </h1>

        <p className="mt-7 max-w-[430px] text-sm leading-7 text-white/85 sm:text-base">
          Thoughtfully designed kitchens, wardrobes, and interiors that
          bring functionality and timeless character into your home.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center gap-5 bg-[var(--background)] px-5 py-3 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[#e6dfd2]"
          >
            Explore Our Work
            <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-3 border border-white/60 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-white/10"
          >
            Start a Conversation
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-white/30 pt-5">
        <span className="max-w-[240px] text-[10px] leading-5 tracking-[0.08em] text-white/75">
          DESIGN THAT RESPECTS YOUR SPACE AND YOUR EVERYDAY LIFE.
        </span>

        <a
          href="#about"
          aria-label="Scroll to learn about the studio"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white/10"
        >
          <ArrowDown size={17} />
        </a>
      </div>
    </div>
  </div>
</section>

);
}

function IntroductionSection() {
return (
<section id="about" className="section-padding">
<div className="container-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
<div>
<SectionLabel>A considered approach</SectionLabel>

      <p className="mt-7 text-sm leading-7 text-[var(--muted)]">
        Good interiors are not just about how a space looks. They are about
        how naturally it works for the people who live in it.
      </p>
    </div>

    <div>
      <h2 className="display-heading text-balance text-4xl sm:text-5xl lg:text-[4.4rem]">
        Spaces that feel
        <br className="hidden sm:block" />{" "}
        <span className="italic text-[var(--accent)]">like yours.</span>
      </h2>

      <p className="mt-7 max-w-[600px] text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
        At Sahyadri Steel Studio, our focus is on bringing together
        thoughtful planning, practical functionality, and a considered
        choice of materials. Every space begins with understanding how you
        want to live.
      </p>

      <a
        href="#services"
        className="mt-7 inline-flex items-center gap-3 border-b border-[var(--accent)] pb-2 text-xs font-medium"
      >
        Discover What We Do
        <ArrowRight size={15} />
      </a>
    </div>
  </div>
</section>

);
}

function ServicesSection() {
return (
<section id="services" className="section-padding bg-[var(--surface)]">
<div className="container-shell">
<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
<div>
<SectionLabel>What we do</SectionLabel>

        <h2 className="display-heading mt-5 max-w-[650px] text-4xl sm:text-5xl lg:text-6xl">
          Everyday spaces,
          <br />
          <span className="italic text-[var(--accent)]">
            thoughtfully made.
          </span>
        </h2>
      </div>

      <p className="max-w-[330px] text-sm leading-7 text-[var(--muted)]">
        Solutions shaped around your space, requirements, and personal
        preferences.
      </p>
    </div>

    <div className="mt-12 grid gap-7 md:grid-cols-3 md:gap-5 lg:mt-16">
      {services.map((service) => (
        <article key={service.number} className="group">
          <Link
            href={service.href}
            aria-label={`Learn about ${service.title}`}
            className="image-hover relative block aspect-[4/4.6] bg-[#ddd7cb]"
          >
            <Image
              src={service.image}
              alt={service.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />

            <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)] text-[var(--foreground)] transition-transform group-hover:rotate-45">
              <ArrowUpRight size={17} />
            </span>
          </Link>

          <div className="flex items-start justify-between gap-4 pt-5">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-[var(--accent)]">
                {service.number}
              </p>

              <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {service.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

);
}

function ProjectsSection() {
return (
<section id="projects" className="section-padding">
<div className="container-shell">
<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
<div>
<SectionLabel>Selected work</SectionLabel>

        <h2 className="display-heading mt-5 text-4xl sm:text-5xl lg:text-6xl">
          Spaces with
          <br />
          <span className="italic text-[var(--accent)]">a point of view.</span>
        </h2>
      </div>

      <p className="max-w-[300px] text-sm leading-7 text-[var(--muted)]">
        A selection of interiors and ideas that reflect our approach to
        considered living.
      </p>
    </div>

    <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-16">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className={index === 0 ? "md:col-span-2" : ""}
        >
          <div
            className={`image-hover relative bg-[#ded8cc] ${
              index === 0
                ? "aspect-[16/8]"
                : "aspect-[4/4.2] sm:aspect-[4/3.5]"
            }`}
          >
            <Image
              src={project.image}
              alt={project.alt}
              fill
              unoptimized
              sizes={
                index === 0
                  ? "(max-width: 768px) 100vw, 90vw"
                  : "(max-width: 768px) 100vw, 45vw"
              }
              className="object-cover"
            />

            <span className="absolute left-4 top-4 bg-[var(--background)] px-3 py-2 text-[10px] tracking-wide">
              {project.category}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 pt-5">
            <div>
              <h3 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                {project.title}
              </h3>

              <p className="mt-2 text-xs text-[var(--muted)]">
                {project.location}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)]"
            >
              <ArrowUpRight size={17} />
            </span>
          </div>
        </article>
      ))}
    </div>

    <p className="mt-8 text-xs leading-6 text-[var(--muted)]">
      Photography shown for design direction only. Replace with verified
      Sahyadri Steel Studio project photographs before publishing.
    </p>
  </div>
</section>

);
}

function ProcessSection() {
return (
<section id="approach" className="section-padding bg-[var(--foreground)] text-[var(--background)]">
<div className="container-shell">
<div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
<div>
<SectionLabel>How we work</SectionLabel>

        <h2 className="display-heading mt-6 text-4xl sm:text-5xl lg:text-6xl">
          From first
          <br />
          conversation
          <br />
          to finished
          <br />
          <span className="italic text-[#c4b196]">space.</span>
        </h2>

        <p className="mt-6 max-w-[350px] text-sm leading-7 text-white/60">
          A considered process helps align your expectations, design
          decisions, and project requirements from the beginning.
        </p>
      </div>

      <div className="border-t border-white/20">
        {process.map((item) => (
          <article
            key={item.number}
            className="grid gap-4 border-b border-white/20 py-8 sm:grid-cols-[70px_1fr]"
          >
            <span className="text-xs tracking-[0.15em] text-[#c4b196]">
              {item.number}
            </span>

            <div>
              <h3 className="font-serif text-3xl">{item.title}</h3>

              <p className="mt-3 max-w-[440px] text-sm leading-7 text-white/60">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

);
}

function ContactSection() {
  const whatsappUrl = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hello Sahyadri Steel Studio, I would like to discuss an interior design project."
    )}`
  : null;

return (
<section id="contact" className="section-padding">
<div className="container-shell">
<div className="relative overflow-hidden bg-[#e9e4d9] px-7 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
<div className="relative z-10 max-w-[760px]">
<SectionLabel>Let's begin</SectionLabel>

        <h2 className="display-heading mt-7 text-4xl sm:text-6xl lg:text-7xl">
          Your space.
          <br />
          Your vision.
          <br />
          <span className="italic text-[var(--accent)]">
            Let's bring it together.
          </span>
        </h2>

        <p className="mt-6 max-w-[450px] text-sm leading-7 text-[var(--muted)]">
          Tell us a little about your space and what you have in mind. We'd
          love to explore the possibilities with you.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-4 bg-[var(--foreground)] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[var(--accent)]"
            >
              Discuss on WhatsApp
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <a
              href="mailto:"
              className="inline-flex min-h-12 items-center gap-4 bg-[var(--foreground)] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[var(--accent)]"
            >
              Get in Touch
              <ArrowUpRight size={15} />
            </a>
          )}

          <a
            href="#services"
            className="inline-flex min-h-12 items-center gap-3 border border-[var(--border)] px-5 py-3 text-xs font-medium"
          >
            Explore Services
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

);
}

function SiteFooter() {
return (
<footer className="border-t border-[var(--border)]">
<div className="container-shell grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:py-14">
<div>
<Link href="/" className="inline-block">
<span className="block font-serif text-2xl tracking-[-0.06em]">
SAHYADRI
</span>
<span className="mt-1 block text-[9px] tracking-[0.25em] text-[var(--muted)]">
STEEL STUDIO
</span>
</Link>

      <p className="mt-5 max-w-[280px] text-sm leading-7 text-[var(--muted)]">
        Thoughtful interiors shaped around the way you live.
      </p>
    </div>

    <div>
      <p className="eyebrow">Explore</p>

      <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[var(--muted)]">
        <a href="#services" className="hover:text-[var(--foreground)]">
          Services
        </a>
        <a href="#projects" className="hover:text-[var(--foreground)]">
          Our Work
        </a>
        <a href="#about" className="hover:text-[var(--foreground)]">
          About the Studio
        </a>
        <a href="#contact" className="hover:text-[var(--foreground)]">
          Contact
        </a>
      </div>
    </div>

    <div>
      <p className="eyebrow">Location</p>

      <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
        Shimoga, Karnataka, India
        <br />
        Contact details to be confirmed.
      </p>
    </div>
  </div>

  <div className="section-rule">
    <div className="container-shell flex flex-col gap-3 py-5 text-[10px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Sahyadri Steel Studio.</p>
      <p>Designed for a reason 💖.</p>
    </div>
  </div>
</footer>

);
}

export default function Home() {
return (
<>
<SiteHeader />
<main>
<HeroSection />
<IntroductionSection />
<ServicesSection />
<ProjectsSection />
<ProcessSection />
<ContactSection />
</main>
<SiteFooter />
</>
);
}