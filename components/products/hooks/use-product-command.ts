"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { batchCommandProductsAction, commandProductAction } from "@/app/actions/products";
import type { ProductDto } from "@/lib/domain/dtos";

export function useProductCommand(landingId: string) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const run = (action: () => Promise<{ success: true; productId?: string } | { error: string }>) => startTransition(async () => {
    try {
      const result = await action();
      if ("error" in result) { toast.error(result.error); return; }
      toast.success("Catálogo actualizado");
      router.refresh();
    } catch { toast.error("No se pudo actualizar el catálogo"); }
  });
  const command = (product: ProductDto, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish") => {
    if (command === "duplicate") {
      startTransition(async () => {
        try {
          const result = await commandProductAction({ landingId, productId: product.id, version: product.version, command });
          if ("error" in result) { toast.error(result.error); return; }
          toast.success("Catálogo actualizado");
          router.refresh();
        } catch { toast.error("No se pudo actualizar el catálogo"); }
      });
      return;
    }
    run(() => commandProductAction({ landingId, productId: product.id, version: product.version, command }));
  };
  const batchCommand = (products: ProductDto[], command: "publish" | "archive") => startTransition(async () => {
    try {
      const result = await batchCommandProductsAction({
        landingId,
        command,
        items: products.map((item) => ({ productId: item.id, version: item.version })),
      });
      if ("error" in result) { toast.error(result.error); return; }
      if (result.skipped) toast.warning(`${result.updated} actualizados, ${result.skipped} omitidos`);
      else toast.success("Catálogo actualizado");
      router.refresh();
    } catch { toast.error("No se pudo actualizar el catálogo"); }
  });
  return { pending, command, batchCommand };
}
