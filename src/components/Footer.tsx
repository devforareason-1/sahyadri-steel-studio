import Link from "next/link";
import { locations, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-shell grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div>
          <Link href="/" className="inline-block">
            <span className="block font-serif text-2xl tracking-[-0.06em]">
              SAHYADRI
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.25em] text-muted">
              STEEL STUDIO
            </span>
          </Link>
          <p className="mt-5 max-w-[260px] text-sm leading-7 text-muted">
            Kitchens, wardrobes and interiors for homes in Shimoga and Udupi.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-muted">
            <Link href="/#services" className="hover:text-foreground">
              Services
            </Link>
            <Link href="/#projects" className="hover:text-foreground">
              Our Work
            </Link>
            <Link href="/#about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/#studios" className="hover:text-foreground">
              Studios
            </Link>
            <Link href="/#contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="eyebrow">Studios</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
            {locations.map((loc) => (
              <div key={loc.slug}>
                <p className="text-foreground">{loc.city}</p>
                {loc.address && <p>{loc.address}</p>}
                {loc.phone && (
                  <a
                    href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-foreground"
                  >
                    {loc.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Get in touch</p>
          <div className="mt-5 space-y-2 text-sm leading-7 text-muted">
            {site.phone && (
              <p>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-foreground"
                >
                  {site.phone}
                </a>
              </p>
            )}
            {site.email && (
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-foreground"
                >
                  {site.email}
                </a>
              </p>
            )}
            {site.instagram && (
              <p>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Instagram
                </a>
              </p>
            )}
            <p>
              <Link href="/#contact" className="hover:text-foreground">
                Message us on WhatsApp
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="section-rule">
        <div className="container-shell py-5 text-[11px] text-muted">
          <p>
            © {new Date().getFullYear()} Sahyadri Steel Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
