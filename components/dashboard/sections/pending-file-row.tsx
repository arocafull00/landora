import { Icon } from "@/components/ui/icon";

export type PendingFile = {
  key: string;
  name: string;
  status: "uploading" | "done" | "error";
  error?: string;
};

export function PendingFileRow({ file }: { file: PendingFile }) {
  return (
    <div className="grid w-full grid-cols-12 items-center gap-4 border-b border-outline-variant/50 p-unit-sm last:border-b-0">
      <div className="col-span-7 flex min-w-0 items-center gap-3 pl-2 md:col-span-6">
        {file.status === "uploading" && (
          <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
        {file.status === "done" && (
          <Icon name="check" className="h-5 w-5 shrink-0 text-primary" />
        )}
        {file.status === "error" && (
          <Icon name="close" className="h-5 w-5 shrink-0 text-error" />
        )}
        <span className="truncate text-body-sm font-medium text-on-surface-variant">
          {file.name}
        </span>
      </div>
      <div className="col-span-3 hidden truncate text-body-sm text-on-surface-variant md:block">
        {file.status === "uploading"
          ? "Subiendo…"
          : file.status === "done"
            ? "Listo"
            : file.error ?? "Error"}
      </div>
      <div className="col-span-5 text-right text-body-sm text-on-surface-variant md:col-span-3">
        —
      </div>
    </div>
  );
}
