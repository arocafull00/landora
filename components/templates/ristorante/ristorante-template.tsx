import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { RistoranteTemplateClient } from "@/components/templates/ristorante/ristorante-template-client";

export function RistoranteTemplate({
  content,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  return (
    <RistoranteTemplateClient
      content={content}
      topOffset={topOffset}
      slug={slug}
      previewLandingId={previewLandingId}
      bookingEnabled={bookingEnabled}
      sectionSelections={sectionSelections}
    />
  );
}
