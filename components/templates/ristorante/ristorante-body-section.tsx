import { GalleryRenderer } from "@/components/templates/shared/galleries/gallery-renderer";
import { RistoranteChefSection } from "@/components/templates/ristorante/ristorante-chef-section";
import { RistoranteHoursSection } from "@/components/templates/ristorante/ristorante-hours-section";
import { RistoranteStorySection } from "@/components/templates/ristorante/ristorante-story-section";
import { RistoranteTestimonialsSection } from "@/components/templates/ristorante/ristorante-testimonials-section";
import type {
  GalleryVariantId,
  LandingContent,
} from "@/lib/dashboard-data";

export function RistoranteBodySection({
  anchor,
  content,
  galleryVariantId,
}: {
  anchor: string;
  content: LandingContent;
  galleryVariantId: GalleryVariantId;
}) {
  if (anchor === "story") return <RistoranteStorySection content={content} />;
  if (anchor === "galeria") {
    return (
      <GalleryRenderer
        content={content}
        templateId="ristorante"
        variantId={galleryVariantId}
      />
    );
  }
  if (anchor === "equipo") return <RistoranteChefSection content={content} />;
  if (anchor === "horarios") return <RistoranteHoursSection content={content} />;
  if (anchor === "testimonios") {
    return <RistoranteTestimonialsSection content={content} />;
  }
  return null;
}
