"use client";

import { useState } from "react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Panel, ActionButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { LandingItem } from "@/components/admin/landing-item";
import { CreateLandingForm } from "@/components/admin/create-landing-form";
import { deleteUser } from "@/app/actions/admin";
import { startImpersonation } from "@/app/actions/impersonation";
import type { User, LandingPage } from "@/db/schema";
import { mediumDateFormatter } from "@/lib/intl-formatters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type UserWithLandings = User & { landings: LandingPage[] };

export function UserRow({ user }: { user: UserWithLandings }) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isImpersonatePending, startImpersonateTransition] = useTransition();

  const publishedCount = user.landings.filter((lp) => lp.published).length;
  const createdAt = user.createdAt
    ? mediumDateFormatter.format(new Date(user.createdAt))
    : "—";
  const initial = user.name.charAt(0).toUpperCase();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteUser(user.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Usuario eliminado");
    });
  };

  return (
    <Panel className="overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-surface-variant/30"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-label text-label-lg font-bold text-primary">
            {initial}
          </div>
          <div>
            <p className="font-body text-body-md font-medium text-on-surface">
              {user.name}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              Desde {createdAt}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-label text-label-md text-on-surface">
              {user.landings.length}{" "}
              {user.landings.length === 1 ? "landing" : "landings"}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              {publishedCount} publicada{publishedCount !== 1 ? "s" : ""}
            </p>
          </div>
          <StatusBadge status={publishedCount > 0 ? "Published" : "Draft"} />
          <Icon
            name="chevron"
            className={`h-4 w-4 text-on-surface-variant transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-outline-variant bg-surface-container-lowest px-4 py-4">
          <div className="space-y-2">
            {user.landings.length === 0 ? (
              <p className="py-2 text-center font-body text-body-sm text-on-surface-variant/60">
                Sin landings asignadas
              </p>
            ) : (
              user.landings.map((landing) => (
                <LandingItem key={landing.id} landing={landing} />
              ))
            )}
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <ActionButton
              variant="secondary"
              disabled={isImpersonatePending}
              onClick={() =>
                startImpersonateTransition(async () => {
                  await startImpersonation(user.id);
                })
              }
            >
              <Icon name="web" className="h-4 w-4" />
              Editar dashboard
            </ActionButton>
            <ActionButton
              variant="secondary"
              disabled={isDeletePending}
              onClick={() => setShowForm(true)}
            >
              <span className="text-lg leading-none">+</span>
              Nueva landing
            </ActionButton>
            {confirmDelete ? (
              <>
                <ActionButton
                  variant="danger"
                  disabled={isDeletePending}
                  onClick={handleDelete}
                >
                  {isDeletePending ? "…" : "Eliminar usuario"}
                </ActionButton>
                <ActionButton
                  variant="secondary"
                  disabled={isDeletePending}
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </ActionButton>
              </>
            ) : (
              <ActionButton
                variant="danger"
                disabled={isDeletePending}
                onClick={() => setConfirmDelete(true)}
              >
                Eliminar usuario
              </ActionButton>
            )}
          </div>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg bg-surface-container-lowest">
          <DialogHeader>
            <DialogTitle className="font-headline text-headline-sm text-on-surface">
              Nueva landing para {user.name}
            </DialogTitle>
          </DialogHeader>
          <CreateLandingForm
            userId={user.id}
            onSuccess={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Panel>
  );
}
