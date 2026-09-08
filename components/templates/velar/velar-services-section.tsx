import { CalendarCheck } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VelarServicePanel } from "@/components/templates/velar/velar-service-panel";
import { VelarServicesCta } from "@/components/templates/velar/velar-services-cta";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { VELAR_CTA_LABEL, getVelarWhatsAppLink } from "@/lib/velar-links";

export function VelarServicesSection({ content }: { content: LandingContent }) {
  if (!content.services || content.services.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "servicios",
    SECTION_HEADING_DEFAULTS.velar.servicios,
  );
  const whatsappLink = getVelarWhatsAppLink(content.contact.phone);

  return (
    <section
      data-section="servicios"
      data-section-label="Servicios"
      id="servicios"
      className="relative z-[25] scroll-mt-24 bg-[var(--site-surface)] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p
            className="mb-6 uppercase tracking-widest text-[var(--site-accent)] text-site-content"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SERVICIOS GENERALES INCLUIDOS
          </p>
          <h2
            data-editor-id="servicios:heading:title"
            className="mx-auto mb-6 max-w-4xl font-extrabold leading-tight text-[var(--site-text)]"
            style={{
              fontFamily: "var(--font-marcellus)",
              letterSpacing: "-0.02em",
            }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              data-editor-id="servicios:heading:subtitle"
              className="mb-6 text-[var(--site-text)]/80 text-site-subtitle"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          {whatsappLink ? <VelarServicesCta href={whatsappLink} /> : null}
        </div>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {(content.services ?? []).map((service, index) => (
            <VelarServicePanel
              key={service.id}
              service={service}
              priority={index < 2}
            />
          ))}
        </div>

        {whatsappLink ? (
          <div className="mt-12 text-center" data-aos="fade-up">
            <VelarButton
              href={whatsappLink}
              variant="secondary"
              size="md"
              icon={<CalendarCheck className="h-5 w-5" />}
              className="uppercase"
              data-analytics-event="whatsapp_click"
            >
              {VELAR_CTA_LABEL}
            </VelarButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
