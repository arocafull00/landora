import type { GalleryItem, TemplateId } from "@/lib/dashboard-data";
import { SIGNAL_DEFAULT_CONTENT } from "@/lib/templates/signal/content";
import { STUDIO_DEFAULT_CONTENT } from "@/lib/templates/studio/content";
import { FLORISTERIA_DEFAULT_CONTENT } from "@/lib/templates/floristeria/content";
import { COFFEE_SHOP_DEFAULT_CONTENT } from "@/lib/templates/coffee-shop/content";
import { enrichSignalGallery } from "@/lib/signal-case-defaults";

const GALLERY_SECTION_ITEM_COUNT = 7;

const LEGACY_GALLERY_DEFAULTS: Partial<Record<TemplateId, GalleryItem[]>> = {
  studio: STUDIO_DEFAULT_CONTENT.gallery,
  floristeria: FLORISTERIA_DEFAULT_CONTENT.gallery,
  "coffee-shop": COFFEE_SHOP_DEFAULT_CONTENT.gallery,
};

function usesFixedGallerySection(templateId: TemplateId) {
  return Object.hasOwn(LEGACY_GALLERY_DEFAULTS, templateId);
}

export function isLegacySignalGallery(gallery: GalleryItem[]) {
  if (gallery.length !== 4 && gallery.length !== 5) return false;

  const descriptions = new Set(gallery.map((item) => item.description));
  const original = [
    "Elaborar informes requería procesar tests y consolidar resultados manualmente.",
    "Revisar licitaciones y analizar su documentación consumía tiempo cada día.",
    "Una presencia digital que necesitaba facilitar las reservas.",
    "Integrar inteligencia artificial en productos digitales reales, a escala.",
  ].every((description) => descriptions.has(description));
  const interim = [
    "Integración de inteligencia artificial en productos digitales reales, a escala.",
    "Automatización de informes clínicos y seguimiento del estado emocional de pacientes.",
    "Plataforma OTT para distribución de contenido en múltiples dispositivos.",
    "Búsqueda y análisis de licitaciones y evaluación de su viabilidad.",
  ].every((description) => descriptions.has(description));

  return original || interim;
}

export function resolveGalleryItems(templateId: TemplateId, gallery: GalleryItem[]) {
  if (templateId === "signal" && isLegacySignalGallery(gallery)) {
    return enrichSignalGallery(SIGNAL_DEFAULT_CONTENT.gallery ?? []);
  }

  if (templateId === "signal") {
    return enrichSignalGallery(gallery);
  }

  if (!usesFixedGallerySection(templateId)) return gallery;

  if (gallery.length >= GALLERY_SECTION_ITEM_COUNT) {
    return gallery.slice(0, GALLERY_SECTION_ITEM_COUNT);
  }

  const defaults = LEGACY_GALLERY_DEFAULTS[templateId] ?? [];
  const resolved = [...gallery];

  for (let index = gallery.length; index < GALLERY_SECTION_ITEM_COUNT; index++) {
    const fallback = defaults[index];
    resolved.push(fallback ?? { id: `g${index + 1}`, image: "" });
  }

  return resolved;
}
