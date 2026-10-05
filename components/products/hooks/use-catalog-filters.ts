"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { catalogQuerySchema, type CatalogQuery } from "@/lib/schemas/products";

export function useCatalogFilters(query: CatalogQuery) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.input<typeof catalogQuerySchema>, unknown, CatalogQuery>({ resolver: zodResolver(catalogQuerySchema), defaultValues: query });
  const submit = form.handleSubmit((values) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) if (key !== "page" && String(value)) params.set(key, String(value));
    router.push(`${pathname}?${params}`);
  });
  return { form, submit };
}
