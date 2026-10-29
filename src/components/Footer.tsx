import Link from "next/link";
import { services } from "@/data/services";
import { locations, site, telLink, whatsappUrl } from "@/data/site";
import { navigation } from "@/data/navigation";
import InstagramIcon from "./InstagramIcon";
import WhatsAppIcon from "./WhatsAppIcon";
import Wordmark from "./Wordmark";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ivory/50">
        {title}
      </p>
      <div className="mt-4 flex flex-col items-start gap-0.5 text-sm text-ivory/65 lg:mt-6 lg:gap-3">
        {children}
      </div>
    </div>
  );
}

// Taller on touch screens, so each link is an easy tap.
const linkClass = "inline-flex min-h-9 items-center transition-colors hover:text-ivory lg:min-h-0";

export default function Footer() {
  return (
    <footer className="on-dark bg-graphite text-ivory">
      <div className="shell pt-16 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Sahyadri Steel Studio, home" className="inline-block">
              <Wordmark size="lg" />
            </Link>
            <p className="mt-8 max-w-[340px] text-[15px] leading-7 text-ivory/65">
              A women-led interior design studio for kitchens, wardrobes and
              vanities, all built in stainless steel, with full homes on request.
              Shivamogga and Udupi, Karnataka.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahyadri Steel Studio on Instagram"
                className="flex h-11 w-11 items-center justify-center border border-ivory/25 transition-colors hover:border-ivory hover:bg-ivory hover:text-graphite"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Sahyadri Steel Studio on WhatsApp"
                className="flex h-11 w-11 items-center justify-center border border-ivory/25 transition-colors hover:border-ivory hover:bg-ivory hover:text-graphite"
              >
                <WhatsAppIcon size={17} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            <Column title="Explore">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </Column>

            <Column title="Solutions">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              ))}
            </Column>

            <Column title="Studios">
              {locations.map((loc) => (
                <div key={loc.slug}>
                  <Link href="/#studios" className={`text-ivory ${linkClass}`}>
                    {loc.city}
                  </Link>
                  <p className="mt-1 text-[13px] leading-5 text-ivory/45">
                    {loc.address || "Address to be announced"}
                  </p>
                </div>
              ))}
            </Column>

            <Column title="Contact">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex-wrap gap-x-1.5`}>
                WhatsApp <span className="whitespace-nowrap">{site.whatsappDisplay}</span>
              </a>
              {site.phone ? (
                <a href={telLink(site.phone)} className={linkClass}>
                  {site.phone}
                </a>
              ) : (
                <span className="text-ivory/40">Phone: to be announced</span>
              )}
              {site.email ? (
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              ) : (
                <span className="text-ivory/40">Email: to be announced</span>
              )}
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex-wrap gap-x-1.5`}>
                Instagram <span className="whitespace-nowrap">{site.instagramHandle}</span>
              </a>
            </Column>
          </div>
        </div>

        <div className="steel-rule mt-14 opacity-40" aria-hidden="true" />
        <div className="flex flex-col items-center gap-3 py-8 text-center text-[12px] text-ivory/45 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Sahyadri Steel Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <Link href="/privacy" className={linkClass}>
              Privacy policy
            </Link>
            <span>Imagery shown is illustrative.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
