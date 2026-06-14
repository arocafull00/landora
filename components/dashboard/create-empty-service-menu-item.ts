import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function createEmptyServiceMenuItem(): ServiceMenuItem {
  return {
    id: crypto.randomUUID(),
    category: "",
    name: "",
    description: "",
    price: "",
    duration: "",
  };
}
