import { Search } from "lucide-react";
import { Controller } from "react-hook-form";
import type { useCatalogFilters } from "../hooks/use-catalog-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionsSelect } from "../components/options-select";
import { cn } from "@/lib/utils";

const COPY = { search: "Buscar por nombre o referencia", category: "Categoría", brand: "Marca", size: "Talla", categories: "Todas las categorías", brands: "Todas las marcas", sizes: "Todas las tallas", apply: "Aplicar filtros", available: "Disponibles", out: "Agotados", newest: "Novedades", clear: "Limpiar filtros", availability: "Filtrar por disponibilidad" } as const;
const SELECT_STYLE = "data-[size=default]:h-12 min-w-0 rounded-full border-border bg-catalog-canvas px-4 text-ink shadow-none";
const CHIP_STYLE = "h-9 rounded-full px-3 text-xs font-semibold text-ink/60 hover:bg-canvas hover:text-ink";

export function PublicCatalogFilterForm({ form, categories, brands, sizes, reset, changeAvailability, showNewest }: { form: ReturnType<typeof useCatalogFilters>["form"]; categories: string[]; brands: string[]; sizes: string[]; reset: () => void; changeAvailability: ReturnType<typeof useCatalogFilters>["changeAvailability"]; showNewest: () => void }) {
  return (
    <div className="rounded-[28px] border border-primary/25 bg-tone-1/35 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <div className="relative min-w-0">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink/45" />
          <Input aria-label={COPY.search} placeholder={COPY.search} className="h-12 rounded-full border-border bg-catalog-canvas pl-11 pr-4 text-sm shadow-none placeholder:text-ink/50" {...form.register("q")} />
        </div>
        <Controller name="category" control={form.control} render={({ field }) => <OptionsSelect label={COPY.category} value={field.value ?? ""} onChange={field.onChange} className={SELECT_STYLE} options={[{ value: "", label: COPY.categories }, ...categories.map((value) => ({ value, label: value }))]} />} />
        <Controller name="brand" control={form.control} render={({ field }) => <OptionsSelect label={COPY.brand} value={field.value ?? ""} onChange={field.onChange} className={SELECT_STYLE} options={[{ value: "", label: COPY.brands }, ...brands.map((value) => ({ value, label: value }))]} />} />
        <Controller name="size" control={form.control} render={({ field }) => <OptionsSelect label={COPY.size} value={field.value ?? ""} onChange={field.onChange} className={SELECT_STYLE} options={[{ value: "", label: COPY.sizes }, ...sizes.map((value) => ({ value, label: value }))]} />} />
        <Button type="submit" className="h-12 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover sm:col-span-2 lg:col-span-1">{COPY.apply}</Button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={COPY.availability} className="flex flex-wrap gap-1">
          <Controller name="availability" control={form.control} render={({ field }) => <>
            <Button type="button" variant="ghost" aria-pressed={field.value === "available"} className={cn(CHIP_STYLE, field.value === "available" && "bg-tone-1 text-ink hover:bg-tone-1")} onClick={() => changeAvailability(field.value === "available" ? "all" : "available")}>{COPY.available}</Button>
            <Button type="button" variant="ghost" aria-pressed={field.value === "out"} className={cn(CHIP_STYLE, field.value === "out" && "bg-tone-3 text-ink hover:bg-tone-3")} onClick={() => changeAvailability(field.value === "out" ? "all" : "out")}>{COPY.out}</Button>
          </>} />
          <Button type="button" variant="ghost" className={CHIP_STYLE} onClick={showNewest}>{COPY.newest}</Button>
        </div>
        <Button type="button" variant="ghost" className="h-9 rounded-full px-3 text-xs font-semibold text-ink/60 underline decoration-border underline-offset-4 hover:bg-canvas hover:text-ink" onClick={reset}>{COPY.clear}</Button>
      </div>
    </div>
  );
}
