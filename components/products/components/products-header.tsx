"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Plus, Settings2 } from "lucide-react";
import { PRODUCTS_COPY } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProductsHeader({ total, onNew, children }: { total: number; onNew: () => void; children: ReactNode }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">{PRODUCTS_COPY.title}</h1>
          <Badge variant="secondary" className="bg-line px-2.5 py-1 text-ink-secondary">
            {total}
          </Badge>
        </div>
        <p className="mt-1.5 text-sm text-ink-subtle">Gestiona catálogo, precios, stock y publicación.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <Button asChild variant="outline" className="h-10 gap-2 rounded-lg border-line bg-surface-container-lowest px-3.5 text-ink hover:bg-surface-subtle">
          <Link href="/products/settings">
            <Settings2 className="size-4" aria-hidden />
            Configurar catálogo
          </Link>
        </Button>
        <Button type="button" className="h-10 gap-2 rounded-lg px-4 font-semibold" onClick={onNew}>
          <Plus className="size-4" aria-hidden />
          {PRODUCTS_COPY.new}
        </Button>
      </div>
    </header>
  );
}
