"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/data/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [nearForm, setNearForm] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // Stay out of the way on the first screen and beside the enquiry form,
  // where WhatsApp is already offered.
  useEffect(() => {
    const hasHero = Boolean(document.querySelector("[data-hero]"));
    const onScroll = () =>
      setPastHero(!hasHero || window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("contact");
    const observer = target
      ? new IntersectionObserver(([entry]) => setNearForm(entry.isIntersecting), {
          threshold: 0.05,
        })
      : null;
    if (target) observer?.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      setNearForm(false);
    };
  }, [pathname]);

  const hidden = nearForm || !pastHero;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      tabIndex={hidden ? -1 : undefined}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-3 rounded-full border border-ivory/10 bg-graphite pl-4 pr-4 text-ivory shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)] transition-[opacity,transform,background-color] duration-500 hover:bg-walnut md:bottom-6 md:right-6 md:pr-6 ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : ""
      }`}
    >
      <span className="text-[#3ccf74]"><WhatsAppIcon size={22} /></span>
      <span className="hidden text-[13px] font-medium md:inline">
        Chat with us
      </span>
    </a>
  );
}
