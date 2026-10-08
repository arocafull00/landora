import { TemplateRenderer } from "@/components/templates/template-renderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTemplate, isAvailableTemplateId } from "@/lib/template-registry";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import {
  TemplateDemoBar,
  TEMPLATE_DEMO_BAR_HEIGHT,
} from "@/components/admin/template-demo-bar";
import { getCopyrightYear } from "@/lib/copyright-year";
import { getPublicRenderTime } from "@/lib/public-render-time";
import { resolveLandingAppearance } from "@/lib/site-appearance";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function TemplateDemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const [{ id }, { embed }, copyrightYear, renderedAt] = await Promise.all([
    params,
    searchParams,
    getCopyrightYear(),
    getPublicRenderTime(),
  ]);

  if (!isAvailableTemplateId(id)) notFound();

  const template = getTemplate(id);
  if (!template) notFound();

  const isEmbed = embed === "1";
  const content = { ...await template.loadContent(), rendererVersion: template.rendererVersion };
  const appearance = resolveLandingAppearance(id, content.appearance);

  return (
    <div style={isEmbed ? undefined : { paddingTop: TEMPLATE_DEMO_BAR_HEIGHT }}>
      {!isEmbed && <TemplateDemoBar label={template.label} />}
      <SiteThemeScope appearance={appearance} template={id}>
        <TemplateRenderer
          template={id}
          content={content}
          copyrightYear={copyrightYear}
          renderedAt={renderedAt}
          topOffset={isEmbed ? 0 : TEMPLATE_DEMO_BAR_HEIGHT}
          {...(id === "signal" ? { demoMode: true } : {})}
        />
      </SiteThemeScope>
    </div>
  );
}
