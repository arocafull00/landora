import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { PalletRossTemplateClient } from "@/components/templates/pallet-ross/pallet-ross-template-client";

export function PalletRossTemplate({
  content,
  copyrightYear,
  topOffset = 0,
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
    <PalletRossTemplateClient
      content={content}
      copyrightYear={copyrightYear}
      topOffset={topOffset}
    />
  );
}
