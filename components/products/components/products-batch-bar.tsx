"use client";

import { PRODUCTS_LIST_COPY } from "../products-list-copy";

const ACTION_CLASS = "text-sm font-medium text-primary transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50";

export function ProductsBatchBar({
  count,
  pending,
  onPublish,
  onArchive,
  onClear,
}: {
  count: number;
  pending: boolean;
  onPublish: () => void;
  onArchive: () => void;
  onClear: () => void;
}) {
  if (!count) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-primary-subtle-border bg-primary-subtle py-2.5">
      <span className="text-sm font-medium text-on-primary-subtle">
        {count === 1 ? PRODUCTS_LIST_COPY.batch.selectedOne : PRODUCTS_LIST_COPY.batch.selectedMany(count)}
      </span>
      <button type="button" className={ACTION_CLASS} disabled={pending} onClick={onPublish}>
        {PRODUCTS_LIST_COPY.batch.publish}
      </button>
      <button type="button" className={ACTION_CLASS} disabled={pending} onClick={onArchive}>
        {PRODUCTS_LIST_COPY.batch.archive}
      </button>
      <button type="button" className="ml-auto text-sm font-medium text-ink-subtle transition-colors hover:underline disabled:opacity-50" disabled={pending} onClick={onClear}>
        {PRODUCTS_LIST_COPY.batch.clear}
      </button>
    </div>
  );
}
