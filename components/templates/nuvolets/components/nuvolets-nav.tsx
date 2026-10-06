"use client";

import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import { MapPin, Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/dashboard-data";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { AssetImage } from "@/components/ui/asset-image";
import { useNuvoletsNav } from "../hooks/use-nuvolets-nav";
import { NuvoletsCloud } from "./nuvolets-cloud";
import { NuvoletsNavLink } from "./nuvolets-nav-link";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsNav({ brand, logo, links, config, topOffset }: { brand: string; logo: string; links: NavLink[]; config: NuvoletsContent; topOffset: number }) {
  const { open, toggle, close, scrolled } = useNuvoletsNav();
  const storeHref = config.navigation?.directionsHref || config.store.mapsUrl;
  const instagramHref = config.navigation?.instagramHref || config.instagram.url;
  const instagramLabel = config.navigation?.instagramLabel ?? copy.instagram;
  const directionsLabel = config.navigation?.directionsLabel ?? config.store.ctaLabel;
  return (
    <header data-scrolled={scrolled} className="nuvolets-header sticky z-40 border-b border-nuvolets-border backdrop-blur-sm" style={{ top: `calc(${topOffset}px + env(safe-area-inset-top, 0px))` }}>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls="nuvolets-menu" aria-label={open ? copy.closeMenu : copy.openMenu} className="-ml-2 p-2 md:hidden">{open ? <X aria-hidden size={22} strokeWidth={1.5} /> : <Menu aria-hidden size={22} strokeWidth={1.5} />}</button>
        <nav aria-label={copy.principal} className="hidden flex-1 gap-8 text-sm font-medium md:flex">{links.map((link, index) => <NuvoletsNavLink key={link.id} link={link} index={index} onClick={close} />)}</nav>
        <a href="#hero" className="nuvolets-title group text-2xl tracking-[.12em] md:flex-1 md:text-center" aria-label={brand}>
          {logo ? <span className="relative inline-block h-10 w-28 align-middle"><AssetImage src={logo} alt={brand} fill sizes="112px" className="object-contain" /></span> : <><NuvoletsCloud className="nuvolets-category-cloud -mt-1 mr-1 inline w-8 text-nuvolets-blue" />{brand}</>}
        </a>
        <div className="flex items-center gap-6 text-sm font-medium md:flex-1 md:justify-end">
          {instagramLabel ? <NuvoletsLink href={instagramHref} className="nuvolets-nav-link hidden md:inline">{instagramLabel}</NuvoletsLink> : null}
          {directionsLabel ? <NuvoletsLink href={storeHref} className="nuvolets-button gap-2 px-4! py-2! text-sm!"><MapPin aria-hidden size={18} className="shrink-0" />{directionsLabel}</NuvoletsLink> : null}
        </div>
      </div>
      <nav id="nuvolets-menu" aria-label={copy.mobile} hidden={!open} className="nuvolets-menu flex flex-col gap-4 border-t border-nuvolets-border px-5 py-4 text-base md:hidden">
        {links.map((link, index) => <NuvoletsNavLink key={link.id} link={link} index={index} onClick={close} />)}
        {instagramLabel && instagramHref ? <NuvoletsNavLink link={{ id: "instagram", label: instagramLabel, href: instagramHref }} index={links.length} onClick={close} /> : null}
      </nav>
    </header>
  );
}
