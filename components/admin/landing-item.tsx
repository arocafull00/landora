"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { ActionButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { setLandingPublished } from "@/app/actions/admin";
import type { LandingPage } from "@/db/schema";

export function LandingItem({ landing }: { landing: LandingPage }) {
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="flex items-center justify-between rounded-md border border-outline-variant/50 bg-surface-bg px-4 py-2.5">
      <div>
        <p className="font-body text-body-sm font-medium text-on-surface">
          {landing.name}
        </p>
        <p className="font-mono text-body-sm text-on-surface-variant/60">
          /{landing.slug}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-body text-body-sm text-on-surface-variant">
          {updatedAt}
        </p>
        <StatusBadge status={landing.published ? "Published" : "Draft"} />
        {landing.published ? (
          <a
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
            href={`/${landing.slug}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Ver landing publicada"
          >
            <Icon className="h-4 w-4" name="link" />
          </a>
        ) : null}
        <ActionButton
          disabled={isPending}
          onClick={handlePublishToggle}
          variant={landing.published ? "secondary" : "primary"}
        >
          {isPending
            ? "…"
            : landing.published
              ? "Despublicar"
              : "Publicar"}
        </ActionButton>
      </div>
    </div>
  );
}
