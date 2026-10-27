import Image from "next/image";
import { projects } from "@/data/projects";
import SectionLabel from "./SectionLabel";

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="display-heading mt-5 text-4xl sm:text-5xl lg:text-6xl">
              Spaces with
              <br />
              <span className="italic text-accent">a point of view.</span>
            </h2>
          </div>

          <p className="max-w-[300px] text-sm leading-7 text-muted">
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
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 90vw"
                      : "(max-width: 768px) 100vw, 45vw"
                  }
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 bg-background px-3 py-2 text-[11px] tracking-wide">
                  {project.category}
                </span>
              </div>

              <div className="pt-5">
                <h3 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-muted">{project.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}