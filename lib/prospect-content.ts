import { z } from "zod";
import {
  buildProspectEmail,
  buildProspectPassword,
  buildProspectSlug,
  resolveProspectName,
} from "@/lib/prospect-credentials";
import { resolveTemplateId } from "@/lib/category-template-map";
import type { TemplateId } from "@/lib/dashboard-data";

const benefitIconSchema = z.enum(["sparkles", "award", "star", "heart", "shield"]);

const prospectMetaSchema = z.object({
  googleId: z.string().optional(),
  category: z.string().optional(),
  name: z.string().optional(),
});

const prospectLandingContentSchema = z.object({
  meta: prospectMetaSchema.optional(),
  brand: z.string(),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    image: z.string(),
  }),
  story: z.object({
    statement: z.string(),
  }),
  stats: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
    })
  ),
  gallery: z.array(
    z.object({
      id: z.string().optional(),
      image: z.string(),
    })
  ),
  nav: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
  contact: z.object({
    phone: z.string(),
    email: z.string().nullable(),
    address: z.string(),
  }),
  testimonials: z.array(
    z.object({
      id: z.string().optional(),
      author: z.string(),
      date: z.string(),
      rating: z.number(),
      comment: z.string(),
      verified: z.boolean(),
    })
  ),
  benefits: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: benefitIconSchema,
    })
  ),
  workflow: z.array(
    z.object({
      number: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  serviceMenu: z
    .array(
      z.object({
        category: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            price: z.string().optional(),
            description: z.string().optional(),
          })
        ),
      })
    )
    .nullable(),
  team: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        role: z.string(),
        image: z.string(),
      })
    )
    .nullable(),
});

export type ProspectLandingContent = z.infer<typeof prospectLandingContentSchema>;

export type ProspectPreview = {
  name: string;
  email: string;
  password: string;
  slug: string;
  template: TemplateId | null;
  category: string | null;
  requiresTemplateSelection: boolean;
  content: ProspectLandingContent;
};

export function parseProspectJson(raw: string) {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "El archivo no contiene JSON válido" };
  }

  const result = prospectLandingContentSchema.safeParse(parsed);

  if (!result.success) {
    return { error: "El JSON no tiene la estructura esperada de prospecto" };
  }

  return { data: result.data };
}

export function buildProspectPreview(
  content: ProspectLandingContent,
  templateOverride?: TemplateId
): { preview: ProspectPreview } | { error: string } {
  try {
    const name = resolveProspectName(content.meta?.name, content.hero.title);
    const category = content.meta?.category?.trim() || null;
    const resolvedTemplate = templateOverride ?? resolveTemplateId(category ?? undefined);

    return {
      preview: {
        name,
        email: buildProspectEmail(name),
        password: buildProspectPassword(name),
        slug: buildProspectSlug(name),
        template: resolvedTemplate,
        category,
        requiresTemplateSelection: !resolvedTemplate,
        content,
      },
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Error al preparar la vista previa",
    };
  }
}

export function flattenProspectServiceMenu(
  serviceMenu: ProspectLandingContent["serviceMenu"]
) {
  if (!serviceMenu) return [];

  return serviceMenu.flatMap((group) =>
    group.items.map((item) => ({
      category: group.category,
      name: item.name,
      description: item.description ?? "",
      price: item.price ?? "",
      duration: "",
      image: "",
    }))
  );
}
