"use client";

import { create } from "zustand";
import {
  Asset,
  ContentGroup,
  DashboardView,
  HeroContent,
  initialAssets,
  initialPosts,
  initialPresentations,
  Landing,
  LandingContent,
  Post,
  Presentation,
  ServiceContent,
  SpaceContent,
  StatContent,
  StoryContent,
  TestimonialContent,
  WorkflowStep,
} from "@/lib/dashboard-data";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type DashboardState = {
  activeView: DashboardView;
  activeWorkspaceTab: string;
  activeContentGroup: ContentGroup;
  activeEditorTab: string;
  activeLandingId: string;
  activePostId: string;
  activePresentationId: string;
  activeAssetId: string;
  activeSettingCategory: string;
  activeSettingPage: string;
  saveStatus: SaveStatus;
  landings: Landing[];
  posts: Post[];
  presentations: Presentation[];
  assets: Asset[];
  setActiveView: (view: DashboardView) => void;
  setActiveWorkspaceTab: (tab: string) => void;
  setActiveContentGroup: (group: ContentGroup) => void;
  setActiveEditorTab: (tab: string) => void;
  setActiveLandingId: (id: string) => void;
  setActivePostId: (id: string) => void;
  setActivePresentationId: (id: string) => void;
  setActiveAssetId: (id: string) => void;
  setActiveSettingCategory: (category: string) => void;
  setActiveSettingPage: (page: string) => void;
  initFromLanding: (landing: Landing) => void;
  updateLandingMeta: (id: string, patch: Partial<Landing>) => void;
  updateHero: (id: string, patch: Partial<HeroContent>) => void;
  updateStory: (id: string, patch: Partial<StoryContent>) => void;
  updateStat: (landingId: string, statId: string, patch: Partial<StatContent>) => void;
  updateSpace: (landingId: string, spaceId: string, patch: Partial<SpaceContent>) => void;
  updateService: (landingId: string, serviceId: string, patch: Partial<ServiceContent>) => void;
  updateWorkflowStep: (landingId: string, stepId: string, patch: Partial<WorkflowStep>) => void;
  updateTestimonial: (landingId: string, testimonialId: string, patch: Partial<TestimonialContent>) => void;
  updatePost: (postId: string, patch: Partial<Post>) => void;
  updatePresentation: (presentationId: string, patch: Partial<Presentation>) => void;
  updatePresentationSlide: (presentationId: string, slideId: string, patch: Partial<Presentation["slides"][number]>) => void;
  saveLanding: (id: string) => Promise<void>;
  publishLanding: (id: string) => Promise<void>;
  savePost: (id: string) => void;
  publishPost: (id: string) => void;
  savePresentation: (id: string) => void;
  publishPresentation: (id: string) => void;
};

const markEdited = (landing: Landing): Landing => ({
  ...landing,
  status: landing.status === "Published" ? "Changes" : landing.status,
  edited: "Unsaved changes",
});

async function patchSection(url: string, body: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${url} failed`);
}

async function persistAllSections(id: string, content: LandingContent) {
  const base = `/api/landings/${id}`;

  await Promise.all([
    patchSection(`${base}/hero`, content.hero),
    patchSection(`${base}/story`, content.story),
    patchSection(`${base}/cta`, content.contact),
    patchSection(`${base}/branding`, { brand: content.brand }),
    patchSection(`${base}/stats`, { items: content.stats }),
    patchSection(`${base}/spaces`, { items: content.spaces }),
    patchSection(`${base}/services`, { items: content.services }),
    patchSection(`${base}/workflow`, { items: content.workflow }),
    patchSection(`${base}/testimonials`, { items: content.testimonials }),
    patchSection(`${base}/gallery`, { items: content.gallery }),
    patchSection(`${base}/nav`, { items: content.nav }),
  ]);
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  activeView: "landings",
  activeWorkspaceTab: "Structure",
  activeContentGroup: "Pages",
  activeEditorTab: "Hero",
  activeLandingId: "",
  activePostId: initialPosts[0].id,
  activePresentationId: initialPresentations[0].id,
  activeAssetId: initialAssets[0].id,
  activeSettingCategory: "General",
  activeSettingPage: "Project Info",
  saveStatus: "idle",
  landings: [],
  posts: initialPosts,
  presentations: initialPresentations,
  assets: initialAssets,

  setActiveView: (activeView) => set({ activeView }),
  setActiveWorkspaceTab: (activeWorkspaceTab) => set({ activeWorkspaceTab }),
  setActiveContentGroup: (activeContentGroup) => set({ activeContentGroup }),
  setActiveEditorTab: (activeEditorTab) => set({ activeEditorTab }),
  setActiveLandingId: (activeLandingId) =>
    set({ activeLandingId, activeView: "landings", activeContentGroup: "Pages" }),
  setActivePostId: (activePostId) =>
    set({ activePostId, activeContentGroup: "Posts" }),
  setActivePresentationId: (activePresentationId) =>
    set({ activePresentationId, activeContentGroup: "Presentations" }),
  setActiveAssetId: (activeAssetId) => set({ activeAssetId }),
  setActiveSettingCategory: (activeSettingCategory) => set({ activeSettingCategory }),
  setActiveSettingPage: (activeSettingPage) => set({ activeSettingPage }),

  initFromLanding: (landing) =>
    set({
      landings: [landing],
      activeLandingId: landing.id,
    }),

  updateLandingMeta: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id ? markEdited({ ...landing, ...patch }) : landing,
      ),
    })),

  updateHero: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: { ...landing.content, hero: { ...landing.content.hero, ...patch } },
            })
          : landing,
      ),
    })),

  updateStory: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: { ...landing.content, story: { ...landing.content.story, ...patch } },
            })
          : landing,
      ),
    })),

  updateStat: (landingId, statId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                stats: landing.content.stats.map((stat) =>
                  stat.id === statId ? { ...stat, ...patch } : stat,
                ),
              },
            })
          : landing,
      ),
    })),

  updateSpace: (landingId, spaceId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                spaces: landing.content.spaces.map((space) =>
                  space.id === spaceId ? { ...space, ...patch } : space,
                ),
              },
            })
          : landing,
      ),
    })),

  updateService: (landingId, serviceId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                services: landing.content.services.map((service) =>
                  service.id === serviceId ? { ...service, ...patch } : service,
                ),
              },
            })
          : landing,
      ),
    })),

  updateWorkflowStep: (landingId, stepId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                workflow: landing.content.workflow.map((step) =>
                  step.id === stepId ? { ...step, ...patch } : step,
                ),
              },
            })
          : landing,
      ),
    })),

  updateTestimonial: (landingId, testimonialId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                testimonials: landing.content.testimonials.map((testimonial) =>
                  testimonial.id === testimonialId ? { ...testimonial, ...patch } : testimonial,
                ),
              },
            })
          : landing,
      ),
    })),

  updatePost: (postId, patch) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, ...patch, status: post.status === "Published" ? "Changes" : post.status, edited: "Unsaved changes" }
          : post,
      ),
    })),

  updatePresentation: (presentationId, patch) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === presentationId
          ? { ...presentation, ...patch, status: presentation.status === "Published" ? "Changes" : presentation.status }
          : presentation,
      ),
    })),

  updatePresentationSlide: (presentationId, slideId, patch) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === presentationId
          ? {
              ...presentation,
              status: presentation.status === "Published" ? "Changes" : presentation.status,
              slides: presentation.slides.map((slide) =>
                slide.id === slideId ? { ...slide, ...patch } : slide,
              ),
            }
          : presentation,
      ),
    })),

  saveLanding: async (id) => {
    const landing = get().landings.find((l) => l.id === id);
    if (!landing) return;

    set({ saveStatus: "saving" });

    try {
      await persistAllSections(id, landing.content);
      set((state) => ({
        saveStatus: "saved",
        landings: state.landings.map((l) =>
          l.id === id ? { ...l, status: "Draft", edited: "Saved just now" } : l,
        ),
      }));
    } catch {
      set({ saveStatus: "error" });
    }
  },

  publishLanding: async (id) => {
    const landing = get().landings.find((l) => l.id === id);
    if (!landing) return;

    set({ saveStatus: "saving" });

    try {
      await persistAllSections(id, landing.content);
      await patchSection(`/api/landings/${id}`, { published: true });
      set((state) => ({
        saveStatus: "saved",
        landings: state.landings.map((l) =>
          l.id === id ? { ...l, status: "Published", edited: "Published just now" } : l,
        ),
      }));
    } catch {
      set({ saveStatus: "error" });
    }
  },

  savePost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, status: "Draft", edited: "Saved just now" } : post,
      ),
    })),

  publishPost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, status: "Published", edited: "Published just now" } : post,
      ),
    })),

  savePresentation: (id) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === id ? { ...presentation, status: "Draft" } : presentation,
      ),
    })),

  publishPresentation: (id) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === id ? { ...presentation, status: "Published" } : presentation,
      ),
    })),
}));
