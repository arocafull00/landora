"use client";

import { Download } from "lucide-react";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { useSubscriptionActions } from "../hooks/use-subscription-actions";

export function SubscriptionExportButton({ landingId, q }: { landingId: string; q: string }) {
  const { pending, exportCsv } = useSubscriptionActions(landingId);
  return <button type="button" disabled={pending} onClick={() => void exportCsv(q)} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-ink"><Download size={16} aria-hidden />{copy.export}</button>;
}
