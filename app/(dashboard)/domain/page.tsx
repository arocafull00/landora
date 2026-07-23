import { DomainSection } from "@/components/dashboard/sections/domain-section";
import { getCurrentDomainStatus } from "@/lib/domain-status";

const EMPTY_STATUS = {
  domain: null,
  verified: false,
  misconfigured: false,
  records: [],
};

export default async function DomainPage() {
  const result = await getCurrentDomainStatus();

  if ("error" in result) {
    return (
      <DomainSection
        initialError={result.error}
        initialStatus={EMPTY_STATUS}
      />
    );
  }

  return <DomainSection initialStatus={result} />;
}
