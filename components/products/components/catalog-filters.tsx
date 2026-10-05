"use client";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionsSelect } from "./options-select";
import { useCatalogFilters } from "../hooks/use-catalog-filters";
import type { CatalogQuery } from "@/lib/schemas/products";

const COPY = { search: "Buscar por título o SKU", all: "Todas", apply: "Filtrar", status: "Estado", availability: "Disponibilidad", category: "Categoría", brand: "Marca", size: "Talla", sort: "Orden" } as const;
const STATUS = [{ value: "all", label: "Todos los estados" }, { value: "draft", label: "Borrador" }, { value: "published", label: "Publicado" }, { value: "archived", label: "Archivado" }];
const AVAILABILITY = [{ value: "all", label: "Toda disponibilidad" }, { value: "available", label: "Disponible" }, { value: "out", label: "Agotado" }];
const SORT = [{ value: "newest", label: "Novedades" }, { value: "price-asc", label: "Precio: menor a mayor" }, { value: "price-desc", label: "Precio: mayor a menor" }];
export function CatalogFilters({ query, categories, brands, sizes, privateView = false }: { query: CatalogQuery; categories: string[]; brands: string[]; sizes: string[]; privateView?: boolean }) {
  const { form, submit } = useCatalogFilters(query);
  return <form onSubmit={submit} className="grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
    <Input aria-label={COPY.search} placeholder={COPY.search} {...form.register("q")} />
    <Controller name="category" control={form.control} render={({ field }) => <OptionsSelect label={COPY.category} value={field.value ?? ""} onChange={field.onChange} options={[{ value: "", label: "Todas las categorías" }, ...categories.map((value) => ({ value, label: value }))]} />} />
    <Controller name="brand" control={form.control} render={({ field }) => <OptionsSelect label={COPY.brand} value={field.value ?? ""} onChange={field.onChange} options={[{ value: "", label: "Todas las marcas" }, ...brands.map((value) => ({ value, label: value }))]} />} />
    <Controller name="size" control={form.control} render={({ field }) => <OptionsSelect label={COPY.size} value={field.value ?? ""} onChange={field.onChange} options={[{ value: "", label: "Todas las tallas" }, ...sizes.map((value) => ({ value, label: value }))]} />} />
    {privateView ? <Controller name="status" control={form.control} render={({ field }) => <OptionsSelect label={COPY.status} value={field.value ?? "all"} onChange={field.onChange} options={STATUS} />} /> : null}
    <Controller name="availability" control={form.control} render={({ field }) => <OptionsSelect label={COPY.availability} value={field.value ?? "all"} onChange={field.onChange} options={privateView ? [...AVAILABILITY, { value: "pending", label: "Stock pendiente" }] : AVAILABILITY} />} />
    <Controller name="sort" control={form.control} render={({ field }) => <OptionsSelect label={COPY.sort} value={field.value ?? "newest"} onChange={field.onChange} options={SORT} />} />
    <Button type="submit">{COPY.apply}</Button>
  </form>;
}
