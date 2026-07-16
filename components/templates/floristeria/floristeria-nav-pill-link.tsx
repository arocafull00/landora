"use client";

import type { NavLink } from "@/lib/dashboard-data";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function FloristeriaNavPillLink({ link }: { link: NavLink }) {
  return (
    <li>
      <TemplateNavAnchor
        className="rounded-full px-4 py-2 text-sm font-medium text-[var(--site-text)]/70 transition-colors hover:bg-[var(--site-primary)]/5 hover:text-[var(--site-primary)] lg:px-5"
        href={link.href}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {link.label}
      </TemplateNavAnchor>
    </li>
  );
}
