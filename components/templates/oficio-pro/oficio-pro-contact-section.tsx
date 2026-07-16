"use client";

import { Calendar, Camera, Mail, MapPin, Phone } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useAnalytics } from "@/hooks/use-analytics";
import { OficioProContactItem } from "@/components/templates/oficio-pro/oficio-pro-contact-item";
import { OficioProSectionHeader } from "@/components/templates/oficio-pro/oficio-pro-section-header";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, necesito ayuda con un servicio técnico.")}`;
}

function getInstagram(content: LandingContent) {
  return content.contact.socialLinks?.find((item) => item.platform === "instagram")?.url ?? "";
}

export function OficioProContactSection({ content }: { content: LandingContent }) {
  const { trackWhatsAppClick, trackLeadGenerated } = useAnalytics();
  const heading = getSectionHeading(
    content,
    "contacto",
    SECTION_HEADING_DEFAULTS["oficio-pro"].contacto,
  );
  const instagram = getInstagram(content);

  return (
    <footer
      className="scroll-mt-24 px-7 py-16 md:px-20 lg:px-32 xl:px-44"
      id="contacto"
    >
      <div className="mx-auto max-w-7xl">
        <OficioProSectionHeader className="text-center" subtitle={heading.subtitle}>
          {heading.title}
        </OficioProSectionHeader>
        <aside className="mx-auto mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-2">
          {content.contact.phone ? (
            <OficioProContactItem
              href={getWhatsAppLink(content.contact.phone)}
              icon={Phone}
              label="WhatsApp y teléfono"
              value={content.contact.phone}
              onClick={() => {
                trackWhatsAppClick();
                trackLeadGenerated();
              }}
            />
          ) : null}
          {instagram ? (
            <OficioProContactItem
              href={instagram}
              icon={Camera}
              label="Instagram"
              value={instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")}
            />
          ) : null}
          {content.contact.email ? (
            <OficioProContactItem
              href={`mailto:${content.contact.email}`}
              icon={Mail}
              label="Email"
              value={content.contact.email}
            />
          ) : null}
          <OficioProContactItem
            icon={Calendar}
            label="Horario de atención"
            value="L-V de 9:00h a 18:00h"
          />
          {content.contact.address ? (
            <OficioProContactItem
              icon={MapPin}
              label="Zona de servicio"
              value={content.contact.address}
            />
          ) : null}
        </aside>
        <div className="mt-14 space-y-6 rounded-2xl border border-[var(--site-primary)]/10 bg-[var(--site-surface)]/80 p-6 text-center shadow-[0_10px_28px_rgba(31,78,121,0.08)]">
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-[var(--site-primary)] transition-colors hover:text-[var(--site-accent-bright)]"
          />
          <FooterCopyright
            brand={content.brand}
            className="text-xs text-[var(--site-text-muted)]"
            contact={content.contact}
          />
        </div>
      </div>
    </footer>
  );
}
