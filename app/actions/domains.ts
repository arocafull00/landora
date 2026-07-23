"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEffectiveClientId, requireAuth } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import {
  isCustomDomainTaken,
  setLandingCustomDomain,
} from "@/data/domains";
import { isReservedAppDomain, normalizeHost } from "@/lib/app-host";
import {
  addProjectDomain,
  removeProjectDomain,
} from "@/lib/vercel-domains";
import { getDomainStatusForDomain } from "@/lib/domain-status";
import type { DomainStatusDto } from "@/lib/domain/dtos";
import { logger } from "@/lib/logger";

const domainSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/,
    "Introduce un dominio válido, por ejemplo www.tuempresa.com",
  )
  .refine((value) => !value.endsWith(".vercel.app"), {
    message: "No puedes usar un subdominio de vercel.app",
  })
  .refine((value) => !isReservedAppDomain(value), {
    message: "Ese dominio está reservado para la aplicación",
  });

type ActionResult =
  | { success: true; data: DomainStatusDto }
  | { error: string };

async function getOwnedLanding() {
  const clientId = await getEffectiveClientId();
  if (!clientId) return null;

  const landing = await getLandingPageByUserId(clientId);
  if (!landing) return null;

  return landing;
}

export async function assignCustomDomain(domain: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult;

  const landing = await getOwnedLanding();
  if (!landing) {
    return { error: "No tienes ninguna landing asignada" };
  }

  if (!landing.published) {
    return { error: "Publica tu landing antes de conectar un dominio" };
  }

  const parsed = domainSchema.safeParse(domain);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dominio inválido" };
  }

  const normalizedDomain = normalizeHost(parsed.data);

  if (landing.customDomain === normalizedDomain) {
    try {
      return {
        success: true,
        data: await getDomainStatusForDomain(normalizedDomain),
      };
    } catch {
      return { error: "No se pudo obtener el estado del dominio" };
    }
  }

  if (await isCustomDomainTaken(normalizedDomain, landing.id)) {
    return { error: "Ese dominio ya está en uso" };
  }

  const previousDomain = landing.customDomain;

  try {
    await addProjectDomain(normalizedDomain);
    await setLandingCustomDomain(landing.id, normalizedDomain);

    if (previousDomain && previousDomain !== normalizedDomain) {
      await removeProjectDomain(previousDomain).catch(() => null);
    }
  } catch (error) {
    await removeProjectDomain(normalizedDomain).catch(() => null);
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo conectar el dominio con Vercel",
    };
  }

  revalidatePath("/domain");
  revalidatePath("/admin");
  try {
    return {
      success: true,
      data: await getDomainStatusForDomain(normalizedDomain),
    };
  } catch (error) {
    logger.captureException(error, {
      action: "refresh-domain-status",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "Dominio conectado, pero no se pudo actualizar su estado" };
  }
}

export async function removeCustomDomain(): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult;

  const landing = await getOwnedLanding();
  if (!landing) {
    return { error: "No tienes ninguna landing asignada" };
  }

  if (!landing.customDomain) {
    return {
      success: true,
      data: await getDomainStatusForDomain(null),
    };
  }

  const currentDomain = landing.customDomain;

  try {
    await removeProjectDomain(currentDomain);
    await setLandingCustomDomain(landing.id, null);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el dominio",
    };
  }

  revalidatePath("/domain");
  revalidatePath("/admin");
  return {
    success: true,
    data: await getDomainStatusForDomain(null),
  };
}
