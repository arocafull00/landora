"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { getLandingBySlug, updateUserFields } from "@/data/admin";
import {
  deleteLandingPageById,
  deleteLandingsByUserId,
  getLandingPageById,
  getLandingsByUserId,
  insertLandingPage,
  updateLandingPage,
} from "@/data/landing-pages";
import { deleteUserById, getUserByInternalId, insertUser } from "@/data/users";
import { isReservedSlug } from "@/lib/app-host";
import { removeProjectDomain } from "@/lib/vercel-domains";
import { seedLandingSections, ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import { checkAuth } from "@/lib/auth";
const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type ActionResult = { success: true } | { error: string };

export async function createUser(formData: FormData): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

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
    await insertUser({ clerkUserId: clerkUser.id, name, email, type: "user" });
  } catch {
    await clerk.users.deleteUser(clerkUser.id).catch(() => null);
    return { error: "Error al guardar el usuario en la base de datos" };
  }

  revalidatePath("/admin");
  return { success: true };
}

const createLandingSchema = z.object({
  userId: z.uuid("ID de usuario inválido"),
  name: z.string().min(1, "El nombre es requerido"),
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras, números y guiones")
    .refine((value) => !isReservedSlug(value), {
      message: "Ese slug está reservado por el sistema",
    }),
  template: z.enum(["velar", "studio", "portfolio", "ristorante", "floristeria", "oficio-pro", "coffee-shop"]).default("velar"),
});

async function createLandingForUser(formData: FormData): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

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
    const landing = await insertLandingPage({ userId, name, slug, template });
    landingId = landing.id;
  } catch (err) {
    console.error("[createLandingForUser] DB insert error:", err);
    return { error: "Error al crear la landing" };
  }

  try {
    await seedLandingSections(landingId, template);
  } catch (err) {
    console.error("[createLandingForUser] Seed error:", err);
    await deleteLandingPageById(landingId);
    return { error: "Error al inicializar el contenido de la landing" };
  }

  revalidatePath("/admin");
  return { success: true };
}

const landingIdSchema = z.uuid("ID de landing inválido");
const userIdSchema = z.uuid("ID de usuario inválido");

async function setLandingPublished(
  landingId: string,
  published: boolean,
): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = landingIdSchema.safeParse(landingId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  if (published) {
    try {
      const landing = await getLandingPageById(parsed.data);
      if (!landing) {
        return { error: "Landing no encontrada" };
      }
      await ensureLandingHasDefaultContent(landing);
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

async function deleteLanding(landingId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = landingIdSchema.safeParse(landingId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const landing = await getLandingPageById(parsed.data);

  if (landing?.customDomain) {
    try {
      await removeProjectDomain(landing.customDomain);
    } catch {
      return { error: "Error al eliminar el dominio de Vercel" };
    }
  }

  try {
    await deleteLandingPageById(parsed.data);
  } catch {
    return { error: "Error al eliminar la landing" };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteUser(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = userIdSchema.safeParse(userId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const user = await getUserByInternalId(parsed.data);

  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  if (user.type === "admin") {
    return { error: "No se puede eliminar un administrador" };
  }

  const userLandings = await getLandingsByUserId(parsed.data);

  const customDomains = userLandings.flatMap((landing) =>
    landing.customDomain ? [landing.customDomain] : [],
  );

  try {
    await Promise.all(customDomains.map((domain) => removeProjectDomain(domain)));
  } catch {
    return { error: "Error al eliminar un dominio de Vercel" };
  }

  try {
    await deleteLandingsByUserId(parsed.data);
    await deleteUserById(parsed.data);
  } catch {
    return { error: "Error al eliminar los datos del usuario" };
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.deleteUser(user.clerkUserId);
  } catch {
    return { error: "Datos eliminados, pero no se pudo eliminar el usuario en Clerk" };
  }

  revalidatePath("/admin");
  return { success: true };
}

async function updateUserById(
  userId: string,
  update: Parameters<typeof updateUserFields>[1],
): Promise<ActionResult> {
  const parsed = userIdSchema.safeParse(userId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const user = await getUserByInternalId(parsed.data);
  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  if (user.type === "admin") {
    return { error: "No se puede modificar un administrador" };
  }

  try {
    await updateUserFields(parsed.data, update);
  } catch {
    return { error: "Error al actualizar el usuario" };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function grantManualAccess(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;
  return updateUserById(userId, { accessType: "manual" });
}

export async function revokeManualAccess(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;
  return updateUserById(userId, { accessType: "subscription" });
}

export async function suspendUser(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;
  return updateUserById(userId, { suspended: true });
}

export async function reactivateUser(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;
  return updateUserById(userId, { suspended: false });
}

export async function unpublishUserLandings(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = userIdSchema.safeParse(userId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const userLandings = await getLandingsByUserId(parsed.data);

  try {
    await Promise.all(
      userLandings.map((landing) =>
        updateLandingPage(landing.id, {
          published: false,
          updatedAt: new Date(),
        }),
      ),
    );
  } catch {
    return { error: "Error al despublicar las landings" };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function publishUserLandings(userId: string): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = userIdSchema.safeParse(userId);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const userLandings = await getLandingsByUserId(parsed.data);

  try {
    await Promise.all(
      userLandings.map(async (landing) => {
        const fullLanding = await getLandingPageById(landing.id);
        if (!fullLanding) {
          return;
        }
        await ensureLandingHasDefaultContent(fullLanding);
        await updateLandingPage(landing.id, {
          published: true,
          updatedAt: new Date(),
        });
      }),
    );
  } catch {
    return { error: "Error al publicar las landings" };
  }

  revalidatePath("/admin");
  return { success: true };
}
