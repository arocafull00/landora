import type { BenefitItem } from "@/lib/dashboard-data";

export function createEmptyBenefitItem(): BenefitItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    icon: "target",
  };
}
