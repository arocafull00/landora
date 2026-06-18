import { cache } from "react";
import { isPostHogConfigured, queryPostHog } from "@/lib/posthog-server";

export type DailyView = {
  day: string;
  views: number;
};

export type LandingAnalytics = {
  totalViews: number;
  views7d: number;
  views30d: number;
  ctaClicks: number;
  whatsappClicks: number;
  phoneClicks: number;
  leads: number;
  dailyViews: DailyView[];
};

type MetricsRow = [
  number,
  number,
  number,
  number,
  number,
];

function escapeValue(value: string): string {
  return value.replace(/'/g, "\\'");
}

function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 19);
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

async function fetchMetrics(
  landingId: string,
  from: Date,
  to: Date,
): Promise<MetricsRow> {
  const id = escapeValue(landingId);
  const fromValue = formatDateTime(from);
  const toValue = formatDateTime(to);

  const hogql = `
    SELECT
      countIf(event IN ('page_view', '$pageview')) AS total_views,
      countIf(event = 'whatsapp_click') AS whatsapp_clicks,
      countIf(event = 'phone_click') AS phone_clicks,
      countIf(event = 'cta_click') AS cta_clicks,
      countIf(event = 'lead_generated') AS leads
    FROM events
    WHERE properties.landingId = '${id}'
      AND timestamp >= toDateTime('${fromValue}')
      AND timestamp <= toDateTime('${toValue}')
  `;

  const result = await queryPostHog(hogql);
  const row = result.results[0] ?? [0, 0, 0, 0, 0];

  return [
    toNumber(row[0]),
    toNumber(row[1]),
    toNumber(row[2]),
    toNumber(row[3]),
    toNumber(row[4]),
  ];
}

async function fetchDailyViews(
  landingId: string,
  from: Date,
  to: Date,
): Promise<DailyView[]> {
  const id = escapeValue(landingId);
  const fromValue = formatDateTime(from);
  const toValue = formatDateTime(to);

  const hogql = `
    SELECT
      toDate(timestamp) AS day,
      count() AS views
    FROM events
    WHERE event IN ('page_view', '$pageview')
      AND properties.landingId = '${id}'
      AND timestamp >= toDateTime('${fromValue}')
      AND timestamp <= toDateTime('${toValue}')
    GROUP BY day
    ORDER BY day ASC
  `;

  const result = await queryPostHog(hogql);

  return result.results.map((row) => ({
    day: String(row[0]),
    views: toNumber(row[1]),
  }));
}

export const getLandingAnalytics = cache(
  async (landingId: string, from: Date, to: Date): Promise<LandingAnalytics> => {
    if (!isPostHogConfigured()) {
      throw new Error("PostHog analytics is not configured");
    }

    try {
      const now = new Date();
      const from7d = new Date(now);
      from7d.setDate(from7d.getDate() - 7);
      const from30d = new Date(now);
      from30d.setDate(from30d.getDate() - 30);
      const allTimeFrom = new Date("2020-01-01T00:00:00");

      const [allTime, last7d, last30d, rangeMetrics, dailyViews] = await Promise.all([
        fetchMetrics(landingId, allTimeFrom, now),
        fetchMetrics(landingId, from7d, now),
        fetchMetrics(landingId, from30d, now),
        fetchMetrics(landingId, from, to),
        fetchDailyViews(landingId, from, to),
      ]);

      return {
        totalViews: allTime[0],
        views7d: last7d[0],
        views30d: last30d[0],
        whatsappClicks: rangeMetrics[1],
        phoneClicks: rangeMetrics[2],
        ctaClicks: rangeMetrics[3],
        leads: rangeMetrics[4],
        dailyViews,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch landing analytics: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },
);
