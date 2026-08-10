import { ChevronDown, ChevronRight } from "lucide-react";
import { PORTFOLIO_FAQ_EDITOR_COPY } from "@/components/dashboard/portfolio-faq-editor/portfolio-faq-editor-copy";
import { cn } from "@/lib/utils";

export function PortfolioFaqItemHeader({
  answer,
  open,
  question,
}: {
  answer: string;
  open: boolean;
  question: string;
}) {
  const displayQuestion =
    question.trim() || PORTFOLIO_FAQ_EDITOR_COPY.untitledItem;
  const answerPreview = answer.trim() || PORTFOLIO_FAQ_EDITOR_COPY.noAnswer;

  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {displayQuestion}
        </span>
        <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant line-clamp-1">
          {answerPreview}
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
