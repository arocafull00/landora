"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteMenuCategorySection } from "@/components/templates/ristorante/menu-page/ristorante-menu-category-section";
import { RistoranteMenuEmptyState } from "@/components/templates/ristorante/menu-page/ristorante-menu-empty-state";
import { RistoranteMenuToolbar } from "@/components/templates/ristorante/menu-page/ristorante-menu-toolbar";
import { useRistoranteMenu } from "@/components/templates/ristorante/menu-page/hooks/use-ristorante-menu";

export function RistoranteMenuSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  const {
    activeCategory,
    categories,
    hasResults,
    search,
    setActiveCategory,
    setSearch,
    visibleGroups,
  } = useRistoranteMenu(items);

  if (items.length === 0) return null;

  return (
    <section
      className="relative scroll-mt-24 px-3 pb-24 pt-5 sm:px-6 sm:pb-28 lg:px-10"
      id="carta"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[var(--ristorante-accent)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-[38rem] h-80 w-80 rounded-full bg-[var(--ristorante-primary)]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px]">
        <RistoranteMenuToolbar
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearch}
          search={search}
        />

        <div className="space-y-16 pt-16 sm:space-y-20 sm:pt-20">
          {hasResults ? (
            visibleGroups.map((group) => (
              <RistoranteMenuCategorySection
                group={group}
                key={group.category}
              />
            ))
          ) : (
            <RistoranteMenuEmptyState />
          )}
        </div>
      </div>
    </section>
  );
}
