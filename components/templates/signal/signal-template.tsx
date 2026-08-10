import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { SignalTemplateClient } from "@/components/templates/signal/signal-template-client";

export function SignalTemplate({
  content,
  copyrightYear,
  renderedAt,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  return (
    <SignalTemplateClient
      content={content}
      copyrightYear={copyrightYear}
      renderedAt={renderedAt}
      topOffset={topOffset}
      slug={slug}
      previewLandingId={previewLandingId}
      bookingEnabled={bookingEnabled}
      sectionSelections={sectionSelections}
    />
  );
}
