import "server-only";

import { requireServerEnv, serverEnv } from "@/lib/env/server";

type VercelDomainConfig = {
  configuredBy?: string | null;
  acceptedChallenges?: string[];
  misconfigured: boolean;
  recommendedIPv4?: Array<{ rank: number; value: string[] }>;
  recommendedCNAME?: Array<{ rank: number; value: string }>;
};

type VercelProjectDomain = {
  name: string;
  verified: boolean;
  verification?: Array<{
    type: string;
    domain: string;
    value: string;
    reason: string;
  }>;
};

function getVercelHeaders() {
  return {
    Authorization: `Bearer ${requireServerEnv("VERCEL_API_TOKEN")}`,
    "Content-Type": "application/json",
  };
}

function getProjectPath() {
  const projectId = requireServerEnv("VERCEL_PROJECT_ID");
  const teamId = serverEnv.VERCEL_TEAM_ID;
  const teamQuery = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";

  return {
    projectId,
    teamQuery,
  };
}

export function isVercelDomainsConfigured() {
  return Boolean(serverEnv.VERCEL_API_TOKEN && serverEnv.VERCEL_PROJECT_ID);
}

export async function addProjectDomain(domain: string) {
  const { projectId, teamQuery } = getProjectPath();

  const response = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/domains${teamQuery}`,
    {
      method: "POST",
      headers: getVercelHeaders(),
      body: JSON.stringify({ name: domain }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to add domain to Vercel: ${errorBody}`);
  }

  return (await response.json()) as VercelProjectDomain;
}

export async function removeProjectDomain(domain: string) {
  const { projectId, teamQuery } = getProjectPath();

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/domains/${encodeURIComponent(domain)}${teamQuery}`,
    {
      method: "DELETE",
      headers: getVercelHeaders(),
    },
  );

  if (response.status === 404) return;

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to remove domain from Vercel: ${errorBody}`);
  }
}

export async function getProjectDomain(domain: string) {
  const { projectId, teamQuery } = getProjectPath();

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/domains/${encodeURIComponent(domain)}${teamQuery}`,
    {
      headers: getVercelHeaders(),
    },
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch project domain from Vercel: ${errorBody}`);
  }

  return (await response.json()) as VercelProjectDomain;
}

export async function getDomainConfig(domain: string) {
  const teamId = serverEnv.VERCEL_TEAM_ID;
  const teamQuery = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";

  const response = await fetch(
    `https://api.vercel.com/v4/domains/${encodeURIComponent(domain)}/config${teamQuery}`,
    {
      headers: getVercelHeaders(),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch domain config from Vercel: ${errorBody}`);
  }

  return (await response.json()) as VercelDomainConfig;
}

export type DnsRecord = {
  type: string;
  name: string;
  value: string;
};

export function buildDnsRecords(
  domain: string,
  config: VercelDomainConfig,
  verification?: VercelProjectDomain["verification"],
): DnsRecord[] {
  const records: DnsRecord[] = [];

  for (const entry of verification ?? []) {
    records.push({
      type: entry.type,
      name: entry.domain,
      value: entry.value,
    });
  }

  const cname = config.recommendedCNAME?.[0]?.value;
  if (cname) {
    records.push({
      type: "CNAME",
      name: domain.startsWith("www.") ? "www" : domain,
      value: cname,
    });
  }

  const aRecords = config.recommendedIPv4?.[0]?.value ?? [];
  for (const value of aRecords) {
    records.push({
      type: "A",
      name: "@",
      value,
    });
  }

  return records;
}
