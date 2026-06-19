import type { SubscriptionPlan } from "@/db/schema";
import { cn } from "@/lib/utils";

const PLAN_STYLES: Record<SubscriptionPlan, string> = {
  free: "bg-surface-container-high text-on-surface-variant",
  starter: "bg-primary-fixed text-primary-fixed-variant",
  pro: "bg-primary text-on-primary",
};

const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
};

export function UserPlanBadge({ plan }: { plan: SubscriptionPlan }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 font-label text-label-md uppercase",
        PLAN_STYLES[plan],
      )}
    >
      {PLAN_LABELS[plan]}
    </span>
  );
}
