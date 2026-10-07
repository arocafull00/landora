"use client";

import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "@/stores/dashboard-store";
import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { EMPTY_RISTORANTE_EDITOR_VALUES } from "@/components/dashboard/ristorante/ristorante-editor-copy";

export function useRistoranteEditor() {
  const { activeEditorTab, activeLandingId, landings, isAdmin, updateSectionItem, updateSectionHeading, updateStory } = useDashboardStore(useShallow((state) => ({ activeEditorTab: state.activeEditorTab, activeLandingId: state.activeLandingId, landings: state.landings, isAdmin: state.isAdmin, updateSectionItem: state.updateSectionItem, updateSectionHeading: state.updateSectionHeading, updateStory: state.updateStory })));
  const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];
  const anchor = ({ Carta: "carta", Compartir: "compartir", Especial: "especial", Galeria: "nosotros" } as Record<string, string>)[activeEditorTab];
  const heading = landing?.content.sectionHeadings[anchor] ?? SECTION_HEADING_DEFAULTS.ristorante[anchor];
  const headingValues = { ...EMPTY_RISTORANTE_EDITOR_VALUES, title: heading?.title ?? "", subtitle: heading?.subtitle ?? "", description: activeEditorTab === "Compartir" ? landing?.content.story?.statement ?? "" : "" };
  const galleryRange = activeEditorTab === "Compartir" ? [0, 1] : activeEditorTab === "Especial" ? [1, 2] : [2];
  const gallery = landing?.content.gallery?.slice(galleryRange[0], galleryRange[1]) ?? [];
  const applyHeading = (values: RistoranteEditorValues) => {
    if (!landing) return;
    updateSectionHeading(landing.id, anchor, { title: values.title, subtitle: values.subtitle });
    if (activeEditorTab === "Compartir") updateStory(landing.id, { statement: values.description });
  };
  const applyItem = (section: string, id: string, values: RistoranteEditorValues) => {
    if (!landing) return;
    if (section === "serviceMenu") {
      updateSectionItem(landing.id, section, id, { name: values.title, description: values.description, category: values.category, price: values.price, image: values.image });
      return;
    }
    if (section === "gallery") {
      updateSectionItem(landing.id, section, id, { title: values.title, description: values.description, image: values.image });
      return;
    }
    updateSectionItem(landing.id, section, id, { title: values.title });
  };
  return { landing, activeEditorTab, isAdmin, anchor, headingValues, gallery, applyHeading, applyItem };
}
