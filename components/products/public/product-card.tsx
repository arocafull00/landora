import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { AssetImage } from "@/components/ui/asset-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { formatProductPrice, productMinPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

const COPY = { from: "Desde", available: "Disponible", out: "Agotado", price: "Precio en tienda", featured: "Destacado" } as const;
const SHAPES = ["rounded-[36%_64%_54%_46%/46%_41%_59%_54%]", "rounded-[57%_43%_36%_64%/40%_56%_44%_60%]"] as const;
const TONES = ["bg-tone-1", "bg-tone-3", "bg-tone-4", "bg-tone-2"] as const;

export function PublicProductCard({ product, basePath, selectedSize, index }: { product: PublicProductDto; basePath: string; selectedSize: string; index: number }) {
  const variants = selectedSize ? product.variants.filter((variant) => variant.size === selectedSize) : product.variants;
  const varied = new Set(variants.map((variant) => variant.priceCents ?? product.priceCents)).size > 1;
  const available = variants.some((variant) => variant.available);
  const image = product.images[0];
  return (
    <article className="min-w-0">
      <Link href={`${basePath}/${product.slug}`} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <AspectRatio ratio={4 / 5} className={cn("relative overflow-hidden", SHAPES[index % SHAPES.length], TONES[index % TONES.length])}>
          {image ? <AssetImage src={image.url} alt={image.alt || product.title} fill sizes="(min-width:1280px) 290px, (min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none" /> : <div className="grid h-full place-items-center"><ImageIcon aria-hidden className="size-12 text-ink/25" /></div>}
          {product.featured ? <Badge className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-surface/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">{COPY.featured}</Badge> : null}
        </AspectRatio>
        <div className="pt-4">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0 flex-1 basis-24">
              <h2 className="break-words font-headline text-xl font-normal leading-tight sm:text-2xl">{product.title}</h2>
              <p className="mt-1 text-xs leading-5 text-ink/60">{[product.category, product.brand].filter(Boolean).join(" · ")}</p>
            </div>
            <Badge className={cn("px-2.5 py-1 text-[10px] font-semibold text-ink", available ? "bg-tone-2" : "bg-tone-3")}>{available ? COPY.available : COPY.out}</Badge>
          </div>
          {product.subtitle ? <p className="mt-2 text-xs leading-5 text-ink/60">{product.subtitle}</p> : null}
          <p className="mt-3 text-sm font-semibold">{varied ? `${COPY.from} ` : ""}{product.priceCents === null ? formatProductPrice(null) : formatProductPrice(productMinPrice({ ...product, variants }))}</p>
          <p className="mt-1 text-xs text-ink/55">{COPY.price}</p>
        </div>
      </Link>
    </article>
  );
}
