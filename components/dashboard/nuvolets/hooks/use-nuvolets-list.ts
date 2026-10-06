"use client";

import { useFieldArray, type FieldArray, type FieldArrayPath, type UseFormReturn } from "react-hook-form";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import type { NuvoletsList } from "../nuvolets-copy";

export function useNuvoletsList(definition: NuvoletsList, form: UseFormReturn<NuvoletsContent>, sync: () => void) {
  const array = useFieldArray({ control: form.control, name: definition.name });
  const add = () => {
    const value = { id: crypto.randomUUID(), ...(definition.name === "categories" ? { href: "" } : {}), ...Object.fromEntries(definition.fields.map((field) => [field.name, field.type === "tone" ? "blue" : ""])) };
    array.append(value as FieldArray<NuvoletsContent, FieldArrayPath<NuvoletsContent>>);
    sync();
  };
  const remove = (index: number) => { array.remove(index); sync(); };
  const move = (from: number, to: number) => { array.move(from, to); sync(); };
  return { fields: array.fields, add, remove, move };
}
