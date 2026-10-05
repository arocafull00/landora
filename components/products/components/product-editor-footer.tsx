"use client";

import Link from "next/link";
import { ExternalLink, Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";

export function ProductEditorFooter({
  formId,
  dirty,
  submitting,
  publishing,
  hasPendingChanges,
  canPublish,
  previewHref,
  onCancel,
  onPublish,
}: {
  formId: string;
  dirty: boolean;
  submitting: boolean;
  publishing: boolean;
  hasPendingChanges: boolean;
  canPublish: boolean;
  previewHref: string | null;
  onCancel: () => void;
  onPublish: () => void;
}) {
  return (
    <footer className="flex shrink-0 flex-wrap items-center gap-3 bg-surface px-6 py-4">
      <p className="flex items-center gap-2 text-xs text-ink-secondary">
        <span className={cn("size-2 rounded-full", dirty || hasPendingChanges ? "bg-warning" : "bg-success")} aria-hidden />
        {dirty ? PRODUCT_DRAWER_COPY.dirty : hasPendingChanges ? PRODUCT_DRAWER_COPY.pendingPublication : PRODUCT_DRAWER_COPY.clean}
      </p>
      <div className="ml-auto flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={submitting} onClick={onCancel}>
          <X className="size-4" aria-hidden />
          {PRODUCT_DRAWER_COPY.cancel}
        </Button>
        {previewHref ? (
          <Button asChild variant="outline">
            <Link href={previewHref} target="_blank">
              <ExternalLink className="size-4" aria-hidden />
              {PRODUCT_DRAWER_COPY.preview}
            </Link>
          </Button>
        ) : null}
        <Button type="submit" form={formId} variant="outline" disabled={submitting}>
          {submitting && !publishing ? <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden /> : <Save className="size-4" aria-hidden />}
          {submitting && !publishing ? PRODUCT_DRAWER_COPY.saving : PRODUCT_DRAWER_COPY.save}
        </Button>
        <Button type="button" disabled={submitting || !canPublish} onClick={onPublish}>
          {submitting && publishing ? <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden /> : <Upload className="size-4" aria-hidden />}
          {submitting && publishing ? PRODUCT_DRAWER_COPY.publishing : PRODUCT_DRAWER_COPY.publish}
        </Button>
      </div>
    </footer>
  );
}
