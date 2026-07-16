import type { LandingContent } from "@/lib/dashboard-data";
import { FloristeriaTemplateClient } from "@/components/templates/floristeria/floristeria-template-client";

export function FloristeriaTemplate({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  return (
    <FloristeriaTemplateClient
      content={content}
      topOffset={topOffset}
      slug={slug}
      bookingEnabled={bookingEnabled}
    />
  );
}
