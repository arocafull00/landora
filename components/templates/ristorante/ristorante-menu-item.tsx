import type { ServiceMenuItem } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";
import { RISTORANTE_BADGES } from "@/components/templates/ristorante/ristorante-copy";
import { cn } from "@/lib/utils";

const BACKGROUNDS = [
  "bg-ristorante-orange/20", "bg-ristorante-tomato/10", "bg-ristorante-mustard/20", "bg-ristorante-orange/20",
  "bg-ristorante-orange/20", "bg-ristorante-mustard/20", "bg-ristorante-tomato/10", "bg-ristorante-orange/20",
  "bg-ristorante-tomato/10", "bg-ristorante-mustard/20", "bg-ristorante-orange/20", "bg-ristorante-tomato/10",
];

export function RistoranteMenuItem({ item, hiding, index }: { item: ServiceMenuItem; hiding: boolean; index: number }) {
  const badge = RISTORANTE_BADGES[index];
  return (
    <article data-hiding={hiding} className="ristorante-food-card group relative min-w-0 border border-ristorante-olive/25 bg-ristorante-paper p-4 pt-0">
      <div className={cn("ristorante-organic relative -mt-2 aspect-[1.12/1] overflow-hidden", BACKGROUNDS[index] ?? "bg-ristorante-orange/20")}><AssetImage src={item.image ?? ""} alt={item.name} fill sizes="(min-width: 1600px) 340px, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>
      {badge ? <div className={cn("absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-black", badge.className)}>{badge.label}</div> : null}
      <div className="pt-5"><div className="flex items-start justify-between gap-4"><h3 className="min-w-0 font-ristorante-display text-2xl">{item.name}</h3><span className="font-black">{item.price}</span></div><p className="mt-2 text-sm leading-relaxed text-ristorante-olive/65">{item.description}</p></div>
    </article>
  );
}
