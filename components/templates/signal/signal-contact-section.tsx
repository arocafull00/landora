import { Mail, MapPin, Phone } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SignalCtaButton } from "@/components/templates/signal/signal-cta-button";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría hablar de un proyecto.")}`;
}

export function SignalContactSection({
  content,
  copyrightYear,
}: {
  content: LandingContent;
  copyrightYear: number;
}) {
  const heading = getSectionHeading(
    content,
    "contacto",
    SECTION_HEADING_DEFAULTS.signal.contacto,
  );
  const whatsappLink = getWhatsAppLink(content.contact.phone);

  return (
    <footer
      id="contacto"
      data-signal-scene="contacto"
      className="scroll-mt-24 border-t border-[var(--site-on-dark)]/15 bg-[var(--site-dark)] px-4 py-20 text-[var(--site-on-dark)] md:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2
            className="max-w-md text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]"
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-md text-base text-[var(--site-on-dark)]/65"
              style={{ fontFamily: "var(--site-font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          <div className="mt-8">
            <SignalCtaButton
              href={whatsappLink}
              label={content.contact.ctaLabel || "Escribir por WhatsApp"}
            />
          </div>
        </div>
        <div className="space-y-6 self-end">
          {content.contact.phone ? (
            <div className="flex items-start gap-3">
              <Phone aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
              <a
                className="text-sm text-[var(--site-on-dark)]/85 transition-colors hover:text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
                href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                data-analytics-event="phone_click"
              >
                {content.contact.phone}
              </a>
            </div>
          ) : null}
          {content.contact.email ? (
            <div className="flex items-start gap-3">
              <Mail aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
              <a
                className="text-sm text-[var(--site-on-dark)]/85 transition-colors hover:text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
                href={`mailto:${content.contact.email}`}
              >
                {content.contact.email}
              </a>
            </div>
          ) : null}
          {content.contact.address ? (
            <div className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
              <p className="text-sm text-[var(--site-on-dark)]/85">{content.contact.address}</p>
            </div>
          ) : null}
          <FooterSocialLinks
            className="flex flex-wrap items-center gap-4 pt-2"
            contact={content.contact}
            linkClassName="text-[var(--site-on-dark)]/40 transition-colors hover:text-[var(--site-on-dark)]"
          />
        </div>
      </div>
      <div className="mt-16 border-t border-[var(--site-on-dark)]/15 pt-6">
        <FooterCopyright
          brand={content.brand}
          contact={content.contact}
          year={copyrightYear}
          className="text-xs text-[var(--site-on-dark)]/35"
        />
      </div>
    </footer>
  );
}
