import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
} as const;

export function LandingPreview({
  content,
  template = "velar",
}: {
  content: LandingContent;
  template?: TemplateId;
}) {
  const Component = TEMPLATE_COMPONENTS[template] ?? VelarTemplate;

  return (
    <div className="isolate [transform:translateZ(0)] overflow-hidden rounded-lg border border-outline-variant shadow-sm">
      <Component content={content} />
    </div>
  );
}
