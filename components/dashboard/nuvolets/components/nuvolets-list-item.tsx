import type { Path, UseFormReturn } from "react-hook-form";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { Separator } from "@/components/ui/separator";
import type { NuvoletsList } from "../nuvolets-copy";
import { NuvoletsFormField } from "./nuvolets-form-field";
import { NuvoletsListItemActions } from "./nuvolets-list-item-actions";

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

export function NuvoletsListItem({ definition, index, count, form, sync, remove, move }: { definition: NuvoletsList; index: number; count: number; form: UseFormReturn<NuvoletsContent>; sync: () => void; remove: (index: number) => void; move: (from: number, to: number) => void }) {
  const fieldPath = (name: string) => `${definition.name}.${index}.${name}` as Path<NuvoletsContent>;

  if (isSingleLineTextList(definition)) {
    const field = definition.fields[0];
    return (
      <div className="flex items-center gap-3 py-1">
        <NuvoletsFormField definition={{ ...field, name: fieldPath(field.name) }} form={form} sync={sync} layout="inline" />
        <NuvoletsListItemActions index={index} count={count} remove={remove} move={move} />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {index > 0 ? <Separator className="mb-6" /> : null}
      <div className="flex justify-end gap-2">
        <NuvoletsListItemActions index={index} count={count} remove={remove} move={move} />
      </div>
      {definition.fields.map((field) => (
        <NuvoletsFormField key={field.name} definition={{ ...field, name: fieldPath(field.name) }} form={form} sync={sync} />
      ))}
    </div>
  );
}
