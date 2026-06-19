import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingEditModalFooter({
  deleteLabel,
  onDelete,
  onCancel,
  onSave,
  saveLabel = "Guardar cambios",
  pending,
  saveDisabled,
  className,
}: {
  deleteLabel: string;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  pending: boolean;
  saveDisabled?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-outline-variant pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={onDelete}
        className="border-danger/30 text-danger hover:bg-error-container hover:text-danger"
      >
        <Trash2 className="h-4 w-4" aria-hidden />
        {deleteLabel}
      </Button>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" disabled={pending || saveDisabled} onClick={onSave}>
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
