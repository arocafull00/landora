"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import {
  NAV_ONLY_HEADING_ANCHORS,
  SECTION_HEADING_DEFAULTS,
} from "@/lib/section-headings";

type NavLabelsEditorProps = {
  activeLanding: Landing;
};

export function NavLabelsEditor({ activeLanding }: NavLabelsEditorProps) {
  const { updateNavItem } = useDashboardStore();
  const templateId = activeLanding.template as TemplateId;
  const navOnlyAnchors = NAV_ONLY_HEADING_ANCHORS[templateId] ?? [];
  const defaults = SECTION_HEADING_DEFAULTS[templateId] ?? {};

  return (
    <div className="space-y-5 rounded-lg border border-outline-variant bg-surface-container px-unit-md py-unit-sm">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Menú de navegación</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Nombres que aparecen en la barra de navegación de la landing.
        </p>
      </div>

      <div className="space-y-4">
        {activeLanding.content.nav.map((item) => (
          <label className="block" key={item.id}>
            <span className="mb-2 block font-label text-label-md text-on-surface-variant">
              {item.href}
            </span>
            <input
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
              onChange={(event) =>
                updateNavItem(activeLanding.id, item.id, { label: event.target.value })
              }
              type="text"
              value={item.label}
            />
          </label>
        ))}
      </div>

      {navOnlyAnchors.length > 0 ? (
        <div className="space-y-4 border-t border-outline-variant pt-4">
          {navOnlyAnchors.map((anchor) => {
            const fallback = defaults[anchor];
            if (!fallback) return null;

            return (
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor={anchor}
                fallback={fallback}
                key={anchor}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
