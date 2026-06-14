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

  return new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(new Date(value));
}

export function normalizeLandingSlug(slug: string): string {
  return slug.replace(/^\//, "");
}
