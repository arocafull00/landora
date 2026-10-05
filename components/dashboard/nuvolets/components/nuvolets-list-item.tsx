import type { Path, UseFormReturn } from "react-hook-form";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY, type NuvoletsList } from "../nuvolets-copy";
import { NuvoletsFormField } from "./nuvolets-form-field";

function isSingleLineTextList(definition: NuvoletsList) {
  if (definition.fields.length !== 1) {
    return false;
  }
  const field = definition.fields[0];
  if (!field) {
    return false;
  }
  return field.type === undefined;
}

function NuvoletsListItemActions({ index, count, remove, move }: { index: number; count: number; remove: (index: number) => void; move: (from: number, to: number) => void }) {
  return (
    <div className="flex shrink-0 gap-2">
      <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={NUVOLETS_EDITOR_COPY.up}>
        <ArrowUp size={18} aria-hidden />
      </button>
      <button type="button" onClick={() => move(index, index + 1)} disabled={index === count - 1} aria-label={NUVOLETS_EDITOR_COPY.down}>
        <ArrowDown size={18} aria-hidden />
      </button>
      <button type="button" onClick={() => remove(index)} aria-label={NUVOLETS_EDITOR_COPY.remove}>
        <Trash2 size={18} aria-hidden />
      </button>
    </div>
  );
}

export function NuvoletsListItem({ definition, index, count, form, sync, remove, move }: { definition: NuvoletsList; index: number; count: number; form: UseFormReturn<NuvoletsContent>; sync: () => void; remove: (index: number) => void; move: (from: number, to: number) => void }) {
  const fieldPath = (name: string) => `${definition.name}.${index}.${name}` as Path<NuvoletsContent>;

  if (isSingleLineTextList(definition)) {
    const field = definition.fields[0];
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
        <NuvoletsFormField definition={{ ...field, name: fieldPath(field.name) }} form={form} sync={sync} layout="inline" />
        <NuvoletsListItemActions index={index} count={count} remove={remove} move={move} />
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="flex justify-end gap-2">
        <NuvoletsListItemActions index={index} count={count} remove={remove} move={move} />
      </div>
      {definition.fields.map((field) => (
        <NuvoletsFormField key={field.name} definition={{ ...field, name: fieldPath(field.name) }} form={form} sync={sync} />
      ))}
    </div>
  );
}
