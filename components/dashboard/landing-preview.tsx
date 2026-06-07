import type { LandingContent } from "@/lib/dashboard-data";
import { VelarTemplate } from "@/components/templates/velar/velar-template";

export function LandingPreview({ content }: { content: LandingContent }) {
  return (
    <div className="isolate [transform:translateZ(0)] overflow-hidden rounded-lg border border-outline-variant shadow-sm">
      <VelarTemplate content={content} />
    </div>
  );
}
