import { ChevronDown, ChevronRight } from "lucide-react";
import {
  getPortfolioBenefitIconLabel,
  PORTFOLIO_BENEFITS_EDITOR_COPY,
} from "@/components/dashboard/portfolio-benefits-editor/portfolio-benefits-editor-copy";
import { cn } from "@/lib/utils";

export function PortfolioBenefitItemHeader({
  icon,
  open,
  title,
}: {
  icon: string;
  open: boolean;
  title: string;
}) {
  const displayTitle = title.trim() || PORTFOLIO_BENEFITS_EDITOR_COPY.untitledItem;

  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {displayTitle}
        </span>
        <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant">
          {getPortfolioBenefitIconLabel(icon)}
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
