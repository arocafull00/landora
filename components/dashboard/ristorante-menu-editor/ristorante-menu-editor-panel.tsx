"use client";

import { Plus } from "lucide-react";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { RistoranteMenuEditorEmptyState } from "@/components/dashboard/ristorante-menu-editor/components/ristorante-menu-editor-empty-state";
import { RistoranteMenuEditorToolbar } from "@/components/dashboard/ristorante-menu-editor/components/ristorante-menu-editor-toolbar";
import { RistoranteMenuItemEditor } from "@/components/dashboard/ristorante-menu-editor/components/ristorante-menu-item-editor";
import { useRistoranteMenuEditor } from "@/components/dashboard/ristorante-menu-editor/hooks/use-ristorante-menu-editor";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { Button } from "@/components/ui/button";
import type { Landing } from "@/lib/dashboard-data";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteMenuEditorPanel({
  landing,
}: {
  landing: Landing;
}) {
  const {
    activeCategory,
    addItem,
    categoryOptions,
    clearFilters,
    expandedItemId,
    handleCategoryChange,
    hasActiveFilters,
    removeItem,
    search,
    setSearch,
    toggleItem,
    totalItems,
    updateItem,
    visibleItems,
  } = useRistoranteMenuEditor(landing);

  return (
    <section className="space-y-5 py-unit-lg">
      <EditorSectionTitle
        description="Encuentra y edita rápidamente los platos de tu carta."
        title="Carta"
      />
      <SectionHeadingFields
        activeLanding={landing}
        anchor="carta"
        fallback={SECTION_HEADING_DEFAULTS.ristorante.carta}
      />

      <RistoranteMenuEditorToolbar
        activeCategory={activeCategory}
        categories={categoryOptions}
        hasActiveFilters={hasActiveFilters}
        onCategoryChange={handleCategoryChange}
        onClearFilters={clearFilters}
        onSearchChange={setSearch}
        resultCount={visibleItems.length}
        search={search}
        totalItems={totalItems}
      />

      <div className="space-y-3">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <RistoranteMenuItemEditor
              item={item}
              key={item.id}
              onChange={(patch) => updateItem(item.id, patch)}
              onRemove={() => removeItem(item.id)}
              onToggle={() => toggleItem(item.id)}
              open={expandedItemId === item.id}
              templateId={landing.template}
            />
          ))
        ) : (
          <RistoranteMenuEditorEmptyState hasItems={totalItems > 0} />
        )}
      </div>

      <Button
        className="w-full border-dashed"
        onClick={addItem}
        type="button"
        variant="outline"
      >
        <Plus aria-hidden />
        Añadir plato
      </Button>
    </section>
  );
}
