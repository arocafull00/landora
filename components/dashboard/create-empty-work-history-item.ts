import type { WorkExperienceItem } from "@/lib/dashboard-data";

export function createEmptyWorkHistoryItem(): WorkExperienceItem {
  return {
    id: crypto.randomUUID(),
    dateRange: "",
    location: "",
    company: "",
    title: "",
    summary: "",
    highlights: [],
    technologies: [],
  };
}
