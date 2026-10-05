import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatProductPrice } from "@/lib/products";

const COPY = { label: "Precio en tienda", available: "Disponible en tienda", out: "Agotado" } as const;

export function ProductPrice({ price, previousPrice, discounted, available }: { price: number | null; previousPrice: number | null; discounted: boolean; available: boolean }) {
  return (
    <div className="mt-7">
      <Separator />
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
        <div>
          <p className="text-sm text-ink-secondary">{COPY.label}</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-headline text-4xl tabular-nums">
            {formatProductPrice(price)}
            {discounted ? <del className="font-body text-base text-ink-secondary">{formatProductPrice(previousPrice)}</del> : null}
          </p>
        </div>
        <Badge className="bg-tone-2 px-3 py-1.5 text-xs font-medium text-ink">{available ? COPY.available : COPY.out}</Badge>
      </div>
    </div>
  );
}
