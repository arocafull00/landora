export const PORTFOLIO_ASSETS = {
  hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85&auto=format",
  project1: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85&auto=format",
  project2: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85&auto=format",
  project3: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85&auto=format",
  project4: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=85&auto=format",
  project5: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=85&auto=format",
  project6: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format",
  avatar1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format",
  avatar2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85&auto=format",
  avatar3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&auto=format",
} as const;

export const PORTFOLIO_IMAGE_OPTIONS = [
  { value: PORTFOLIO_ASSETS.hero, label: "Portada" },
  { value: PORTFOLIO_ASSETS.project1, label: "Proyecto 1" },
  { value: PORTFOLIO_ASSETS.project2, label: "Proyecto 2" },
  { value: PORTFOLIO_ASSETS.project3, label: "Proyecto 3" },
  { value: PORTFOLIO_ASSETS.project4, label: "Proyecto 4" },
  { value: PORTFOLIO_ASSETS.project5, label: "Proyecto 5" },
  { value: PORTFOLIO_ASSETS.avatar1, label: "Avatar 1" },
  { value: PORTFOLIO_ASSETS.avatar2, label: "Avatar 2" },
] as const;
