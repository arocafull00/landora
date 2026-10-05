"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { setProductsAccessAction } from "@/app/actions/products";

export function useProductsAccess(userId: string) {
  const [pending, startTransition] = useTransition();
  const change = (enabled: boolean) => startTransition(async () => {
    try {
      const result = await setProductsAccessAction({ userId, enabled });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(enabled ? "Acceso a Productos habilitado" : "Acceso a Productos desactivado");
    } catch { toast.error("No se pudo cambiar el acceso a Productos"); }
  });
  return { pending, change };
}
