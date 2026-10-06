import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatProductPrice } from "@/lib/products";

const COPY = { label: "Precio en tienda", available: "Disponible en tienda", out: "Agotado" } as const;

export function ProductPrice({ price, previousPrice, discounted, available }: { price: number | null; previousPrice: number | null; discounted: boolean; available: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-sm text-ink-secondary">{COPY.label}</p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-headline text-4xl leading-tight tabular-nums sm:text-5xl">
        {formatProductPrice(price)}
        {discounted ? <del className="font-body text-base text-ink-secondary">{formatProductPrice(previousPrice)}</del> : null}
      </p>
      <Badge className={cn("mt-4 max-w-full gap-2 whitespace-normal rounded-full px-3 py-2 text-xs font-medium text-ink", available ? "bg-tone-2" : "bg-tone-3")}>
        <span aria-hidden className={cn("size-2 shrink-0 rounded-full", available ? "bg-success-strong" : "bg-ink-muted")} />
        {available ? COPY.available : COPY.out}
      </Badge>
    </div>
  );
}
