import "server-only";

import { getLandingPageByUserId } from "@/data/landing-pages";
import { getEffectiveClientId } from "@/lib/auth";
import type { DomainStatusDto } from "@/lib/domain/dtos";
import {
  buildDnsRecords,
  getDomainConfig,
  getProjectDomain,
} from "@/lib/vercel-domains";

export async function getDomainStatusForDomain(
  domain: string | null,
): Promise<DomainStatusDto> {
  if (!domain) {
    return {
      domain: null,
      verified: false,
      misconfigured: false,
      records: [],
    };
  }

  const [projectDomain, domainConfig] = await Promise.all([
    getProjectDomain(domain),
    getDomainConfig(domain),
  ]);

  return {
    domain,
    verified: projectDomain?.verified ?? false,
    misconfigured: domainConfig.misconfigured,
    records: buildDnsRecords(
      domain,
      domainConfig,
      projectDomain?.verification,
    ),
  };
}

export async function getCurrentDomainStatus(): Promise<
  DomainStatusDto | { error: string }
> {
  const clientId = await getEffectiveClientId();
  if (!clientId) return { error: "No autorizado" };

  const landing = await getLandingPageByUserId(clientId);
  if (!landing) return { error: "No tienes ninguna landing asignada" };

  try {
    return await getDomainStatusForDomain(landing.customDomain);
  } catch {
    return { error: "No se pudo obtener el estado del dominio" };
  }
}
