"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUser } from "@/components/admin/hooks/use-delete-user";

const DELETION_ITEMS = [
  "Cuenta, sesiones y membresías de Clerk",
  "Landings, reservas, clientes, empleados y servicios",
  "Archivos almacenados y dominios personalizados",
  "Suscripciones activas, que se cancelarán inmediatamente",
] as const;

export function DeleteUserDialog({
  email,
  name,
  onOpenChange,
  open,
  userId,
}: {
  email: string | null;
  name: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  userId: string;
}) {
  const { handleDelete, isPending } = useDeleteUser({
    onSuccess: () => onOpenChange(false),
    userId,
  });

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
      open={open}
    >
      <DialogContent
        className="bg-surface-container-lowest sm:max-w-lg"
        showCloseButton={!isPending}
      >
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-error-container text-danger">
            <TriangleAlert aria-hidden className="size-5" />
          </div>
          <DialogTitle className="font-headline text-headline-md text-on-surface">
            Eliminar usuario definitivamente
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            Esta acción es irreversible. Se eliminarán permanentemente los
            datos operativos de {name} ({email ?? "sin email"}).
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 rounded-lg border border-outline-variant bg-surface-container-low p-4">
          {DELETION_ITEMS.map((item) => (
            <li
              className="flex gap-2 font-body text-body-sm text-on-surface"
              key={item}
            >
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-danger" />
              {item}
            </li>
          ))}
        </ul>
        <p className="font-body text-body-sm text-on-surface-variant">
          El historial financiero de Stripe se conservará por motivos legales.
        </p>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            className="bg-danger text-on-primary hover:bg-danger/90"
            disabled={isPending}
            onClick={handleDelete}
            type="button"
          >
            {isPending ? "Eliminando…" : "Eliminar definitivamente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
