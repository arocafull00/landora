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
  saveStatus: SaveStatus;
  isAdmin: boolean;
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
  setIsAdmin: (isAdmin: boolean) => void;
  initFromLanding: (landing: Landing) => void;
  updateLandingMeta: (id: string, patch: Partial<Landing>) => void;
  updateHero: (id: string, patch: Partial<HeroContent>) => void;
  updateStory: (id: string, patch: Partial<StoryContent>) => void;
  updateStat: (landingId: string, statId: string, patch: Partial<StatContent>) => void;
  updateSpace: (landingId: string, spaceId: string, patch: Partial<SpaceContent>) => void;
  updateService: (landingId: string, serviceId: string, patch: Partial<ServiceContent>) => void;
  updateWorkflowStep: (landingId: string, stepId: string, patch: Partial<WorkflowStep>) => void;
  updateTestimonial: (landingId: string, testimonialId: string, patch: Partial<TestimonialContent>) => void;
  updateSection: (landingId: string, section: string, data: unknown) => void;
  updateSectionItem: (landingId: string, section: string, itemId: string, patch: Record<string, unknown>) => void;
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

  const calls = [
    patchSection(`${base}/hero`, content.hero),
    patchSection(`${base}/cta`, content.contact),
    patchSection(`${base}/branding`, { brand: content.brand }),
    patchSection(`${base}/stats`, { items: content.stats }),
    patchSection(`${base}/testimonials`, { items: content.testimonials }),
    patchSection(`${base}/nav`, { items: content.nav }),
  ];

  if (content.story) calls.push(patchSection(`${base}/story`, content.story));
  if (content.spaces) calls.push(patchSection(`${base}/spaces`, { items: content.spaces }));
  if (content.services) calls.push(patchSection(`${base}/services`, { items: content.services }));
  if (content.workflow) calls.push(patchSection(`${base}/workflow`, { items: content.workflow }));
  if (content.gallery) calls.push(patchSection(`${base}/gallery`, { items: content.gallery }));
  if (content.team) calls.push(patchSection(`${base}/team`, { items: content.team }));
  if (content.serviceMenu) calls.push(patchSection(`${base}/service-menu`, { items: content.serviceMenu }));
  if (content.benefits) calls.push(patchSection(`${base}/benefits`, { items: content.benefits }));
  if (content.faq) calls.push(patchSection(`${base}/faq`, { items: content.faq }));

  await Promise.all(calls);
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  activeView: "editor",
  activeWorkspaceTab: "Structure",
  activeContentGroup: "Pages",
  activeEditorTab: "Hero",
  activeLandingId: "",
  activePostId: initialPosts[0].id,
  activePresentationId: initialPresentations[0].id,
  activeAssetId: initialAssets[0].id,
  saveStatus: "idle",
  isAdmin: false,
  landings: [],
  posts: initialPosts,
  presentations: initialPresentations,
  assets: initialAssets,

  setActiveView: (activeView) => set({ activeView }),
  setActiveWorkspaceTab: (activeWorkspaceTab) => set({ activeWorkspaceTab }),
  setActiveContentGroup: (activeContentGroup) => set({ activeContentGroup }),
  setActiveEditorTab: (activeEditorTab) => set({ activeEditorTab }),
  setActiveLandingId: (activeLandingId) =>
    set({ activeLandingId, activeView: "editor", activeContentGroup: "Pages" }),
  setActivePostId: (activePostId) =>
    set({ activePostId, activeContentGroup: "Posts" }),
  setActivePresentationId: (activePresentationId) =>
    set({ activePresentationId, activeContentGroup: "Presentations" }),
  setActiveAssetId: (activeAssetId) => set({ activeAssetId }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),

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
              content: { ...landing.content, story: { statement: "", ...landing.content.story, ...patch } },
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
                spaces: (landing.content.spaces ?? []).map((space) =>
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
                services: (landing.content.services ?? []).map((service) =>
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
                workflow: (landing.content.workflow ?? []).map((step) =>
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

  updateSection: (landingId, section, data) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: { ...landing.content, [section]: data },
            })
          : landing,
      ),
    })),

  updateSectionItem: (landingId, section, itemId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                [section]: ((landing.content as Record<string, unknown>)[section] as Array<Record<string, unknown>>)?.map(
                  (item) => (item.id === itemId ? { ...item, ...patch } : item),
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
