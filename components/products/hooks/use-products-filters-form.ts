"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CatalogQuery } from "@/lib/schemas/products";

const filtersSchema = z.strictObject({
  category: z.string(),
  brand: z.string(),
  size: z.string(),
  availability: z.enum(["all", "available", "out", "pending"]),
});

export type ProductsFiltersValues = z.infer<typeof filtersSchema>;

export function useProductsFiltersForm(query: CatalogQuery, onApply: (values: ProductsFiltersValues) => void) {
  const form = useForm<ProductsFiltersValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      category: query.category,
      brand: query.brand,
      size: query.size,
      availability: query.availability,
    },
  });
  const submit = form.handleSubmit(onApply);
  return { form, submit };
}
