import type { FaqItem } from "@/lib/dashboard-data";

export function createEmptyFaqItem(): FaqItem {
  return {
    id: crypto.randomUUID(),
    question: "",
    answer: "",
  };
}
