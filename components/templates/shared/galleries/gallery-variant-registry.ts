import type { GalleryVariantId } from "@/lib/dashboard-data";
import { RISTORANTE_ASSETS } from "@/lib/ristorante-assets";

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
    thumbnail: RISTORANTE_ASSETS.gallery1,
  },
  polaroid: {
    id: "polaroid",
    label: "Polaroid",
    description: "Álbum informal para contar momentos, personas y detalles.",
    thumbnail: RISTORANTE_ASSETS.gallery2,
  },
  cinematic: {
    id: "cinematic",
    label: "Cinemática",
    description: "Recorrido horizontal inmersivo con textos sobre la imagen.",
    thumbnail: RISTORANTE_ASSETS.gallery3,
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
