import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCT_PAGE_SIZE } from "@/lib/products";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

const BASE_CLASS = "flex size-8 items-center justify-center rounded-lg text-sm transition-colors";
const ARROW_CLASS = "border border-line bg-surface-container-lowest";

export function ProductsPagination({
  page,
  total,
  pageHref,
}: {
  page: number;
  total: number;
  pageHref: (page: number) => string;
}) {
  const pages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PRODUCT_PAGE_SIZE + 1;
  const to = Math.min(page * PRODUCT_PAGE_SIZE, total);
  const windowStart = Math.max(1, Math.min(page - 2, pages - 4));
  const windowEnd = Math.min(pages, windowStart + 4);
  const pageNumbers = Array.from({ length: windowEnd - windowStart + 1 }, (_, index) => windowStart + index);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-3">
      <span className="text-xs text-ink-subtle">{PRODUCTS_LIST_COPY.pagination.showing(from, to, total)}</span>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <Link href={pageHref(page - 1)} aria-label={PRODUCTS_LIST_COPY.pagination.previous} className={cn(BASE_CLASS, ARROW_CLASS, "text-ink hover:bg-surface-subtle")}>
                <ChevronLeft className="size-4" aria-hidden />
              </Link>
            ) : (
              <span aria-hidden className={cn(BASE_CLASS, ARROW_CLASS, "text-ink-faint")}>
                <ChevronLeft className="size-4" />
              </span>
            )}
          </PaginationItem>
          {pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <Link
                href={pageHref(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                className={cn(BASE_CLASS, pageNumber === page ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-surface-subtle")}
              >
                {pageNumber}
              </Link>
            </PaginationItem>
          ))}
          <PaginationItem>
            {page < pages ? (
              <Link href={pageHref(page + 1)} aria-label={PRODUCTS_LIST_COPY.pagination.next} className={cn(BASE_CLASS, ARROW_CLASS, "text-ink hover:bg-surface-subtle")}>
                <ChevronRight className="size-4" aria-hidden />
              </Link>
            ) : (
              <span aria-hidden className={cn(BASE_CLASS, ARROW_CLASS, "text-ink-faint")}>
                <ChevronRight className="size-4" />
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
