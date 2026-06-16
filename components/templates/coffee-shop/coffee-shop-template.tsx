import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopFontScope } from "@/components/templates/coffee-shop/coffee-shop-font-scope";
import { CoffeeShopTemplateClient } from "@/components/templates/coffee-shop/coffee-shop-template-client";

export function CoffeeShopTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  return (
    <CoffeeShopFontScope>
      <CoffeeShopTemplateClient content={content} topOffset={topOffset} />
    </CoffeeShopFontScope>
  );
}
