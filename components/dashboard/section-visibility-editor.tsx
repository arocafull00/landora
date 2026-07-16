"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import {
  getRemovableSections,
  getTemplateSections,
  isSectionVisible,
} from "@/lib/template-sections";

type SectionVisibilityEditorProps = {
  activeLanding: Landing;
};

export function SectionVisibilityEditor({ activeLanding }: SectionVisibilityEditorProps) {
  const { hideSection, restoreSection } = useDashboardStore(
    useShallow((state) => ({
      hideSection: state.hideSection,
      restoreSection: state.restoreSection,
    })),
  );
  const templateId = activeLanding.template as TemplateId;
  const removableSections = getRemovableSections(templateId);
  const requiredSections = getTemplateSections(templateId).filter((section) => section.required);
  const hiddenSections = activeLanding.content.hiddenSections ?? [];
  const hiddenSectionSet = new Set(hiddenSections);
  const visibleSections = removableSections.filter((section) =>
    isSectionVisible(activeLanding.content, section.anchor),
  );
  const hiddenRemovableSections = removableSections.filter((section) =>
    hiddenSectionSet.has(section.anchor),
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Secciones de la web</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Elige qué bloques aparecen en la landing. Los datos se conservan al ocultar una sección.
        </p>
      </div>

      <div className="space-y-3">
        {requiredSections.map((section) => (
          <div
            className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3"
            key={section.anchor}
          >
            <span className="text-body-md text-on-surface">{section.label}</span>
            <span className="font-label text-label-sm text-on-surface-variant">Siempre visible</span>
          </div>
        ))}

        {visibleSections.map((section) => (
          <div
            className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface px-4 py-3"
            key={section.anchor}
          >
            <span className="text-body-md text-on-surface">{section.label}</span>
            <button
              className="rounded-lg border border-outline-variant px-3 py-1.5 font-label text-label-md text-on-surface-variant transition-colors hover:bg-surface-container"
              onClick={() => hideSection(activeLanding.id, section.anchor)}
              type="button"
            >
              Ocultar
            </button>
          </div>
        ))}
      </div>

      {hiddenRemovableSections.length > 0 ? (
        <div className="space-y-3">
          <p className="font-label text-label-md text-on-surface-variant">Secciones ocultas</p>
          {hiddenRemovableSections.map((section) => (
            <div
              className="flex items-center justify-between rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-4 py-3"
              key={section.anchor}
            >
              <span className="text-body-md text-on-surface-variant">{section.label}</span>
              <button
                className="rounded-lg border border-outline-variant px-3 py-1.5 font-label text-label-md text-primary transition-colors hover:bg-surface-container"
                onClick={() => restoreSection(activeLanding.id, section.anchor)}
                type="button"
              >
                Restaurar
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
