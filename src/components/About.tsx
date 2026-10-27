import { ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <SectionLabel>A considered approach</SectionLabel>
          <p className="mt-7 text-sm leading-7 text-muted">
            Good interiors are not just about how a space looks. They are about
            how naturally it works for the people who live in it.
          </p>
        </div>

        <div>
          <h2 className="display-heading text-balance text-4xl sm:text-5xl lg:text-[4.4rem]">
            Spaces that feel
            <br className="hidden sm:block" />{" "}
            <span className="italic text-accent">like yours.</span>
          </h2>

          <p className="mt-7 max-w-[600px] text-sm leading-7 text-muted sm:text-base sm:leading-8">
            At Sahyadri Steel Studio, our focus is on bringing together
            thoughtful planning, practical functionality, and a considered
            choice of materials. Every space begins with understanding how you
            want to live.
          </p>

          {/* TODO: replace with the client's real explanation of "Steel" in their work. */}
          <p className="mt-5 max-w-[600px] text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Our name reflects what we build with: durable, well-engineered
            fittings and frameworks that keep your interiors looking good for
            years.
          </p>

          <a
            href="#services"
            className="mt-7 inline-flex items-center gap-3 border-b border-accent pb-2 text-xs font-medium"
          >
            Discover What We Do
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}