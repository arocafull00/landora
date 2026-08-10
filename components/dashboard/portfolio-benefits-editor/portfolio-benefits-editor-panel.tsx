"use client";

import { Plus } from "lucide-react";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { PortfolioBenefitItemCard } from "@/components/dashboard/portfolio-benefits-editor/components/portfolio-benefit-item-card";
import { usePortfolioBenefitsEditor } from "@/components/dashboard/portfolio-benefits-editor/hooks/use-portfolio-benefits-editor";
import { PORTFOLIO_BENEFITS_EDITOR_COPY } from "@/components/dashboard/portfolio-benefits-editor/portfolio-benefits-editor-copy";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import type { Landing } from "@/lib/dashboard-data";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function PortfolioBenefitsEditorPanel({ landing }: { landing: Landing }) {
  const {
    addItem,
    expandedItemId,
    items,
    moveItem,
    removeItem,
    toggleItem,
    updateItem,
  } = usePortfolioBenefitsEditor(landing);

  return (
    <section className="space-y-5 py-unit-lg">
      <div className="flex items-start justify-between gap-3">
        <EditorSectionTitle
          description={PORTFOLIO_BENEFITS_EDITOR_COPY.description}
          title={PORTFOLIO_BENEFITS_EDITOR_COPY.title}
        />
        <button
          aria-label={PORTFOLIO_BENEFITS_EDITOR_COPY.addItemAriaLabel}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-container"
          onClick={addItem}
          type="button"
        >
          <Plus aria-hidden className="size-4" />
        </button>
      </div>

      <SectionHeadingFields
        activeLanding={landing}
        anchor="skills"
        fallback={SECTION_HEADING_DEFAULTS.portfolio.skills}
      />

      <div className="space-y-3">
        {items.map((item, index) => (
          <PortfolioBenefitItemCard
            canMoveDown={index < items.length - 1}
            canMoveUp={index > 0}
            item={item}
            key={item.id}
            onChange={(patch) => updateItem(item.id, patch)}
            onMoveDown={() => moveItem(item.id, "down")}
            onMoveUp={() => moveItem(item.id, "up")}
            onRemove={() => removeItem(item.id)}
            onToggle={() => toggleItem(item.id)}
            open={expandedItemId === item.id}
          />
        ))}
      </div>

      <button
        className="inline-flex h-16 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant bg-surface/50 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:bg-primary-fixed hover:text-primary"
        onClick={addItem}
        type="button"
      >
        <Plus aria-hidden className="size-4" />
        {PORTFOLIO_BENEFITS_EDITOR_COPY.addItem}
      </button>
    </section>
  );
}
