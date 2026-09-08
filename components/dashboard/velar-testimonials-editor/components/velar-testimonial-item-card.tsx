"use client";

import { EditorCollapsibleItemCard } from "@/components/dashboard/editor-collapsible-item-card";
import { VelarTestimonialItemForm } from "@/components/dashboard/velar-testimonials-editor/components/velar-testimonial-item-form";
import { VelarTestimonialItemHeader } from "@/components/dashboard/velar-testimonials-editor/components/velar-testimonial-item-header";
import { VELAR_TESTIMONIALS_EDITOR_COPY } from "@/components/dashboard/velar-testimonials-editor/velar-testimonials-editor-copy";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function VelarTestimonialItemCard({
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
  item: TestimonialContent;
  onChange: (patch: Partial<TestimonialContent>) => void;
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
      moveDownAriaLabel={VELAR_TESTIMONIALS_EDITOR_COPY.moveDownAriaLabel}
      moveUpAriaLabel={VELAR_TESTIMONIALS_EDITOR_COPY.moveUpAriaLabel}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
      onToggle={onToggle}
      open={open}
      header={
        <VelarTestimonialItemHeader
          author={item.author}
          comment={item.comment}
          open={open}
        />
      }
    >
      <VelarTestimonialItemForm
        item={item}
        onChange={onChange}
        onRemove={onRemove}
      />
    </EditorCollapsibleItemCard>
  );
}
