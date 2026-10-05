import type { ProductCharacteristic } from "@/lib/domain/dtos";

export function CharacteristicRow({ item }: { item: ProductCharacteristic }) {
  return (
    <li>
      <span className="font-semibold text-ink">{item.name}:</span> {item.value}
    </li>
  );
}
