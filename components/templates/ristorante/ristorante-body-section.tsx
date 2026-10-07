import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteMarquee } from "@/components/templates/ristorante/ristorante-marquee";
import { RistoranteMenuSection } from "@/components/templates/ristorante/ristorante-menu-section";
import { RistoranteSharingSection } from "@/components/templates/ristorante/ristorante-sharing-section";
import { RistoranteMonthSection } from "@/components/templates/ristorante/ristorante-month-section";
import { RistoranteGallerySection } from "@/components/templates/ristorante/ristorante-gallery-section";

export function RistoranteBodySection({ anchor, content }: { anchor: string; content: LandingContent }) {
  if (anchor === "franja") return <RistoranteMarquee brand={content.brand} />;
  if (anchor === "carta") return <RistoranteMenuSection content={content} />;
  if (anchor === "compartir") return <RistoranteSharingSection content={content} />;
  if (anchor === "especial") return <RistoranteMonthSection content={content} />;
  if (anchor === "marquee") return <RistoranteMarquee brand={content.brand} large />;
  if (anchor === "nosotros") return <RistoranteGallerySection content={content} />;
  return null;
}
