"use client";

import { CalendarCheck, ArrowRight } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VelarServicePanel } from "@/components/templates/velar/velar-service-panel";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hola, me gustaría consultar disponibilidad para un evento.")}`;
}

export function VelarServicesSection({ content }: { content: LandingContent }) {
  if (!content.services || content.services.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "servicios",
    SECTION_HEADING_DEFAULTS.velar.servicios,
  );
  const whatsappLink = getWhatsAppLink(content.contact.phone);

  return (
    <section
      id="servicios"
      className="relative z-[25] bg-[#f5f0ea] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p
            className="mb-6 text-xs uppercase tracking-widest text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SERVICIOS GENERALES INCLUIDOS
          </p>
          <h2
            className="mx-auto mb-6 max-w-4xl font-extrabold leading-tight text-[#171717]"
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
              className="mb-6 text-lg text-[#171717]/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          <a
            href={whatsappLink}
            className="mx-auto inline-flex max-w-[280px] cursor-pointer flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-semibold uppercase tracking-wide text-[#213138] hover:underline sm:max-w-sm sm:text-sm"
            style={{ fontFamily: "var(--font-syne)" }}
            target="_blank"
            rel="noopener noreferrer"
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
          >
            consulta disponibilidad
          </VelarButton>
        </div>
      </div>
    </section>
  );
}
