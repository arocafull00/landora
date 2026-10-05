"use client";

import { Trash2 } from "lucide-react";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { useSubscriptionActions } from "../hooks/use-subscription-actions";

export function SubscriptionDeleteButton({ landingId, email }: { landingId: string; email: string }) {
  const { pending, confirmRemove } = useSubscriptionActions(landingId);
  return <button type="button" disabled={pending} onClick={() => confirmRemove(email)} aria-label={copy.remove} className="rounded-lg p-2 text-ink-muted transition-colors hover:text-danger"><Trash2 size={18} aria-hidden /></button>;
}
