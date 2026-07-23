"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  revokeUserManualAccess,
  setUserManualAccess,
  updateUserFields,
} from "@/data/admin";
import {
  getLandingPageById,
  getLandingsByUserId,
  updateLandingPage,
} from "@/data/landing-pages";
import { getUserByInternalId, insertUser } from "@/data/users";
import { ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import { checkAuth } from "@/lib/auth";
import {
  createUserSchema,
  type CreateUserValues,
  configureManualAccessSchema,
  type ConfigureManualAccessValues,
  deleteUserSchema,
  type DeleteUserValues,
  updateUserNameSchema,
  type UpdateUserNameValues,
} from "@/lib/schemas/admin";
import { logger } from "@/lib/logger";
import { deleteUserAccount } from "@/lib/admin/delete-user-account";

type ActionResult = { success: true } | { error: string };

export async function createUser(input: CreateUserValues): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = createUserSchema.safeParse(input);
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



const userIdSchema = z.uuid("ID de usuario inválido");

export async function updateUserName(
  input: UpdateUserNameValues,
): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = updateUserNameSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Nombre de usuario inválido" };
  }

  const { userId, name } = parsed.data;
  const user = await getUserByInternalId(userId);

  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  if (user.type === "admin") {
    return { error: "No se puede modificar un administrador" };
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUser(user.clerkUserId, { firstName: name });
  } catch (error) {
    logger.captureException(error, { action: "update-user-name-clerk", userId });
    return { error: "No se pudo actualizar el nombre del usuario" };
  }

  try {
    await updateUserFields(userId, { name });
  } catch (error) {
    logger.captureException(error, { action: "update-user-name-database", userId });

    try {
      const clerk = await clerkClient();
      await clerk.users.updateUser(user.clerkUserId, { firstName: user.name });
    } catch (rollbackError) {
      logger.captureException(rollbackError, {
        action: "rollback-user-name-clerk",
        userId,
      });
    }

    return { error: "No se pudo guardar el nombre del usuario" };
  }

  revalidatePath("/admin");
  return { success: true };
}



export async function deleteUser(
  input: DeleteUserValues,
): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = deleteUserSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Solicitud de eliminación inválida" };
  }

  try {
    const result = await deleteUserAccount(parsed.data.userId);

    if (result === "not_found") {
      return { error: "Usuario no encontrado" };
    }

    if (result === "protected") {
      return { error: "No se puede eliminar un administrador" };
    }
  } catch {
    return {
      error: "No se pudo completar la eliminación. Inténtalo de nuevo.",
    };
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

export async function configureManualAccess(
  input: ConfigureManualAccessValues,
): Promise<ActionResult> {
  const authError = await checkAuth();
  if (authError) return authError;

  const parsed = configureManualAccessSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Configuración de acceso inválida" };
  }

  const user = await getUserByInternalId(parsed.data.userId);
  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  if (user.type === "admin") {
    return { error: "No se puede modificar un administrador" };
  }

  try {
    await setUserManualAccess(
      parsed.data.userId,
      parsed.data.bookingManualAccess,
    );
  } catch {
    return { error: "Error al actualizar el acceso manual" };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function revokeManualAccess(userId: string): Promise<ActionResult> {
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
    return { error: "No se puede modificar un administrador" };
  }

  try {
    await revokeUserManualAccess(parsed.data);
  } catch {
    return { error: "Error al retirar el acceso manual" };
  }

  revalidatePath("/admin");
  return { success: true };
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
