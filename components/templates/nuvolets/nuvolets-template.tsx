import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import type { CSSProperties } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getOrderedTemplateSections, getVisibleNav } from "@/lib/template-sections";
import { NuvoletsNav } from "./components/nuvolets-nav";
import { NuvoletsSection } from "./components/nuvolets-section";
import { NuvoletsFooter } from "./components/nuvolets-footer";
import { NuvoletsMotion } from "./components/nuvolets-motion";
import { syncCompanyContent } from "@/lib/company-details";

export function NuvoletsTemplate({ content, copyrightYear, slug, previewLandingId, topOffset = 0, sectionSelections }: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  slug?: string;
  previewLandingId?: string;
  topOffset?: number;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const config = syncCompanyContent(content).nuvolets;
  if (!config) return null;
  const hidden = new Set(content.hiddenSections);
  const sections = getOrderedTemplateSections("nuvolets", content.sectionOrder).filter((section) => section.anchor !== "contacto" && !hidden.has(section.anchor));
  const customColors = config.colors.enabled ? Object.fromEntries(Object.entries(config.colors).filter(([key]) => key !== "enabled").map(([key, value]) => [`--nuvolets-${key}`, value])) : undefined;
  return (
    <div className="nuvolets bg-nuvolets-background text-nuvolets-text" data-motion={config.effects.motion} data-custom-colors={config.colors.enabled} style={customColors as CSSProperties}>
      <a href="#nuvolets-main" className="sr-only focus:not-sr-only focus:block focus:p-4">{copy.skip}</a>
      <NuvoletsNav brand={content.brand} logo={content.brandLogoType === "image" ? content.brandLogoImage : ""} links={getVisibleNav(content.nav, content.hiddenSections, "nuvolets")} config={config} topOffset={topOffset} />
      <main id="nuvolets-main">
        {sections.map((section) => <NuvoletsSection key={section.anchor} anchor={section.anchor} content={content} config={config} slug={slug} preview={!!previewLandingId || !slug} heroVariant={sectionSelections?.hero ?? "nuvolets"} />)}
      </main>
      <NuvoletsFooter brand={content.brand} config={config.footer} contact={content.contact} copyrightYear={copyrightYear} hidden={content.hiddenSections ?? []} />
      <NuvoletsMotion enabled={config.effects.motion} />
    </div>
  );
}
