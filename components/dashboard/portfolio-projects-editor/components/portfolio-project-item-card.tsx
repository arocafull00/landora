"use client";

import { EditorCollapsibleItemCard } from "@/components/dashboard/editor-collapsible-item-card";
import { PortfolioProjectItemForm } from "@/components/dashboard/portfolio-projects-editor/components/portfolio-project-item-form";
import { PortfolioProjectItemHeader } from "@/components/dashboard/portfolio-projects-editor/components/portfolio-project-item-header";
import { PORTFOLIO_PROJECTS_EDITOR_COPY } from "@/components/dashboard/portfolio-projects-editor/portfolio-projects-editor-copy";
import type { GalleryItem, TemplateId } from "@/lib/dashboard-data";

export function PortfolioProjectItemCard({
  assetName,
  canMoveDown,
  canMoveUp,
  gallery,
  index,
  item,
  onChange,
  onEditPage,
  onMoveDown,
  onMoveUp,
  onRemove,
  onToggle,
  open,
  templateId,
}: {
  assetName: string;
  canMoveDown: boolean;
  canMoveUp: boolean;
  gallery: GalleryItem[];
  index: number;
  item: GalleryItem;
  onChange: (patch: Partial<GalleryItem>) => void;
  onEditPage: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onRemove: () => void;
  onToggle: () => void;
  open: boolean;
  templateId: TemplateId;
}) {
  return (
    <EditorCollapsibleItemCard
      canMoveDown={canMoveDown}
      canMoveUp={canMoveUp}
      moveDownAriaLabel={PORTFOLIO_PROJECTS_EDITOR_COPY.moveDownAriaLabel}
      moveUpAriaLabel={PORTFOLIO_PROJECTS_EDITOR_COPY.moveUpAriaLabel}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
      onToggle={onToggle}
      open={open}
      header={
        <PortfolioProjectItemHeader
          assetName={assetName}
          image={item.image}
          index={index}
          open={open}
          tags={item.tags ?? []}
          title={item.title ?? ""}
        />
      }
    >
      <PortfolioProjectItemForm
        gallery={gallery}
        index={index}
        item={item}
        onChange={onChange}
        onEditPage={onEditPage}
        onRemove={onRemove}
        templateId={templateId}
      />
    </EditorCollapsibleItemCard>
  );
}
