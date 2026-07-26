import { SearchX } from "lucide-react";

export function RistoranteMenuEmptyState() {
  return (
    <div
      aria-live="polite"
      className="rounded-[1.75rem] border border-dashed border-[var(--site-border)] bg-[var(--ristorante-surface)]/55 px-6 py-20 text-center"
    >
      <SearchX
        aria-hidden
        className="mx-auto mb-5 h-7 w-7 text-[var(--ristorante-accent)]"
      />
      <h2
        className="text-3xl font-normal text-[var(--site-text)]"
        style={{ fontFamily: "var(--font-ristorante-display)" }}
      >
        No encontramos ese plato
      </h2>
      <p
        className="mt-2 text-sm text-[var(--site-text-muted)]"
        style={{ fontFamily: "var(--font-ristorante-body)" }}
      >
        Prueba con otro nombre, ingrediente o categoría.
      </p>
    </div>
  );
}
