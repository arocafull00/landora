"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  FileTextIcon,
  HomeIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "react-toastify";
import { DashboardTutorialButton } from "@/components/dashboard/dashboard-tutorial";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { ActionButton, IconButton, StatusBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";
import {
  getPreviewLandingPath,
  getPublicLandingUrl,
} from "@/lib/public-site-url";
import { useDashboardStore } from "@/stores/dashboard-store";

export function EditorToolbar() {
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const activePageTarget = useDashboardStore((state) => state.activePageTarget);
  const landings = useDashboardStore((state) => state.landings);
  const saveStatus = useDashboardStore((state) => state.saveStatus);
  const saveLanding = useDashboardStore((state) => state.saveLanding);
  const publishLanding = useDashboardStore((state) => state.publishLanding);
  const setActivePageTarget = useDashboardStore(
    (state) => state.setActivePageTarget,
  );
  const addSitePage = useDashboardStore((state) => state.addSitePage);
  const removeSitePage = useDashboardStore((state) => state.removeSitePage);
  const isAdmin = useDashboardStore((state) => state.isAdmin);

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const disabled = saveStatus === "saving";
  const aboutEnabled = activeLanding.content.enabledPages.includes("about");
  const internalProjects = (activeLanding.content.gallery ?? []).filter(
    (item) => resolveProjectLinkType(item) === "internal" && item.projectSlug,
  );
  const activeProject =
    activePageTarget.type === "project"
      ? internalProjects.find(
          (item) => item.id === activePageTarget.projectId,
        )
      : undefined;
  const activePageLabel =
    activePageTarget.type === "about"
      ? "About me"
      : activeProject?.title || activeLanding.name;

  const copyPreviewLink = async () => {
    let url: string;
    let pathname = "";

    if (activePageTarget.type === "about") {
      pathname = "/about";
    } else if (activeProject?.projectSlug) {
      pathname = `/proyectos/${activeProject.projectSlug}`;
    }

    if (activeLanding.status === "Published") {
      url = getPublicLandingUrl(activeLanding, pathname);
    } else {
      url = `${window.location.origin}${getPreviewLandingPath(
        activeLanding.id,
        pathname,
      )}`;
    }

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
          <DropdownMenuTrigger className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 hover:bg-surface-container-high">
            <h1 className="truncate font-headline text-headline-md font-semibold text-on-surface">
              {activePageLabel}
            </h1>
            <ChevronDownIcon
              aria-hidden
              className="h-4 w-4 shrink-0 text-on-surface-variant"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem
              onClick={() => setActivePageTarget({ type: "home" })}
            >
              <HomeIcon aria-hidden />
              <span className="flex-1 truncate">Inicio</span>
              {activePageTarget.type === "home" ? (
                <CheckIcon className="h-4 w-4 text-primary" />
              ) : null}
            </DropdownMenuItem>
            {aboutEnabled ? (
              <DropdownMenuItem
                onClick={() => setActivePageTarget({ type: "about" })}
              >
                <FileTextIcon aria-hidden />
                <span className="flex-1 truncate">About me</span>
                {activePageTarget.type === "about" ? (
                  <CheckIcon className="h-4 w-4 text-primary" />
                ) : null}
              </DropdownMenuItem>
            ) : null}
            {internalProjects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() =>
                  setActivePageTarget({
                    type: "project",
                    projectId: project.id,
                  })
                }
              >
                <FileTextIcon aria-hidden />
                <span className="flex-1 truncate">
                  {project.title || "Proyecto sin título"}
                </span>
                {activePageTarget.type === "project" &&
                activePageTarget.projectId === project.id ? (
                  <CheckIcon className="h-4 w-4 text-primary" />
                ) : null}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {activeLanding.template === "portfolio" && !aboutEnabled ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <PlusIcon aria-hidden />
                  Añadir página
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => addSitePage(activeLanding.id, "about")}
                  >
                    <FileTextIcon aria-hidden />
                    About me
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem disabled>
                <PlusIcon aria-hidden />
                Añadir página
              </DropdownMenuItem>
            )}
            {aboutEnabled ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => removeSitePage(activeLanding.id, "about")}
                  variant="destructive"
                >
                  <Trash2Icon aria-hidden />
                  Quitar About me
                </DropdownMenuItem>
              </>
            ) : null}
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
        <DashboardTutorialButton />
        <IconButton
          id="tutorial-copy-link"
          icon="link"
          label="Copiar enlace"
          onClick={copyPreviewLink}
        />
        <div className="mx-1 hidden h-5 w-px bg-outline-variant sm:block" />
        <ActionButton
          disabled={disabled}
          id="tutorial-save"
          onClick={() => saveLanding(activeLanding.id)}
        >
          <Icon name="save" className="h-4 w-4" />
          Guardar
        </ActionButton>
        <ActionButton
          disabled={disabled}
          id="tutorial-publish"
          onClick={() => publishLanding(activeLanding.id)}
          variant="primary"
        >
          <Icon name="publish" className="h-4 w-4" />
          Publicar
        </ActionButton>
      </div>
    </div>
  );
}
