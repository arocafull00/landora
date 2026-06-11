"use client";

import { dispatchEditorFocusElement } from "@/lib/editor-element-focus";
import { useDashboardStore } from "@/stores/dashboard-store";
import { SocialLinkFields } from "@/components/dashboard/social-link-fields";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { DEFAULT_COPYRIGHT_SUFFIX, type Landing, type TemplateId } from "@/lib/dashboard-data";
import { getFooterAnchor } from "@/lib/footer-content";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

type FooterEditorPanelProps = {
  activeLanding: Landing;
};

export function FooterEditorPanel({ activeLanding }: FooterEditorPanelProps) {
  const { updateContact } = useDashboardStore();
  const contact = activeLanding.content.contact;
  const templateId = activeLanding.template as TemplateId;
  const footerAnchor = getFooterAnchor(templateId);
  const headingFallback = SECTION_HEADING_DEFAULTS[templateId]?.[footerAnchor];
  const showCtaLabel = templateId !== "velar";

  return (
    <section className="space-y-8 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Pie de página</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Contacto, copyright y redes sociales del footer.
        </p>
      </div>

      {headingFallback && templateId !== "velar" ? (
        <SectionHeadingFields
          activeLanding={activeLanding}
          anchor={footerAnchor}
          fallback={headingFallback}
          groupLabel="Encabezado de sección"
        />
      ) : null}

      {templateId !== "velar" ? (
        <div className="space-y-5">
          <p className="font-label text-label-md text-on-surface-variant">Contacto</p>
          <EditorField
            editorId={`${footerAnchor}:email`}
            label="Email"
            onChange={(value) => updateContact(activeLanding.id, { email: value })}
            type="email"
            value={contact.email}
          />
          <EditorField
            editorId={`${footerAnchor}:phone`}
            label="Teléfono"
            onChange={(value) => updateContact(activeLanding.id, { phone: value })}
            type="tel"
            value={contact.phone}
          />
          <EditorField
            editorId={`${footerAnchor}:address`}
            label="Ubicación"
            onChange={(value) => updateContact(activeLanding.id, { address: value })}
            value={contact.address}
          />
        </div>
      ) : null}

      {showCtaLabel ? (
        <EditorField
          label="Texto del botón CTA"
          onChange={(value) => updateContact(activeLanding.id, { ctaLabel: value })}
          placeholder="Ej: Reservar por WhatsApp"
          value={contact.ctaLabel ?? ""}
        />
      ) : null}

      <div className="space-y-5">
        <div>
          <p className="font-label text-label-md text-on-surface-variant">Copyright</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            El año y la marca se generan automáticamente.
          </p>
        </div>
        <EditorField
          label="Texto tras la marca"
          onChange={(value) => updateContact(activeLanding.id, { copyrightSuffix: value })}
          placeholder={DEFAULT_COPYRIGHT_SUFFIX}
          value={contact.copyrightSuffix ?? DEFAULT_COPYRIGHT_SUFFIX}
        />
        <EditorField
          label="Línea adicional"
          onChange={(value) => updateContact(activeLanding.id, { copyrightExtra: value })}
          placeholder="Ej: Diseñado y desarrollado por..."
          value={contact.copyrightExtra ?? ""}
        />
      </div>

      <SocialLinkFields
        contact={contact}
        onChange={(socialLinks) => updateContact(activeLanding.id, { socialLinks })}
      />
    </section>
  );
}

function EditorField({
  editorId,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  editorId?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onBlur={editorId ? () => dispatchEditorFocusElement(null) : undefined}
        onChange={(event) => onChange(event.target.value)}
        onFocus={editorId ? () => dispatchEditorFocusElement(editorId) : undefined}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}
