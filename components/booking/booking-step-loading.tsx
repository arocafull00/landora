import { Skeleton } from "@/components/ui/skeleton";

export function BookingStepLoading({
  variant,
}: {
  variant: "list" | "grid" | "calendar";
}) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-10 rounded-lg" />
        ))}
      </div>
    );
  }

  if (variant === "calendar") {
    return (
      <div className="mx-auto max-w-sm space-y-3">
        <Skeleton className="mx-auto h-6 w-40" />
        <Skeleton className="h-72 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}
