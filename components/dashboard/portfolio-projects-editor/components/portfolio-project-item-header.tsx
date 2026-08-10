import { ChevronDown, ChevronRight } from "lucide-react";
import { PortfolioProjectItemTagChip } from "@/components/dashboard/portfolio-projects-editor/components/portfolio-project-item-tag-chip";
import { PortfolioProjectItemThumbnail } from "@/components/dashboard/portfolio-projects-editor/components/portfolio-project-item-thumbnail";
import { PORTFOLIO_PROJECTS_EDITOR_COPY } from "@/components/dashboard/portfolio-projects-editor/portfolio-projects-editor-copy";
import { cn } from "@/lib/utils";

export function PortfolioProjectItemHeader({
  assetName,
  image,
  index,
  open,
  tags,
  title,
}: {
  assetName: string;
  image?: string;
  index: number;
  open: boolean;
  tags: string[];
  title: string;
}) {
  const displayTitle = title.trim() || PORTFOLIO_PROJECTS_EDITOR_COPY.untitledProject;
  const visibleTags = tags.slice(0, 2);

  return (
    <>
      <PortfolioProjectItemThumbnail image={image} index={index} title={displayTitle} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {displayTitle}
        </span>
        {assetName ? (
          <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant">
            {assetName}
          </span>
        ) : null}
        <span className="mt-2 flex min-h-5 flex-wrap items-center gap-1.5">
          {visibleTags.length > 0 ? (
            visibleTags.map((tag) => (
              <PortfolioProjectItemTagChip key={tag} label={tag} />
            ))
          ) : (
            <span className="font-label text-[0.6875rem] text-on-surface-variant">
              {PORTFOLIO_PROJECTS_EDITOR_COPY.noTags}
            </span>
          )}
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
