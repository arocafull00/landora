import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTemplate, isValidTemplateId } from "@/lib/template-registry";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import {
  TemplateDemoBar,
  TEMPLATE_DEMO_BAR_HEIGHT,
} from "@/components/admin/template-demo-bar";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
  "oficio-pro": OficioProTemplate,
} as const;

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
  const [{ id }, { embed }] = await Promise.all([params, searchParams]);

  if (!isValidTemplateId(id)) notFound();

  const template = getTemplate(id);
  if (!template) notFound();

  const isEmbed = embed === "1";
  const Component = TEMPLATE_COMPONENTS[id] ?? VelarTemplate;

  return (
    <div style={isEmbed ? undefined : { paddingTop: TEMPLATE_DEMO_BAR_HEIGHT }}>
      {!isEmbed && <TemplateDemoBar label={template.label} />}
      <Component
        content={template.demoContent}
        topOffset={isEmbed ? 0 : TEMPLATE_DEMO_BAR_HEIGHT}
      />
    </div>
  );
}
