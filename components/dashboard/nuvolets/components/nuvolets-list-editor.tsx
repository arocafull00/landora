"use client";

import type { UseFormReturn } from "react-hook-form";
import { Plus } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY, type NuvoletsList } from "../nuvolets-copy";
import { useNuvoletsList } from "../hooks/use-nuvolets-list";
import { NuvoletsListItem } from "./nuvolets-list-item";

export function NuvoletsListEditor({ definition, form, sync }: { definition: NuvoletsList; form: UseFormReturn<NuvoletsContent>; sync: () => void }) {
  const { fields, add, remove, move } = useNuvoletsList(definition, form, sync);
  return <section className="space-y-4"><h3 className="font-semibold text-ink">{definition.label}</h3>{fields.map((field, index) => <NuvoletsListItem key={field.id} definition={definition} index={index} count={fields.length} form={form} sync={sync} remove={remove} move={move} />)}<button type="button" onClick={add} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-ink"><Plus size={16} aria-hidden />{NUVOLETS_EDITOR_COPY.add}</button></section>;
}
