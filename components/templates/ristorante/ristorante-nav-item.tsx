import type { NavLink } from "@/lib/dashboard-data";

export function RistoranteNavItem({ item }: { item: NavLink }) {
  return <a className="transition-colors hover:text-ristorante-tomato focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ristorante-olive" href={item.href}>{item.label}</a>;
}
