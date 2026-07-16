import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { CoffeeShopTemplateClient } from "@/components/templates/coffee-shop/coffee-shop-template-client";

export function CoffeeShopTemplate({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  return (
    <CoffeeShopTemplateClient
      content={content}
      topOffset={topOffset}
      slug={slug}
      bookingEnabled={bookingEnabled}
      sectionSelections={sectionSelections}
    />
  );
}
