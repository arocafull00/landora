import { ChevronDown, ChevronRight } from "lucide-react";
import { VELAR_TESTIMONIALS_EDITOR_COPY } from "@/components/dashboard/velar-testimonials-editor/velar-testimonials-editor-copy";
import { cn } from "@/lib/utils";

export function VelarTestimonialItemHeader({
  author,
  comment,
  open,
}: {
  author: string;
  comment: string;
  open: boolean;
}) {
  const displayAuthor =
    author.trim() || VELAR_TESTIMONIALS_EDITOR_COPY.untitledItem;
  const commentPreview =
    comment.trim() || VELAR_TESTIMONIALS_EDITOR_COPY.noComment;

  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {displayAuthor}
        </span>
        <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant line-clamp-1">
          {commentPreview}
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
