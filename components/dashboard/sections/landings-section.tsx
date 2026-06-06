"use client";

import { contentGroups } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Icon } from "@/components/ui/icon";
import { IconButton, Panel, StatusBadge } from "@/components/ui/primitives";
import { LandingPreview } from "@/components/dashboard/landing-preview";

export function LandingsSection() {
  const {
    activeContentGroup,
    activeLandingId,
    activePostId,
    activePresentationId,
    landings,
    posts,
    presentations,
    setActiveContentGroup,
    setActiveLandingId,
    setActivePostId,
    setActivePresentationId,
    setActiveView,
  } = useDashboardStore();
  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];
  const activePost = posts.find((post) => post.id === activePostId) ?? posts[0];
  const activePresentation =
    presentations.find((item) => item.id === activePresentationId) ??
    presentations[0];

  return (
    <>
      <aside className="flex h-full w-[240px] shrink-0 flex-col overflow-y-auto border-r border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-unit-md">
          <span className="font-label text-label-md text-on-surface-variant">
            Content
          </span>
        </div>
        <div className="space-y-1 p-unit-sm">
          {contentGroups.map((group) => (
            <button
              className={`flex w-full items-center justify-between rounded-lg px-unit-sm py-2 text-body-sm transition-colors ${
                activeContentGroup === group
                  ? "bg-surface-container-low text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
              }`}
              key={group}
              onClick={() => setActiveContentGroup(group)}
              type="button"
            >
              <span className="flex items-center gap-2">
                <Icon
                  name={
                    group === "Assets"
                      ? "image"
                      : group === "Presentations"
                        ? "grid"
                        : "document"
                  }
                  className="h-4 w-4"
                />
                {group}
              </span>
              <Icon name="chevron" className="h-4 w-4" />
            </button>
          ))}
        </div>
      </aside>
      <aside className="flex h-full w-[320px] shrink-0 flex-col overflow-hidden border-r border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-unit-md">
          <span className="font-label text-label-md text-on-surface-variant">
            {activeContentGroup}
          </span>
          <div className="flex gap-1">
            <IconButton icon="add" label="Add content" />
            <IconButton icon="more" label="More content actions" />
          </div>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-unit-sm">
          {activeContentGroup === "Pages"
            ? landings.map((landing) => (
                <ContentRow
                  active={landing.id === activeLanding.id}
                  edited={landing.edited}
                  key={landing.id}
                  label={landing.name}
                  onClick={() => setActiveLandingId(landing.id)}
                  slug={landing.slug}
                  status={landing.status}
                />
              ))
            : null}
          {activeContentGroup === "Posts"
            ? posts.map((post) => (
                <ContentRow
                  active={post.id === activePost.id}
                  edited={post.edited}
                  key={post.id}
                  label={post.title}
                  onClick={() => setActivePostId(post.id)}
                  slug={post.slug}
                  status={post.status}
                />
              ))
            : null}
          {activeContentGroup === "Presentations"
            ? presentations.map((presentation) => (
                <ContentRow
                  active={presentation.id === activePresentation.id}
                  edited={`${presentation.slides.length} slides`}
                  key={presentation.id}
                  label={presentation.title}
                  onClick={() => setActivePresentationId(presentation.id)}
                  slug={presentation.audience}
                  status={presentation.status}
                />
              ))
            : null}
          {activeContentGroup === "Assets" ? (
            <button
              className="flex w-full items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-unit-sm py-4 text-body-sm text-primary transition-colors hover:bg-surface-variant"
              onClick={() => setActiveView("assets")}
              type="button"
            >
              Open asset library
            </button>
          ) : null}
        </div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-surface-bg">
        <div className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest p-unit-md">
          <div className="flex min-w-0 items-center gap-4">
            <h2 className="truncate font-headline text-headline-md text-on-surface">
              {activeContentGroup === "Posts"
                ? activePost.title
                : activeContentGroup === "Presentations"
                  ? activePresentation.title
                  : activeLanding.name}
            </h2>
            <StatusBadge
              status={
                activeContentGroup === "Posts"
                  ? activePost.status
                  : activeContentGroup === "Presentations"
                    ? activePresentation.status
                    : activeLanding.status
              }
            />
          </div>
          <div className="flex gap-2">
            <IconButton icon="link" label="Copy content link" />
            <IconButton icon="more" label="More content actions" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-unit-lg">
          <div className="mx-auto max-w-5xl space-y-unit-lg">
            {activeContentGroup === "Pages" ? (
              <>
                <Panel className="p-unit-md">
                  <h3 className="mb-4 font-label text-label-md uppercase text-on-surface-variant">
                    Metadata
                  </h3>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <Metadata label="Slug" value={activeLanding.slug} />
                    <Metadata
                      label="Last Edited"
                      value={`${activeLanding.edited} by ${activeLanding.owner}`}
                    />
                    <Metadata label="SEO Title" value={activeLanding.seoTitle} />
                    <Metadata
                      label="Template"
                      value="Toll Story editable landing"
                    />
                  </dl>
                </Panel>
                <LandingPreview content={activeLanding.content} />
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-outline-variant py-4 text-primary transition-colors hover:border-primary hover:bg-primary/5"
                  onClick={() => setActiveView("editor")}
                  type="button"
                >
                  <Icon name="settings" className="h-5 w-5" />
                  <span className="text-body-sm font-medium">
                    Edit landing content
                  </span>
                </button>
              </>
            ) : null}
            {activeContentGroup === "Posts" ? (
              <Panel className="p-unit-lg">
                <p className="font-label text-label-md uppercase text-on-surface-variant">
                  {activePost.slug}
                </p>
                <h3 className="mt-3 font-headline text-headline-lg text-on-surface">
                  {activePost.title}
                </h3>
                <p className="mt-4 text-body-lg text-on-surface-variant">
                  {activePost.excerpt}
                </p>
                <p className="mt-6 whitespace-pre-line text-body-md text-on-surface">
                  {activePost.body}
                </p>
                <button
                  className="mt-8 rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-on-primary"
                  onClick={() => setActiveView("editor")}
                  type="button"
                >
                  Edit post
                </button>
              </Panel>
            ) : null}
            {activeContentGroup === "Presentations" ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {activePresentation.slides.map((slide, index) => (
                  <Panel className="min-h-56 p-6" key={slide.id}>
                    <p className="font-label text-label-md uppercase text-primary">
                      Slide {index + 1}
                    </p>
                    <h3 className="mt-6 font-headline text-headline-md text-on-surface">
                      {slide.title}
                    </h3>
                    <p className="mt-4 text-body-md text-on-surface-variant">
                      {slide.body}
                    </p>
                  </Panel>
                ))}
                <button
                  className="rounded-lg border-2 border-dashed border-outline-variant p-6 text-primary"
                  onClick={() => setActiveView("editor")}
                  type="button"
                >
                  Edit presentation
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

function ContentRow({
  active,
  edited,
  label,
  onClick,
  slug,
  status,
}: {
  active: boolean;
  edited: string;
  label: string;
  onClick: () => void;
  slug: string;
  status: "Published" | "Draft" | "Changes";
}) {
  return (
    <button
      className={`relative flex w-full items-start gap-2 rounded-lg border px-unit-sm py-3 text-left transition-colors ${
        active
          ? "border-primary/20 bg-primary-container text-on-primary-container shadow-sm"
          : "border-transparent text-on-surface hover:bg-surface-variant"
      }`}
      onClick={onClick}
      type="button"
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-primary" />
      ) : null}
      <Icon
        name="drag"
        className={`mt-0.5 h-4 w-4 ${active ? "opacity-70" : "text-outline"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="mb-1 flex items-center gap-2">
          <Icon name="document" className="h-4 w-4" />
          <span className="truncate text-body-sm font-medium">{label}</span>
        </span>
        <span className="flex items-center gap-2">
          <StatusBadge status={status} />
          <span
            className={`truncate text-[11px] ${
              active ? "text-white/75" : "text-outline"
            }`}
          >
            {slug}
          </span>
        </span>
        <span
          className={`mt-1 block truncate text-[11px] ${
            active ? "text-white/65" : "text-outline"
          }`}
        >
          {edited}
        </span>
      </span>
    </button>
  );
}

function Metadata({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[11px] text-outline">{label}</dt>
      <dd className="text-body-sm text-on-surface">{value}</dd>
    </div>
  );
}
