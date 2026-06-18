export type DateRangePreset = "7d" | "30d" | "90d" | "custom";

export function getPresetRange(preset: DateRangePreset): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();

  if (preset === "7d") {
    from.setDate(from.getDate() - 7);
    return { from, to };
  }

  if (preset === "90d") {
    from.setDate(from.getDate() - 90);
    return { from, to };
  }

  from.setDate(from.getDate() - 30);
  return { from, to };
}

export function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}
