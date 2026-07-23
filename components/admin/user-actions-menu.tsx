"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";
import { unstable_isUnrecognizedActionError } from "next/navigation";
import { toast } from "react-toastify";
import {
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
import { logger } from "@/lib/logger";
import { EditUserNameDialog } from "@/components/admin/edit-user-name-dialog";
import { DeleteUserDialog } from "@/components/admin/delete-user-dialog";
import { ManualAccessDialog } from "@/components/admin/manual-access-dialog";

export function UserActionsMenu({ user }: { user: AdminUserWithLanding }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showManualAccess, setShowManualAccess] = useState(false);
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

  return (
    <>
      <DropdownMenu>
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
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setShowEditName(true)}>
            <Pencil aria-hidden className="size-4" />
            Editar nombre
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                try {
                  await startImpersonation(user.id);
                } catch (error) {
                  if (unstable_isUnrecognizedActionError(error)) {
                    window.location.reload();
                    return;
                  }

                  logger.captureException(error, {
                    action: "start-impersonation",
                    userId: user.id,
                  });
                  toast.error("No se pudo abrir el dashboard del cliente");
                }
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
            <>
              <DropdownMenuItem
                disabled={isPending}
                onSelect={() => setShowManualAccess(true)}
              >
                Editar acceso manual
              </DropdownMenuItem>
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
            </>
          ) : (
            <DropdownMenuItem
              disabled={isPending}
              onSelect={() => setShowManualAccess(true)}
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
            onSelect={() => setShowDelete(true)}
            variant="destructive"
          >
            Eliminar usuario
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserNameDialog
        name={user.name}
        onOpenChange={setShowEditName}
        open={showEditName}
        userId={user.id}
      />
      {showManualAccess ? (
        <ManualAccessDialog
          bookingManualAccess={user.bookingManualAccess}
          isManualAccess={user.accessType === "manual"}
          name={user.name}
          onOpenChange={setShowManualAccess}
          open={showManualAccess}
          userId={user.id}
        />
      ) : null}
      <DeleteUserDialog
        email={user.email}
        name={user.name}
        onOpenChange={setShowDelete}
        open={showDelete}
        userId={user.id}
      />
    </>
  );
}
