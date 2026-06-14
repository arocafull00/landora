"use client";

import { AssetImage } from "@/components/ui/asset-image";
import { StatusBadge } from "@/components/ui/primitives";
import type { Post } from "@/lib/dashboard-data";

type BlogPostListItemProps = {
  post: Post;
  isActive: boolean;
  onSelect: () => void;
};

export function BlogPostListItem({ post, isActive, onSelect }: BlogPostListItemProps) {
  return (
    <button
      aria-current={isActive ? "true" : undefined}
      className={`grid w-full grid-cols-12 items-center gap-4 border-b border-outline-variant/50 p-unit-sm text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        isActive
          ? "bg-primary-fixed/30 ring-1 ring-inset ring-primary/40"
          : "hover:bg-surface-container-low"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="col-span-2 hidden sm:block">
        <div className="relative h-12 w-12 overflow-hidden rounded-md border border-outline-variant bg-surface-container">
          {post.heroImage ? (
            <AssetImage alt="" className="object-cover" fill sizes="48px" src={post.heroImage} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-label-md text-on-surface-variant">
              —
            </div>
          )}
        </div>
      </div>
      <div className="col-span-7 flex min-w-0 flex-col gap-1 sm:col-span-6">
        <span className="truncate text-body-sm font-medium text-on-surface">{post.title}</span>
        <span className="truncate text-body-sm text-on-surface-variant">{post.edited}</span>
      </div>
      <div className="col-span-5 flex justify-end sm:col-span-4">
        <StatusBadge status={post.status === "Changes" ? "Draft" : post.status} />
      </div>
    </button>
  );
}
