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
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
        {title}
      </p>
      <div className="mt-6 flex flex-col items-start gap-3 text-sm text-ivory/65">
        {children}
      </div>
    </div>
  );
}

const linkClass = "transition-colors hover:text-ivory";

export default function Footer() {
  return (
    <footer className="on-dark bg-graphite text-ivory">
      <div className="shell pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Sahyadri Steel Studio, home" className="inline-block">
              <Wordmark size="lg" />
            </Link>
            <p className="mt-8 max-w-[340px] text-[15px] leading-7 text-ivory/65">
              A women-led studio for stainless-steel kitchens, glass-and-steel
              wardrobes and vanity units, with full-home interiors on request.
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

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp {site.whatsappDisplay}
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
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Instagram {site.instagramHandle}
              </a>
            </Column>
          </div>
        </div>

        <div className="steel-rule mt-20 opacity-40" aria-hidden="true" />
        <div className="flex flex-col gap-3 py-8 text-[12px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sahyadri Steel Studio. All rights reserved.</p>
          <div className="flex gap-6">
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
