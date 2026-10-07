import { ArrowUpRight } from "lucide-react";
import type { BenefitItem } from "@/lib/dashboard-data";

export function RistoranteIngredient({ item }: { item: BenefitItem }) {
  return <span className="flex items-center gap-1"><ArrowUpRight aria-hidden="true" className="size-4" />{item.title}</span>;
}
