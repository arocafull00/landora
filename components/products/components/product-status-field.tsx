"use client";

import { Controller, type Control } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { OptionsSelect } from "./options-select";

const STATES = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
];

export function ProductStatusField({ control }: { control: Control<ProductFormValues, unknown, ProductValues> }) {
  return (
    <Controller
      name="status"
      control={control}
      render={({ field }) => (
        <OptionsSelect label={PRODUCT_DRAWER_COPY.state} value={field.value} onChange={field.onChange} options={STATES} />
      )}
    />
  );
}
