"use client";

import type { ServiceMenuItem } from "@/lib/dashboard-data";
import { Separator } from "@/components/ui/separator";
import { useRistoranteMenu } from "@/components/templates/ristorante/hooks/use-ristorante-menu";
import { RistoranteMenuFilter } from "@/components/templates/ristorante/ristorante-menu-filter";
import { RistoranteMenuItem } from "@/components/templates/ristorante/ristorante-menu-item";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteMenuGrid({ items }: { items: ServiceMenuItem[] }) {
  const { active, categories, hiding, onFilter, visibleItems } = useRistoranteMenu(items);
  return (
    <>
      <div className="sticky top-[calc(var(--ristorante-offset,0px)+72px)] z-40 mt-10 bg-ristorante-cream/95 backdrop-blur md:top-[calc(var(--ristorante-offset,0px)+76px)]">
        <Separator className="bg-ristorante-olive/15" />
        <div role="group" aria-label={RISTORANTE_COPY.filters} className="ristorante-no-scrollbar mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-5 py-3 md:px-8 lg:px-12">{categories.map((category) => <RistoranteMenuFilter key={category.id} category={category} active={active === category.id} onFilter={onFilter} />)}</div>
        <Separator className="bg-ristorante-olive/15" />
      </div>
      <div id="ristorante-menu-grid" className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-x-5 gap-y-8 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">{visibleItems.map(({ item, index }) => <RistoranteMenuItem key={item.id} item={item} index={index} hiding={hiding} />)}</div>
    </>
  );
}
