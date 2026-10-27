import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:hidden"
    >
      <MessageCircle size={26} />
    </a>
  );
}