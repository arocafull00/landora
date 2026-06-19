"use client";

import type { LandingContent, SectionHeading, TemplateId } from "@/lib/dashboard-data";
import { getSectionHeading } from "@/lib/section-headings";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { BookingWidget } from "@/components/booking/booking-widget";

export function LandingBookingSection({
  content,
  slug,
  templateId,
}: {
  content: LandingContent;
  slug: string;
  templateId: TemplateId;
}) {
  const fallback = SECTION_HEADING_DEFAULTS[templateId].reservas ?? {
    title: "Reserva tu cita",
    subtitle: "Elige servicio, profesional y horario.",
  };
  const heading: SectionHeading = getSectionHeading(content, "reservas", fallback);

  return (
    <section id="reservas" className="bg-surface-container-low px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="mb-4 h-1 w-12 rounded-full bg-primary" />
          <h2 className="font-headline text-headline-xl font-extrabold text-balance">
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p className="mt-3 font-body text-body-lg text-on-surface-variant">
              {heading.subtitle}
            </p>
          ) : null}
        </div>
        <BookingWidget slug={slug} />
      </div>
    </section>
  );
}
