"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

type ContactEditorPanelProps = {
  activeLanding: Landing;
};

export function ContactEditorPanel({ activeLanding }: ContactEditorPanelProps) {
  const { updateContact } = useDashboardStore();
  const contact = activeLanding.content.contact;
  const templateId = activeLanding.template as TemplateId;
  const contactHeadingFallback = SECTION_HEADING_DEFAULTS[templateId]?.contacto;

  return (
    <section className="space-y-5 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Contacto</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Información de contacto y texto del botón de acción.
        </p>
      </div>

      {contactHeadingFallback ? (
        <SectionHeadingFields
          activeLanding={activeLanding}
          anchor="contacto"
          fallback={contactHeadingFallback}
        />
      ) : null}

      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Email
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => updateContact(activeLanding.id, { email: e.target.value })}
          type="email"
          value={contact.email}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Teléfono
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => updateContact(activeLanding.id, { phone: e.target.value })}
          type="tel"
          value={contact.phone}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Ubicación
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => updateContact(activeLanding.id, { address: e.target.value })}
          type="text"
          value={contact.address}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Texto del botón CTA
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => updateContact(activeLanding.id, { ctaLabel: e.target.value })}
          placeholder="Ej: Reservar por WhatsApp"
          type="text"
          value={contact.ctaLabel ?? ""}
        />
      </label>
    </section>
  );
}
