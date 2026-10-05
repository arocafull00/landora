import type { ProductCharacteristic } from "@/lib/domain/dtos";
export function CharacteristicRow({ item }: { item: ProductCharacteristic }) { return <div className="grid grid-cols-2 gap-4 border-b border-border py-3 text-sm"><dt className="text-ink-muted">{item.name}</dt><dd>{item.value}</dd></div>; }
