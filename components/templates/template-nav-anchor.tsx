"use client";

import type { ComponentProps } from "react";
import { handleSectionNavClick } from "@/lib/scroll-to-section";

type TemplateNavAnchorProps = ComponentProps<"a">;

export function TemplateNavAnchor({ href, onClick, ...props }: TemplateNavAnchorProps) {
  if (!href || !href.startsWith("#") || href === "#") {
    return <a href={href} onClick={onClick} {...props} />;
  }

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleSectionNavClick(event, href);
      }}
      {...props}
    />
  );
}
