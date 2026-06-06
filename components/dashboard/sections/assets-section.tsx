"use client";

import Image from "next/image";
import { folders } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { ActionButton, IconButton, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";

export function AssetsSection() {
  const activeAssetId = useDashboardStore((state) => state.activeAssetId);
  const assets = useDashboardStore((state) => state.assets);
  const setActiveAssetId = useDashboardStore((state) => state.setActiveAssetId);
  const activeAsset =
    assets.find((asset) => asset.id === activeAssetId) ?? assets[0];

  return (
    <>
      <section className="flex min-w-[400px] flex-1 flex-col border-r border-outline-variant bg-surface">
        <div className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-unit-md">
          <div>
            <h2 className="font-headline text-headline-md text-on-surface">
              Asset Library
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Manage and organize your media.
            </p>
          </div>
          <ActionButton variant="primary">
            <Icon name="upload" className="h-4 w-4" />
            Upload
          </ActionButton>
        </div>
        <div className="flex shrink-0 items-center gap-unit-xs border-b border-outline-variant/50 bg-surface px-unit-lg py-unit-sm font-label text-label-md text-on-surface-variant">
          <span>Home</span>
          <span>/</span>
          <span>Projects</span>
          <span>/</span>
          <span className="font-bold text-primary">Q4 Marketing Campaign</span>
        </div>
        <div className="flex-1 overflow-y-auto p-unit-md">
          <section className="mb-unit-xl">
            <h3 className="mb-unit-sm px-unit-sm font-label text-label-md uppercase text-on-surface-variant">
              Folders
            </h3>
            <div className="grid grid-cols-1 gap-unit-sm md:grid-cols-2 xl:grid-cols-3">
              {folders.map((folder) => (
                <button
                  className="group flex items-center gap-unit-md rounded-lg border border-outline-variant bg-surface-container-lowest p-unit-md text-left transition-all hover:border-primary hover:shadow-sm"
                  key={folder.name}
                  type="button"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary-container text-on-secondary-container">
                    <Icon name="folder" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-body-md text-on-surface transition-colors group-hover:text-primary">
                      {folder.name}
                    </span>
                    <span className="font-label text-label-md text-on-surface-variant">
                      {folder.items}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section>
            <div className="mb-unit-sm flex items-center justify-between px-unit-sm">
              <h3 className="font-label text-label-md uppercase text-on-surface-variant">
                Recent Files
              </h3>
              <button className="flex items-center gap-1 font-label text-label-md text-primary" type="button">
                <Icon name="settings" className="h-4 w-4" />
                Filter
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="grid grid-cols-12 gap-4 border-b border-outline-variant bg-surface-container-low p-unit-sm font-label text-label-md text-on-surface-variant">
                <div className="col-span-7 pl-2 md:col-span-5">Name</div>
                <div className="col-span-3 hidden md:block">Type</div>
                <div className="col-span-4 text-right md:col-span-3">Size</div>
                <div className="col-span-1" />
              </div>
              {assets.map((asset) => {
                const active = asset.id === activeAsset.id;

                return (
                  <button
                    className={`group relative grid w-full grid-cols-12 items-center gap-4 border-b border-outline-variant/50 p-unit-sm text-left transition-colors last:border-b-0 ${
                      active
                        ? "bg-primary-fixed/30"
                        : "hover:bg-surface-container-low"
                    }`}
                    key={asset.id}
                    onClick={() => setActiveAssetId(asset.id)}
                    type="button"
                  >
                    {active ? (
                      <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
                    ) : null}
                    <div className="col-span-7 flex min-w-0 items-center gap-3 pl-2 md:col-span-5">
                      <Icon
                        name={asset.type.includes("Image") ? "image" : "document"}
                        className="h-5 w-5 shrink-0 text-primary"
                      />
                      <span className="truncate text-body-sm font-medium text-on-surface">
                        {asset.name}
                      </span>
                    </div>
                    <div className="col-span-3 hidden truncate text-body-sm text-on-surface-variant md:block">
                      {asset.type}
                    </div>
                    <div className="col-span-4 text-right text-body-sm text-on-surface-variant md:col-span-3">
                      {asset.size}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Icon
                        name="more"
                        className="h-5 w-5 text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </section>
      <aside className="flex w-[340px] shrink-0 flex-col border-l border-outline-variant bg-surface-container-lowest xl:w-[380px]">
        <div className="flex shrink-0 items-center justify-between border-b border-outline-variant px-unit-md py-unit-md">
          <h3 className="text-body-lg font-semibold text-on-surface">
            Asset Details
          </h3>
          <IconButton icon="more" label="Close asset details" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-outline-variant/50 bg-surface-bg/50 p-unit-md">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
              <Image
                alt={activeAsset.name}
                className="object-cover"
                fill
                src={activeAsset.url}
                sizes="380px"
              />
            </div>
          </div>
          <div className="space-y-unit-lg p-unit-md">
            <div>
              <h4 className="mb-2 break-words text-body-md font-semibold leading-tight text-on-surface">
                {activeAsset.name}
              </h4>
              <div className="flex gap-2">
                <StatusBadge status={activeAsset.status} />
                <span className="rounded-md bg-primary/10 px-2 py-1 font-label text-label-md uppercase text-primary">
                  {activeAsset.type.split(" ")[0]}
                </span>
              </div>
            </div>
            <dl className="grid grid-cols-[100px_1fr] gap-y-unit-sm text-body-sm">
              <dt className="text-on-surface-variant">Size</dt>
              <dd className="font-medium text-on-surface">{activeAsset.size}</dd>
              <dt className="text-on-surface-variant">Dimensions</dt>
              <dd className="font-medium text-on-surface">
                {activeAsset.dimensions ?? "Not available"}
              </dd>
              <dt className="text-on-surface-variant">Uploaded By</dt>
              <dd className="flex items-center gap-2 font-medium text-on-surface">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container text-[10px] font-bold text-on-secondary-container">
                  RA
                </span>
                {activeAsset.uploadedBy}
              </dd>
              <dt className="text-on-surface-variant">Date Added</dt>
              <dd className="font-medium text-on-surface">{activeAsset.date}</dd>
            </dl>
            <div>
              <div className="mb-unit-sm font-label text-label-md text-on-surface-variant">
                Extracted Colors
              </div>
              <div className="flex gap-2">
                {activeAsset.colors.map((color) => (
                  <span
                    className="h-6 w-6 rounded-full border border-outline-variant/30 shadow-sm"
                    key={color}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 space-y-unit-sm border-t border-outline-variant bg-surface-container-lowest p-unit-md">
          <ActionButton className="w-full" variant="primary">
            <Icon name="copy" className="h-4 w-4" />
            Copy URL
          </ActionButton>
          <div className="flex gap-unit-sm">
            <ActionButton className="flex-1">
              <Icon name="download" className="h-4 w-4" />
              Download
            </ActionButton>
            <IconButton
              className="border border-outline-variant text-danger hover:bg-error-container hover:text-danger"
              icon="trash"
              label="Delete asset"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
