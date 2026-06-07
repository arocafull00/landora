"use client";

import Link from "next/link";
import { useState } from "react";
import { Panel, ActionButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { LandingItem } from "@/components/admin/landing-item";
import { CreateLandingForm } from "@/components/admin/create-landing-form";
import type { User, LandingPage } from "@/db/schema";

export type UserWithLandings = User & { landings: LandingPage[] };

export function UserRow({ user }: { user: UserWithLandings }) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const publishedCount = user.landings.filter((lp) => lp.published).length;
  const createdAt = user.createdAt
    ? new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(
        new Date(user.createdAt),
      )
    : "—";
  const initial = user.name.charAt(0).toUpperCase();

  const handleFormSuccess = () => {
    setShowForm(false);
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

          {showForm ? (
            <div className="mt-4 rounded-lg border border-outline-variant bg-surface-bg p-4">
              <h4 className="mb-4 font-headline text-headline-sm font-bold text-on-surface">
                Nueva landing
              </h4>
              <CreateLandingForm
                userId={user.id}
                onSuccess={handleFormSuccess}
              />
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-end gap-2">
              <Link
                href={`/admin/impersonate/${user.id}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-outline-variant px-3 font-label text-label-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-on-surface"
              >
                <Icon name="web" className="h-4 w-4" />
                Editar dashboard
              </Link>
              <ActionButton
                variant="secondary"
                onClick={() => setShowForm(true)}
              >
                <span className="text-lg leading-none">+</span>
                Nueva landing
              </ActionButton>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
