"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { ActionButton, IconButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { deleteLanding, setLandingPublished } from "@/app/actions/admin";
import type { LandingPage } from "@/db/schema";

export function LandingItem({ landing }: { landing: LandingPage }) {
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const updatedAt = landing.updatedAt
    ? new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(
        new Date(landing.updatedAt),
      )
    : "—";

  const handlePublishToggle = () => {
    startTransition(async () => {
      const result = await setLandingPublished(landing.id, !landing.published);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      if (landing.published) {
        toast.success("Landing despublicada");
        return;
      }

      toast.success("Landing publicada");
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteLanding(landing.id);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Landing eliminada");
    });
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-outline-variant/50 bg-surface-bg px-4 py-2.5">
      <div>
        <p className="font-body text-body-sm font-medium text-on-surface">
          {landing.name}
        </p>
        <p className="font-mono text-body-sm text-on-surface-variant/60">
          /{landing.slug.replace(/^\//, "")}
        </p>
        {landing.customDomain ? (
          <p className="font-mono text-body-sm text-on-surface-variant/60">
            {landing.customDomain}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <p className="font-body text-body-sm text-on-surface-variant">
          {updatedAt}
        </p>
        <StatusBadge status={landing.published ? "Published" : "Draft"} />
        {landing.published ? (
          <>
            <a
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
              href={`/${landing.slug.replace(/^\//, "")}`}
              rel="noopener noreferrer"
              target="_blank"
              title="Ver landing publicada"
            >
              <Icon className="h-4 w-4" name="link" />
            </a>
            {landing.customDomain ? (
              <a
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
                href={`https://${landing.customDomain}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Ver dominio personalizado"
              >
                <Icon className="h-4 w-4" name="web" />
              </a>
            ) : null}
          </>
        ) : null}
        <ActionButton
          disabled={isPending || isDeletePending}
          onClick={handlePublishToggle}
          variant={landing.published ? "secondary" : "primary"}
        >
          {isPending
            ? "…"
            : landing.published
              ? "Despublicar"
              : "Publicar"}
        </ActionButton>
        {confirmDelete ? (
          <>
            <ActionButton
              disabled={isDeletePending}
              onClick={handleDelete}
              variant="danger"
            >
              {isDeletePending ? "…" : "Eliminar"}
            </ActionButton>
            <IconButton
              icon="close"
              label="Cancelar"
              onClick={() => setConfirmDelete(false)}
            />
          </>
        ) : (
          <IconButton
            icon="trash"
            label="Eliminar landing"
            onClick={() => setConfirmDelete(true)}
          />
        )}
      </div>
    </div>
  );
}
