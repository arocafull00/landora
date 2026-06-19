"use client";

import { MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría contactar.")}`;
}

export function WhatsappFloatButton({ phone }: { phone: string }) {
  const { trackWhatsAppClick } = useAnalytics();
  const href = getWhatsAppLink(phone);

  if (!href) return null;

  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      href={href}
      onClick={() => trackWhatsAppClick()}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle className="size-7" strokeWidth={1.75} />
    </a>
  );
}
