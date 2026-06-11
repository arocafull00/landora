"use client";

import { dispatchEditorFocusElement } from "@/lib/editor-element-focus";
import { useDashboardStore } from "@/stores/dashboard-store";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import type { Landing } from "@/lib/dashboard-data";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function VelarContactEditorPanel({ activeLanding }: { activeLanding: Landing }) {
  const { updateContact } = useDashboardStore();
  const contact = activeLanding.content.contact;

  return (
    <section className="space-y-8 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Contacto</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Datos usados en los botones de WhatsApp, email y ubicación de la landing.
        </p>
      </div>

      <SectionHeadingFields
        activeLanding={activeLanding}
        anchor="inquire"
        fallback={SECTION_HEADING_DEFAULTS.velar.inquire}
        groupLabel="Encabezado de sección"
      />

      <div className="space-y-5">
        <div>
          <label className="block">
            <span className="mb-1 block font-label text-label-md text-on-surface-variant">
              WhatsApp / Teléfono
            </span>
            <p className="mb-2 text-body-sm text-on-surface-variant">
              Formato internacional sin espacios. Ej: +34612345678
            </p>
            <input
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
              onBlur={() => dispatchEditorFocusElement(null)}
              onChange={(e) => updateContact(activeLanding.id, { phone: e.target.value })}
              onFocus={() => dispatchEditorFocusElement("inquire:phone")}
              type="tel"
              value={contact.phone}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Email
          </span>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            onBlur={() => dispatchEditorFocusElement(null)}
            onChange={(e) => updateContact(activeLanding.id, { email: e.target.value })}
            onFocus={() => dispatchEditorFocusElement("inquire:email")}
            type="email"
            value={contact.email}
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Ubicación
          </span>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            onBlur={() => dispatchEditorFocusElement(null)}
            onChange={(e) => updateContact(activeLanding.id, { address: e.target.value })}
            onFocus={() => dispatchEditorFocusElement("inquire:address")}
            value={contact.address}
          />
        </label>
      </div>
    </section>
  );
}
