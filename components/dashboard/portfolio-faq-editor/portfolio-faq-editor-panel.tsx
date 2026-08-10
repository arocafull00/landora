"use client";

import { Plus } from "lucide-react";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { PortfolioFaqItemCard } from "@/components/dashboard/portfolio-faq-editor/components/portfolio-faq-item-card";
import { usePortfolioFaqEditor } from "@/components/dashboard/portfolio-faq-editor/hooks/use-portfolio-faq-editor";
import { PORTFOLIO_FAQ_EDITOR_COPY } from "@/components/dashboard/portfolio-faq-editor/portfolio-faq-editor-copy";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import type { Landing } from "@/lib/dashboard-data";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function PortfolioFaqEditorPanel({ landing }: { landing: Landing }) {
  const {
    addItem,
    expandedItemId,
    items,
    moveItem,
    removeItem,
    toggleItem,
    updateItem,
  } = usePortfolioFaqEditor(landing);

  return (
    <section className="space-y-5 py-unit-lg">
      <div className="flex items-start justify-between gap-3">
        <EditorSectionTitle
          description={PORTFOLIO_FAQ_EDITOR_COPY.description}
          title={PORTFOLIO_FAQ_EDITOR_COPY.title}
        />
        <button
          aria-label={PORTFOLIO_FAQ_EDITOR_COPY.addItemAriaLabel}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-container"
          onClick={addItem}
          type="button"
        >
          <Plus aria-hidden className="size-4" />
        </button>
      </div>

      <SectionHeadingFields
        activeLanding={landing}
        anchor="faq"
        fallback={SECTION_HEADING_DEFAULTS.portfolio.faq}
      />

      <div className="space-y-3">
        {items.map((item, index) => (
          <PortfolioFaqItemCard
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
        {PORTFOLIO_FAQ_EDITOR_COPY.addItem}
      </button>
    </section>
  );
}
