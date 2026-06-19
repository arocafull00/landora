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
    <section id="reservas" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-headline-lg font-semibold">{heading.title}</h2>
          {heading.subtitle ? (
            <p className="mt-2 font-body text-body-md text-on-surface-variant">
              {heading.subtitle}
            </p>
          ) : null}
        </div>
        <BookingWidget slug={slug} />
      </div>
    </section>
  );
}
