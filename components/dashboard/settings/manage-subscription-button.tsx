"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
      });

      if (!response.ok) {
        toast.error("No se pudo abrir la gestion de suscripcion");
        return;
      }

      const data = (await response.json()) as { url?: string; redirect?: string };
      const destination = data.url ?? data.redirect;

      if (!destination) {
        toast.error("No se pudo abrir la gestion de suscripcion");
        return;
      }

      window.location.href = destination;
    } catch {
      toast.error("No se pudo abrir la gestion de suscripcion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ActionButton
      disabled={loading}
      onClick={handleClick}
      type="button"
      variant="primary"
    >
      {loading ? "Abriendo..." : "Gestionar suscripcion"}
    </ActionButton>
  );
}
