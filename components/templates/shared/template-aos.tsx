"use client";

import type { CSSProperties, ReactNode } from "react";
import "aos/dist/aos.css";
import { useTemplateAos } from "@/components/templates/shared/hooks/use-template-aos";

export function TemplateAos({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
}) {
  const rootRef = useTemplateAos();

  return (
    <div className={className} ref={rootRef} style={style}>
      {children}
    </div>
  );
}
