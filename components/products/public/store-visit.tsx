import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AssetImage } from "@/components/ui/asset-image";
import type { CatalogStore } from "@/lib/catalog-presentation";
import { cn } from "@/lib/utils";
import { CatalogWave } from "./catalog-wave";
import { StoreAction } from "./store-action";

export function StoreVisit({ store }: { store: CatalogStore }) {
  return (
    <>
      <CatalogWave />
      <section id="tienda" className="bg-tone-1 px-5 pb-24 pt-12 md:px-8">
        <div className={cn("mx-auto grid max-w-7xl items-center gap-10", store.image ? "lg:grid-cols-[.8fr_1.2fr]" : "")}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/45">{store.eyebrow}</p>
            <h2 className="mt-4 max-w-xl whitespace-pre-line font-headline text-4xl font-normal leading-tight sm:text-5xl">{store.title}</h2>
            <p className="mt-5 max-w-lg whitespace-pre-line leading-7 text-ink/60">{store.text}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <StoreAction href={store.primaryHref} label={store.primaryLabel} variant="primary" />
              <StoreAction href={store.secondaryHref} label={store.secondaryLabel} variant="secondary" />
            </div>
          </div>
          {store.image ? (
            <div className="relative">
              <span aria-hidden className="absolute -left-4 -top-4 size-20 rounded-full bg-tone-4" />
              <span aria-hidden className="absolute -right-4 bottom-5 size-24 rounded-full bg-tone-3" />
              <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-[34%_66%_61%_39%/45%_38%_62%_55%] bg-surface">
                <AssetImage src={store.image} alt={store.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              </AspectRatio>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
