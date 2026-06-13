import type { TemplateId } from "@/lib/dashboard-data";
import { VELAR_IMAGE_OPTIONS } from "@/lib/velar-assets";
import { STUDIO_IMAGE_OPTIONS } from "@/lib/studio-assets";
import { PORTFOLIO_IMAGE_OPTIONS } from "@/lib/portfolio-assets";
import { RISTORANTE_IMAGE_OPTIONS } from "@/lib/ristorante-assets";
import { FLORISTERIA_IMAGE_OPTIONS } from "@/lib/floristeria-assets";
import { OFICIO_PRO_IMAGE_OPTIONS } from "@/lib/oficio-pro-assets";

const TEMPLATE_IMAGE_OPTIONS: Record<TemplateId, readonly { value: string; label: string }[]> = {
  velar: VELAR_IMAGE_OPTIONS,
  studio: STUDIO_IMAGE_OPTIONS,
  portfolio: PORTFOLIO_IMAGE_OPTIONS,
  ristorante: RISTORANTE_IMAGE_OPTIONS,
  floristeria: FLORISTERIA_IMAGE_OPTIONS,
  "oficio-pro": OFICIO_PRO_IMAGE_OPTIONS,
};

export function getTemplateImageOptions(
  templateId: TemplateId,
): readonly { value: string; label: string }[] {
  return TEMPLATE_IMAGE_OPTIONS[templateId] ?? [];
}
