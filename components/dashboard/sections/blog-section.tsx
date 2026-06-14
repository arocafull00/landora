"use client";

import { useEffect, useRef, useState } from "react";
import { ImageField } from "@/components/dashboard/image-field";
import { BlogPostListItem } from "@/components/dashboard/blog-post-list-item";
import { ActionButton } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { slugifyBlogTitle } from "@/lib/blog-slug";
import { useDashboardStore } from "@/stores/dashboard-store";

export function BlogSection() {
  const landings = useDashboardStore((state) => state.landings);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const posts = useDashboardStore((state) => state.posts);
  const loadBlogPosts = useDashboardStore((state) => state.loadBlogPosts);
  const createPost = useDashboardStore((state) => state.createPost);
  const updatePost = useDashboardStore((state) => state.updatePost);
  const savePost = useDashboardStore((state) => state.savePost);
  const publishPost = useDashboardStore((state) => state.publishPost);
  const deletePost = useDashboardStore((state) => state.deletePost);
  const isAdmin = useDashboardStore((state) => state.isAdmin);
  const [activePostId, setActivePostId] = useState<string>("");
  const slugTouchedRef = useRef(false);

  const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];
  const resolvedActivePostId = activePostId || posts[0]?.id || "";
  const activePost = posts.find((post) => post.id === resolvedActivePostId) ?? null;

  useEffect(() => {
    if (!landing?.id) return;
    loadBlogPosts(landing.id);
  }, [landing?.id, loadBlogPosts]);

  const handleCreatePost = async () => {
    if (!landing) return;
    const created = await createPost(landing.id);
    if (!created) return;
    setActivePostId(created.id);
    slugTouchedRef.current = false;
  };

  const handleTitleChange = (title: string) => {
    if (!activePost) return;

    const patch: { title: string; slug?: string } = { title };
    if (!slugTouchedRef.current) {
      patch.slug = slugifyBlogTitle(title);
    }

    updatePost(activePost.id, patch);
  };

  if (!landing) return null;

  return (
    <>
      <section className={`flex min-w-[400px] flex-1 flex-col border-r border-outline-variant bg-surface ${isAdmin ? "pt-10" : ""}`}>
        <div className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-unit-md">
          <div>
            <h2 className="font-headline text-headline-md text-on-surface">Blog</h2>
            <p className="text-body-sm text-on-surface-variant">
              Crea y gestiona los posts de tu landing.
            </p>
          </div>
          <ActionButton onClick={handleCreatePost} variant="primary">
            <Icon className="h-4 w-4" name="add" />
            Nuevo post
          </ActionButton>
        </div>
        <div className="flex-1 overflow-y-auto p-unit-md">
          {posts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-on-surface-variant">
              <Icon className="h-10 w-10 opacity-30" name="document" />
              <p className="font-body text-body-md">
                No hay posts todavía. Crea el primero con el botón Nuevo post.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="grid grid-cols-12 gap-4 border-b border-outline-variant bg-surface-container-low p-unit-sm font-label text-label-md text-on-surface-variant">
                <div className="col-span-2 hidden sm:block" />
                <div className="col-span-7 sm:col-span-6">Título</div>
                <div className="col-span-5 text-right sm:col-span-4">Estado</div>
              </div>
              {posts.map((post) => (
                <BlogPostListItem
                  isActive={post.id === resolvedActivePostId}
                  key={post.id}
                  onSelect={() => {
                    setActivePostId(post.id);
                    slugTouchedRef.current = true;
                  }}
                  post={post}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {activePost ? (
        <aside className={`flex w-[340px] shrink-0 flex-col border-l border-outline-variant bg-surface-container-lowest xl:w-[420px] ${isAdmin ? "pt-10" : ""}`}>
          <div className="flex shrink-0 items-center justify-between border-b border-outline-variant px-unit-md py-unit-md">
            <h3 className="text-body-lg font-semibold text-on-surface">Editor</h3>
            <div className="flex gap-2">
              <ActionButton onClick={() => savePost(activePost.id)} variant="secondary">
                Guardar borrador
              </ActionButton>
              <ActionButton onClick={() => publishPost(activePost.id)} variant="primary">
                Publicar
              </ActionButton>
            </div>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-unit-md">
            <label className="block">
              <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                Título
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
                onChange={(event) => handleTitleChange(event.target.value)}
                type="text"
                value={activePost.title}
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                Slug
              </span>
              <input
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
                onChange={(event) => {
                  slugTouchedRef.current = true;
                  updatePost(activePost.id, { slug: slugifyBlogTitle(event.target.value) });
                }}
                type="text"
                value={activePost.slug}
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                Extracto
              </span>
              <textarea
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
                onChange={(event) => updatePost(activePost.id, { excerpt: event.target.value })}
                rows={3}
                value={activePost.excerpt}
              />
            </label>
            <ImageField
              label="Imagen de cabecera"
              onChange={(value) => updatePost(activePost.id, { heroImage: value })}
              templateId={landing.template}
              value={activePost.heroImage}
            />
            <label className="block">
              <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                Contenido
              </span>
              <textarea
                className="min-h-[240px] w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 font-mono text-body-sm text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
                onChange={(event) => updatePost(activePost.id, { body: event.target.value })}
                rows={12}
                value={activePost.body}
              />
            </label>
            <ActionButton
              className="w-full"
              onClick={() => deletePost(activePost.id)}
              variant="danger"
            >
              Eliminar post
            </ActionButton>
          </div>
        </aside>
      ) : null}
    </>
  );
}
