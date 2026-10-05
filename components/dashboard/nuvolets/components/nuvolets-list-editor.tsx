"use client";

import type { UseFormReturn } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY, type NuvoletsList } from "../nuvolets-copy";
import { useNuvoletsList } from "../hooks/use-nuvolets-list";
import { NuvoletsListItem } from "./nuvolets-list-item";

export function NuvoletsListEditor({ definition, form, sync }: { definition: NuvoletsList; form: UseFormReturn<NuvoletsContent>; sync: () => void }) {
  const { fields, add, remove, move } = useNuvoletsList(definition, form, sync);
  return (
    <section className="space-y-5">
      <Separator className="mb-6" />
      <h3 className="font-semibold text-ink">{definition.label}</h3>
      {fields.map((field, index) => (
        <NuvoletsListItem key={field.id} definition={definition} index={index} count={fields.length} form={form} sync={sync} remove={remove} move={move} />
      ))}
      <Button type="button" variant="outline" onClick={add}>
        <Plus aria-hidden />
        {NUVOLETS_EDITOR_COPY.add}
      </Button>
    </section>
  );
}
