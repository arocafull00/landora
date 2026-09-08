import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp-link";

export function WhatsappFloatButton({
  phone,
  message = "Hola, me gustaría contactar.",
}: {
  phone: string;
  message?: string;
}) {
  const href = getWhatsAppLink(phone, message);

  if (!href) return null;

  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      data-analytics-event="whatsapp_click"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle className="size-7" strokeWidth={1.75} />
    </a>
  );
}
