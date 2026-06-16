import type { GalleryItem, TemplateId } from "@/lib/dashboard-data";
import { getDefaultContent } from "@/lib/default-content";

export const GALLERY_SECTION_ITEM_COUNT = 7;

const GALLERY_SECTION_TEMPLATES = new Set<TemplateId>([
  "studio",
  "ristorante",
  "floristeria",
  "coffee-shop",
]);

export function usesFixedGallerySection(templateId: TemplateId) {
  return GALLERY_SECTION_TEMPLATES.has(templateId);
}

export function resolveGalleryItems(templateId: TemplateId, gallery: GalleryItem[]) {
  if (!usesFixedGallerySection(templateId)) return gallery;

  if (gallery.length >= GALLERY_SECTION_ITEM_COUNT) {
    return gallery.slice(0, GALLERY_SECTION_ITEM_COUNT);
  }

  const defaults = getDefaultContent(templateId).gallery ?? [];
  const resolved = [...gallery];

  for (let index = gallery.length; index < GALLERY_SECTION_ITEM_COUNT; index++) {
    const fallback = defaults[index];
    resolved.push(fallback ?? { id: `g${index + 1}`, image: "" });
  }

  return resolved;
}
