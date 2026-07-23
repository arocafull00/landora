"use client";

import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import type { Landing } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import { useBlogStore } from "@/stores/blog-store";

type BlogConfigEditorPanelProps = {
  activeLanding: Landing;
};

export function BlogConfigEditorPanel({ activeLanding }: BlogConfigEditorPanelProps) {
  const blogConfig = useBlogStore((state) => state.config);
  const setBlogConfig = useBlogStore((state) => state.setConfig);
  const updateBlogConfig = useBlogStore((state) => state.updateConfig);

  const persistConfig = useDebouncedCallback(
    (patch: Partial<{ title: string; description: string }>) => {
      updateBlogConfig(activeLanding.id, {
        ...blogConfig,
        ...patch,
      });
    },
    500,
  );

  return (
    <section className="space-y-5 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Configuración del blog</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Título y descripción que aparecen en la página pública del blog.
        </p>
      </div>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Título del blog
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => {
            const nextTitle = event.target.value;
            setBlogConfig({ ...blogConfig, title: nextTitle });
            persistConfig({ title: nextTitle, description: blogConfig.description });
          }}
          placeholder={`Blog de ${activeLanding.content.brand || activeLanding.name}`}
          type="text"
          value={blogConfig.title}
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Descripción del blog
        </span>
        <textarea
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => {
            const nextDescription = event.target.value;
            setBlogConfig({ ...blogConfig, description: nextDescription });
            persistConfig({ title: blogConfig.title, description: nextDescription });
          }}
          rows={4}
          value={blogConfig.description}
        />
      </label>
      <Link
        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-body-sm font-medium text-on-primary shadow-sm transition-colors hover:bg-primary-fixed-variant"
        href="/blog"
      >
        <Icon className="h-4 w-4" name="add" />
        Crear nuevo post
      </Link>
    </section>
  );
}
