"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEffectiveClientId, requireAuth } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import {
  isCustomDomainTaken,
  setLandingCustomDomain,
} from "@/data/domains";
import { normalizeHost } from "@/lib/app-host";
import {
  addProjectDomain,
  buildDnsRecords,
  getDomainConfig,
  getProjectDomain,
  removeProjectDomain,
  type DnsRecord,
} from "@/lib/vercel-domains";

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
  });

type ActionResult = { success: true } | { error: string };

export type DomainStatus = {
  domain: string | null;
  verified: boolean;
  misconfigured: boolean;
  records: DnsRecord[];
};

async function getOwnedLanding() {
  const clientId = await getEffectiveClientId();
  if (!clientId) return null;

  const landing = await getLandingPageByUserId(clientId);
  if (!landing) return null;

  return landing;
}

export async function getDomainStatus(): Promise<DomainStatus | { error: string }> {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult;

  const landing = await getOwnedLanding();
  if (!landing) {
    return { error: "No tienes ninguna landing asignada" };
  }

  if (!landing.customDomain) {
    return {
      domain: null,
      verified: false,
      misconfigured: false,
      records: [],
    };
  }

  try {
    const [projectDomain, domainConfig] = await Promise.all([
      getProjectDomain(landing.customDomain),
      getDomainConfig(landing.customDomain),
    ]);

    return {
      domain: landing.customDomain,
      verified: projectDomain?.verified ?? false,
      misconfigured: domainConfig.misconfigured,
      records: buildDnsRecords(
        landing.customDomain,
        domainConfig,
        projectDomain?.verification,
      ),
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo obtener el estado del dominio",
    };
  }
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
    return { success: true };
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
  return { success: true };
}

export async function removeCustomDomain(): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult;

  const landing = await getOwnedLanding();
  if (!landing) {
    return { error: "No tienes ninguna landing asignada" };
  }

  if (!landing.customDomain) {
    return { success: true };
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
  return { success: true };
}
