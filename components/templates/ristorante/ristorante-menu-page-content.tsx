import { notFound } from "next/navigation";
import { RistoranteMenuPage } from "@/components/templates/ristorante/ristorante-menu-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getCopyrightYear } from "@/lib/copyright-year";

export async function RistoranteMenuPageContent({ slug }: { slug: string }) {
  const [landing, copyrightYear] = await Promise.all([
    getPublishedLandingBySlug(slug),
    getCopyrightYear(),
  ]);
  if (!landing || landing.template !== "ristorante") {
    notFound();
  }

  const content = landing.content;

  return (
    <SiteThemeScope appearance={content.appearance} template="ristorante">
      <RistoranteMenuPage
        content={content}
        copyrightYear={copyrightYear}
        slug={slug}
      />
    </SiteThemeScope>
  );
}
