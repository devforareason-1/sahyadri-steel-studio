import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-shell grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:py-14">
        <div>
          <Link href="/" className="inline-block">
            <span className="block font-serif text-2xl tracking-[-0.06em]">
              SAHYADRI
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.25em] text-muted">
              STEEL STUDIO
            </span>
          </Link>
          <p className="mt-5 max-w-[280px] text-sm leading-7 text-muted">
            Thoughtful interiors shaped around the way you live.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-muted">
            <Link href="/#services" className="hover:text-foreground">Services</Link>
            <Link href="/#projects" className="hover:text-foreground">Our Work</Link>
            <Link href="/#about" className="hover:text-foreground">About the Studio</Link>
            <Link href="/#contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <div className="mt-5 space-y-2 text-sm leading-7 text-muted">
            <p>{site.address}</p>
            {site.phone && (
              <p>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="hover:text-foreground">
                  {site.phone}
                </a>
              </p>
            )}
            {site.email && (
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </p>
            )}
            {site.instagram && (
              <p>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Instagram
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="section-rule">
        <div className="container-shell py-5 text-[11px] text-muted">
          <p>© {new Date().getFullYear()} Sahyadri Steel Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}