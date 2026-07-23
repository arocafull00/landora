import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { FloristeriaTemplateClient } from "@/components/templates/floristeria/floristeria-template-client";

export function FloristeriaTemplate({
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
    <FloristeriaTemplateClient
      content={content}
      topOffset={topOffset}
      slug={slug}
      previewLandingId={previewLandingId}
      bookingEnabled={bookingEnabled}
      sectionSelections={sectionSelections}
    />
  );
}
