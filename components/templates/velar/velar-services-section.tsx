"use client";

import { CalendarCheck, ArrowRight } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VelarServicePanel } from "@/components/templates/velar/velar-service-panel";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useEditorHighlight } from "@/lib/use-editor-highlight";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría consultar disponibilidad para un evento.")}`;
}

export function VelarServicesSection({ content }: { content: LandingContent }) {
  const { trackWhatsAppClick } = useAnalytics();
  const isHighlighted = useEditorHighlight("servicios");

  if (!content.services || content.services.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "servicios",
    SECTION_HEADING_DEFAULTS.velar.servicios,
  );
  const whatsappLink = getWhatsAppLink(content.contact.phone);

  return (
    <section
      data-section="servicios"
      data-section-label="Servicios"
      id="servicios"
      className={cn(
        "relative z-[25] scroll-mt-24 bg-[var(--site-surface)] px-6 py-20 md:px-10 lg:px-16",
        isHighlighted && "template-section--highlighted",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p
            className="mb-6 text-xs uppercase tracking-widest text-[var(--site-accent)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SERVICIOS GENERALES INCLUIDOS
          </p>
          <h2
            data-editor-id="servicios:heading:title"
            className="mx-auto mb-6 max-w-4xl font-extrabold leading-tight text-[var(--site-text)]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.02em",
            }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              data-editor-id="servicios:heading:subtitle"
              className="mb-6 text-lg text-[var(--site-text)]/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          <a
            href={whatsappLink}
            className="mx-auto inline-flex max-w-[280px] cursor-pointer flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-semibold uppercase tracking-wide text-[var(--site-primary)] hover:underline sm:max-w-sm sm:text-sm"
            style={{ fontFamily: "var(--font-syne)" }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick()}
          >
            <CalendarCheck className="h-5 w-5" />
            CONSULTA DISPONIBILIDAD Y EMPIEZA A PLANEAR TU EVENTO
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        <div
          className="grid grid-cols-1 gap-0 md:grid-cols-5"
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

        <div className="mt-12 text-center" data-aos="fade-up">
          <VelarButton
            href={whatsappLink}
            variant="secondary"
            size="md"
            icon={<CalendarCheck className="h-5 w-5" />}
            className="uppercase"
            onClick={() => trackWhatsAppClick()}
          >
            consulta disponibilidad
          </VelarButton>
        </div>
      </div>
    </section>
  );
}
