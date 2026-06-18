import pLimit from "p-limit";
import {
  getActiveDomainChecksForMonitoring,
  syncActiveDomainChecks,
  updateDomainCheckResult,
  type DomainCheckResult,
} from "@/data/domain-checks";
import type { DomainCheckStatus } from "@/db/schema";

export type CheckResult = {
  domain: string;
  status: DomainCheckStatus;
  statusCode?: number;
  errorCode?: string;
};

function getErrorCode(error: unknown) {
  if (!(error instanceof Error)) return undefined;

  const cause = error.cause;
  if (cause && typeof cause === "object" && "code" in cause) {
    const code = cause.code;
    if (typeof code === "string") return code;
  }

  return error.name;
}

export async function checkDomain(domain: string): Promise<CheckResult> {
  try {
    const response = await fetch(`https://${domain}`, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      return { domain, status: "ok", statusCode: response.status };
    }

    return {
      domain,
      status: "http_error",
      statusCode: response.status,
    };
  } catch (error) {
    const code = getErrorCode(error);

    if (code === "ENOTFOUND") {
      return { domain, status: "dns_error", errorCode: code };
    }

    if (code === "CERT_HAS_EXPIRED") {
      return { domain, status: "ssl_error", errorCode: code };
    }

    if (code === "TimeoutError" || code === "AbortError") {
      return { domain, status: "timeout", errorCode: code };
    }

    return { domain, status: "http_error", errorCode: code };
  }
}

function toDomainCheckResult(result: CheckResult): DomainCheckResult {
  return {
    status: result.status,
    statusCode: result.statusCode,
    errorCode: result.errorCode,
  };
}

export async function checkAllDomains() {
  await syncActiveDomainChecks();

  const activeDomains = await getActiveDomainChecksForMonitoring();
  const limit = pLimit(20);

  const results = await Promise.allSettled(
    activeDomains.map((entry) => limit(() => checkDomain(entry.domain))),
  );

  for (const [index, result] of results.entries()) {
    const entry = activeDomains[index];
    const value = result.status === "fulfilled" ? result.value : null;

    await updateDomainCheckResult(
      entry.id,
      value ? toDomainCheckResult(value) : null,
    );
  }

  return results
    .filter((result): result is PromiseFulfilledResult<CheckResult> => {
      return result.status === "fulfilled";
    })
    .map((result) => result.value);
}
