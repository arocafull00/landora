"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { StudioButton } from "@/components/templates/studio/studio-button";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useAnalytics } from "@/hooks/use-analytics";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría reservar una cita.")}`;
}

export function StudioContactSection({ content }: { content: LandingContent }) {
  const { trackWhatsAppClick, trackPhoneClick, trackLeadGenerated } = useAnalytics();
  const whatsappLink = getWhatsAppLink(content.contact.phone);
  const heading = getSectionHeading(content, "contacto", SECTION_HEADING_DEFAULTS.studio.contacto);

  return (
    <footer id="contacto" className="scroll-mt-24 bg-[#1a1a1a] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 max-w-2xl" data-aos="fade-up">
          <h2
            className="mb-6 text-balance text-4xl font-extrabold text-white sm:text-5xl md:text-[clamp(40px,6vw,72px)]"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mb-10 max-w-lg text-pretty text-lg leading-relaxed text-white/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          <StudioButton
            href={whatsappLink}
            variant="primary"
            size="lg"
            className="!bg-[#8b7355] hover:!bg-[#7a6448]"
            onClick={() => {
              trackWhatsAppClick();
              trackLeadGenerated();
            }}
          >
            {content.contact.ctaLabel ?? "Reservar por WhatsApp"}
          </StudioButton>
        </div>

        <div
          className="flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {content.contact.phone && (
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#8b7355]" />
              <div>
                <p className="text-xs font-medium text-white/50">Teléfono</p>
                <a
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  onClick={() => trackPhoneClick()}
                >
                  {content.contact.phone}
                </a>
              </div>
            </div>
          )}
          {content.contact.email && (
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#8b7355]" />
              <div>
                <p className="text-xs font-medium text-white/50">Email</p>
                <a
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href={`mailto:${content.contact.email}`}
                >
                  {content.contact.email}
                </a>
              </div>
            </div>
          )}
          {content.contact.address && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8b7355]" />
              <div>
                <p className="text-xs font-medium text-white/50">Dirección</p>
                <p className="text-sm text-white/70">{content.contact.address}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 space-y-6 border-t border-white/10 pt-8 text-center">
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-white/40 transition-colors hover:text-white"
          />
          <FooterCopyright
            brand={content.brand}
            className="text-xs text-white/40"
            contact={content.contact}
          />
        </div>
      </div>
    </footer>
  );
}
