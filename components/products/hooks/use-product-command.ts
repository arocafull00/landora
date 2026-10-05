"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { commandProductAction, importProductsAction } from "@/app/actions/products";
import type { ProductDto } from "@/lib/domain/dtos";

export function useProductCommand(landingId: string) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const run = (action: () => Promise<{ success: true; productId?: string } | { error: string }>, duplicate: boolean) => startTransition(async () => {
    try {
      const result = await action();
      if ("error" in result) { toast.error(result.error); return; }
      toast.success("Catálogo actualizado");
      if (duplicate && result.productId) { router.push(`/products/${result.productId}`); return; }
      router.refresh();
    } catch { toast.error("No se pudo actualizar el catálogo"); }
  });
  const command = (product: ProductDto, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish") => run(() => commandProductAction({ landingId, productId: product.id, version: product.version, command }), command === "duplicate");
  const importProducts = () => run(() => importProductsAction(landingId), false);
  return { pending, command, importProducts };
}
