"use client";

import { EditorLayoutTabs } from "@/components/dashboard/editor-layout-tabs";
import { EditorToolbar } from "@/components/dashboard/editor-toolbar";
import { Skeleton } from "@/components/ui/skeleton";

export function EditorSectionLoadingSkeleton() {
  return (
    <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface">
      <EditorToolbar />
      <EditorLayoutTabs />
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(320px,380px)_1fr]">
        <div className="min-h-0 overflow-y-auto border-r border-outline-variant bg-surface-container-low p-unit-lg">
          <div className="space-y-unit-md">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <div className="min-h-0 bg-surface-bg p-unit-md">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
