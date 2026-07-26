"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import type { EditorPageTarget } from "@/lib/dashboard-data";
import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";
import { isRistoranteCartaNavHref } from "@/lib/template-sections";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function RistoranteNavLink({
  activePage,
  cartaHref,
  cartaPageTarget,
  className,
  homePageTarget,
  href,
  label,
  onNavigate,
  style,
}: {
  activePage?: "home" | "carta";
  cartaHref?: string;
  cartaPageTarget?: EditorPageTarget;
  className?: string;
  homePageTarget?: EditorPageTarget;
  href: string;
  label: string;
  onNavigate?: () => void;
  style?: CSSProperties;
}) {
  const previewBridge = usePreviewBridge();
  const isCartaLink =
    Boolean(cartaHref) &&
    (href === cartaHref || isRistoranteCartaNavHref(href));

  if (isCartaLink && cartaHref) {
    return (
      <Link
        className={className}
        href={cartaHref}
        onNavigate={() => {
          if (cartaPageTarget) {
            previewBridge?.announcePageTarget(cartaPageTarget);
          }
          onNavigate?.();
        }}
        prefetch={cartaPageTarget ? true : undefined}
        style={style}
      >
        {label}
      </Link>
    );
  }

  if (activePage === "carta" && href.includes("#")) {
    return (
      <Link
        className={className}
        href={href}
        onNavigate={() => {
          if (homePageTarget) {
            previewBridge?.announcePageTarget(homePageTarget);
          }
          onNavigate?.();
        }}
        prefetch={homePageTarget ? true : undefined}
        style={style}
      >
        {label}
      </Link>
    );
  }

  if (!href.startsWith("#") || href === "#") {
    return (
      <a className={className} href={href} onClick={onNavigate} style={style}>
        {label}
      </a>
    );
  }

  return (
    <TemplateNavAnchor
      className={className}
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onNavigate?.();
        if (event.defaultPrevented) return;
      }}
      style={style}
    >
      {label}
    </TemplateNavAnchor>
  );
}
