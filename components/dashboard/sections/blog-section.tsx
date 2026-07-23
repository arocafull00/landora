"use client";

import { useTransition } from "react";
import { BlogPostEditorPanel } from "@/components/dashboard/blog-post-editor-panel";
import { BlogPostListItem } from "@/components/dashboard/blog-post-list-item";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardListShell } from "@/components/dashboard/dashboard-list-shell";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { ActionButton } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useBlogStore } from "@/stores/blog-store";

export function BlogSection() {
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const landings = useDashboardStore((state) => state.landings);
  const posts = useBlogStore((state) => state.posts);
  const createPost = useBlogStore((state) => state.createPost);
  const [isCreating, startCreateTransition] = useTransition();

  const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];

  const handleCreatePost = () => {
    if (!landing) return;
    startCreateTransition(async () => {
      await createPost(landing.id);
    });
  };

  if (!landing) return null;

  return (
    <>
      <section className="flex min-w-0 flex-1 flex-col border-r border-outline-variant bg-surface sm:min-w-[320px]">
        <DashboardPageHeader
          actions={
            <ActionButton disabled={isCreating} onClick={handleCreatePost} variant="primary">
              <Icon className="h-4 w-4" name="add" />
              {isCreating ? "Creando…" : "Nuevo post"}
            </ActionButton>
          }
          description="Gestiona los posts de tu landing."
          title="Blog"
        />
        <div className="flex-1 overflow-y-auto p-unit-md">
          {posts.length === 0 ? (
            <DashboardEmptyState
              action={
                <ActionButton disabled={isCreating} onClick={handleCreatePost} variant="primary">
                  <Icon className="h-4 w-4" name="add" />
                  {isCreating ? "Creando…" : "Crear primer post"}
                </ActionButton>
              }
              description="Publica artículos para mejorar el SEO y compartir novedades con tus clientes."
              icon="document"
              title="Sin posts todavía"
            />
          ) : (
            <DashboardListShell
              columns={
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 hidden sm:block" />
                  <div className="col-span-7 sm:col-span-6">Título</div>
                  <div className="col-span-5 text-right sm:col-span-4">Estado</div>
                </div>
              }
            >
              {posts.map((post) => (
                <BlogPostListItem key={post.id} post={post} />
              ))}
            </DashboardListShell>
          )}
        </div>
      </section>
      <BlogPostEditorPanel />
    </>
  );
}
