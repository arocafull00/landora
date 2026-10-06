"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import { OptionsSelect } from "@/components/products/components/options-select";
import { Label } from "@/components/ui/label";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import type { NuvoletsField } from "../nuvolets-copy";
import { useNuvoletsCategoryOptions } from "../hooks/use-nuvolets-category-options";

export function NuvoletsCategoryField({ definition, form, sync }: { definition: NuvoletsField; form: UseFormReturn<NuvoletsContent>; sync: () => void }) {
  const options = useNuvoletsCategoryOptions(form, definition.name);
  const error = form.getFieldState(definition.name, form.formState).error?.message;
  return <div className="space-y-2">
    <Label className="text-ink-secondary">{definition.label}</Label>
    <Controller name={definition.name} control={form.control} render={({ field }) => <OptionsSelect label={definition.label} value={String(field.value ?? "")} options={options} onChange={(value) => { field.onChange(value); sync(); }} />} />
    {error ? <p className="text-sm text-danger">{error}</p> : null}
  </div>;
}
