"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const filterLabels: Record<ProjectCategory | "All", string> = {
  All: "All",
  Kitchens: "Kitchens",
  Wardrobes: "Wardrobes",
  Vanities: "Vanities",
  "Full home": "Full home",
};

// Editorial rhythm for the full set: a wide/narrow pair, a row of three,
// then one panoramic image. Filtered views fall back to an even grid.
const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-5", aspect: "aspect-[4/3] lg:aspect-auto lg:h-full" },
  { span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-12", aspect: "aspect-[4/3] sm:aspect-[21/9]" },
];

function ConceptTag({ project }: { project: Project }) {
  if (project.completed) return null;
  return (
    <span className="absolute left-4 top-4 bg-graphite/70 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
      Concept
    </span>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const current = active === null ? null : visible[active];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const step = (dir: 1 | -1) =>
    setActive((i) =>
      i === null ? i : (i + dir + visible.length) % visible.length
    );

  return (
    <section
      id="projects"
      data-tone="dark"
      aria-labelledby="projects-title"
      className="section on-dark bg-graphite text-ivory"
    >
      <div className="shell">
        <SectionHeading
          dark
          number="05"
          id="projects-title"
          eyebrow="Selected work"
          aside="Concept visuals"
          title={
            <>
              Spaces worth <em>coming home to.</em>
            </>
          }
          intro="A curated set of concept visuals that show the direction of our work: steel kitchens organised drawer by drawer, glass wardrobes and vanities made for wet rooms."
        />

        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-6 border-y border-ivory/15 py-4">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-6 gap-y-2">
            {(["All", ...projectCategories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
                className={`nav-link text-[12px] uppercase tracking-[0.16em] transition-colors ${
                  filter === cat
                    ? "text-ivory"
                    : "text-ivory/55 hover:text-ivory"
                }`}
              >
                {filterLabels[cat]}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-ivory/55" aria-live="polite">
            {visible.length} {visible.length === 1 ? "concept" : "concepts"}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {visible.map((project, i) => {
            const slot =
              filter === "All"
                ? layout[i % layout.length]
                : { span: "lg:col-span-6", aspect: "aspect-[4/3]" };
            const wide = slot.span === "lg:col-span-12";
            return (
              <li
                key={project.slug}
                className={`${slot.span} ${wide ? "sm:col-span-2" : ""} flex flex-col`}
              >
                <Reveal variant="media" className="flex flex-1 flex-col">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex flex-1 flex-col text-left"
                  aria-label={`View ${project.title}, ${project.label}`}
                >
                  <span className={`media media-zoom block w-full bg-graphite-soft ${slot.aspect} lg:flex-1`}>
                    <Photo
                      image={project.image}
                      sizes={
                        wide
                          ? "100vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      }
                    />
                    <ConceptTag project={project} />
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-ivory text-graphite opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 size={16} strokeWidth={1.5} />
                    </span>
                  </span>
                  <span className="mt-5 grid grid-cols-[2.2rem_1fr] items-baseline border-t border-ivory/15 pt-4">
                    <span className="font-serif text-base italic text-champagne">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="display text-[1.6rem] leading-tight transition-colors duration-500 group-hover:text-champagne">
                        {project.title}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-ivory/50">
                        {project.label}
                      </span>
                    </span>
                  </span>
                </button>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-16 max-w-[640px] text-[12px] leading-6 text-ivory/50">
          Concept visuals for illustration and inspiration. They are not
          completed Sahyadri Steel Studio projects. Our own project photography
          will be added here soon.
        </p>
      </div>

      <dialog
        ref={dialog}
        aria-label={current ? current.title : "Project viewer"}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="on-dark m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 text-ivory backdrop:bg-graphite/95"
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] uppercase tracking-[0.2em] text-ivory/60">
                {String(active! + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close project viewer"
                autoFocus
                className="flex h-11 w-11 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              <div className="media absolute inset-0 bg-graphite-soft">
                <Photo
                  key={current.slug}
                  image={current.image}
                  sizes="100vw"
                  fit="contain"
                  className="fade-up"
                />
              </div>
            </div>

            <div className="mt-5 grid items-end gap-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">
                  {current.label}
                  {!current.completed && " · Concept visual"}
                </p>
                <h3 className="display mt-2 text-3xl sm:text-4xl">{current.title}</h3>
                <p className="mt-2 max-w-[620px] text-sm leading-6 text-ivory/70">
                  {current.description}
                </p>
              </div>
              {visible.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                    className="flex h-12 w-12 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next project"
                    className="flex h-12 w-12 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
