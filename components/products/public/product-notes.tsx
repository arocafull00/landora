import { Cloud, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import type { ProductCharacteristic } from "@/lib/domain/dtos";
import { CharacteristicRow } from "./characteristic-row";
import { ProductNote } from "./product-note";

const COPY = { description: "Descripción", details: "Detalles" } as const;

export function ProductNotes({ description, characteristics }: { description: string; characteristics: ProductCharacteristic[] }) {
  if (!description && !characteristics.length) return null;
  return (
    <div className="mt-8 space-y-6">
        {description ? (
          <>
            <Separator />
            <ProductNote icon={Cloud} title={COPY.description}>
              <p className="whitespace-pre-line pl-10">{description}</p>
            </ProductNote>
          </>
        ) : null}
        {characteristics.length ? (
          <>
            <Separator />
            <ProductNote icon={Sparkles} title={COPY.details}>
              <Card className="@container gap-0 rounded-2xl border-0 bg-surface-container-low p-5 text-ink shadow-none sm:p-6">
                <ul className="grid items-center gap-6 @min-[24rem]:grid-cols-2">
                  {characteristics.map((item, index) => (
                    <CharacteristicRow key={`${item.name}:${index}`} item={item} divided={index % 2 === 1} />
                  ))}
                </ul>
              </Card>
            </ProductNote>
          </>
        ) : null}
    </div>
  );
}
