import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AssetImage } from "@/components/ui/asset-image";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { cn } from "@/lib/utils";

const COPY = { available: "Disponible en tienda", out: "Agotado" } as const;
const SHAPES = ["rounded-[42%_58%_52%_48%/46%_43%_57%_54%]", "rounded-[34%_66%_61%_39%/45%_38%_62%_55%]"] as const;
const TONES = ["bg-tone-3", "bg-tone-2", "bg-tone-4"] as const;

export function RelatedProductCard({ product, href, index }: { product: PublicProductDto; href: string; index: number }) {
  const image = product.images[0];
  const available = product.variants.some((variant) => variant.available);
  return (
    <li className={index > 1 ? "hidden md:block" : undefined}>
      <Link href={href} className="group block focus-visible:outline-2 focus-visible:outline-primary">
        <AspectRatio ratio={4 / 5} className={cn("relative overflow-hidden", SHAPES[index % SHAPES.length], TONES[index % TONES.length])}>
          {image ? <AssetImage src={image.url} alt={image.alt || product.title} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" /> : null}
        </AspectRatio>
        <h3 className="mt-4 font-semibold">{product.title}</h3>
        <p className="mt-1 text-xs text-ink/45">{available ? COPY.available : COPY.out}</p>
      </Link>
    </li>
  );
}
