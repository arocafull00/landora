"use client";

import { m, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { BrandLogoType } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function TemplateNavBrand({
  animated = false,
  brand,
  brandLogoImage,
  brandLogoType,
  className = "",
  style,
}: {
  animated?: boolean;
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();

  if (brandLogoType === "image" && brandLogoImage) {
    return (
      <span className={`relative block h-9 w-40 ${className}`} style={style}>
        <AssetImage
          alt={brand || "Logo"}
          className="object-contain object-left"
          fill
          sizes="160px"
          src={brandLogoImage}
        />
      </span>
    );
  }

  if (!animated) {
    return (
      <span className={className} style={style}>
        {brand}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {brand.split("").map((char, i) => (
        <m.span
          key={`${char}-${i}`}
          style={{ fontWeight: char === "." ? 800 : 700 }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 + i * 0.035, ease: easeOut }}
        >
          {char}
        </m.span>
      ))}
    </span>
  );
}
