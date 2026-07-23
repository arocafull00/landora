import { redirect } from "next/navigation";
import { AnalyticsDashboard } from "@/components/dashboard/analytics/analytics-dashboard";
import { getLandingAnalytics } from "@/data/analytics";
import { getLandingPageByUserId } from "@/data/landing-pages";
import {
  formatDateInput,
  getPresetRange,
  type DateRangePreset,
} from "@/lib/analytics-date-range";
import { getEffectiveClientId } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { analyticsSearchParamsSchema } from "@/lib/schemas/analytics";

function resolveRange(params: {
  range: DateRangePreset;
  from?: string;
  to?: string;
}) {
  if (params.range === "custom" && params.from && params.to) {
    return {
      from: new Date(`${params.from}T00:00:00`),
      to: new Date(`${params.to}T23:59:59.999`),
    };
  }

  return getPresetRange(params.range);
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;
  const parsed = analyticsSearchParamsSchema.safeParse({
    range: typeof rawParams.range === "string" ? rawParams.range : undefined,
    from: typeof rawParams.from === "string" ? rawParams.from : undefined,
    to: typeof rawParams.to === "string" ? rawParams.to : undefined,
  });
  const params = parsed.success
    ? parsed.data
    : { range: "30d" as const, from: undefined, to: undefined };
  const range = resolveRange(params);
  const fromValue = formatDateInput(range.from);
  const toValue = formatDateInput(range.to);

  const userId = await getEffectiveClientId();
  if (!userId) redirect("/sign-in");

  const landing = await getLandingPageByUserId(userId);
  if (!landing) {
    return (
      <AnalyticsDashboard
        data={null}
        from={fromValue}
        preset={params.range}
        to={toValue}
      />
    );
  }

  let data = null;
  if (range.from <= range.to) {
    try {
      data = await getLandingAnalytics(landing.id, range.from, range.to);
    } catch (error) {
      logger.captureException(error, {
        action: "load-landing-analytics",
        landingId: landing.id,
        tenantId: userId,
      });
    }
  }

  return (
    <AnalyticsDashboard
      data={data}
      from={fromValue}
      preset={params.range}
      to={toValue}
    />
  );
}
