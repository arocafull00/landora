"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    logger.captureException(error, { action: "global-error" });
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-surface-bg px-6 text-on-background">
        <p>Ha ocurrido un error inesperado.</p>
      </body>
    </html>
  );
}
