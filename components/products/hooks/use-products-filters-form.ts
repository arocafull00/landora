"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsFiltersSchema, type CatalogQuery, type ProductsFiltersValues } from "@/lib/schemas/products";

export function useProductsFiltersForm(query: CatalogQuery, onApply: (values: ProductsFiltersValues) => void) {
  const form = useForm<ProductsFiltersValues>({
    resolver: zodResolver(productsFiltersSchema),
    defaultValues: {
      status: query.status,
      category: query.category,
      brand: query.brand,
      size: query.size,
      availability: query.availability,
    },
  });
  const submit = form.handleSubmit(onApply);
  return { form, submit };
}
