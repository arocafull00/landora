import type { ProductCharacteristic } from "@/lib/domain/dtos";
import { FileText, Leaf, Ruler, Scale, Tag, type LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ICONS: Record<string, LucideIcon> = { Material: Leaf, Composición: Leaf, Medidas: Ruler, Peso: Scale, Referencia: FileText };

export function CharacteristicRow({ item, divided }: { item: ProductCharacteristic; divided: boolean }) {
  const Icon = ICONS[item.name] ?? Tag;
  return (
    <li className="relative flex min-w-0 items-center gap-4">
      {divided ? <Separator orientation="vertical" className="absolute -left-3 hidden @min-[24rem]:block" /> : null}
      <Icon aria-hidden className="size-6 shrink-0 text-ink" />
      <div className="min-w-0">
        <p className="text-sm text-ink-secondary">{item.name}</p>
        <p className="mt-1 break-words text-base leading-6 text-ink">{item.value}</p>
      </div>
    </li>
  );
}
