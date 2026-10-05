import { z } from "zod";
import { productSlug } from "@/lib/products";

const label = z.string().trim().max(160);
const money = z.number().int().min(0).max(100_000_000);
const image = z.strictObject({
  url: z.string().max(2048).refine((value) => {
    if (/^\/(?!\/)[\w/ .%-]+$/.test(value)) return true;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  }, "Selecciona una imagen válida"),
  alt: z.string().trim().max(250),
});

const productVariantSchema = z.strictObject({
  id: z.uuid(), size: label, color: label, sku: z.string().trim().max(100),
  stock: z.number().int().min(0).max(1_000_000).nullable(),
  priceCents: money.nullable(), previousPriceCents: money.nullable(),
});

export const productSchema = z.strictObject({
  title: label.min(1, "Introduce el título"), subtitle: z.string().trim().max(300),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa letras minúsculas, números y guiones"),
  description: z.string().trim().max(20_000), category: label, brand: label,
  tags: z.array(label.min(1)).max(30), featured: z.boolean(),
  images: z.array(image).max(20), priceCents: money.nullable(), previousPriceCents: money.nullable(),
  material: label, composition: z.string().trim().max(1000), dimensions: label, weight: label,
  characteristics: z.array(z.strictObject({ name: label.min(1), value: z.string().trim().min(1).max(1000) })).max(30),
  variants: z.array(productVariantSchema).min(1).max(200),
  status: z.enum(["draft", "published", "archived"]),
}).superRefine((product, ctx) => {
  if (product.priceCents === null) ctx.addIssue({ code: "custom", path: ["priceCents"], message: "Introduce el precio" });
  const combinations = product.variants.map((v) => `${v.size.toLocaleLowerCase()}\u0000${v.color.toLocaleLowerCase()}`);
  if (new Set(combinations).size !== combinations.length) ctx.addIssue({ code: "custom", path: ["variants"], message: "Hay combinaciones de talla y color duplicadas" });
  if (new Set(product.variants.map((v) => v.id)).size !== product.variants.length) ctx.addIssue({ code: "custom", path: ["variants"], message: "Hay variantes duplicadas" });
  const skus = product.variants.flatMap((v) => v.sku ? [v.sku.toUpperCase()] : []);
  if (new Set(skus).size !== skus.length) ctx.addIssue({ code: "custom", path: ["variants"], message: "Hay referencias SKU duplicadas" });
  if (product.previousPriceCents !== null && product.priceCents !== null && product.previousPriceCents <= product.priceCents) ctx.addIssue({ code: "custom", path: ["previousPriceCents"], message: "El precio anterior debe superar el actual" });
  product.variants.forEach((variant, index) => {
    const price = variant.priceCents ?? product.priceCents;
    const previous = variant.previousPriceCents ?? product.previousPriceCents;
    if (price !== null && previous !== null && previous <= price) ctx.addIssue({ code: "custom", path: ["variants", index, "previousPriceCents"], message: "El precio anterior debe superar el actual" });
    if (product.status === "published" && variant.stock === null) ctx.addIssue({ code: "custom", path: ["variants", index, "stock"], message: "Configura las existencias antes de publicar" });
  });
  if (product.status === "published" && product.images.length === 0) ctx.addIssue({ code: "custom", path: ["images"], message: "Añade una imagen principal antes de publicar" });
});

export const catalogConfigSchema = z.strictObject({
  enabled: z.boolean(), title: label.min(1), description: z.string().trim().max(2000),
  whatsappPhone: z.string().trim().max(20).refine((value) => !value || /^\+[1-9]\d{7,14}$/.test(value), "Introduce el teléfono con prefijo internacional, por ejemplo +34600111222"),
});
export const productSaveSchema = z.strictObject({ landingId: z.uuid(), productId: z.uuid().nullable(), version: z.number().int().min(0), product: productSchema });
export const productCommandSchema = z.strictObject({ landingId: z.uuid(), productId: z.uuid(), version: z.number().int().min(1), command: z.enum(["duplicate", "archive", "restore", "unpublish", "publish"]) });
export const productBatchCommandSchema = z.strictObject({
  landingId: z.uuid(),
  productIds: z.array(z.uuid()).min(1).max(50),
  command: z.enum(["publish", "archive"]),
});
export const productsAccessSchema = z.strictObject({ userId: z.uuid(), enabled: z.boolean() });
export const productCategoryFormSchema = z.strictObject({ name: label.min(1, "Introduce el nombre de la categoría") });
export const productCategorySaveSchema = productCategoryFormSchema.extend({ landingId: z.uuid(), previousName: label.min(1).nullable() });
export const catalogSaveSchema = z.strictObject({ landingId: z.uuid(), version: z.number().int().min(0), config: catalogConfigSchema });
export const catalogQuerySchema = z.strictObject({
  q: z.string().trim().max(160).default(""), category: label.default(""), brand: label.default(""), size: label.default(""),
  status: z.enum(["all", "draft", "published", "archived"]).default("all"),
  availability: z.enum(["all", "available", "out", "pending"]).default("all"),
  sort: z.enum(["newest", "price-asc", "price-desc"]).default("newest"),
  page: z.coerce.number().int().min(1).max(100_000).default(1),
});
export const previewCatalogQuerySchema = catalogQuerySchema.extend({ embed: z.literal("1").optional() }).transform(({ embed, ...query }) => {
  void embed;
  return query;
});
export const catalogRouteSchema = z.strictObject({ slug: z.string().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), productSlug: z.string().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional() });
export type ProductValues = z.infer<typeof productSchema>;
export type CatalogConfigValues = z.infer<typeof catalogConfigSchema>;
export type CatalogQuery = z.infer<typeof catalogQuerySchema>;

const formMoney = z.string().trim().max(16).regex(/^(?:\d+(?:[.,]\d{1,2})?)?$/, "Introduce un importe con hasta dos decimales").transform((value) => value ? Math.round(Number(value.replace(",", ".")) * 100) : null).pipe(money.nullable());
export const productFormSchema = z.strictObject({
  ...productSchema.shape,
  slug: z.string().trim().max(160).regex(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Usa letras minúsculas, números y guiones"),
  tags: z.string().max(2000).transform((value) => value.split(",").flatMap((tag) => tag.trim() ? [tag.trim()] : [])).pipe(productSchema.shape.tags),
  priceCents: formMoney, previousPriceCents: formMoney,
  variants: z.array(z.strictObject({ ...productVariantSchema.shape, stock: z.string().trim().max(10).regex(/^\d*$/, "Introduce unidades enteras").transform((value) => value ? Number(value) : null).pipe(productVariantSchema.shape.stock), priceCents: formMoney, previousPriceCents: formMoney })).min(1).max(200),
}).transform((product) => ({ ...product, slug: product.slug || productSlug(product.title) })).pipe(productSchema);
export type ProductFormValues = z.input<typeof productFormSchema>;
