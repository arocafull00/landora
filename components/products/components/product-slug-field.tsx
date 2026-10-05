"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

const COPY = { label: "URL de la ficha", prefix: "/productos/", hint: "Si lo dejas vacío se genera a partir del título." } as const;
const ID = "product-slug";

export function ProductSlugField({ binding, error }: { binding: UseFormRegisterReturn; error?: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={ID} className="text-sm font-medium">
        {COPY.label}
      </label>
      <div className="flex">
        <span className="flex h-9 items-center rounded-l-md border border-r-0 border-input bg-surface-subtle px-3 text-sm text-ink-faint">
          {COPY.prefix}
        </span>
        <Input
          id={ID}
          className="rounded-l-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${ID}-error` : `${ID}-hint`}
          {...binding}
        />
      </div>
      {error ? (
        <p id={`${ID}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        <p id={`${ID}-hint`} className="text-xs text-ink-faint">
          {COPY.hint}
        </p>
      )}
    </div>
  );
}
