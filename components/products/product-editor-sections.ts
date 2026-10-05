import { Boxes, Images, Info, ListPlus, Search, type LucideIcon } from "lucide-react";
import type { FieldErrors } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { PRODUCT_DRAWER_COPY } from "./product-drawer-copy";

export type ProductSectionId = "general" | "images" | "variants" | "characteristics" | "seo";

type ProductSection = {
  id: ProductSectionId;
  label: string;
  icon: LucideIcon;
  fields: readonly (keyof ProductFormValues)[];
};

export const PRODUCT_SECTIONS: readonly ProductSection[] = [
  {
    id: "general",
    label: PRODUCT_DRAWER_COPY.navInformation,
    icon: Info,
    fields: ["title", "subtitle", "description", "category", "brand", "tags", "featured", "priceCents", "previousPriceCents"],
  },
  { id: "images", label: PRODUCT_DRAWER_COPY.navImages, icon: Images, fields: ["images"] },
  { id: "variants", label: PRODUCT_DRAWER_COPY.navVariants, icon: Boxes, fields: ["variants"] },
  {
    id: "characteristics",
    label: PRODUCT_DRAWER_COPY.navCharacteristics,
    icon: ListPlus,
    fields: ["material", "composition", "dimensions", "weight", "characteristics"],
  },
  { id: "seo", label: PRODUCT_DRAWER_COPY.navSeo, icon: Search, fields: ["slug"] },
];

export function productPanelId(section: ProductSectionId) {
  return `product-panel-${section}`;
}

export function invalidProductSections(errors: FieldErrors<ProductFormValues>) {
  const invalidFields = Object.keys(errors);
  return PRODUCT_SECTIONS.filter((section) => section.fields.some((field) => invalidFields.includes(field))).map(
    (section) => section.id,
  );
}
