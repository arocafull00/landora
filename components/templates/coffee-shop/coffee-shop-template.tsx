import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopTemplateClient } from "@/components/templates/coffee-shop/coffee-shop-template-client";

export function CoffeeShopTemplate({
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
    <CoffeeShopTemplateClient
      content={content}
      topOffset={topOffset}
      slug={slug}
      bookingEnabled={bookingEnabled}
    />
  );
}
