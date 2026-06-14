import type { NavLink } from "@/lib/dashboard-data";

export function createEmptyNavLink(
  href = "#",
  label = "Nuevo enlace",
): NavLink {
  return {
    id: crypto.randomUUID(),
    label,
    href,
  };
}
