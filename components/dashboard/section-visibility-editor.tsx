"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import { SectionVisibilityRow } from "@/components/dashboard/section-visibility-row";
import {
  getOrderedRemovableSections,
  getTemplateSections,
  isSectionVisible,
} from "@/lib/template-sections";

type SectionVisibilityEditorProps = {
  activeLanding: Landing;
};

export function SectionVisibilityEditor({ activeLanding }: SectionVisibilityEditorProps) {
  const { hideSection, restoreSection, moveSection } = useDashboardStore(
    useShallow((state) => ({
      hideSection: state.hideSection,
      restoreSection: state.restoreSection,
      moveSection: state.moveSection,
    })),
  );
  const templateId = activeLanding.template as TemplateId;
  const requiredSections = getTemplateSections(templateId).filter((section) => section.required);
  const orderedRemovableSections = getOrderedRemovableSections(
    templateId,
    activeLanding.content.sectionOrder,
  );
  const hiddenSectionSet = new Set(activeLanding.content.hiddenSections ?? []);
  const visibleSections = orderedRemovableSections.filter((section) =>
    isSectionVisible(activeLanding.content, section.anchor),
  );
  const hiddenRemovableSections = orderedRemovableSections.filter((section) =>
    hiddenSectionSet.has(section.anchor),
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Secciones de la web</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Elige qué bloques aparecen en la landing y cambia su orden. Los datos se conservan al
          ocultar una sección.
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

        {visibleSections.map((section, index) => (
          <SectionVisibilityRow
            canMoveDown={index < visibleSections.length - 1}
            canMoveUp={index > 0}
            key={section.anchor}
            label={section.label}
            onHide={() => hideSection(activeLanding.id, section.anchor)}
            onMoveDown={() => moveSection(activeLanding.id, section.anchor, 1)}
            onMoveUp={() => moveSection(activeLanding.id, section.anchor, -1)}
          />
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
