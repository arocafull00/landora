"use client";

import { EditorCollapsibleItemCard } from "@/components/dashboard/editor-collapsible-item-card";
import { PortfolioFaqItemForm } from "@/components/dashboard/portfolio-faq-editor/components/portfolio-faq-item-form";
import { PortfolioFaqItemHeader } from "@/components/dashboard/portfolio-faq-editor/components/portfolio-faq-item-header";
import { PORTFOLIO_FAQ_EDITOR_COPY } from "@/components/dashboard/portfolio-faq-editor/portfolio-faq-editor-copy";
import type { FaqItem } from "@/lib/dashboard-data";

export function PortfolioFaqItemCard({
  canMoveDown,
  canMoveUp,
  item,
  onChange,
  onMoveDown,
  onMoveUp,
  onRemove,
  onToggle,
  open,
}: {
  canMoveDown: boolean;
  canMoveUp: boolean;
  item: FaqItem;
  onChange: (patch: Partial<FaqItem>) => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onRemove: () => void;
  onToggle: () => void;
  open: boolean;
}) {
  return (
    <EditorCollapsibleItemCard
      canMoveDown={canMoveDown}
      canMoveUp={canMoveUp}
      moveDownAriaLabel={PORTFOLIO_FAQ_EDITOR_COPY.moveDownAriaLabel}
      moveUpAriaLabel={PORTFOLIO_FAQ_EDITOR_COPY.moveUpAriaLabel}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
      onToggle={onToggle}
      open={open}
      header={
        <PortfolioFaqItemHeader
          answer={item.answer}
          open={open}
          question={item.question}
        />
      }
    >
      <PortfolioFaqItemForm
        item={item}
        onChange={onChange}
        onRemove={onRemove}
      />
    </EditorCollapsibleItemCard>
  );
}
