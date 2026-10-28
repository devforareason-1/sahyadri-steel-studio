"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/data/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-4 right-4 z-40 flex h-12 items-center justify-center gap-3 rounded-full bg-[#1fa855] px-3.5 text-white shadow-lg transition-all duration-300 hover:scale-105 md:bottom-5 md:right-5 md:h-14 md:px-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <WhatsAppIcon size={24} />
      <span className="hidden text-sm font-medium md:inline">Chat with us</span>
    </a>
  );
}