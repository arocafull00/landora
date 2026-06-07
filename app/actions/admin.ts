"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/db";
import { users, landingPages } from "@/db/schema";
import { getLandingBySlug } from "@/data/admin";
import { updateLandingPage } from "@/data/landing-pages";
import { seedLandingSections, ensureLandingHasDefaultContent } from "@/data/seed-landing-sections";
import { isAdmin } from "@/lib/is-admin";
const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type ActionResult = { success: true } | { error: string };

export async function createUser(formData: FormData): Promise<ActionResult> {
  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const { name, email, password } = parsed.data;

  const clerk = await clerkClient();

  let clerkUser: { id: string };
  try {
    clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
    });
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "errors" in err &&
      Array.isArray((err as { errors: unknown[] }).errors)
    ) {
      const clerkErrors = (
        err as { errors: Array<{ message: string; longMessage?: string }> }
      ).errors;
      return {
        error:
          clerkErrors[0]?.longMessage ??
          clerkErrors[0]?.message ??
          "Error al crear usuario",
      };
    }
    return {
      error:
        err instanceof Error ? err.message : "Error al crear usuario en Clerk",
    };
  }

  try {
    await db.insert(users).values({ clerkUserId: clerkUser.id, name, type: "user" });
  } catch {
    await clerk.users.deleteUser(clerkUser.id).catch(() => null);
    return { error: "Error al guardar el usuario en la base de datos" };
  }

  revalidatePath("/admin");
  return { success: true };
}

const createLandingSchema = z.object({
  userId: z.string().uuid("ID de usuario inválido"),
  name: z.string().min(1, "El nombre es requerido"),
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras, números y guiones"),
  template: z.enum(["velar", "studio"]).default("velar"),
});

export async function createLandingForUser(formData: FormData): Promise<ActionResult> {
  const parsed = createLandingSchema.safeParse({
    userId: formData.get("userId"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    template: formData.get("template") ?? "velar",
  });

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const { userId, name, slug, template } = parsed.data;

  const existing = await getLandingBySlug(slug);
  if (existing) {
    return { error: "Ya existe una landing con ese slug" };
  }

  let landingId: string;
  try {
    const [landing] = await db
      .insert(landingPages)
      .values({ userId, name, slug, template })
      .returning({ id: landingPages.id });
    landingId = landing.id;
  } catch {
    return { error: "Error al crear la landing" };
  }

  try {
    await seedLandingSections(landingId);
  } catch {
    return { error: "Error al inicializar el contenido de la landing" };
  }

  revalidatePath("/admin");
  return { success: true };
}

const landingIdSchema = z.string().uuid("ID de landing inválido");

export async function setLandingPublished(
  landingId: string,
  published: boolean,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { error: "No autorizado" };
  }

  const parsed = landingIdSchema.safeParse(landingId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  if (published) {
    try {
      await ensureLandingHasDefaultContent(parsed.data);
    } catch {
      return { error: "Error al inicializar el contenido de la landing" };
    }
  }

  try {
    await updateLandingPage(parsed.data, {
      published,
      updatedAt: new Date(),
    });
  } catch {
    return { error: "Error al actualizar la landing" };
  }

  revalidatePath("/admin");
  return { success: true };
}
