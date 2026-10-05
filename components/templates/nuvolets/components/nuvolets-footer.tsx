import { Mail, Phone } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { getVisibleNav } from "@/lib/template-sections";
import type { ContactContent } from "@/lib/dashboard-data";
import { SOCIAL_PLATFORM_LABELS } from "@/lib/footer-content";
import { FooterLandoraAttribution } from "@/components/templates/shared/footer-landora-attribution";
import { NuvoletsLink } from "./nuvolets-link";
import { NuvoletsFooterColumn } from "./nuvolets-footer-column";

export function NuvoletsFooter({ brand, config, contact, copyrightYear, hidden }: { brand: string; config: NuvoletsContent["footer"]; contact: ContactContent; copyrightYear: number; hidden: string[] }) {
  const socialLinks = [...config.socialLinks, ...(contact.socialLinks ?? []).map((link) => ({ id: link.platform, label: SOCIAL_PLATFORM_LABELS[link.platform], href: link.url }))];
  const contactHref = contact.email ? `mailto:${contact.email}` : contact.phone ? `tel:${contact.phone}` : "";
  return <footer id="contacto" data-section="contacto" className="mx-auto grid max-w-7xl gap-10 px-5 py-14 text-site-chip md:grid-cols-4 md:px-8">
    <div><p className="nuvolets-title mb-3 text-2xl tracking-widest">{brand}</p><p className="whitespace-pre-line leading-relaxed">{config.description}</p></div>
    <NuvoletsFooterColumn title={config.exploreTitle} links={getVisibleNav(config.exploreLinks, hidden, "nuvolets")} />
    <div><NuvoletsFooterColumn title={config.infoTitle} links={getVisibleNav(config.infoLinks, hidden, "nuvolets")} />{contact.email ? <p className="mt-3"><NuvoletsLink href={`mailto:${contact.email}`}>{contact.email}</NuvoletsLink></p> : null}{contact.phone ? <p className="mt-3"><NuvoletsLink href={`tel:${contact.phone}`}>{contact.phone}</NuvoletsLink></p> : null}{contact.ctaLabel && contactHref ? <NuvoletsLink href={contactHref} className="nuvolets-button mt-3 gap-2">{contact.email ? <Mail aria-hidden size={18} className="shrink-0" /> : <Phone aria-hidden size={18} className="shrink-0" />}{contact.ctaLabel}</NuvoletsLink> : null}</div>
    <div><NuvoletsFooterColumn title={config.socialTitle} links={getVisibleNav(socialLinks, hidden, "nuvolets")} /><p className="mt-3">{contact.address}</p></div>
    <div className="border-t border-nuvolets-border pt-6 md:col-span-4">
      <p>© {copyrightYear} {brand} {contact.copyrightSuffix} · {config.copyright}</p>
      <FooterLandoraAttribution className="mt-2 text-site-chip/70" />
      {contact.copyrightExtra ? <p className="mt-3 whitespace-pre-line">{contact.copyrightExtra}</p> : null}
    </div>
  </footer>;
}
