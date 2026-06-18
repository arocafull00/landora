"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { LandingAnalytics } from "@/data/analytics";
import {
  AnalyticsDashboard,
  formatDateInput,
  getPresetRange,
  type DateRangePreset,
} from "@/components/dashboard/analytics/analytics-dashboard";

async function fetchAnalytics(from: string, to: string): Promise<LandingAnalytics> {
  const params = new URLSearchParams({ from, to });
  const response = await fetch(`/api/analytics?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load analytics");
  }

  return response.json();
}

export function AnalyticsSection() {
  const [preset, setPreset] = useState<DateRangePreset>("30d");
  const [from, setFrom] = useState(formatDateInput(getPresetRange("30d").from));
  const [to, setTo] = useState(formatDateInput(getPresetRange("30d").to));
  const [data, setData] = useState<LandingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async (fromValue: string, toValue: string) => {
    setLoading(true);

    try {
      const analytics = await fetchAnalytics(fromValue, toValue);
      setData(analytics);
    } catch {
      setData(null);
      toast.error("No se pudieron cargar las analíticas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics(from, to);
  }, [from, to, loadAnalytics]);

  const handlePresetChange = (nextPreset: DateRangePreset) => {
    setPreset(nextPreset);

    if (nextPreset === "custom") return;

    const range = getPresetRange(nextPreset);
    setFrom(formatDateInput(range.from));
    setTo(formatDateInput(range.to));
  };

  const handleCustomRangeChange = (nextFrom: string, nextTo: string) => {
    setPreset("custom");
    setFrom(nextFrom);
    setTo(nextTo);
  };

  return (
    <AnalyticsDashboard
      data={data}
      from={from}
      loading={loading}
      onCustomRangeChange={handleCustomRangeChange}
      onPresetChange={handlePresetChange}
      preset={preset}
      to={to}
    />
  );
}
