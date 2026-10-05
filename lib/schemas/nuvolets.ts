import { z } from "zod";

const text = z.string().max(2000);
const label = z.string().max(200);
const id = z.string().min(1).max(128);
const url = z.string().max(2048).refine((value) => {
  if (!value) return true;
  if (/^#[a-zA-Z0-9_-]+$/.test(value)) return true;
  if (/^\/(?!\/)[a-zA-Z0-9/_?=&.#%+-]*$/.test(value)) return true;
  try {
    return ["https:", "http:", "mailto:", "tel:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, "Introduce un enlace válido");
const image = z.string().max(2048).refine((value) => {
  if (!value) return true;
  if (/^\/(?!\/)[a-zA-Z0-9/_ .%-]+$/.test(value)) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}, "Introduce una imagen HTTPS válida");
const tone = z.enum(["blue", "pink", "yellow", "sage"]);
const link = z.strictObject({ id, label, href: url });
const picture = z.strictObject({ id, image, alt: label, href: url, tone });
const message = z.strictObject({ id, text: label });
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Usa un color hexadecimal de seis cifras");

export const nuvoletsHeroSchema = z.strictObject({ eyebrow: label, title: text, subtitle: text, description: text, image, ctaLabel: label, houseImage: image.optional(), fanImages: z.array(image).max(20).optional() });

export const nuvoletsProductFormSchema = z.strictObject({
  name: z.string().trim().min(1, "Introduce el nombre").max(160),
  price: z.string().trim().max(80),
  image,
  alt: label,
});
const nuvoletsProductSchema = nuvoletsProductFormSchema.extend({
  id,
  href: url.optional(),
  badge: z.enum(["", "Nuevo", "Últimas unidades", "Bestseller"]).optional(),
  tone: tone.optional(),
  colors: z.array(tone).max(12).optional(),
});

export const nuvoletsContentSchema = z.strictObject({
  heroDetails: z.strictObject({ alt: label, primaryHref: url, secondaryLabel: label, secondaryHref: url }),
  marquee: z.array(message).max(30),
  categories: z.array(z.strictObject({ id, title: label, description: text, image, alt: label, href: url, tone })).max(30),
  products: z.array(nuvoletsProductSchema).max(200),
  collection: z.strictObject({ title: label, subtitle: text, note: text, linkLabel: label, href: url }),
  story: z.strictObject({ title: label, text, secondaryText: text, image, alt: label, ctaLabel: label, ctaHref: url }),
  favorites: z.strictObject({ title: label, subtitle: text, productIds: z.array(id).max(200) }),
  store: z.strictObject({ eyebrow: label, title: label, text, image, alt: label, ctaLabel: label, mapsUrl: url, secondaryLabel: label, secondaryHref: url }),
  instagram: z.strictObject({ title: label, text, buttonLabel: label, url, images: z.array(picture).max(30) }),
  newsletter: z.strictObject({ enabled: z.boolean(), title: label, text, placeholder: label, buttonLabel: label, consentText: text, privacyUrl: url }),
  mascot: z.strictObject({ enabled: z.boolean(), name: label, image, alt: label, messages: z.array(message).max(30) }),
  effects: z.strictObject({ decorations: z.boolean(), motion: z.boolean() }),
  colors: z.strictObject({ enabled: z.boolean(), background: color, surface: color, text: color, border: color, blue: color, pink: color, yellow: color, sage: color }),
  footer: z.strictObject({ description: text, exploreTitle: label, exploreLinks: z.array(link).max(20), infoTitle: label, infoLinks: z.array(link).max(20), socialTitle: label, socialLinks: z.array(link).max(20), copyright: text }),
}).superRefine((value, ctx) => {
  for (const items of [value.products, value.categories, value.marquee, value.mascot.messages, value.instagram.images, value.footer.exploreLinks, value.footer.infoLinks, value.footer.socialLinks]) {
    if (new Set(items.map((item) => item.id)).size !== items.length) {
      ctx.addIssue({ code: "custom", message: "Identificadores duplicados" });
    }
  }
  if (value.favorites.productIds.some((productId) => !value.products.some((product) => product.id === productId))) {
    ctx.addIssue({ code: "custom", path: ["favorites", "productIds"], message: "Producto no encontrado" });
  }
  if (value.newsletter.enabled && (!value.newsletter.consentText.trim() || !/^https?:\/\//.test(value.newsletter.privacyUrl))) {
    ctx.addIssue({ code: "custom", path: ["newsletter", "privacyUrl"], message: "Configura el consentimiento y el enlace de privacidad antes de activar la newsletter" });
  }
});

export type NuvoletsContent = z.infer<typeof nuvoletsContentSchema>;
export type NuvoletsProduct = z.infer<typeof nuvoletsProductSchema>;
export type NuvoletsProductForm = z.infer<typeof nuvoletsProductFormSchema>;

export const nuvoletsLandingContentSchema = z.object({
  nuvolets: nuvoletsContentSchema,
  hero: nuvoletsHeroSchema,
  brand: label,
  brandLogoType: z.enum(["text", "image"]),
  brandLogoImage: image,
  nav: z.array(link).max(50),
  hiddenSections: z.array(id).max(30).optional(),
  sectionOrder: z.array(id).max(30).optional(),
  contact: z.strictObject({
    email: z.union([z.email().max(254), z.literal("")]),
    phone: z.string().max(100),
    address: text,
    ctaLabel: label.optional(),
    copyrightSuffix: text.optional(),
    copyrightExtra: text.optional(),
    whatsappEnabled: z.boolean().optional(),
    socialLinks: z.array(z.strictObject({ platform: z.enum(["instagram", "facebook", "linkedin", "tiktok", "youtube", "x"]), url })).max(20).optional(),
  }),
});
