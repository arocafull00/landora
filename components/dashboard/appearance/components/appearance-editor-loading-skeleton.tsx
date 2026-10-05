import { Skeleton } from "@/components/ui/skeleton";
import { APPEARANCE_EDITOR_COPY } from "@/components/dashboard/appearance/appearance-editor-copy";

export function AppearanceEditorLoadingSkeleton() {
  return (
    <section aria-busy="true" aria-label={APPEARANCE_EDITOR_COPY.title} className="space-y-5 py-unit-lg">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </section>
  );
}
