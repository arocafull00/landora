import { z } from "zod";

const title = z.string().max(300);
const subtitle = z.string().max(2000);
const description = z.string().max(4000);
const category = z.string().max(80);
const price = z.string().max(40);
const image = z.union([z.literal(""), z.url({ protocol: /^https?$/ }).max(2048), z.string().max(2048).regex(/^\/(?!\/)/)]);
const id = z.string().min(1).max(80);

export const ristoranteEditorSchema = z.strictObject({ title, subtitle, description, category, price, image });

export const ristoranteEditableSectionsSchema = z.object({
  story: z.strictObject({ statement: description }).optional(),
  "service-menu": z.strictObject({ items: z.array(z.strictObject({ id, category, name: title, description, price, image: image.optional(), duration: z.string().max(80).optional() })).max(100) }).optional(),
  workflow: z.strictObject({ items: z.array(z.strictObject({ id, number: z.string().max(80), title, description })).max(20) }).optional(),
  benefits: z.strictObject({ items: z.array(z.strictObject({ id, title, description, icon: z.string().max(80), image: image.optional() })).max(20) }).optional(),
});

export type RistoranteEditorValues = z.infer<typeof ristoranteEditorSchema>;
