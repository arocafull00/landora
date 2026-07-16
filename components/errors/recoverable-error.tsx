"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";

export function RecoverableError({
  error,
  reset,
  action,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  action: string;
}) {
  useEffect(() => {
    logger.captureException(error, { action });
  }, [action, error]);

  return (
    <div className="flex min-h-64 items-center justify-center p-6">
      <div className="space-y-4 text-center">
        <p className="text-on-surface-variant">
          No se ha podido cargar esta sección.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-on-primary transition-colors hover:bg-primary-fixed-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RotateCcw aria-hidden className="size-4" />
          Reintentar
        </button>
      </div>
    </div>
  );
}
