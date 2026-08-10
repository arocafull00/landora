"use client";

import { EditorCollapsibleItemCard } from "@/components/dashboard/editor-collapsible-item-card";
import { PortfolioBenefitItemForm } from "@/components/dashboard/portfolio-benefits-editor/components/portfolio-benefit-item-form";
import { PortfolioBenefitItemHeader } from "@/components/dashboard/portfolio-benefits-editor/components/portfolio-benefit-item-header";
import { PORTFOLIO_BENEFITS_EDITOR_COPY } from "@/components/dashboard/portfolio-benefits-editor/portfolio-benefits-editor-copy";
import type { BenefitItem } from "@/lib/dashboard-data";

export function PortfolioBenefitItemCard({
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
  item: BenefitItem;
  onChange: (patch: Partial<BenefitItem>) => void;
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
      moveDownAriaLabel={PORTFOLIO_BENEFITS_EDITOR_COPY.moveDownAriaLabel}
      moveUpAriaLabel={PORTFOLIO_BENEFITS_EDITOR_COPY.moveUpAriaLabel}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
      onToggle={onToggle}
      open={open}
      header={
        <PortfolioBenefitItemHeader
          icon={item.icon}
          open={open}
          title={item.title}
        />
      }
    >
      <PortfolioBenefitItemForm
        item={item}
        onChange={onChange}
        onRemove={onRemove}
      />
    </EditorCollapsibleItemCard>
  );
}
