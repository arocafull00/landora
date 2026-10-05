import type { Path, UseFormReturn } from "react-hook-form";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY, type NuvoletsList } from "../nuvolets-copy";
import { NuvoletsFormField } from "./nuvolets-form-field";

export function NuvoletsListItem({ definition, index, count, form, sync, remove, move }: { definition: NuvoletsList; index: number; count: number; form: UseFormReturn<NuvoletsContent>; sync: () => void; remove: (index: number) => void; move: (from: number, to: number) => void }) {
  return <div className="space-y-4 rounded-lg border border-border p-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={NUVOLETS_EDITOR_COPY.up}><ArrowUp size={18} aria-hidden /></button><button type="button" onClick={() => move(index, index + 1)} disabled={index === count - 1} aria-label={NUVOLETS_EDITOR_COPY.down}><ArrowDown size={18} aria-hidden /></button><button type="button" onClick={() => remove(index)} aria-label={NUVOLETS_EDITOR_COPY.remove}><Trash2 size={18} aria-hidden /></button></div>{definition.fields.map((field) => <NuvoletsFormField key={field.name} definition={{ ...field, name: `${definition.name}.${index}.${field.name}` as Path<NuvoletsContent> }} form={form} sync={sync} />)}</div>;
}
