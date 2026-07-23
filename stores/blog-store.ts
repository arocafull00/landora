"use client";

import {
  createContext,
  createElement,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { createStore, useStore } from "zustand";
import {
  createBlogPostAction,
  deleteBlogPostAction,
  updateBlogConfigAction,
  updateBlogPostAction,
} from "@/app/actions/blog";
import { formatBlogDate } from "@/lib/blog-slug";
import type { BlogConfig, Post } from "@/lib/dashboard-data";
import type { BlogPostDto } from "@/lib/domain/dtos";

function mapBlogPostDto(row: BlogPostDto): Post {
  return {
    id: row.id,
    landingId: row.landingId,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    heroImage: row.heroImage,
    status: row.published ? "Published" : "Draft",
    edited: formatBlogDate(row.updatedAt) || "—",
    publishedAt: row.published && row.updatedAt ? row.updatedAt : undefined,
  };
}

type BlogState = {
  activePostId: string;
  config: BlogConfig;
  posts: Post[];
  createPost: (landingId: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  publishPost: (id: string) => Promise<void>;
  savePost: (id: string) => Promise<void>;
  setActivePostId: (id: string) => void;
  setConfig: (config: BlogConfig) => void;
  updateConfig: (landingId: string, config: BlogConfig) => Promise<void>;
  updatePost: (id: string, patch: Partial<Post>) => void;
};

function createBlogStore(
  initialPosts: BlogPostDto[],
  initialConfig: BlogConfig,
) {
  const posts = initialPosts.map(mapBlogPostDto);

  return createStore<BlogState>((set, get) => ({
    activePostId: posts[0]?.id ?? "",
    config: initialConfig,
    posts,
    setActivePostId: (activePostId) => set({ activePostId }),
    setConfig: (config) => set({ config }),
    updatePost: (id, patch) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id
            ? {
                ...post,
                ...patch,
                edited: "Unsaved changes",
                status: post.status === "Published" ? "Changes" : post.status,
              }
            : post,
        ),
      })),
    createPost: async (landingId) => {
      const result = await createBlogPostAction(landingId, {
        title: "Nuevo post",
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      const post = mapBlogPostDto(result.data);
      set((state) => ({
        activePostId: post.id,
        posts: [post, ...state.posts],
      }));
    },
    savePost: async (id) => {
      const post = get().posts.find((item) => item.id === id);
      if (!post) return;

      const result = await updateBlogPostAction(post.landingId, id, {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        heroImage: post.heroImage,
        published: false,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      const updated = mapBlogPostDto(result.data);
      set((state) => ({
        posts: state.posts.map((item) => (item.id === id ? updated : item)),
      }));
      toast.success("Borrador guardado");
    },
    publishPost: async (id) => {
      const post = get().posts.find((item) => item.id === id);
      if (!post) return;

      const result = await updateBlogPostAction(post.landingId, id, {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        heroImage: post.heroImage,
        published: true,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      const updated = mapBlogPostDto(result.data);
      set((state) => ({
        posts: state.posts.map((item) => (item.id === id ? updated : item)),
      }));
      toast.success("Post publicado");
    },
    deletePost: async (id) => {
      const post = get().posts.find((item) => item.id === id);
      if (!post) return;

      const result = await deleteBlogPostAction(post.landingId, id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      set((state) => {
        const nextPosts = state.posts.filter((item) => item.id !== id);
        return {
          activePostId:
            state.activePostId === id
              ? (nextPosts[0]?.id ?? "")
              : state.activePostId,
          posts: nextPosts,
        };
      });
      toast.success("Post eliminado");
    },
    updateConfig: async (landingId, config) => {
      set({ config });
      const result = await updateBlogConfigAction(landingId, config);
      if ("error" in result) toast.error(result.error);
    },
  }));
}

type BlogStore = ReturnType<typeof createBlogStore>;

const BlogStoreContext = createContext<BlogStore | null>(null);

export function BlogStoreProvider({
  children,
  initialConfig = { title: "", description: "" },
  initialPosts = [],
}: {
  children: ReactNode;
  initialConfig?: BlogConfig;
  initialPosts?: BlogPostDto[];
}) {
  const [store] = useState(() =>
    createBlogStore(initialPosts, initialConfig),
  );

  return createElement(
    BlogStoreContext.Provider,
    { value: store },
    children,
  );
}

export function useBlogStore<T>(selector: (state: BlogState) => T): T {
  const store = useContext(BlogStoreContext);
  if (!store) {
    throw new Error("useBlogStore must be used within BlogStoreProvider");
  }

  return useStore(store, selector);
}
