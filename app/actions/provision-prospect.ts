"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createProspectLanding } from "@/data/provision-prospect-landing";
import type { TemplateId } from "@/lib/dashboard-data";
import { checkAuth } from "@/lib/auth";
import {
  buildProspectPreview,
  parseProspectJson,
} from "@/lib/prospect-content";

type ActionError = { error: string };
type PreviewSuccess = {
  name: string;
  email: string;
  password: string;
  slug: string;
  template: TemplateId | null;
  category: string | null;
  requiresTemplateSelection: boolean;
};

const templateIdSchema = z.enum([
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
]);

const previewInputSchema = z.object({
  json: z.string().min(1),
  template: templateIdSchema.optional(),
});

const provisionUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const provisionLandingSchema = z.object({
  userId: z.string().uuid(),
  clerkUserId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  template: templateIdSchema,
  json: z.string().min(1),
});

const rollbackUserSchema = z.object({
  userId: z.string().uuid(),
  clerkUserId: z.string().min(1),
});

function clerkErrorMessage(err: unknown) {
  if (
    err &&
    typeof err === "object" &&
    "errors" in err &&
    Array.isArray((err as { errors: unknown[] }).errors)
  ) {
    const clerkErrors = (
      err as { errors: Array<{ message: string; longMessage?: string }> }
    ).errors;

    return (
      clerkErrors[0]?.longMessage ??
      clerkErrors[0]?.message ??
      "Error al crear usuario"
    );
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Error al crear usuario en Clerk";
}

export async function previewProspectImport(
  json: string,
  templateOverride?: TemplateId
): Promise<PreviewSuccess | ActionError> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsedInput = previewInputSchema.safeParse({ json, template: templateOverride });
  if (!parsedInput.success) {
    return { error: parsedInput.error.message };
  }

  const parsedJson = parseProspectJson(parsedInput.data.json);
  if ("error" in parsedJson) {
    return { error: parsedJson.error ?? "Error al validar el JSON" };
  }

  const previewResult = buildProspectPreview(
    parsedJson.data,
    parsedInput.data.template
  );

  if ("error" in previewResult) {
    return { error: previewResult.error };
  }

  const { preview } = previewResult;

  if (preview.requiresTemplateSelection) {
    return {
      name: preview.name,
      email: preview.email,
      password: preview.password,
      slug: preview.slug,
      template: null,
      category: preview.category,
      requiresTemplateSelection: true,
    };
  }

  return {
    name: preview.name,
    email: preview.email,
    password: preview.password,
    slug: preview.slug,
    template: preview.template,
    category: preview.category,
    requiresTemplateSelection: false,
  };
}

export async function provisionProspectUser(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ userId: string; clerkUserId: string } | ActionError> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = provisionUserSchema.safeParse(payload);
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
    return { error: clerkErrorMessage(err) };
  }

  try {
    const [user] = await db
      .insert(users)
      .values({ clerkUserId: clerkUser.id, name, type: "user" })
      .returning({ id: users.id });

    revalidatePath("/admin");

    return { userId: user.id, clerkUserId: clerkUser.id };
  } catch {
    await clerk.users.deleteUser(clerkUser.id).catch(() => null);
    return { error: "Error al guardar el usuario en la base de datos" };
  }
}

export async function provisionProspectLanding(payload: {
  userId: string;
  clerkUserId: string;
  name: string;
  slug: string;
  template: TemplateId;
  json: string;
}): Promise<{ landingId: string; slug: string } | ActionError> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = provisionLandingSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const parsedJson = parseProspectJson(parsed.data.json);
  if ("error" in parsedJson) {
    return { error: parsedJson.error ?? "Error al validar el JSON" };
  }

  try {
    const landing = await createProspectLanding({
      userId: parsed.data.userId,
      name: parsed.data.name,
      slug: parsed.data.slug,
      template: parsed.data.template,
      content: parsedJson.data,
    });
    revalidatePath("/admin");
    return landing;
  } catch (err) {
    await rollbackProspectUser({
      userId: parsed.data.userId,
      clerkUserId: parsed.data.clerkUserId,
    });

    return {
      error:
        err instanceof Error ? err.message : "Error al crear la landing del prospecto",
    };
  }
}

export async function rollbackProspectUser(payload: {
  userId: string;
  clerkUserId: string;
}): Promise<{ success: true } | ActionError> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = rollbackUserSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const clerk = await clerkClient();

  try {
    await db.delete(users).where(eq(users.id, parsed.data.userId));
  } catch {
    return { error: "Error al eliminar el usuario de la base de datos" };
  }

  await clerk.users.deleteUser(parsed.data.clerkUserId).catch(() => null);
  revalidatePath("/admin");

  return { success: true };
}
