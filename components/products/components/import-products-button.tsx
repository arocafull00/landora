"use client";
import { Button } from "@/components/ui/button";
import { useProductCommand } from "../hooks/use-product-command";
const COPY = "Importar productos actuales";
export function ImportProductsButton({ landingId }: { landingId: string }) {
  const { pending, importProducts } = useProductCommand(landingId);
  return <Button variant="outline" disabled={pending} onClick={importProducts}>{COPY}</Button>;
}
