import type { EmailSubscriptionDto } from "@/lib/domain/dtos";
import { SubscriptionDeleteButton } from "./subscription-delete-button";

const dateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Madrid" });

export function SubscriptionRow({ row, landingId }: { row: EmailSubscriptionDto; landingId: string }) {
  return <tr className="border-b border-border-subtle"><td className="break-all px-4 py-3 text-ink">{row.email}</td><td className="whitespace-nowrap px-4 py-3 text-ink-secondary"><time dateTime={row.createdAt}>{dateFormatter.format(new Date(row.createdAt))}</time></td><td className="px-4 py-3 text-right"><SubscriptionDeleteButton landingId={landingId} email={row.email} /></td></tr>;
}
