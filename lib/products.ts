import type { ProductDto, PublicProductDto } from "@/lib/domain/dtos";
import type { ProductValues } from "@/lib/schemas/products";

export const PRODUCT_PAGE_SIZE = 20;
export const LOW_STOCK_THRESHOLD = 5;
export type ProductStockState = "pending" | "out" | "low" | "ok";
const EUR_FORMAT = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
export const PRODUCTS_COPY = {
  title: "Productos", description: "Gestiona el catálogo, las variantes y las existencias de tu tienda.",
  disabled: "El módulo de Productos no está habilitado para esta cuenta. Contacta con el administrador.",
  save: "Guardar", saving: "Guardando…", new: "Nuevo producto", empty: "No hay productos que coincidan con los filtros.",
  stock: "Existencias", available: "Disponible", out: "Agotado", pending: "Stock pendiente", consult: "Consultar por WhatsApp",
  configure: "Configurar catálogo", invalidFilters: "Filtros no válidos.", resetFilters: "Restablecer filtros", skip: "Saltar al contenido", count: "productos",
} as const;
export const PRODUCT_STATUS_LABELS = { draft: "Borrador", published: "Publicado", archived: "Archivado" } as const;
export function productSlug(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 150) || "producto";
}
export function formatProductPrice(cents: number | null) {
  return cents === null ? "Precio pendiente" : EUR_FORMAT.format(cents / 100);
}
export function parseLegacyPrice(value: string) {
  const normalized = value.trim().replace(/\s*€$/, "").trim();
  if (!/^\d{1,6}([.,]\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized.replace(",", ".")) * 100);
}
export function newProductValues(): ProductValues {
  return { title: "", subtitle: "", slug: "", description: "", category: "", brand: "", tags: [], featured: false, images: [], priceCents: null, previousPriceCents: null, material: "", composition: "", dimensions: "", weight: "", characteristics: [], status: "draft", variants: [{ id: crypto.randomUUID(), size: "", color: "", sku: "", stock: null, priceCents: null, previousPriceCents: null }] };
}
export function toPublicProduct(product: ProductDto): PublicProductDto {
  const { landingId, version, status, variants, ...publicProduct } = product;
  void landingId; void version; void status;
  return { ...publicProduct, variants: variants.map(({ stock, sku, ...variant }) => { void sku; return { ...variant, available: (stock ?? 0) > 0 }; }) };
}
export function productMinPrice(product: Pick<ProductDto, "priceCents"> & { variants: { priceCents: number | null }[] }) {
  return Math.min(...product.variants.map((variant) => variant.priceCents ?? product.priceCents ?? 0));
}
export function productStockInfo(product: Pick<ProductDto, "variants">) {
  if (product.variants.some((variant) => variant.stock === null)) {
    return { units: null as number | null, state: "pending" as ProductStockState };
  }
  const units = product.variants.reduce((sum, variant) => sum + (variant.stock ?? 0), 0);
  if (units <= 0) return { units, state: "out" as ProductStockState };
  if (units <= LOW_STOCK_THRESHOLD) return { units, state: "low" as ProductStockState };
  return { units, state: "ok" as ProductStockState };
}
export function productVariantSummary(product: Pick<ProductDto, "variants">) {
  const count = product.variants.length;
  const sku = product.variants.find((variant) => variant.sku.trim())?.sku.trim();
  if (sku) return `${sku} · ${count} variantes`;
  return `${count} variantes`;
}
