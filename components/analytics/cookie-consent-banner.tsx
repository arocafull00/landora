"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { useConsentStore } from "@/stores/consent-store";

export function CookieConsentBanner() {
  const status = useConsentStore((state) => state.status);
  const accept = useConsentStore((state) => state.accept);
  const reject = useConsentStore((state) => state.reject);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (status !== "accepted") {
      return;
    }

    posthog.opt_in_capturing();
  }, [status]);

  useEffect(() => {
    if (status !== null) {
      dialogRef.current?.close();
      return;
    }

    dialogRef.current?.showModal();
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
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-50 m-0 w-full max-w-none border-t border-border bg-background p-4 shadow-lg backdrop:bg-black/40"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p id="cookie-consent-title" className="font-body text-body-sm font-medium text-on-surface">
            Cookies analíticas
          </p>
          <p id="cookie-consent-description" className="mt-1 text-sm text-muted-foreground">
            Utilizamos cookies analíticas para mejorar la experiencia y medir el rendimiento de la
            web.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Rechazar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceptar
          </Button>
        </div>
      </div>
    </dialog>
  );
}
