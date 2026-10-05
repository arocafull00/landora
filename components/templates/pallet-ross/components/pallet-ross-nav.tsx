"use client";

import { Settings, User } from "lucide-react";
import { PalletRossLogo } from "@/components/templates/pallet-ross/components/pallet-ross-logo";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";
import type { NavLink } from "@/lib/dashboard-data";
import { PalletRossNavTextButton } from "./pallet-ross-nav-text-button";
import { PalletRossNavIconButton } from "./pallet-ross-nav-icon-button";

export function PalletRossNav({ topOffset = 0, catalogLink }: { topOffset?: number; catalogLink?: NavLink }) {
  const { nav, brand } = PALLET_ROSS_COPY;

  return (
    <header
      className="fixed z-50 flex w-full items-center justify-between"
      style={{
        top: topOffset,
        padding: "18px 32px",
        background: "transparent",
      }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        <PalletRossLogo />
        <span
          className="font-heading font-semibold text-[var(--site-text)] text-site-content"
        >
          {brand}
        </span>
      </div>

      <nav className="hidden items-center md:flex">
        <PalletRossNavTextButton label={nav.getStarted} />
        <button
          type="button"
          className="flex cursor-pointer items-center border-none bg-transparent font-heading text-[var(--site-text)] text-site-content"
          style={{ padding: "8px 14px" }}
        >
          <span
            className="inline-block rounded-full bg-[var(--site-accent)]"
            style={{ width: 14, height: 14, marginRight: 6 }}
            aria-hidden
          />
          {nav.createStrategy}
        </button>
        <PalletRossNavTextButton label={nav.pricing} />
        <PalletRossNavTextButton label={nav.contact} />
        <PalletRossNavTextButton label={nav.solution} />
        <PalletRossNavTextButton label={nav.ecommerce} />
      </nav>

      <div className="flex items-center">
        {catalogLink ? <a href={catalogLink.href} className="px-3 py-2 text-site-content text-on-surface">{catalogLink.label}</a> : null}
        <PalletRossNavIconButton label="User account">
          <User size={20} color="var(--site-text)" />
        </PalletRossNavIconButton>
        <PalletRossNavIconButton label="Settings">
          <Settings size={20} color="var(--site-text)" />
        </PalletRossNavIconButton>
      </div>
    </header>
  );
}
