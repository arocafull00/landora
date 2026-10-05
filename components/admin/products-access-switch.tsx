"use client";
import { Package } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useProductsAccess } from "@/components/admin/hooks/use-products-access";

const COPY = { label: "Acceso a Productos", description: "Permite gestionar productos, variantes y catálogo público." } as const;
export function ProductsAccessSwitch({ userId, enabled }: { userId: string; enabled: boolean }) {
  const { pending, change } = useProductsAccess(userId);
  return <div className="flex items-center justify-between gap-3 px-2 py-3">
    <Package aria-hidden className="size-4 shrink-0" />
    <label htmlFor={`products-access-${userId}`} className="flex-1 text-sm">{COPY.label}</label>
    <Switch id={`products-access-${userId}`} checked={enabled} disabled={pending} onCheckedChange={change} aria-description={COPY.description} />
  </div>;
}
