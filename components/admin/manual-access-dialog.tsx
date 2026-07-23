"use client";

import { CalendarDays } from "lucide-react";
import { useManualAccess } from "@/components/admin/hooks/use-manual-access";
import { ActionButton } from "@/components/ui/primitives";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const MANUAL_ACCESS_COPY = {
  createTitle: "Dar acceso manual",
  editTitle: "Editar acceso manual",
  description:
    "El acceso general permite utilizar el dashboard. Reservas se concede de forma independiente.",
  bookingLabel: "Incluir acceso a Reservas",
  bookingDescription:
    "Permite gestionar reservas, servicios, empleados y periodos bloqueados.",
  createAction: "Conceder acceso",
  editAction: "Guardar cambios",
  cancelAction: "Cancelar",
  savingAction: "Guardando…",
} as const;

export function ManualAccessDialog({
  bookingManualAccess,
  isManualAccess,
  name,
  onOpenChange,
  open,
  userId,
}: {
  bookingManualAccess: boolean;
  isManualAccess: boolean;
  name: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  userId: string;
}) {
  const {
    includeBookings,
    isPending,
    setIncludeBookings,
    submit,
  } = useManualAccess({
    bookingManualAccess,
    onSuccess: () => onOpenChange(false),
    userId,
  });
  const title = isManualAccess
    ? MANUAL_ACCESS_COPY.editTitle
    : MANUAL_ACCESS_COPY.createTitle;
  const actionLabel = isManualAccess
    ? MANUAL_ACCESS_COPY.editAction
    : MANUAL_ACCESS_COPY.createAction;
  const bookingDescriptionId = `manual-booking-access-description-${userId}`;
  const bookingSwitchId = `manual-booking-access-${userId}`;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="bg-surface-container-lowest sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-headline-md text-on-surface">
            {title}
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            Configura el acceso de {name}. {MANUAL_ACCESS_COPY.description}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-5" onSubmit={submit}>
          <div className="flex items-start justify-between gap-4 rounded-lg border border-outline-variant bg-surface-bg p-4">
            <div className="flex gap-3">
              <CalendarDays
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-primary"
              />
              <div>
                <label
                  className="font-label text-label-md text-on-surface"
                  htmlFor={bookingSwitchId}
                >
                  {MANUAL_ACCESS_COPY.bookingLabel}
                </label>
                <p
                  className="mt-1 font-body text-body-sm text-on-surface-variant"
                  id={bookingDescriptionId}
                >
                  {MANUAL_ACCESS_COPY.bookingDescription}
                </p>
              </div>
            </div>
            <Switch
              aria-describedby={bookingDescriptionId}
              checked={includeBookings}
              disabled={isPending}
              id={bookingSwitchId}
              onCheckedChange={setIncludeBookings}
            />
          </div>
          <div className="flex justify-end gap-2">
            <ActionButton
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              type="button"
              variant="secondary"
            >
              {MANUAL_ACCESS_COPY.cancelAction}
            </ActionButton>
            <ActionButton disabled={isPending} type="submit" variant="primary">
              {isPending ? MANUAL_ACCESS_COPY.savingAction : actionLabel}
            </ActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
