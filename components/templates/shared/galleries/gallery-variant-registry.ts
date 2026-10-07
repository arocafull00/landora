import type { GalleryVariantId } from "@/lib/dashboard-data";
import { VELAR_ASSETS } from "@/lib/velar-assets";

export type GalleryVariantDefinition = {
  id: GalleryVariantId;
  label: string;
  description: string;
  thumbnail: string;
};

const GALLERY_VARIANTS: Record<
  GalleryVariantId,
  GalleryVariantDefinition
> = {
  grid: {
    id: "grid",
    label: "Mosaico",
    description: "Retícula dinámica que combina imágenes grandes y pequeñas.",
    thumbnail: VELAR_ASSETS.toll1,
  },
  polaroid: {
    id: "polaroid",
    label: "Polaroid",
    description: "Álbum informal para contar momentos, personas y detalles.",
    thumbnail: VELAR_ASSETS.toll2,
  },
  cinematic: {
    id: "cinematic",
    label: "Cinemática",
    description: "Recorrido horizontal inmersivo con textos sobre la imagen.",
    thumbnail: VELAR_ASSETS.toll3,
  },
};

export function getGalleryVariants(): GalleryVariantDefinition[] {
  return Object.values(GALLERY_VARIANTS);
}

export function getGalleryVariant(
  id: GalleryVariantId,
): GalleryVariantDefinition {
  return GALLERY_VARIANTS[id] ?? GALLERY_VARIANTS.grid;
}
