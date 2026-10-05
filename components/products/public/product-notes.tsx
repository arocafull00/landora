import { Cloud, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ProductCharacteristic } from "@/lib/domain/dtos";
import { CharacteristicRow } from "./characteristic-row";
import { ProductNote } from "./product-note";

const COPY = { description: "Descripción", details: "Detalles" } as const;

export function ProductNotes({ description, characteristics }: { description: string; characteristics: ProductCharacteristic[] }) {
  if (!description && !characteristics.length) return null;
  return (
    <div className="mt-10">
      <Separator />
      <div className="grid gap-6 pt-8 sm:grid-cols-2">
        {description ? (
          <ProductNote icon={Cloud} title={COPY.description}>
            <p className="whitespace-pre-line">{description}</p>
          </ProductNote>
        ) : null}
        {characteristics.length ? (
          <ProductNote icon={Sparkles} title={COPY.details}>
            <ul className="space-y-1.5">
              {characteristics.map((item, index) => (
                <CharacteristicRow key={`${item.name}:${index}`} item={item} />
              ))}
            </ul>
          </ProductNote>
        ) : null}
      </div>
    </div>
  );
}
