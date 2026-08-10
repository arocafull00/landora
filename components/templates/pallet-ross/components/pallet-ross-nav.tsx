"use client";

import { Settings, User } from "lucide-react";
import { PalletRossLogo } from "@/components/templates/pallet-ross/components/pallet-ross-logo";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";

export function PalletRossNav({ topOffset = 0 }: { topOffset?: number }) {
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
        <NavTextButton label={nav.getStarted} />
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
        <NavTextButton label={nav.pricing} />
        <NavTextButton label={nav.contact} />
        <NavTextButton label={nav.solution} />
        <NavTextButton label={nav.ecommerce} />
      </nav>

      <div className="flex items-center">
        <IconButton label="User account">
          <User size={20} color="var(--site-text)" />
        </IconButton>
        <IconButton label="Settings">
          <Settings size={20} color="var(--site-text)" />
        </IconButton>
      </div>
    </header>
  );
}

function NavTextButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="cursor-pointer border-none bg-transparent font-heading text-[var(--site-text)] text-site-content"
      style={{ padding: "8px 14px" }}
    >
      {label}
    </button>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="cursor-pointer border-none bg-transparent"
      style={{ padding: 8 }}
    >
      {children}
    </button>
  );
}
