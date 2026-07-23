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
  BrandLogoType,
  ContactContent,
  ContentGroup,
  EditorPageTarget,
  HeroContent,
  HeroVariantId,
  initialAssets,
  initialPresentations,
  Landing,
  LandingAppearance,
  LandingContent,
  Offer,
  PortfolioAboutPageContent,
  Presentation,
  SectionHeading,
  ServiceContent,
  SitePageId,
  SpaceContent,
  StatContent,
  StoryContent,
  TemplateId,
  TestimonialContent,
  WorkflowStep,
} from "@/lib/dashboard-data";
import { saveLandingAction } from "@/app/actions/landing-save";
import { getDefaultContent } from "@/lib/default-content";
import { getVisibleEditorTabs } from "@/lib/template-registry";
import {
  getAboutNavHref,
  getSectionByAnchor,
  getSectionScrollHref,
  getOrderedRemovableSectionAnchors,
  isPortfolioAboutNavHref,
  restoreNavItem,
  syncPortfolioAboutNavHrefs,
} from "@/lib/template-sections";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export type DashboardState = {
  activeWorkspaceTab: string;
  activeContentGroup: ContentGroup;
  activeEditorTab: string;
  activePageTarget: EditorPageTarget;
  activeLandingId: string;
  activePresentationId: string;
  activeAssetId: string;
  saveStatus: SaveStatus;
  isAdmin: boolean;
  bookingModuleEnabled: boolean;
  _bootstrapKey: string;
  landings: Landing[];
  presentations: Presentation[];
  assets: Asset[];
  bootstrapDashboard: (params: {
    landing: Landing;
    isAdmin: boolean;
    bookingModuleEnabled: boolean;
  }) => void;
  setActiveWorkspaceTab: (tab: string) => void;
  setActiveContentGroup: (group: ContentGroup) => void;
  setActiveEditorTab: (tab: string) => void;
  setActivePageTarget: (target: EditorPageTarget) => void;
  setActiveLandingId: (id: string) => void;
  setActivePresentationId: (id: string) => void;
  setActiveAssetId: (id: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  initFromLanding: (landing: Landing) => void;
  updateLandingMeta: (id: string, patch: Partial<Landing>) => void;
  updateHero: (id: string, patch: Partial<HeroContent>) => void;
  updateHeroVariant: (id: string, variantId: HeroVariantId) => void;
  updateStory: (id: string, patch: Partial<StoryContent>) => void;
  updatePortfolioAbout: (
    id: string,
    patch: Partial<PortfolioAboutPageContent>,
  ) => void;
  addSitePage: (landingId: string, pageId: SitePageId) => void;
  removeSitePage: (landingId: string, pageId: SitePageId) => void;
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
  moveNavItem: (landingId: string, navId: string, direction: -1 | 1) => void;
  updateSectionHeading: (landingId: string, anchor: string, patch: Partial<SectionHeading>) => void;
  hideSection: (landingId: string, anchor: string) => Promise<void>;
  restoreSection: (landingId: string, anchor: string) => Promise<void>;
  moveSection: (landingId: string, anchor: string, direction: -1 | 1) => Promise<void>;
  updatePresentation: (presentationId: string, patch: Partial<Presentation>) => void;
  updatePresentationSlide: (presentationId: string, slideId: string, patch: Partial<Presentation["slides"][number]>) => void;
  saveLanding: (id: string) => Promise<void>;
  publishLanding: (id: string) => Promise<void>;
  savePresentation: (id: string) => void;
  publishPresentation: (id: string) => void;
};

const markEdited = (landing: Landing): Landing => ({
  ...landing,
  status: landing.status === "Published" ? "Changes" : landing.status,
  edited: "Unsaved changes",
});

async function persistLanding(
  landing: Landing,
  mode: "draft" | "publish",
) {
  const result = await saveLandingAction({
    landingId: landing.id,
    mode,
    meta: {
      name: landing.name,
      slug: landing.slug,
      seoTitle: landing.seoTitle,
      seoDescription: landing.seoDescription,
      seoFavicon: landing.seoFavicon,
    },
    content: landing.content,
    appearance: landing.content.appearance,
    heroVariant: landing.sectionSelections.hero,
  });

  if ("error" in result) throw new Error(result.error);
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

function createDashboardStore(initial?: {
  landing: Landing;
  isAdmin: boolean;
  bookingModuleEnabled: boolean;
}) {
  const initialLanding = initial?.landing;

  return createStore<DashboardState>()((set, get) => ({
  activeWorkspaceTab: "Structure",
  activeContentGroup: "Pages",
  activeEditorTab: "Hero",
  activePageTarget: { type: "home" },
  activeLandingId: initialLanding?.id ?? "",
  activePresentationId: initialPresentations[0].id,
  activeAssetId: initialAssets[0].id,
  saveStatus: "idle",
  isAdmin: initial?.isAdmin ?? false,
  bookingModuleEnabled: initial?.bookingModuleEnabled ?? false,
  _bootstrapKey: initialLanding
    ? `${initialLanding.id}:${initial?.isAdmin ?? false}:${initial?.bookingModuleEnabled ?? false}`
    : "",
  landings: initialLanding ? [initialLanding] : [],
  presentations: initialPresentations,
  assets: initialAssets,

  bootstrapDashboard: ({ landing, isAdmin, bookingModuleEnabled }) => {
    const key = `${landing.id}:${isAdmin}:${bookingModuleEnabled}`;
    if (get()._bootstrapKey === key) return;

    if (get().activeLandingId !== landing.id) {
      get().initFromLanding(landing);
    }

    set({ isAdmin, bookingModuleEnabled, _bootstrapKey: key });
  },

  setActiveWorkspaceTab: (activeWorkspaceTab) => set({ activeWorkspaceTab }),
  setActiveContentGroup: (activeContentGroup) => set({ activeContentGroup }),
  setActiveEditorTab: (activeEditorTab) => set({ activeEditorTab }),
  setActivePageTarget: (activePageTarget) => set({ activePageTarget }),
  setActiveLandingId: (activeLandingId) =>
    set({
      activeLandingId,
      activeContentGroup: "Pages",
      activePageTarget: { type: "home" },
    }),
  setActivePresentationId: (activePresentationId) =>
    set({ activePresentationId, activeContentGroup: "Presentations" }),
  setActiveAssetId: (activeAssetId) => set({ activeAssetId }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),

  initFromLanding: (landing) =>
    set({
      landings: [landing],
      activeLandingId: landing.id,
      activePageTarget: { type: "home" },
    }),

  updateLandingMeta: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) => {
        if (landing.id !== id) return landing;

        const next = { ...landing, ...patch };
        if (
          typeof patch.slug === "string" &&
          patch.slug !== landing.slug &&
          landing.template === "portfolio"
        ) {
          next.content = {
            ...landing.content,
            nav: syncPortfolioAboutNavHrefs(landing.content.nav, patch.slug),
          };
        }

        return markEdited(next);
      }),
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
        landing.id === id ? (() => {
          const story = { statement: "", ...landing.content.story, ...patch };
          return markEdited({
            ...landing,
            content: { ...landing.content, story, about: story },
          });
        })() : landing,
      ),
    })),

  updatePortfolioAbout: (id, patch) =>
    set((state) => ({
      landings: state.landings.map((landing) =>
        landing.id === id
          ? markEdited({
              ...landing,
              content: {
                ...landing.content,
                aboutPage: {
                  title: "",
                  intro: "",
                  image: "",
                  storyTitle: "Mi historia",
                  storyBody: "",
                  storyImage: "",
                  ...landing.content.aboutPage,
                  ...patch,
                },
              },
            })
          : landing,
      ),
    })),

  addSitePage: (landingId, pageId) => {
    const landing = get().landings.find((item) => item.id === landingId);
    if (
      !landing ||
      landing.template !== "portfolio" ||
      pageId !== "about" ||
      landing.content.enabledPages.includes(pageId)
    ) {
      return;
    }

    const aboutHref = getAboutNavHref(landing.slug);
    const hasAboutNav = landing.content.nav.some((item) =>
      isPortfolioAboutNavHref(item.href),
    );

    set((state) => ({
      activePageTarget: { type: pageId },
      landings: state.landings.map((item) =>
        item.id === landingId
          ? markEdited({
              ...item,
              content: {
                ...item.content,
                enabledPages: [...item.content.enabledPages, pageId],
                nav: hasAboutNav
                  ? syncPortfolioAboutNavHrefs(item.content.nav, item.slug)
                  : [
                      {
                        id: crypto.randomUUID(),
                        label: "About me",
                        href: aboutHref,
                      },
                      ...item.content.nav,
                    ],
              },
            })
          : item,
      ),
    }));
    toast.success("Página About me añadida");
  },

  removeSitePage: (landingId, pageId) => {
    if (pageId === "home") return;

    set((state) => ({
      activePageTarget:
        state.activePageTarget.type === pageId
          ? { type: "home" }
          : state.activePageTarget,
      landings: state.landings.map((landing) => {
        if (landing.id !== landingId) return landing;

        return markEdited({
          ...landing,
          content: {
            ...landing.content,
            enabledPages: landing.content.enabledPages.filter(
              (enabledPage) => enabledPage !== pageId,
            ),
            nav:
              pageId === "about"
                ? landing.content.nav.filter(
                    (item) => !isPortfolioAboutNavHref(item.href),
                  )
                : landing.content.nav,
          },
        });
      }),
    }));
    toast.success("Página About me quitada");
  },

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

  moveNavItem: (landingId, navId, direction) =>
    set((state) => ({
      landings: state.landings.map((landing) => {
        if (landing.id !== landingId) return landing;

        const nav = landing.content.nav;
        const index = nav.findIndex((item) => item.id === navId);
        if (index === -1) return landing;

        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= nav.length) return landing;

        const nextNav = [...nav];
        [nextNav[index], nextNav[nextIndex]] = [nextNav[nextIndex], nextNav[index]];

        return markEdited({
          ...landing,
          content: {
            ...landing.content,
            nav: nextNav,
          },
        });
      }),
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

    const visibleTabs = getVisibleEditorTabs(
      landing.template,
      hiddenSections,
      get().isAdmin,
      get().bookingModuleEnabled,
    );
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
      await persistLanding({ ...landing, content: nextContent }, "draft");
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
      await persistLanding({ ...landing, content: nextContent }, "draft");
    } catch {
      toast.error("No se pudo restaurar la sección");
    }
  },

  moveSection: async (landingId, anchor, direction) => {
    const landing = get().landings.find((item) => item.id === landingId);
    if (!landing) return;

    const section = getSectionByAnchor(landing.template, anchor);
    if (!section || section.required) return;

    const anchors = getOrderedRemovableSectionAnchors(
      landing.template,
      landing.content.sectionOrder,
    );
    const hidden = new Set(landing.content.hiddenSections ?? []);
    const visibleAnchors = anchors.filter((item) => !hidden.has(item));
    const visibleIndex = visibleAnchors.indexOf(anchor);
    if (visibleIndex === -1) return;

    const nextVisibleIndex = visibleIndex + direction;
    if (nextVisibleIndex < 0 || nextVisibleIndex >= visibleAnchors.length) return;

    const swapAnchor = visibleAnchors[nextVisibleIndex];
    const indexA = anchors.indexOf(anchor);
    const indexB = anchors.indexOf(swapAnchor);
    if (indexA === -1 || indexB === -1) return;

    const nextAnchors = [...anchors];
    [nextAnchors[indexA], nextAnchors[indexB]] = [nextAnchors[indexB], nextAnchors[indexA]];

    const nextContent = {
      ...landing.content,
      sectionOrder: nextAnchors,
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
      await persistLanding({ ...landing, content: nextContent }, "draft");
    } catch {
      toast.error("No se pudo reordenar la sección");
    }
  },

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
      await persistLanding(landing, "draft");
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
      await persistLanding(landing, "publish");
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
  bookingModuleEnabled,
  landing,
}: {
  children: ReactNode;
  isAdmin: boolean;
  bookingModuleEnabled: boolean;
  landing: Landing;
}) {
  const [store] = useState(() =>
    createDashboardStore({ landing, isAdmin, bookingModuleEnabled }),
  );

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
