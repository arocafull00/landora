"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Asset,
  ContentGroup,
  DashboardView,
  HeroContent,
  initialAssets,
  initialLandings,
  initialPosts,
  initialPresentations,
  Landing,
  Post,
  Presentation,
  ServiceContent,
  SpaceContent,
  StatContent,
  StoryContent,
  TestimonialContent,
  WorkflowStep,
} from "@/lib/dashboard-data";

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
  saveLanding: (id: string) => void;
  publishLanding: (id: string) => void;
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

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      activeView: "landings",
      activeWorkspaceTab: "Structure",
      activeContentGroup: "Pages",
      activeEditorTab: "Hero",
      activeLandingId: initialLandings[0].id,
      activePostId: initialPosts[0].id,
      activePresentationId: initialPresentations[0].id,
      activeAssetId: initialAssets[0].id,
      activeSettingCategory: "General",
      activeSettingPage: "Project Info",
      landings: initialLandings,
      posts: initialPosts,
      presentations: initialPresentations,
      assets: initialAssets,
      setActiveView: (activeView) => set({ activeView }),
      setActiveWorkspaceTab: (activeWorkspaceTab) => set({ activeWorkspaceTab }),
      setActiveContentGroup: (activeContentGroup) => set({ activeContentGroup }),
      setActiveEditorTab: (activeEditorTab) => set({ activeEditorTab }),
      setActiveLandingId: (activeLandingId) =>
        set({
          activeLandingId,
          activeView: "landings",
          activeContentGroup: "Pages",
        }),
      setActivePostId: (activePostId) =>
        set({ activePostId, activeContentGroup: "Posts" }),
      setActivePresentationId: (activePresentationId) =>
        set({ activePresentationId, activeContentGroup: "Presentations" }),
      setActiveAssetId: (activeAssetId) => set({ activeAssetId }),
      setActiveSettingCategory: (activeSettingCategory) =>
        set({ activeSettingCategory }),
      setActiveSettingPage: (activeSettingPage) => set({ activeSettingPage }),
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
              content: {
                ...landing.content,
                hero: { ...landing.content.hero, ...patch },
              },
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
              content: {
                ...landing.content,
                story: { ...landing.content.story, ...patch },
              },
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
                  testimonial.id === testimonialId
                    ? { ...testimonial, ...patch }
                    : testimonial,
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
          ? {
              ...post,
              ...patch,
              status: post.status === "Published" ? "Changes" : post.status,
              edited: "Unsaved changes",
            }
          : post,
      ),
    })),
      updatePresentation: (presentationId, patch) =>
        set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === presentationId
          ? {
              ...presentation,
              ...patch,
              status:
                presentation.status === "Published"
                  ? "Changes"
                  : presentation.status,
            }
          : presentation,
      ),
    })),
      updatePresentationSlide: (presentationId, slideId, patch) =>
        set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === presentationId
          ? {
              ...presentation,
              status:
                presentation.status === "Published"
                  ? "Changes"
                  : presentation.status,
              slides: presentation.slides.map((slide) =>
                slide.id === slideId ? { ...slide, ...patch } : slide,
              ),
            }
          : presentation,
      ),
        })),
      saveLanding: (id) =>
        set((state) => ({
          landings: state.landings.map((landing) =>
            landing.id === id
              ? { ...landing, status: "Draft", edited: "Saved just now" }
              : landing,
          ),
        })),
      publishLanding: (id) =>
        set((state) => ({
          landings: state.landings.map((landing) =>
            landing.id === id
              ? { ...landing, status: "Published", edited: "Published just now" }
              : landing,
          ),
        })),
      savePost: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, status: "Draft", edited: "Saved just now" }
              : post,
          ),
        })),
      publishPost: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, status: "Published", edited: "Published just now" }
              : post,
          ),
        })),
      savePresentation: (id) =>
        set((state) => ({
          presentations: state.presentations.map((presentation) =>
            presentation.id === id
              ? { ...presentation, status: "Draft" }
              : presentation,
          ),
        })),
      publishPresentation: (id) =>
        set((state) => ({
          presentations: state.presentations.map((presentation) =>
            presentation.id === id
              ? { ...presentation, status: "Published" }
              : presentation,
          ),
        })),
    }),
    {
      name: "landora-dashboard",
      partialize: (state) => ({
        activeLandingId: state.activeLandingId,
        activePostId: state.activePostId,
        activePresentationId: state.activePresentationId,
        activeAssetId: state.activeAssetId,
        landings: state.landings,
        posts: state.posts,
        presentations: state.presentations,
        assets: state.assets,
      }),
    },
  ),
);
