"use client";

import { exitImpersonation } from "@/app/actions/impersonation";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { EDITOR_COPY } from "@/components/dashboard/editor/editor-copy";

export function EditorExitImpersonationButton() {
  const { impersonating } = useDashboardChrome();
  if (!impersonating) return null;

  return (
    <form action={exitImpersonation}>
      <button
        type="submit"
        className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-ink hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {EDITOR_COPY.exitImpersonation}
      </button>
    </form>
  );
}
