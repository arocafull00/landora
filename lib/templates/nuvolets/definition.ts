import type { TemplateDefinition } from "@/lib/templates/types";
import { nuvoletsHeroSchema, nuvoletsLandingContentSchema } from "@/lib/schemas/nuvolets";
import { NUVOLETS_SECTION_HEADINGS } from "@/lib/nuvolets-defaults";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const NUVOLETS_TEMPLATE: TemplateDefinition = {
  id: "nuvolets",
  label: "Nuvolets",
  description: "Landing de moda infantil con catálogo informativo, tienda física y suscripciones.",
  retired: false,
  contentVersion: 1,
  rendererVersion: 1,
  storageSections: ["nuvolets", "hero", "branding", "nav", "cta"],
  validateContent: (content) => nuvoletsLandingContentSchema.safeParse(content).success,
  validateSections: (sections) => sections.hero === undefined || nuvoletsHeroSchema.safeParse(sections.hero).success,
  capabilities: { newsletter: true, booking: false },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "franja", label: "Franja", editorTabId: "Franja" },
  { anchor: "categorias", label: "Categorías", editorTabId: "Categorías" },
  { anchor: "coleccion", label: "Colección", editorTabId: "Colección" },
  { anchor: "historia", label: "Historia", editorTabId: "Historia" },
  { anchor: "favoritos", label: "Favoritos", editorTabId: "Favoritos" },
  { anchor: "tienda", label: "Tienda", editorTabId: "Tienda" },
  { anchor: "instagram", label: "Instagram", editorTabId: "Instagram" },
  { anchor: "newsletter", label: "Suscripciones", editorTabId: "Suscripciones" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", required: true },
],
  headings: NUVOLETS_SECTION_HEADINGS,
  paletteOptions: [{ id: "default", label: "Original", description: "Azul nube, rosa, amarillo y salvia.", colorScheme: "light" }, { id: "rose", label: "Rosa", description: "Rosa como acento principal.", colorScheme: "light" }, { id: "sage", label: "Salvia", description: "Verde suave como acento principal.", colorScheme: "light" }],
  editorTabs: [{ id: "Hero", label: "Hero" }, NAV_EDITOR_TAB, DESIGN_EDITOR_TAB,
      { id: "Franja", label: "Franja" }, { id: "Categorías", label: "Categorías" },
      { id: "Colección", label: "Colección" },
      { id: "Historia", label: "Historia" }, { id: "Favoritos", label: "Favoritos" },
      { id: "Tienda", label: "Tienda" }, { id: "Instagram", label: "Instagram" },
      { id: "Suscripciones", label: "Suscripciones" }, { id: "Mascota", label: "Mascota" },
      FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB],
  loadImageOptions: () => import("@/lib/templates/nuvolets/image-options").then((module) => module.NUVOLETS_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/nuvolets/content").then((module) => module.NUVOLETS_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/nuvolets/nuvolets-template").then((module) => module.NuvoletsTemplate),
  loadEditor: () => import("@/components/dashboard/nuvolets/page.client").then((module) => module.NuvoletsEditorSection),
};
