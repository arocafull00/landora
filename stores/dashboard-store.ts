"use client";

import {
  createContext,
  createElement,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createStore, useStore } from "zustand";
import { toast } from "react-toastify";
import {
  Asset,
  BlogConfig,
  BrandLogoType,
  ContactContent,
  ContentGroup,
  HeroContent,
  HeroVariantId,
  initialAssets,
  initialPosts,
  initialPresentations,
  Landing,
  LandingAppearance,
  LandingContent,
  Offer,
  Post,
  Presentation,
  SectionHeading,
  ServiceContent,
  SpaceContent,
  StatContent,
  StoryContent,
  TemplateId,
  TestimonialContent,
  WorkflowStep,
} from "@/lib/dashboard-data";
import { saveLandingAppearanceAction } from "@/app/actions/landing-appearance";
import { updateLandingSectionSelection } from "@/app/actions/landing-section-selections";
import { getDefaultContent } from "@/lib/default-content";
import { getVisibleEditorTabs } from "@/lib/template-registry";
import {
  getSectionByAnchor,
  getSectionScrollHref,
  restoreNavItem,
} from "@/lib/template-sections";
import { formatBlogDate } from "@/lib/blog-slug";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type BlogPostApi = {
  id: string;
  landingId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  heroImage: string;
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

function mapPostFromApi(row: BlogPostApi): Post {
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

export type DashboardState = {
  activeWorkspaceTab: string;
  activeContentGroup: ContentGroup;
  activeEditorTab: string;
  activeLandingId: string;
  activePostId: string;
  activePresentationId: string;
  activeAssetId: string;
  saveStatus: SaveStatus;
  isAdmin: boolean;
  _bootstrapKey: string;
  landings: Landing[];
  posts: Post[];
  blogConfig: BlogConfig;
  blogPostsLoaded: boolean;
  blogPostsLandingId: string;
  blogConfigLoaded: boolean;
  blogConfigLandingId: string;
  presentations: Presentation[];
  assets: Asset[];
  bootstrapDashboard: (params: {
    landing: Landing;
    isAdmin: boolean;
  }) => void;
  setActiveWorkspaceTab: (tab: string) => void;
  setActiveContentGroup: (group: ContentGroup) => void;
  setActiveEditorTab: (tab: string) => void;
  setActiveLandingId: (id: string) => void;
  setActivePostId: (id: string) => void;
  setActivePresentationId: (id: string) => void;
  setActiveAssetId: (id: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setBlogConfig: (blogConfig: BlogConfig) => void;
  initFromLanding: (landing: Landing) => void;
  updateLandingMeta: (id: string, patch: Partial<Landing>) => void;
  updateHero: (id: string, patch: Partial<HeroContent>) => void;
  updateHeroVariant: (id: string, variantId: HeroVariantId) => void;
  updateStory: (id: string, patch: Partial<StoryContent>) => void;
  updateStat: (landingId: string, statId: string, patch: Partial<StatContent>) => void;
  updateSpace: (landingId: string, spaceId: string, patch: Partial<SpaceContent>) => void;
  updateService: (landingId: string, serviceId: string, patch: Partial<ServiceContent>) => void;
  updateWorkflowStep: (landingId: string, stepId: string, patch: Partial<WorkflowStep>) => void;
  updateTestimonial: (landingId: string, testimonialId: string, patch: Partial<TestimonialContent>) => void;
  updateSection: (landingId: string, section: string, data: unknown) => void;
  updateSectionItem: (landingId: string, section: string, itemId: string, patch: Record<string, unknown>) => void;
  addOffer: (landingId: string, offer: Offer) => void;
  removeOffer: (landingId: string, offerId: string) => void;
  updateOffer: (landingId: string, offerId: string, patch: Partial<Offer>) => void;
  updateContact: (id: string, patch: Partial<ContactContent>) => void;
  updateBranding: (
    id: string,
    patch: Partial<{ brand: string; brandLogoType: BrandLogoType; brandLogoImage: string }>,
  ) => void;
  updateAppearance: (id: string, patch: Partial<LandingAppearance>) => void;
  updateNavItem: (
    landingId: string,
    navId: string,
    patch: Partial<Pick<LandingContent["nav"][number], "label" | "href">>,
  ) => void;
  addNavItem: (landingId: string, item: LandingContent["nav"][number]) => void;
  removeNavItem: (landingId: string, navId: string) => void;
  updateSectionHeading: (landingId: string, anchor: string, patch: Partial<SectionHeading>) => void;
  hideSection: (landingId: string, anchor: string) => Promise<void>;
  restoreSection: (landingId: string, anchor: string) => Promise<void>;
  updatePost: (postId: string, patch: Partial<Post>) => void;
  updatePresentation: (presentationId: string, patch: Partial<Presentation>) => void;
  updatePresentationSlide: (presentationId: string, slideId: string, patch: Partial<Presentation["slides"][number]>) => void;
  loadBlogPosts: (landingId: string) => Promise<void>;
  ensureBlogPostsLoaded: () => Promise<void>;
  loadBlogConfig: (landingId: string) => Promise<void>;
  ensureBlogConfigLoaded: () => Promise<void>;
  createPost: (landingId: string, data?: Partial<Pick<Post, "title">>) => Promise<Post | null>;
  updateBlogConfig: (landingId: string, patch: Partial<BlogConfig>) => Promise<void>;
  saveLanding: (id: string) => Promise<void>;
  publishLanding: (id: string) => Promise<void>;
  savePost: (id: string) => Promise<void>;
  publishPost: (id: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
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
    patchSection(`${base}/branding`, {
      brand: content.brand,
      brandLogoType: content.brandLogoType ?? "text",
      brandLogoImage: content.brandLogoImage ?? "",
      sectionHeadings: content.sectionHeadings ?? {},
      hiddenSections: content.hiddenSections ?? [],
    }),
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
  if (content.workHistory) calls.push(patchSection(`${base}/work-history`, { items: content.workHistory }));
  if (content.offers) calls.push(patchSection(`${base}/offers`, { items: content.offers }));

  await Promise.all(calls);
}

async function persistSectionVisibility(id: string, content: LandingContent) {
  const base = `/api/landings/${id}`;

  await Promise.all([
    patchSection(`${base}/branding`, {
      brand: content.brand,
      brandLogoType: content.brandLogoType ?? "text",
      brandLogoImage: content.brandLogoImage ?? "",
      sectionHeadings: content.sectionHeadings ?? {},
      hiddenSections: content.hiddenSections ?? [],
    }),
    patchSection(`${base}/nav`, { items: content.nav }),
  ]);
}

async function persistLandingMeta(id: string, landing: Landing) {
  await patchSection(`/api/landings/${id}`, {
    name: landing.name,
    slug: landing.slug,
    seoTitle: landing.seoTitle,
    seoDescription: landing.seoDescription,
    seoFavicon: landing.seoFavicon,
  });
}

async function persistLandingAppearance(id: string, appearance: LandingAppearance) {
  const result = await saveLandingAppearanceAction({
    landingId: id,
    paletteId: appearance.paletteId,
    typographyId: appearance.typographyId,
  });

  if ("error" in result) {
    throw new Error(result.error);
  }
}

async function persistLandingSectionSelections(landing: Landing) {
  const result = await updateLandingSectionSelection({
    landingId: landing.id,
    sectionKey: "hero",
    variantId: landing.sectionSelections.hero,
  });

  if ("error" in result) {
    throw new Error(result.error);
  }
}

function migrateHeroContent(hero: HeroContent): HeroContent {
  const image = hero.image;
  const fanImages = Array.from({ length: 5 }, (_, index) => {
    return hero.fanImages?.[index] || image;
  });

  return {
    ...hero,
    houseImage: hero.houseImage || image,
    fanImages,
  };
}

function createDashboardStore(initial?: { landing: Landing; isAdmin: boolean }) {
  const initialLanding = initial?.landing;

  return createStore<DashboardState>()((set, get) => ({
  activeWorkspaceTab: "Structure",
  activeContentGroup: "Pages",
  activeEditorTab: "Hero",
  activeLandingId: initialLanding?.id ?? "",
  activePostId: "",
  activePresentationId: initialPresentations[0].id,
  activeAssetId: initialAssets[0].id,
  saveStatus: "idle",
  isAdmin: initial?.isAdmin ?? false,
  _bootstrapKey: initialLanding
    ? `${initialLanding.id}:${initial?.isAdmin ?? false}`
    : "",
  landings: initialLanding ? [initialLanding] : [],
  posts: initialLanding ? [] : initialPosts,
  blogConfig: { title: "", description: "" },
  blogPostsLoaded: false,
  blogPostsLandingId: "",
  blogConfigLoaded: false,
  blogConfigLandingId: "",
  presentations: initialPresentations,
  assets: initialAssets,

  bootstrapDashboard: ({ landing, isAdmin }) => {
    const key = `${landing.id}:${isAdmin}`;
    if (get()._bootstrapKey === key) return;

    if (get().activeLandingId !== landing.id) {
      get().initFromLanding(landing);
    }

    set({ isAdmin, _bootstrapKey: key });
  },

  setActiveWorkspaceTab: (activeWorkspaceTab) => set({ activeWorkspaceTab }),
  setActiveContentGroup: (activeContentGroup) => set({ activeContentGroup }),
  setActiveEditorTab: (activeEditorTab) => {
    set({ activeEditorTab });

    if (activeEditorTab === "Blog") {
      void get().ensureBlogConfigLoaded();
    }
  },
  setActiveLandingId: (activeLandingId) =>
    set({ activeLandingId, activeContentGroup: "Pages" }),
  setActivePostId: (activePostId) =>
    set({ activePostId, activeContentGroup: "Posts" }),
  setActivePresentationId: (activePresentationId) =>
    set({ activePresentationId, activeContentGroup: "Presentations" }),
  setActiveAssetId: (activeAssetId) => set({ activeAssetId }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setBlogConfig: (blogConfig) => set({ blogConfig }),

  initFromLanding: (landing) =>
    set({
      landings: [landing],
      activeLandingId: landing.id,
      blogPostsLoaded: false,
      blogPostsLandingId: "",
      blogConfigLoaded: false,
      blogConfigLandingId: "",
      posts: [],
      blogConfig: { title: "", description: "" },
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

  updateHeroVariant: (id, variantId) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              sectionSelections: {
                ...landing.sectionSelections,
                hero: variantId,
              },
              content: {
                ...landing.content,
                hero: migrateHeroContent(landing.content.hero),
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
              content: { ...landing.content, story: { statement: "", ...landing.content.story, ...patch } },
            })
          : landing,
      ),
    })),

  updateContact: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: { ...landing.content, contact: { ...landing.content.contact, ...patch } },
            })
          : landing,
      ),
    })),

  updateBranding: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: { ...landing.content, ...patch },
            })
          : landing,
      ),
    })),

  updateAppearance: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                appearance: { ...landing.content.appearance, ...patch },
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

  addOffer: (landingId, offer) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                offers: [...(landing.content.offers ?? []), offer],
              },
            })
          : landing,
      ),
    })),

  removeOffer: (landingId, offerId) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                offers: (landing.content.offers ?? []).filter((offer) => offer.id !== offerId),
              },
            })
          : landing,
      ),
    })),

  updateOffer: (landingId, offerId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                offers: (landing.content.offers ?? []).map((offer) =>
                  offer.id === offerId ? ({ ...offer, ...patch } as Offer) : offer,
                ),
              },
            })
          : landing,
      ),
    })),

  updateNavItem: (landingId, navId, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                nav: landing.content.nav.map((item) =>
                  item.id === navId ? { ...item, ...patch } : item,
                ),
              },
            })
          : landing,
      ),
    })),

  addNavItem: (landingId, item) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                nav: [...landing.content.nav, item],
              },
            })
          : landing,
      ),
    })),

  removeNavItem: (landingId, navId) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                nav: landing.content.nav.filter((item) => item.id !== navId),
              },
            })
          : landing,
      ),
    })),

  updateSectionHeading: (landingId, anchor, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === landingId
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                sectionHeadings: {
                  ...landing.content.sectionHeadings,
                  [anchor]: {
                    title:
                      patch.title !== undefined
                        ? patch.title
                        : (landing.content.sectionHeadings?.[anchor]?.title ?? ""),
                    subtitle:
                      patch.subtitle !== undefined
                        ? patch.subtitle
                        : (landing.content.sectionHeadings?.[anchor]?.subtitle ?? ""),
                  },
                },
              },
            })
          : landing,
      ),
    })),

  hideSection: async (landingId, anchor) => {
    const landing = get().landings.find((item) => item.id === landingId);
    if (!landing) return;

    const section = getSectionByAnchor(landing.template, anchor);
    if (!section || section.required) return;

    const hiddenSections = [...(landing.content.hiddenSections ?? [])];
    if (hiddenSections.includes(anchor)) return;
    hiddenSections.push(anchor);

    let nav = landing.content.nav;
    const sectionHref = getSectionScrollHref(section);
    nav = nav.filter((item) => item.href !== sectionHref);

    const visibleTabs = getVisibleEditorTabs(landing.template, hiddenSections);
    const activeTabVisible = visibleTabs.some((tab) => tab.id === get().activeEditorTab);
    const nextTab = activeTabVisible ? get().activeEditorTab : "Hero";
    const nextContent = {
      ...landing.content,
      hiddenSections,
      nav,
    };

    set((state) => ({
      activeEditorTab: nextTab,
      landings: state.landings.map((item) =>
        item.id === landingId
          ? markEdited({
              ...item,
              content: nextContent,
            })
          : item,
      ),
    }));

    try {
      await persistSectionVisibility(landingId, nextContent);
    } catch {
      toast.error("No se pudo ocultar la sección");
    }
  },

  restoreSection: async (landingId, anchor) => {
    const landing = get().landings.find((item) => item.id === landingId);
    if (!landing) return;

    const section = getSectionByAnchor(landing.template, anchor);
    if (!section || section.required) return;

    const hiddenSections = (landing.content.hiddenSections ?? []).filter((item) => item !== anchor);
    let nav = landing.content.nav;
    const sectionHref = getSectionScrollHref(section);
    const defaults = getDefaultContent(landing.template as TemplateId);
    nav = restoreNavItem(nav, defaults.nav, sectionHref);

    const nextContent = {
      ...landing.content,
      hiddenSections,
      nav,
    };

    set((state) => ({
      landings: state.landings.map((item) =>
        item.id === landingId
          ? markEdited({
              ...item,
              content: nextContent,
            })
          : item,
      ),
    }));

    try {
      await persistSectionVisibility(landingId, nextContent);
    } catch {
      toast.error("No se pudo restaurar la sección");
    }
  },

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
      await persistLandingMeta(id, landing);
      await Promise.all([
        persistAllSections(id, landing.content),
        persistLandingAppearance(id, landing.content.appearance),
        persistLandingSectionSelections(landing),
      ]);
      set((state) => ({
        saveStatus: "saved",
        landings: state.landings.map((l) =>
          l.id === id ? { ...l, status: "Draft", edited: "Saved just now" } : l,
        ),
      }));
      toast.success("Cambios guardados");
    } catch {
      set({ saveStatus: "error" });
      toast.error("No se pudieron guardar los cambios");
    }
  },

  publishLanding: async (id) => {
    const landing = get().landings.find((l) => l.id === id);
    if (!landing) return;

    set({ saveStatus: "saving" });

    try {
      await Promise.all([
        persistLandingMeta(id, landing),
        persistAllSections(id, landing.content),
        persistLandingAppearance(id, landing.content.appearance),
        persistLandingSectionSelections(landing),
      ]);
      await patchSection(`/api/landings/${id}`, { published: true });
      set((state) => ({
        saveStatus: "saved",
        landings: state.landings.map((l) =>
          l.id === id ? { ...l, status: "Published", edited: "Published just now" } : l,
        ),
      }));
      toast.success("Landing publicada");
    } catch {
      set({ saveStatus: "error" });
      toast.error("No se pudo publicar la landing");
    }
  },

  savePost: async (id) => {
    const post = get().posts.find((item) => item.id === id);
    if (!post) return;

    try {
      const res = await fetch(`/api/landings/${post.landingId}/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          heroImage: post.heroImage,
          published: false,
        }),
      });

      if (!res.ok) throw new Error("save failed");

      const row = (await res.json()) as BlogPostApi;
      const mapped = mapPostFromApi(row);

      set((state) => ({
        posts: state.posts.map((item) => (item.id === id ? mapped : item)),
      }));
      toast.success("Borrador guardado");
    } catch {
      toast.error("No se pudo guardar el post");
    }
  },

  publishPost: async (id) => {
    const post = get().posts.find((item) => item.id === id);
    if (!post) return;

    try {
      const res = await fetch(`/api/landings/${post.landingId}/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          heroImage: post.heroImage,
          published: true,
        }),
      });

      if (!res.ok) throw new Error("publish failed");

      const row = (await res.json()) as BlogPostApi;
      const mapped = mapPostFromApi(row);

      set((state) => ({
        posts: state.posts.map((item) => (item.id === id ? mapped : item)),
      }));
      toast.success("Post publicado");
    } catch {
      toast.error("No se pudo publicar el post");
    }
  },

  deletePost: async (id) => {
    const post = get().posts.find((item) => item.id === id);
    if (!post) return;

    try {
      const res = await fetch(`/api/landings/${post.landingId}/blog/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("delete failed");

      set((state) => ({
        posts: state.posts.filter((item) => item.id !== id),
        activePostId: state.activePostId === id ? "" : state.activePostId,
      }));
      toast.success("Post eliminado");
    } catch {
      toast.error("No se pudo eliminar el post");
    }
  },

  loadBlogPosts: async (landingId) => {
    set({ blogPostsLoaded: false });

    try {
      const res = await fetch(`/api/landings/${landingId}/blog`);
      if (!res.ok) throw new Error("load failed");

      const rows = (await res.json()) as BlogPostApi[];
      const posts = rows.map(mapPostFromApi);
      const { activePostId } = get();
      const resolvedActivePostId =
        activePostId && posts.some((post) => post.id === activePostId)
          ? activePostId
          : (posts[0]?.id ?? "");

      set({
        posts,
        blogPostsLoaded: true,
        blogPostsLandingId: landingId,
        activePostId: resolvedActivePostId,
      });
    } catch {
      toast.error("No se pudieron cargar los posts");
    }
  },

  ensureBlogPostsLoaded: async () => {
    const { activeLandingId, landings, blogPostsLoaded, blogPostsLandingId } = get();
    const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];
    if (!landing) return;

    if (blogPostsLoaded && blogPostsLandingId === landing.id) return;

    await get().loadBlogPosts(landing.id);
  },

  ensureBlogConfigLoaded: async () => {
    const { activeLandingId, landings, blogConfigLoaded, blogConfigLandingId } = get();
    const landing = landings.find((item) => item.id === activeLandingId) ?? landings[0];
    if (!landing) return;

    if (blogConfigLoaded && blogConfigLandingId === landing.id) return;

    await get().loadBlogConfig(landing.id);
  },

  loadBlogConfig: async (landingId) => {
    try {
      const res = await fetch(`/api/landings/${landingId}/blog/config`);
      if (!res.ok) throw new Error("load failed");

      const config = (await res.json()) as BlogConfig;

      set({
        blogConfig: {
          title: config.title ?? "",
          description: config.description ?? "",
        },
        blogConfigLoaded: true,
        blogConfigLandingId: landingId,
      });
    } catch {
      toast.error("No se pudo cargar la configuración del blog");
    }
  },

  createPost: async (landingId, data) => {
    try {
      const res = await fetch(`/api/landings/${landingId}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data?.title ?? "Nuevo post" }),
      });

      if (!res.ok) throw new Error("create failed");

      const row = (await res.json()) as BlogPostApi;
      const mapped = mapPostFromApi(row);

      set((state) => ({
        posts: [mapped, ...state.posts],
        activePostId: mapped.id,
        blogPostsLoaded: true,
        blogPostsLandingId: landingId,
      }));

      return mapped;
    } catch {
      toast.error("No se pudo crear el post");
      return null;
    }
  },

  updateBlogConfig: async (landingId, patch) => {
    const nextConfig = {
      ...get().blogConfig,
      ...patch,
    };

    set({ blogConfig: nextConfig });

    try {
      const res = await fetch(`/api/landings/${landingId}/blog/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextConfig),
      });

      if (!res.ok) throw new Error("config failed");
    } catch {
      toast.error("No se pudo guardar la configuración del blog");
    }
  },

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
}

type DashboardStore = ReturnType<typeof createDashboardStore>;

const DashboardStoreContext = createContext<DashboardStore | null>(null);

export function DashboardStoreProvider({
  children,
  isAdmin,
  landing,
}: {
  children: ReactNode;
  isAdmin: boolean;
  landing: Landing;
}) {
  const [store] = useState(() => createDashboardStore({ landing, isAdmin }));

  return createElement(
    DashboardStoreContext.Provider,
    { value: store },
    children,
  );
}

export function useDashboardStore(): DashboardState;
export function useDashboardStore<T>(selector: (state: DashboardState) => T): T;
export function useDashboardStore<T = DashboardState>(
  selector?: (state: DashboardState) => T,
): T {
  const store = useContext(DashboardStoreContext);
  if (!store) {
    throw new Error("useDashboardStore must be used within DashboardStoreProvider");
  }

  const resolvedSelector =
    selector ?? ((state: DashboardState) => state as unknown as T);

  return useStore(store, resolvedSelector);
}
