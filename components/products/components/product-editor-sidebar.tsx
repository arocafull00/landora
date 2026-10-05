"use client";

import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { PRODUCT_SECTIONS, productPanelId, type ProductSectionId } from "../product-editor-sections";
import { ProductEditorNavItem } from "./product-editor-nav-item";

export function ProductEditorSidebar({
  section,
  counts,
  invalidSections,
  onSelect,
  children,
}: {
  section: ProductSectionId;
  counts: Partial<Record<ProductSectionId, number>>;
  invalidSections: readonly ProductSectionId[];
  onSelect: (section: ProductSectionId) => void;
  children: ReactNode;
}) {
  return (
    <aside className="flex shrink-0 flex-col gap-4 bg-surface-subtle p-3 md:w-52">
      <div>
        <p className="px-3 py-2 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
          {PRODUCT_DRAWER_COPY.navGroup}
        </p>
        <nav aria-label={PRODUCT_DRAWER_COPY.navLabel} className="flex gap-1 overflow-x-auto md:flex-col">
          {PRODUCT_SECTIONS.map((item) => (
            <ProductEditorNavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              panelId={productPanelId(item.id)}
              active={section === item.id}
              invalid={invalidSections.includes(item.id)}
              count={counts[item.id]}
              onSelect={() => onSelect(item.id)}
            />
          ))}
        </nav>
      </div>
      <Separator className="hidden md:block" />
      <div className="space-y-2 px-3">
        <p className="text-[11px] font-semibold tracking-wider text-ink-faint uppercase">{PRODUCT_DRAWER_COPY.state}</p>
        {children}
      </div>
    </aside>
  );
}
