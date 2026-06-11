"use client";

import type { Landing } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/stores/dashboard-store";
import { toast } from "react-toastify";
import { ActionButton, IconButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

export function EditorToolbar({
  activeLanding,
  disabled = false,
  landings,
  onPublish,
  onSave,
  onSelectLanding,
}: {
  activeLanding: Landing;
  disabled?: boolean;
  landings: Landing[];
  onPublish: () => void;
  onSave: () => void;
  onSelectLanding: (id: string) => void;
}) {
  const isAdmin = useDashboardStore((state) => state.isAdmin);

  const copyPreviewLink = async () => {
    const url = `${window.location.origin}/preview/${activeLanding.id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-3",
        isAdmin && "pt-12",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-surface-variant">
            <h1 className="truncate font-headline text-headline-md text-on-surface">
              {activeLanding.name}
            </h1>
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-on-surface-variant" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {landings.map((landing) => {
              const active = landing.id === activeLanding.id;

              return (
                <DropdownMenuItem
                  key={landing.id}
                  onClick={() => onSelectLanding(landing.id)}
                >
                  <span className="flex-1 truncate">{landing.name}</span>
                  {active ? <CheckIcon className="h-4 w-4 text-primary" /> : null}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Icon name="add" className="h-4 w-4" />
              Añadir página
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden items-center gap-2 sm:flex">
          <StatusBadge status={activeLanding.status} />
          <span className="text-outline-variant">/</span>
          <span className="font-label text-label-md text-on-surface-variant">
            {activeLanding.edited}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <IconButton icon="link" label="Copiar enlace" onClick={copyPreviewLink} />
        <div className="mx-1 hidden h-5 w-px bg-outline-variant sm:block" />
        <ActionButton disabled={disabled} onClick={onSave}>
          <Icon name="save" className="h-4 w-4" />
          Guardar
        </ActionButton>
        <ActionButton disabled={disabled} onClick={onPublish} variant="primary">
          <Icon name="publish" className="h-4 w-4" />
          Publicar
        </ActionButton>
      </div>
    </div>
  );
}
