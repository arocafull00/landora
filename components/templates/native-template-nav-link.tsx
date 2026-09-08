import type { ReactNode } from "react";
import type { EditorPageTarget } from "@/lib/dashboard-data";
import { getPreviewTargetAttributes } from "@/lib/preview-target-attributes";

export function NativeTemplateNavLink({
  children,
  className,
  href,
  pageTarget,
}: {
  children: ReactNode;
  className: string;
  href: string;
  pageTarget?: EditorPageTarget;
}) {
  return (
    <a
      className={className}
      href={href}
      {...getPreviewTargetAttributes(pageTarget)}
    >
      {children}
    </a>
  );
}
