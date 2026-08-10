import { DomainDnsCopyableCell } from "@/components/dashboard/domain-dns-copyable-cell";
import type { DnsRecord } from "@/lib/vercel-domains";

export function DomainDnsRecord({ record }: { record: DnsRecord }) {
  return (
    <tr className="border-t border-outline-variant/50 transition-colors duration-150 hover:bg-surface-container-low">
      <td className="px-4 py-3 font-mono text-body-sm text-on-surface">{record.type}</td>
      <td className="px-4 py-3">
        <DomainDnsCopyableCell value={record.name} />
      </td>
      <td className="px-4 py-3">
        <DomainDnsCopyableCell tone="muted" value={record.value} />
      </td>
    </tr>
  );
}
