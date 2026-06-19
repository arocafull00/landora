"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import {
  deleteUser,
  grantManualAccess,
  publishUserLandings,
  revokeManualAccess,
  reactivateUser,
  suspendUser,
  unpublishUserLandings,
} from "@/app/actions/admin";
import { startImpersonation } from "@/app/actions/impersonation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminUserWithLanding } from "@/lib/admin-user-display";
import { getLandingPublicUrl } from "@/lib/admin-user-display";

export function UserActionsMenu({ user }: { user: AdminUserWithLanding }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const landingUrl = getLandingPublicUrl(user.landing);
  const hasLanding = Boolean(user.landing);
  const isPublished = Boolean(user.landing?.published);

  const runAction = (
    action: () => Promise<{ success: true } | { error: string }>,
    successMessage: string,
  ) => {
    startTransition(async () => {
      const result = await action();

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success(successMessage);
    });
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    runAction(() => deleteUser(user.id), "Usuario eliminado");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setConfirmDelete(false);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 text-on-surface-variant"
          disabled={isPending}
          size="icon"
          variant="ghost"
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Abrir acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await startImpersonation(user.id);
            })
          }
        >
          Abrir dashboard
        </DropdownMenuItem>
        {landingUrl ? (
          <DropdownMenuItem asChild>
            <a href={landingUrl} rel="noopener noreferrer" target="_blank">
              Ver landing
            </a>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>Sin landing</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending || !hasLanding || isPublished}
          onClick={() =>
            runAction(() => publishUserLandings(user.id), "Landing publicada")
          }
        >
          Publicar
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending || !hasLanding || !isPublished}
          onClick={() =>
            runAction(
              () => unpublishUserLandings(user.id),
              "Landing despublicada",
            )
          }
        >
          Despublicar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.accessType === "manual" ? (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              runAction(
                () => revokeManualAccess(user.id),
                "Acceso manual retirado",
              )
            }
          >
            Quitar acceso manual
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              runAction(
                () => grantManualAccess(user.id),
                "Acceso manual concedido",
              )
            }
          >
            Dar acceso manual
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {user.suspended ? (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              runAction(() => reactivateUser(user.id), "Cuenta reactivada")
            }
          >
            Reactivar cuenta
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              runAction(() => suspendUser(user.id), "Cuenta suspendida")
            }
          >
            Suspender cuenta
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={handleDelete}
          variant="destructive"
        >
          {confirmDelete ? "Confirmar eliminación" : "Eliminar usuario"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
