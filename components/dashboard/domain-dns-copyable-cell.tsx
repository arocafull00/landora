import { CopyMorphButton } from "@/components/ui/copy-morph-button";

export function DomainDnsCopyableCell({
  value,
  tone = "default",
}: {
  value: string;
  tone?: "default" | "muted";
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={
          tone === "muted"
            ? "min-w-0 break-all font-mono text-body-sm text-on-surface-variant"
            : "min-w-0 break-all font-mono text-body-sm text-on-surface"
        }
      >
        {value}
      </span>
      <CopyMorphButton
        errorMessage="No se pudo copiar"
        label="Copiar"
        showLabel={false}
        successMessage="Copiado"
        value={value}
      />
    </div>
  );
}
