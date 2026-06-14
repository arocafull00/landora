"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría reservar una mesa.")}`;
}

export function RistoranteContactSection({ content }: { content: LandingContent }) {
  const whatsappLink = getWhatsAppLink(content.contact.phone);
  const heading = getSectionHeading(
    content,
    "contacto",
    SECTION_HEADING_DEFAULTS.ristorante.contacto,
  );

  return (
    <footer
      id="contacto"
      className="scroll-mt-24 bg-[var(--ristorante-secondary)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              className="mb-6 text-balance text-[clamp(40px,6vw,72px)] font-normal leading-[1.0] text-[var(--ristorante-foreground)]"
              style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.03em" }}
            >
              {heading.title}
            </h2>
            {heading.subtitle ? (
              <p
                className="mb-10 max-w-lg text-pretty text-lg leading-relaxed text-[var(--ristorante-foreground)]/80"
                style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
              >
                {heading.subtitle}
              </p>
            ) : null}
            <RistoranteButton href={whatsappLink} size="lg" variant="accent">
              {content.contact.ctaLabel ?? "Reservar por WhatsApp"}
            </RistoranteButton>
          </div>

          <div className="flex flex-col justify-end gap-8 border-t border-[var(--ristorante-foreground)]/15 pt-10 lg:border-t-0 lg:pt-0">
            {content.contact.phone ? (
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ristorante-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--ristorante-foreground)]/75"
                    style={{ fontFamily: "var(--font-ristorante-body)" }}
                  >
                    Teléfono
                  </p>
                  <a
                    className="text-sm text-[var(--ristorante-foreground)]/90 transition-colors hover:text-[var(--ristorante-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
                    href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  >
                    {content.contact.phone}
                  </a>
                </div>
              </div>
            ) : null}
            {content.contact.email ? (
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ristorante-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--ristorante-foreground)]/75"
                    style={{ fontFamily: "var(--font-ristorante-body)" }}
                  >
                    Email
                  </p>
                  <a
                    className="text-sm text-[var(--ristorante-foreground)]/90 transition-colors hover:text-[var(--ristorante-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
                    href={`mailto:${content.contact.email}`}
                  >
                    {content.contact.email}
                  </a>
                </div>
              </div>
            ) : null}
            {content.contact.address ? (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ristorante-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--ristorante-foreground)]/75"
                    style={{ fontFamily: "var(--font-ristorante-body)" }}
                  >
                    Dirección
                  </p>
                  <p
                    className="text-sm text-[var(--ristorante-foreground)]/90"
                    style={{ fontFamily: "var(--font-ristorante-body)" }}
                  >
                    {content.contact.address}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 space-y-6 border-t border-[var(--ristorante-foreground)]/15 pt-8 text-center">
          <FooterSocialLinks contact={content.contact} />
          <FooterCopyright brand={content.brand} contact={content.contact} />
        </div>
      </div>
    </footer>
  );
}
