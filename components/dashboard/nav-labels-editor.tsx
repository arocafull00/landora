"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing, TemplateId } from "@/lib/dashboard-data";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { createEmptyNavLink } from "@/components/dashboard/create-empty-nav-link";
import { NavLinkEditor } from "@/components/dashboard/nav-link-editor";
import {
  NAV_ONLY_HEADING_ANCHORS,
  SECTION_HEADING_DEFAULTS,
} from "@/lib/section-headings";
import { getNavScrollTargets } from "@/lib/template-sections";

type NavLabelsEditorProps = {
  activeLanding: Landing;
};

export function NavLabelsEditor({ activeLanding }: NavLabelsEditorProps) {
  const { updateNavItem, addNavItem, removeNavItem } = useDashboardStore();
  const templateId = activeLanding.template as TemplateId;
  const navOnlyAnchors = NAV_ONLY_HEADING_ANCHORS[templateId] ?? [];
  const defaults = SECTION_HEADING_DEFAULTS[templateId] ?? {};
  const scrollTargets = getNavScrollTargets(templateId, activeLanding.slug);
  const nav = activeLanding.content.nav;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Menú de navegación</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Enlaces que aparecen en la barra de navegación de la landing.
        </p>
      </div>

      <div className="space-y-4">
        {nav.map((item, index) => (
          <NavLinkEditor
            index={index}
            item={item}
            key={item.id}
            onChange={(patch) => updateNavItem(activeLanding.id, item.id, patch)}
            onRemove={() => removeNavItem(activeLanding.id, item.id)}
            scrollTargets={scrollTargets}
          />
        ))}
      </div>

      <button
        className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
        onClick={() => {
          const firstTarget = scrollTargets[0];
          addNavItem(
            activeLanding.id,
            createEmptyNavLink(firstTarget?.href ?? "#", firstTarget?.label ?? "Nuevo enlace"),
          );
        }}
        type="button"
      >
        Añadir enlace
      </button>

      {navOnlyAnchors.length > 0 ? (
        <div className="space-y-5 border-t border-outline-variant pt-5">
          {navOnlyAnchors.map((anchor) => {
            const fallback = defaults[anchor];
            if (!fallback) return null;

            return (
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor={anchor}
                fallback={fallback}
                groupLabel={`#${anchor}`}
                key={anchor}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
