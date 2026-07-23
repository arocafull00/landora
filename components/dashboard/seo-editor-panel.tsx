"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing } from "@/lib/dashboard-data";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { ImageField } from "@/components/dashboard/image-field";

type SeoEditorPanelProps = {
  activeLanding: Landing;
};

export function SeoEditorPanel({ activeLanding }: SeoEditorPanelProps) {
  const updateLandingMeta = useDashboardStore(
    (state) => state.updateLandingMeta,
  );

  return (
    <section className="space-y-5 py-unit-lg">
      <EditorSectionTitle
        description="Configura cómo aparece tu web en buscadores y en la pestaña del navegador."
        title="SEO"
      />
      <EditorTextField
        label="Título de la página"
        onChange={(value) => updateLandingMeta(activeLanding.id, { seoTitle: value })}
        value={activeLanding.seoTitle}
      />
      <EditorTextArea
        label="Descripción"
        onChange={(value) => updateLandingMeta(activeLanding.id, { seoDescription: value })}
        rows={4}
        value={activeLanding.seoDescription}
      />
      <ImageField
        label="Favicon"
        onChange={(value) => updateLandingMeta(activeLanding.id, { seoFavicon: value })}
        templateId={activeLanding.template}
        value={activeLanding.seoFavicon}
      />
      <ImageField
        description="Si no eliges una imagen, se usará automáticamente la imagen principal del hero."
        label="Imagen para compartir"
        onChange={(value) =>
          updateLandingMeta(activeLanding.id, { seoSocialImage: value })
        }
        templateId={activeLanding.template}
        value={activeLanding.seoSocialImage}
      />
    </section>
  );
}
