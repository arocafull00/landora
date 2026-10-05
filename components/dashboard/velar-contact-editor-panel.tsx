"use client";

import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { WhatsappFloatToggle } from "@/components/dashboard/whatsapp-float-toggle";
import { CompanyDetailsLink } from "@/components/dashboard/company/components/company-details-link";
import type { Landing } from "@/lib/dashboard-data";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

const COPY = { title: "Contacto", description: "El teléfono, email, dirección y redes sociales se gestionan en Datos de la empresa.", heading: "Encabezado de sección" } as const;

export function VelarContactEditorPanel({ activeLanding }: { activeLanding: Landing }) {
  return (
    <section className="space-y-8 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-ink">{COPY.title}</h3>
        <p className="mt-1 text-body-sm text-ink-secondary">{COPY.description}</p>
      </div>
      <SectionHeadingFields activeLanding={activeLanding} anchor="inquire" fallback={SECTION_HEADING_DEFAULTS.velar.inquire} groupLabel={COPY.heading} />
      <CompanyDetailsLink />
      <WhatsappFloatToggle activeLanding={activeLanding} />
    </section>
  );
}
