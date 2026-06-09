"use client";

import { useRef, useState, useEffect } from "react";
import { AssetImage } from "@/components/ui/asset-image";
import type { AssetRow } from "@/db/schema";
import { uploadAsset } from "@/lib/upload-asset";
import { useAssetsStore } from "@/stores/assets-store";
import { ActionButton, IconButton } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { PendingFileRow, type PendingFile } from "./pending-file-row";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AssetsSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const assets = useAssetsStore((state) => state.rows);
  const ensureLoaded = useAssetsStore((state) => state.ensureLoaded);
  const prepend = useAssetsStore((state) => state.prepend);
  const remove = useAssetsStore((state) => state.remove);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  useEffect(() => {
    if (activeId) return;
    if (assets.length === 0) return;
    setActiveId(assets[0].id);
  }, [activeId, assets]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const pending: PendingFile[] = files.map((file, i) => ({
      key: `${Date.now()}-${i}`,
      name: file.name,
      status: "uploading",
    }));
    setPendingFiles(pending);

    const results = await Promise.allSettled(
      files.map(async (file, i) => {
        const key = pending[i].key;
        try {
          const row = await uploadAsset(file, file.name.replace(/\.[^/.]+$/, ""));
          setPendingFiles((prev) =>
            prev.map((p) => (p.key === key ? { ...p, status: "done" } : p))
          );
          return row;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setPendingFiles((prev) =>
            prev.map((p) => (p.key === key ? { ...p, status: "error", error: message } : p))
          );
          throw new Error(message);
        }
      })
    );

    const uploaded = results
      .filter((r): r is PromiseFulfilledResult<AssetRow> => r.status === "fulfilled")
      .map((r) => r.value);

    if (uploaded.length > 0) {
      uploaded.forEach((row) => prepend(row));
      setActiveId(uploaded[0].id);
    }

    if (inputRef.current) inputRef.current.value = "";
    setTimeout(() => setPendingFiles([]), 1500);
  };

  const active = assets.find((a) => a.id === activeId) ?? assets[0] ?? null;

  const copyUrl = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(active.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteAsset = async () => {
    if (!active) return;
    await fetch(`/api/assets/${active.id}`, { method: "DELETE" });
    remove(active.id);
    setActiveId(null);
  };

  return (
    <>
      <section className="flex min-w-[400px] flex-1 flex-col border-r border-outline-variant bg-surface">
        <div className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-unit-md">
          <div>
            <h2 className="font-headline text-headline-md text-on-surface">Asset Library</h2>
            <p className="text-body-sm text-on-surface-variant">
              Sube y gestiona imágenes para tus landings.
            </p>
          </div>
          <ActionButton
            disabled={pendingFiles.length > 0}
            onClick={() => inputRef.current?.click()}
            variant="primary"
          >
            <Icon name="upload" className="h-4 w-4" />
            {pendingFiles.length > 0
              ? pendingFiles.length === 1
                ? "Subiendo…"
                : `Subiendo ${pendingFiles.filter((f) => f.status !== "uploading").length}/${pendingFiles.length}…`
              : "Upload"}
          </ActionButton>
          <input
            ref={inputRef}
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleFileChange}
            type="file"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-unit-md">
          {assets.length === 0 && pendingFiles.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-on-surface-variant">
              <Icon name="image" className="h-10 w-10 opacity-30" />
              <p className="font-body text-body-md">
                No hay imágenes todavía. Usa el botón Upload para subir la primera.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="grid grid-cols-12 gap-4 border-b border-outline-variant bg-surface-container-low p-unit-sm font-label text-label-md text-on-surface-variant">
                <div className="col-span-7 pl-2 md:col-span-6">Nombre</div>
                <div className="col-span-3 hidden md:block">Tipo</div>
                <div className="col-span-5 text-right md:col-span-3">Dimensiones</div>
              </div>
              {pendingFiles.map((file) => (
                <PendingFileRow file={file} key={file.key} />
              ))}
              {assets.map((asset) => {
                const isActive = asset.id === active?.id;
                return (
                  <button
                    className={`group relative grid w-full grid-cols-12 items-center gap-4 border-b border-outline-variant/50 p-unit-sm text-left transition-colors last:border-b-0 ${
                      isActive ? "bg-primary-fixed/30" : "hover:bg-surface-container-low"
                    }`}
                    key={asset.id}
                    onClick={() => setActiveId(asset.id)}
                    type="button"
                  >
                    {isActive && <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />}
                    <div className="col-span-7 flex min-w-0 items-center gap-3 pl-2 md:col-span-6">
                      <Icon name="image" className="h-5 w-5 shrink-0 text-primary" />
                      <span className="truncate text-body-sm font-medium text-on-surface">
                        {asset.name || asset.publicId}
                      </span>
                    </div>
                    <div className="col-span-3 hidden truncate text-body-sm text-on-surface-variant md:block">
                      {asset.mimeType.replace("image/", "")}
                    </div>
                    <div className="col-span-5 text-right text-body-sm text-on-surface-variant md:col-span-3">
                      {asset.width && asset.height ? `${asset.width}×${asset.height}` : "—"}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {active ? (
        <aside className="flex w-[340px] shrink-0 flex-col border-l border-outline-variant bg-surface-container-lowest xl:w-[380px]">
          <div className="flex shrink-0 items-center justify-between border-b border-outline-variant px-unit-md py-unit-md">
            <h3 className="text-body-lg font-semibold text-on-surface">Detalle</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span>
                  <IconButton icon="more" label="Más opciones" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuItem onClick={copyUrl}>
                  <Icon name="copy" className="h-4 w-4" />
                  {copied ? "¡Copiado!" : "Copiar URL"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={deleteAsset}
                  className="text-destructive focus:text-destructive"
                >
                  <Icon name="trash" className="h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-outline-variant/50 bg-surface-bg/50 p-unit-md">
              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
                <AssetImage
                  alt={active.name}
                  className="object-contain"
                  fill
                  mimeType={active.mimeType}
                  sizes="380px"
                  src={active.url}
                />
              </div>
            </div>
            <div className="space-y-unit-lg p-unit-md">
              <h4 className="wrap-break-word text-body-md font-semibold leading-tight text-on-surface">
                {active.name || active.publicId}
              </h4>
              <dl className="grid grid-cols-[100px_1fr] gap-y-unit-sm text-body-sm">
                <dt className="text-on-surface-variant">Tipo</dt>
                <dd className="font-medium text-on-surface">{active.mimeType || "—"}</dd>
                <dt className="text-on-surface-variant">Dimensiones</dt>
                <dd className="font-medium text-on-surface">
                  {active.width && active.height ? `${active.width} × ${active.height} px` : "—"}
                </dd>
                <dt className="text-on-surface-variant">Subido</dt>
                <dd className="font-medium text-on-surface">
                  {active.createdAt
                    ? new Intl.DateTimeFormat("es", { dateStyle: "short" }).format(
                        new Date(active.createdAt)
                      )
                    : "—"}
                </dd>
              </dl>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
