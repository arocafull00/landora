"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSubscriptionAction, exportSubscriptionsAction } from "@/app/actions/email-subscriptions";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";

export function useSubscriptionActions(landingId: string) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const remove = async (email: string) => {
    setPending(true);
    try {
      const result = await deleteSubscriptionAction({ landingId, email });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(copy.deleted);
      router.refresh();
    } catch { toast.error(copy.failed); } finally { setPending(false); }
  };
  const confirmRemove = (email: string) => toast(copy.confirm, { action: { label: copy.remove, onClick: () => void remove(email) }, cancel: { label: copy.cancel, onClick: () => {} } });
  const exportCsv = async (q: string) => {
    setPending(true);
    try {
      const result = await exportSubscriptionsAction({ landingId, q });
      if ("error" in result) { toast.error(result.error); return; }
      const url = URL.createObjectURL(new Blob([result.csv], { type: "text/csv;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "suscripciones.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch { toast.error(copy.failed); } finally { setPending(false); }
  };
  return { pending, confirmRemove, exportCsv };
}
