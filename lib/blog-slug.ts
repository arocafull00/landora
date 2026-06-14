import { mediumDateFormatter } from "@/lib/intl-formatters";

export function slugifyBlogTitle(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatBlogDate(value: Date | string | null | undefined): string {
  if (!value) return "";

  return mediumDateFormatter.format(new Date(value));
}

export function normalizeLandingSlug(slug: string): string {
  return slug.replace(/^\//, "");
}
