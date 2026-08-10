import { ChevronDown, ChevronRight } from "lucide-react";
import { PORTFOLIO_SERVICES_EDITOR_COPY } from "@/components/dashboard/portfolio-services-editor/portfolio-services-editor-copy";
import { cn } from "@/lib/utils";

export function PortfolioServiceItemHeader({
  category,
  name,
  open,
  price,
}: {
  category: string;
  name: string;
  open: boolean;
  price: string;
}) {
  const displayName = name.trim() || PORTFOLIO_SERVICES_EDITOR_COPY.untitledItem;
  const categoryLabel = category.trim() || PORTFOLIO_SERVICES_EDITOR_COPY.noCategory;
  const priceLabel = price.trim() ? ` · ${price.trim()}` : "";

  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {displayName}
        </span>
        <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant">
          {categoryLabel}
          {priceLabel}
        </span>
      </span>
      {open ? (
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-on-surface-variant"
        />
      ) : (
        <ChevronRight
          aria-hidden
          className={cn("size-4 shrink-0 text-on-surface-variant")}
        />
      )}
    </>
  );
}
