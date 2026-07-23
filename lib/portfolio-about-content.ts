import type {
  LandingContent,
  PortfolioAboutPageContent,
} from "@/lib/dashboard-data";

export function resolvePortfolioAboutPageContent(
  content: LandingContent,
): PortfolioAboutPageContent {
  return (
    content.aboutPage ?? {
      title: content.hero.title,
      intro:
        content.story?.statement ??
        content.about?.statement ??
        "",
      image: content.hero.image || content.hero.houseImage || "",
      storyTitle: "Mi historia",
      storyBody: "",
      storyImage: "",
    }
  );
}
