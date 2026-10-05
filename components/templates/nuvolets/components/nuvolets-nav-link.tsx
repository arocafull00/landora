import type { CSSProperties } from "react";
import type { NavLink } from "@/lib/dashboard-data";

export function NuvoletsNavLink({ link, index, onClick }: { link: NavLink; index: number; onClick: () => void }) {
  return <a href={link.href} onClick={onClick} className="nuvolets-nav-link" style={{ "--i": index } as CSSProperties} {...(/^https?:\/\//.test(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>;
}
