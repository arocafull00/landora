import { Card } from "@/components/ui/card";

export function VariantSpec({ label, value }: { label: string; value: string }) {
  return (
    <Card className="gap-1 rounded-[20px] border-border bg-surface px-5 py-4 shadow-none">
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">{label}</span>
      <span className="block text-sm font-semibold">{value}</span>
    </Card>
  );
}
