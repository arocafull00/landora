import type { GalleryVariantId } from "@/lib/dashboard-data";
import type { GalleryVariantProps } from "@/components/templates/shared/galleries/gallery-variant-types";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { PolaroidGalleryVariant } from "@/components/templates/shared/galleries/polaroid-gallery-variant";
import { CinematicGalleryVariant } from "@/components/templates/shared/galleries/cinematic-gallery-variant";

const GALLERY_COMPONENTS = {
  grid: GallerySection,
  polaroid: PolaroidGalleryVariant,
  cinematic: CinematicGalleryVariant,
} satisfies Record<GalleryVariantId, React.ComponentType<GalleryVariantProps>>;

export function GalleryRenderer({
  variantId,
  ...props
}: GalleryVariantProps & { variantId: GalleryVariantId }) {
  const Component = GALLERY_COMPONENTS[variantId] ?? GallerySection;
  return <Component {...props} />;
}
