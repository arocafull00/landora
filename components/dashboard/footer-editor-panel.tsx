"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { DEFAULT_COPYRIGHT_SUFFIX, type Landing, type TemplateId } from "@/lib/dashboard-data";
import { getFooterAnchor } from "@/lib/footer-content";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { WhatsappFloatToggle } from "@/components/dashboard/whatsapp-float-toggle";
import { CompanyDetailsLink } from "@/components/dashboard/company/components/company-details-link";
import { FooterEditorField } from "@/components/dashboard/footer-editor-field";

const COPY = {
  title: "Pie de página", description: "Presentación y copyright del footer. Los datos de contacto y redes se gestionan en Datos de la empresa.",
  heading: "Encabezado de sección", cta: "Texto del botón CTA", ctaPlaceholder: "Ej: Reservar por WhatsApp",
  copyright: "Copyright", copyrightHelp: "El año y la marca se generan automáticamente.", suffix: "Texto tras la marca",
  extra: "Línea adicional", extraPlaceholder: "Ej: Diseñado y desarrollado por...",
} as const;

export function FooterEditorPanel({ activeLanding }: { activeLanding: Landing }) {
  const updateContact = useDashboardStore((state) => state.updateContact);
  const contact = activeLanding.content.contact;
  const templateId = activeLanding.template as TemplateId;
  const footerAnchor = getFooterAnchor(templateId);
  const headingFallback = SECTION_HEADING_DEFAULTS[templateId]?.[footerAnchor];

  return (
    <section className="space-y-8 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-ink">{COPY.title}</h3>
        <p className="mt-1 text-body-sm text-ink-secondary">{COPY.description}</p>
      </div>
      <CompanyDetailsLink />
      {headingFallback && templateId !== "velar" ? (
        <SectionHeadingFields activeLanding={activeLanding} anchor={footerAnchor} fallback={headingFallback} groupLabel={COPY.heading} />
      ) : null}
      {templateId !== "velar" ? <>
        <WhatsappFloatToggle activeLanding={activeLanding} />
        <FooterEditorField label={COPY.cta} onChange={(value) => updateContact(activeLanding.id, { ctaLabel: value })} placeholder={COPY.ctaPlaceholder} value={contact.ctaLabel ?? ""} />
      </> : null}
      <div className="space-y-5">
        <div>
          <p className="font-label text-label-md text-ink-secondary">{COPY.copyright}</p>
          <p className="mt-1 text-body-sm text-ink-secondary">{COPY.copyrightHelp}</p>
        </div>
        <FooterEditorField label={COPY.suffix} onChange={(value) => updateContact(activeLanding.id, { copyrightSuffix: value })} placeholder={DEFAULT_COPYRIGHT_SUFFIX} value={contact.copyrightSuffix ?? DEFAULT_COPYRIGHT_SUFFIX} />
        <FooterEditorField label={COPY.extra} onChange={(value) => updateContact(activeLanding.id, { copyrightExtra: value })} placeholder={COPY.extraPlaceholder} value={contact.copyrightExtra ?? ""} />
      </div>
    </section>
  );
}
