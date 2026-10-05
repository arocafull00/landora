import type { NavLink } from "@/lib/dashboard-data";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsFooterLink({ link }: { link: NavLink }) {
  return <li><NuvoletsLink href={link.href} className="transition-colors hover:text-nuvolets-accent">{link.label}</NuvoletsLink></li>;
}
