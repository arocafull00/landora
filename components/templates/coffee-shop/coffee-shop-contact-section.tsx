"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopButton } from "@/components/templates/coffee-shop/coffee-shop-button";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useAnalytics } from "@/hooks/use-analytics";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría hacer un pedido.")}`;
}

export function CoffeeShopContactSection({ content }: { content: LandingContent }) {
  const { trackWhatsAppClick, trackPhoneClick, trackLeadGenerated } = useAnalytics();
  const whatsappLink = getWhatsAppLink(content.contact.phone);
  const heading = getSectionHeading(
    content,
    "contacto",
    SECTION_HEADING_DEFAULTS["coffee-shop"].contacto,
  );

  return (
    <footer
      id="contacto"
      className="scroll-mt-24 bg-[var(--coffee-secondary)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              className="mb-6 text-balance text-[clamp(36px,6vw,72px)] font-semibold leading-[1.02] text-[var(--coffee-foreground)]"
              style={{ fontFamily: "var(--font-coffee-display)", letterSpacing: "-0.03em" }}
            >
              {heading.title}
            </h2>
            {heading.subtitle ? (
              <p
                className="mb-10 max-w-lg text-pretty text-lg leading-relaxed text-[var(--coffee-foreground)]/80"
                style={{ fontFamily: "var(--font-coffee-body)" }}
              >
                {heading.subtitle}
              </p>
            ) : null}
            <CoffeeShopButton
              href={whatsappLink}
              size="lg"
              variant="accent"
              onClick={() => {
                trackWhatsAppClick();
                trackLeadGenerated();
              }}
            >
              {content.contact.ctaLabel ?? "Escribir por WhatsApp"}
            </CoffeeShopButton>
          </div>

          <div className="flex flex-col justify-end gap-8 border-t border-[var(--coffee-foreground)]/15 pt-10 lg:border-t-0 lg:pt-0">
            {content.contact.phone ? (
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coffee-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--coffee-foreground)]/75"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
                  >
                    Teléfono
                  </p>
                  <a
                    className="text-sm text-[var(--coffee-foreground)]/90 transition-colors hover:text-[var(--coffee-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]"
                    href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                    onClick={() => trackPhoneClick()}
                  >
                    {content.contact.phone}
                  </a>
                </div>
              </div>
            ) : null}
            {content.contact.email ? (
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coffee-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--coffee-foreground)]/75"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
                  >
                    Email
                  </p>
                  <a
                    className="text-sm text-[var(--coffee-foreground)]/90 transition-colors hover:text-[var(--coffee-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]"
                    href={`mailto:${content.contact.email}`}
                  >
                    {content.contact.email}
                  </a>
                </div>
              </div>
            ) : null}
            {content.contact.address ? (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coffee-accent)]" />
                <div>
                  <p
                    className="text-xs font-medium text-[var(--coffee-foreground)]/75"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
                  >
                    Dirección
                  </p>
                  <p
                    className="text-sm text-[var(--coffee-foreground)]/90"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
                  >
                    {content.contact.address}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 space-y-6 border-t border-[var(--coffee-foreground)]/15 pt-8 text-center">
          <FooterSocialLinks contact={content.contact} />
          <FooterCopyright brand={content.brand} contact={content.contact} />
        </div>
      </div>
    </footer>
  );
}
