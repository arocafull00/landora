"use client";

import { useEffect, useRef, useTransition } from "react";
import { ImageField } from "@/components/dashboard/image-field";
import { ActionButton, StatusBadge } from "@/components/ui/primitives";
import { slugifyBlogTitle } from "@/lib/blog-slug";
import { useDashboardStore } from "@/stores/dashboard-store";

const INPUT_CLASS =
  "w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary";

export function BlogPostEditorPanel() {
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const landings = useDashboardStore((state) => state.landings);
  const posts = useDashboardStore((state) => state.posts);
  const activePostId = useDashboardStore((state) => state.activePostId);
  const updatePost = useDashboardStore((state) => state.updatePost);
  const savePost = useDashboardStore((state) => state.savePost);
  const publishPost = useDashboardStore((state) => state.publishPost);
  const deletePost = useDashboardStore((state) => state.deletePost);
  const isAdmin = useDashboardStore((state) => state.isAdmin);

  const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];
  const resolvedActivePostId =
    activePostId && posts.some((item) => item.id === activePostId)
      ? activePostId
      : (posts[0]?.id ?? "");
  const post = posts.find((item) => item.id === resolvedActivePostId) ?? null;

  const slugTouchedRef = useRef(false);
  const [isSaving, startSaveTransition] = useTransition();
  const [isPublishing, startPublishTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const isBusy = isSaving || isPublishing || isDeleting;

  useEffect(() => {
    slugTouchedRef.current = false;
  }, [post?.id]);

  if (!landing || !post) return null;

  const handleTitleChange = (title: string) => {
    const patch: { title: string; slug?: string } = { title };
    if (!slugTouchedRef.current) {
      patch.slug = slugifyBlogTitle(title);
    }
    updatePost(post.id, patch);
  };

  const badgeStatus = post.status === "Changes" ? "Draft" : post.status;

  return (
    <aside className={`flex w-[340px] shrink-0 flex-col border-l border-outline-variant bg-surface-container-lowest xl:w-[420px] ${isAdmin ? "pt-10" : ""}`}>
      <div className="flex shrink-0 flex-col gap-3 border-b border-outline-variant px-unit-md py-unit-md">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-body-lg font-semibold text-on-surface">Editor</h3>
              <StatusBadge status={badgeStatus} />
            </div>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              Edita el contenido antes de publicar.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionButton
            disabled={isBusy}
            onClick={() => startSaveTransition(() => savePost(post.id))}
            variant="secondary"
          >
            {isSaving ? "Guardando…" : "Guardar borrador"}
          </ActionButton>
          <ActionButton
            disabled={isBusy}
            onClick={() => startPublishTransition(() => publishPost(post.id))}
            variant="primary"
          >
            {isPublishing ? "Publicando…" : "Publicar"}
          </ActionButton>
        </div>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-unit-md">
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Título
          </span>
          <input
            className={INPUT_CLASS}
            disabled={isBusy}
            onChange={(event) => handleTitleChange(event.target.value)}
            type="text"
            value={post.title}
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Slug
          </span>
          <input
            className={`${INPUT_CLASS} font-mono text-body-sm`}
            disabled={isBusy}
            onChange={(event) => {
              slugTouchedRef.current = true;
              updatePost(post.id, { slug: slugifyBlogTitle(event.target.value) });
            }}
            spellCheck={false}
            type="text"
            value={post.slug}
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Extracto
          </span>
          <textarea
            className={`${INPUT_CLASS} resize-none`}
            disabled={isBusy}
            onChange={(event) => updatePost(post.id, { excerpt: event.target.value })}
            rows={3}
            value={post.excerpt}
          />
        </label>
        <ImageField
          label="Imagen de cabecera"
          onChange={(value) => updatePost(post.id, { heroImage: value })}
          templateId={landing.template}
          value={post.heroImage}
        />
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Contenido
          </span>
          <textarea
            className={`${INPUT_CLASS} min-h-[240px] font-mono text-body-sm`}
            disabled={isBusy}
            onChange={(event) => updatePost(post.id, { body: event.target.value })}
            rows={12}
            value={post.body}
          />
        </label>
        <div className="border-t border-outline-variant pt-5">
          <ActionButton
            className="w-full"
            disabled={isBusy}
            onClick={() => startDeleteTransition(() => deletePost(post.id))}
            variant="danger"
          >
            {isDeleting ? "Eliminando…" : "Eliminar post"}
          </ActionButton>
        </div>
      </div>
    </aside>
  );
}
