import { redirect } from "next/navigation";
import { requireEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getEmailSubscriptions } from "@/data/email-subscriptions";
import { getSubscriptionSettings } from "@/data/subscription-settings";
import { subscriptionQuerySchema } from "@/lib/schemas/email-subscriptions";
import { SubscriptionsPanel } from "@/components/dashboard/email-subscriptions/components/subscriptions-panel";

export default async function EmailSubscriptionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const userId = await requireEffectiveClientId();
  const landing = await getLandingPageByUserId(userId);
  if (!landing) redirect("/editor");
  const query = await searchParams;
  const parsed = subscriptionQuerySchema.safeParse({ page: query.page, q: query.q });
  if (!parsed.success) redirect("/email-subscriptions");
  const { page, q } = parsed.data;
  const [result, settings] = await Promise.all([getEmailSubscriptions(landing.id, page, q), getSubscriptionSettings(landing.id)]);
  const lastPage = Math.max(1, Math.ceil(result.total / 50));
  if (page > lastPage) redirect(`/email-subscriptions?${new URLSearchParams({ page: String(lastPage), q })}`);
  return <SubscriptionsPanel landingId={landing.id} rows={result.rows} total={result.total} page={page} q={q} settings={settings} />;
}
