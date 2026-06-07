import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
} as const;

export function LandingPreview({
  clip = true,
  content,
  template = "velar",
}: {
  clip?: boolean;
  content: LandingContent;
  template?: TemplateId;
}) {
  const Component = TEMPLATE_COMPONENTS[template] ?? VelarTemplate;

  return (
    <div
      className={`isolate [transform:translateZ(0)] rounded-lg border border-outline-variant shadow-sm ${
        clip ? "overflow-hidden" : "overflow-visible"
      }`}
    >
      <Component content={content} />
    </div>
  );
}
