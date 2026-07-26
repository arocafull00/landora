import { SearchX } from "lucide-react";

export function RistoranteMenuEditorEmptyState({
  hasItems,
}: {
  hasItems: boolean;
}) {
  return (
    <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest px-5 py-8 text-center">
      <SearchX
        aria-hidden
        className="mx-auto size-5 text-on-surface-variant"
      />
      <p className="mt-3 font-body text-body-md font-semibold text-on-surface">
        {hasItems ? "No hay platos que coincidan" : "La carta está vacía"}
      </p>
      <p className="mt-1 text-body-sm text-on-surface-variant">
        {hasItems
          ? "Prueba con otra búsqueda o limpia los filtros."
          : "Añade el primer plato para empezar a crearla."}
      </p>
    </div>
  );
}
