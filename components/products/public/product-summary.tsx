import type { PublicProductDto } from "@/lib/domain/dtos";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductPrice } from "./product-price";
import { VariantPicker } from "./variant-picker";

export function ProductSummary({ price, previousPrice, discounted, available, variants, variantId, size, color, onSelect }: { price: number | null; previousPrice: number | null; discounted: boolean; available: boolean; variants: PublicProductDto["variants"]; variantId: string; size: string; color: string; onSelect: (id: string) => void }) {
  const hasVariants = variants.length > 1 || Boolean(size || color);
  return (
    <Card className="@container mt-7 gap-0 rounded-2xl border-0 bg-surface-container-low p-5 text-ink shadow-none sm:p-6">
      <div className={hasVariants ? "grid items-center gap-5 @min-[24rem]:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] @min-[24rem]:gap-6" : undefined}>
        <ProductPrice price={price} previousPrice={previousPrice} discounted={discounted} available={available} />
        {hasVariants ? <>
          <Separator className="@min-[24rem]:hidden" />
          <Separator orientation="vertical" className="hidden self-stretch @min-[24rem]:block @min-[24rem]:h-auto" />
          <VariantPicker variants={variants} variantId={variantId} size={size} color={color} onSelect={onSelect} />
        </> : null}
      </div>
    </Card>
  );
}
