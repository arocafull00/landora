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
    if (status !== "accepted") {
      return;
    }

    posthog.opt_in_capturing();
  }, [status]);

  if (status !== null) {
    return null;
  }

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
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-4 left-4 z-50 max-w-xs rounded-lg border border-border bg-background p-3 shadow-md"
    >
      <p id="cookie-consent-title" className="text-xs font-medium text-on-surface">
        Cookies analíticas
      </p>
      <p id="cookie-consent-description" className="mt-1 text-xs text-muted-foreground">
        Utilizamos cookies analíticas para mejorar la experiencia y medir el rendimiento de la web.
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="h-7 flex-1 text-xs" onClick={handleReject}>
          Rechazar
        </Button>
        <Button size="sm" className="h-7 flex-1 text-xs" onClick={handleAccept}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
