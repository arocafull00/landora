import Link from "next/link";
import type { EmailSubscriptionDto } from "@/lib/domain/dtos";
import type { SubscriptionSettings } from "@/lib/schemas/subscription-settings";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { isSubscriptionConfigured } from "@/lib/email-subscriptions/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBSCRIPTION_SETTINGS_COPY as settingsCopy } from "../subscription-settings-copy";
import { SubscriptionRow } from "./subscription-row";
import { SubscriptionExportButton } from "./subscription-export-button";
import { SubscriptionSettingsPanel } from "./subscription-settings-panel";
import { SubscriptionSetupNotice } from "./subscription-setup-notice";

export function SubscriptionsPanel({ landingId, rows, total, page, q, settings }: { landingId: string; rows: EmailSubscriptionDto[]; total: number; page: number; q: string; settings: SubscriptionSettings }) {
  const pages = Math.max(1, Math.ceil(total / 50));
  const pageHref = (value: number) => `/email-subscriptions?${new URLSearchParams({ page: String(value), q })}`;
  return <main id="main-content" className="min-w-0 flex-1 overflow-auto bg-canvas p-5 md:p-8"><div className="mx-auto max-w-5xl space-y-6">
    <header><h1 className="text-2xl font-semibold text-ink">{copy.title}</h1><p className="mt-2 text-ink-secondary">{copy.description}</p></header>
    {isSubscriptionConfigured(settings) ? null : <SubscriptionSetupNotice />}
    <Tabs defaultValue="subscribers" className="gap-6 pl-0">
      <TabsList><TabsTrigger value="subscribers">{settingsCopy.subscribersTab}</TabsTrigger><TabsTrigger value="settings">{settingsCopy.settingsTab}</TabsTrigger></TabsList>
      <TabsContent value="subscribers" className="space-y-6">
        <div className="flex flex-wrap justify-between gap-4"><form method="get" action="/email-subscriptions" className="flex gap-2"><label><span className="sr-only">{copy.search}</span><input name="q" defaultValue={q} placeholder={copy.search} maxLength={200} className="rounded-lg border border-border bg-surface px-3 py-2 text-ink" /></label><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-on-primary">{copy.searchButton}</button></form><SubscriptionExportButton landingId={landingId} q={q} /></div>
        <div className="overflow-x-auto rounded-lg border border-border bg-surface"><table className="w-full text-left text-sm"><caption className="sr-only">{copy.tableLabel}</caption><thead className="border-b border-border text-ink-secondary"><tr><th scope="col" className="px-4 py-3">{copy.email}</th><th scope="col" className="px-4 py-3">{copy.date}</th><th scope="col"><span className="sr-only">{copy.remove}</span></th></tr></thead><tbody>{rows.map((row) => <SubscriptionRow key={row.email} row={row} landingId={landingId} />)}</tbody></table>{rows.length === 0 ? <p className="p-8 text-center text-ink-muted">{copy.empty}</p> : null}</div>
        <div className="flex flex-wrap justify-between gap-4 text-sm text-ink-secondary"><p>{total} {copy.total} · {copy.page} {page} / {pages}</p><nav aria-label={copy.page} className="flex gap-4">{page > 1 ? <Link href={pageHref(page - 1)}>{copy.previous}</Link> : null}{page < pages ? <Link href={pageHref(page + 1)}>{copy.next}</Link> : null}</nav></div>
      </TabsContent>
      <TabsContent value="settings" className="max-w-3xl"><SubscriptionSettingsPanel landingId={landingId} settings={settings} /></TabsContent>
    </Tabs>
  </div></main>;
}
