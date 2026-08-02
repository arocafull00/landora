import type { CSSProperties } from "react";
import type { BrandLogoType } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";
import { cn } from "@/lib/utils";


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

  if (brandLogoType === "image" && brandLogoImage) {
    return (
      <span className={cn("relative block h-14 w-48", className)} style={style}>
        <AssetImage
          alt={brand || "Logo"}
          className="object-contain object-left"
          fill
          sizes="224px"
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
        <span
          key={`${char}-${i}`}
          style={{ fontWeight: char === "." ? 800 : 700 }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
