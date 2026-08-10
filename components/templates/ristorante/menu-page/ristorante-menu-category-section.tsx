import type { RistoranteMenuGroup } from "@/components/templates/ristorante/menu-page/hooks/use-ristorante-menu";
import { RistoranteMenuCard } from "@/components/templates/ristorante/menu-page/ristorante-menu-card";

export function RistoranteMenuCategorySection({
  group,
}: {
  group: RistoranteMenuGroup;
}) {
  const headingId = `menu-category-${encodeURIComponent(group.category)}`;

  return (
    <section aria-labelledby={headingId} className="scroll-mt-40">
      <div className="mb-7 flex items-end justify-between gap-6 border-b border-[var(--site-border)] pb-5">
        <div>
          <p
            className="mb-2 font-bold uppercase tracking-[0.16em] text-[var(--ristorante-accent)] text-site-content"
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            Selección de la casa
          </p>
          <h2
            className="text-balance font-normal leading-none text-[var(--site-text)] text-site-title"
            id={headingId}
            style={{
              fontFamily: "var(--font-ristorante-display)",
              letterSpacing: "-0.04em",
            }}
          >
            {group.category}
          </h2>
        </div>
        <p
          className="hidden text-[var(--site-text-muted)] sm:block text-site-content"
          style={{ fontFamily: "var(--font-ristorante-body)" }}
        >
          {group.items.length} {group.items.length === 1 ? "plato" : "platos"}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {group.items.map((service) => (
          <RistoranteMenuCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}
