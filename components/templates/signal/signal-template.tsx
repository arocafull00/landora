import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getSignalCaseContent } from "@/components/templates/signal/signal-case-content";
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
  initialCaseSlug,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
  initialCaseSlug?: string;
}) {
  const { gallery, heading } = getSignalCaseContent(content);
  const resolvedContent = {
    ...content,
    gallery,
    sectionHeadings: { ...content.sectionHeadings, capacidades: heading },
  };

  return (
    <SignalTemplateClient
      content={resolvedContent}
      copyrightYear={copyrightYear}
      renderedAt={renderedAt}
      topOffset={topOffset}
      slug={slug}
      previewLandingId={previewLandingId}
      bookingEnabled={bookingEnabled}
      sectionSelections={sectionSelections}
      initialCaseSlug={initialCaseSlug}
    />
  );
}
