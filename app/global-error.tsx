"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.captureException(error, { action: "global-error" });
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-surface-bg px-6 text-on-background">
        <div className="space-y-4 text-center">
          <p>Ha ocurrido un error inesperado.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary transition-colors hover:bg-primary-fixed-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
