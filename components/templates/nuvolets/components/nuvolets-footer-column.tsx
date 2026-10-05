import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NuvoletsFooterLink } from "./nuvolets-footer-link";

export function NuvoletsFooterColumn({ title, links }: { title: string; links: NuvoletsContent["footer"]["exploreLinks"] }) {
  return <div><p className="mb-3 font-semibold">{title}</p><ul className="space-y-2">{links.map((link) => <NuvoletsFooterLink key={link.id} link={link} />)}</ul></div>;
}
