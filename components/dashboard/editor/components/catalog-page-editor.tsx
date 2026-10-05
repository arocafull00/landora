import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EDITOR_COPY } from "../editor-copy";

export function CatalogPageEditor() {
  return <div className="space-y-4 py-6">
    <p className="text-sm text-ink-secondary">{EDITOR_COPY.catalogEditing}</p>
    <Button asChild variant="outline"><Link href="/products">{EDITOR_COPY.manageProducts}</Link></Button>
  </div>;
}
