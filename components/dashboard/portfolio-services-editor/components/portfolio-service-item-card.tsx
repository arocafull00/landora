"use client";

import { EditorCollapsibleItemCard } from "@/components/dashboard/editor-collapsible-item-card";
import { PortfolioServiceItemForm } from "@/components/dashboard/portfolio-services-editor/components/portfolio-service-item-form";
import { PortfolioServiceItemHeader } from "@/components/dashboard/portfolio-services-editor/components/portfolio-service-item-header";
import { PORTFOLIO_SERVICES_EDITOR_COPY } from "@/components/dashboard/portfolio-services-editor/portfolio-services-editor-copy";
import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function PortfolioServiceItemCard({
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
  item: ServiceMenuItem;
  onChange: (patch: Partial<ServiceMenuItem>) => void;
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
      moveDownAriaLabel={PORTFOLIO_SERVICES_EDITOR_COPY.moveDownAriaLabel}
      moveUpAriaLabel={PORTFOLIO_SERVICES_EDITOR_COPY.moveUpAriaLabel}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
      onToggle={onToggle}
      open={open}
      header={
        <PortfolioServiceItemHeader
          category={item.category}
          name={item.name}
          open={open}
          price={item.price}
        />
      }
    >
      <PortfolioServiceItemForm
        item={item}
        onChange={onChange}
        onRemove={onRemove}
      />
    </EditorCollapsibleItemCard>
  );
}
