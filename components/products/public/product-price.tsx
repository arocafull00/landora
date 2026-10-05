import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatProductPrice } from "@/lib/products";

const COPY = { label: "Precio en tienda", available: "Disponible en tienda", out: "Agotado" } as const;

export function ProductPrice({ price, previousPrice, discounted, available }: { price: number | null; previousPrice: number | null; discounted: boolean; available: boolean }) {
  return (
    <div className="mt-10">
      <Separator />
      <div className="flex items-center justify-between gap-4 pt-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45">{COPY.label}</p>
          <p className="mt-1 flex items-baseline gap-3 font-headline text-3xl">
            {formatProductPrice(price)}
            {discounted ? <del className="font-body text-base text-ink/45">{formatProductPrice(previousPrice)}</del> : null}
          </p>
        </div>
        <Badge className="bg-tone-2 px-4 py-2 text-sm font-semibold text-ink/70">{available ? COPY.available : COPY.out}</Badge>
      </div>
    </div>
  );
}
