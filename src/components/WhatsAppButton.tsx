import { whatsappUrl } from "@/data/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center justify-center gap-3 rounded-full bg-[#1fa855] px-4 text-white shadow-lg transition-transform hover:scale-105 md:px-6"
    >
      <WhatsAppIcon size={26} />
      <span className="hidden text-sm font-medium md:inline">Chat with us</span>
    </a>
  );
}
