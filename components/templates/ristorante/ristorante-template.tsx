import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteFontScope } from "@/components/templates/ristorante/ristorante-font-scope";
import { RistoranteTemplateClient } from "@/components/templates/ristorante/ristorante-template-client";

export function RistoranteTemplate({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  return (
    <RistoranteFontScope>
      <RistoranteTemplateClient
        content={content}
        topOffset={topOffset}
        slug={slug}
        bookingEnabled={bookingEnabled}
      />
    </RistoranteFontScope>
  );
}
