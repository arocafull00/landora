"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { createCustomerPortalAction } from "@/app/actions/stripe";
import { ActionButton } from "@/components/ui/primitives";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const result = await createCustomerPortalAction();
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      window.location.href = result.data.url;
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
