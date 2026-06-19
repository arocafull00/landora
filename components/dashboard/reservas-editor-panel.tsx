"use client";

import Link from "next/link";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { Panel } from "@/components/ui/primitives";

export function ReservasEditorPanel({
  activeLanding,
  bookingEnabled,
}: {
  activeLanding: Landing;
  bookingEnabled: boolean;
}) {
  const templateId = activeLanding.template as TemplateId;
  const fallback = SECTION_HEADING_DEFAULTS[templateId].reservas ?? {
    title: "Reserva tu cita",
    subtitle: "Elige servicio, profesional y horario.",
  };

  return (
    <section className="space-y-5 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Reservas</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Textos de la sección de reservas en tu landing. Los servicios y empleados se
          configuran en el dashboard.
        </p>
      </div>

      {!bookingEnabled ? (
        <Panel className="space-y-3 p-4">
          <p className="font-body text-body-sm text-on-surface">
            Las reservas no están activadas todavía.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Actívalas en Reservas → Ajustes para que el widget aparezca en tu landing
            publicada.
          </p>
          <Link
            className="inline-flex font-label text-label-md text-primary hover:underline"
            href="/bookings"
          >
            Ir a ajustes de reservas
          </Link>
        </Panel>
      ) : null}

      <SectionHeadingFields activeLanding={activeLanding} anchor="reservas" fallback={fallback} />
    </section>
  );
}
