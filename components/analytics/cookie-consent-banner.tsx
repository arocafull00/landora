"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { useConsentStore } from "@/stores/consent-store";

export function CookieConsentBanner() {
  const status = useConsentStore((state) => state.status);
  const accept = useConsentStore((state) => state.accept);
  const reject = useConsentStore((state) => state.reject);

  useEffect(() => {
    if (status !== "accepted") return;

    posthog.opt_in_capturing();
  }, [status]);

  if (status !== null) return null;

  const handleAccept = () => {
    accept();
    posthog.opt_in_capturing();
  };

  const handleReject = () => {
    reject();
  };

  return (
    <div
      role="dialog"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="cookie-consent-description" className="text-sm text-muted-foreground">
          Utilizamos cookies analíticas para mejorar la experiencia y medir el rendimiento de la
          web.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Rechazar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
