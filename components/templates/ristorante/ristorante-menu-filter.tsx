import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RistoranteMenuFilter({ category, active, onFilter }: { category: { id: string; label: string }; active: boolean; onFilter: (category: string) => void }) {
  return <Button aria-pressed={active} aria-controls="ristorante-menu-grid" onClick={() => onFilter(category.id)} className={cn("h-auto shrink-0 rounded-full border-2 border-ristorante-olive px-5 py-2.5 text-xs font-black tracking-[.12em] focus-visible:ring-ristorante-olive", active ? "bg-ristorante-olive text-ristorante-cream hover:bg-ristorante-olive" : "bg-transparent text-ristorante-olive hover:bg-ristorante-paper")}>{category.label}</Button>;
}
