import { VELAR_ASSETS } from "@/lib/velar-assets";

export { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";

export type DashboardView = "editor" | "assets" | "domain" | "blog";
export type ContentGroup = "Pages" | "Posts" | "Presentations" | "Assets";
export type LandingStatus = "Published" | "Draft" | "Changes";

export type SectionHeading = {
  title: string;
  subtitle: string;
};

export type BrandLogoType = "text" | "image";

export type BaseContent = {
  brand: string;
  brandLogoType: BrandLogoType;
  brandLogoImage: string;
  hero: HeroContent;
  nav: NavLink[];
  sectionHeadings: Partial<Record<string, SectionHeading>>;
  hiddenSections?: string[];
  contact: ContactContent;
  stats: StatContent[];
  testimonials: TestimonialContent[];
};

export type VelarExtensions = {
  story: StoryContent;
  gallery: GalleryItem[];
  spaces: SpaceContent[];
  services: ServiceContent[];
  workflow: WorkflowStep[];
  mapsUrl: string;
};

export type StudioExtensions = {
  about: { statement: string };
  gallery: GalleryItem[];
  team: TeamMember[];
  serviceMenu: ServiceMenuItem[];
  benefits: BenefitItem[];
  faq: FaqItem[];
};

export type WorkExperienceItem = {
  id: string;
  dateRange: string;
  location: string;
  company: string;
  title: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

export type PortfolioExtensions = {
  about: { statement: string };
  gallery: GalleryItem[];
  benefits: BenefitItem[];
  serviceMenu: ServiceMenuItem[];
  workHistory: WorkExperienceItem[];
  faq: FaqItem[];
};

export type RistoranteExtensions = {
  about: { statement: string };
  serviceMenu: ServiceMenuItem[];
  gallery: GalleryItem[];
  team: TeamMember[];
  workflow: WorkflowStep[];
  faq: FaqItem[];
};

export type FloristeriaExtensions = {
  about: { statement: string };
  gallery: GalleryItem[];
  serviceMenu: ServiceMenuItem[];
  team: TeamMember[];
  benefits: BenefitItem[];
  faq: FaqItem[];
};

export type TemplateContentMap = {
  velar: BaseContent & VelarExtensions;
  studio: BaseContent & StudioExtensions;
  portfolio: BaseContent & PortfolioExtensions;
  ristorante: BaseContent & RistoranteExtensions;
  floristeria: BaseContent & FloristeriaExtensions;
  "oficio-pro": BaseContent & StudioExtensions;
};

export type TemplateId = keyof TemplateContentMap;

export type LandingContent = BaseContent &
  Partial<VelarExtensions> &
  Partial<StudioExtensions> &
  Partial<PortfolioExtensions> &
  Partial<RistoranteExtensions> &
  Partial<FloristeriaExtensions>;

export type Landing = {
  id: string;
  name: string;
  slug: string;
  status: LandingStatus;
  edited: string;
  seoTitle: string;
  owner: string;
  template: TemplateId;
  customDomain: string | null;
  content: LandingContent;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  houseImage?: string;
  ctaLabel: string;
};

export type StoryContent = {
  statement: string;
};

export type StatContent = {
  id: string;
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
};

export type GalleryItem = {
  id: string;
  image?: string;
  video?: string;
  title?: string;
  description?: string;
  tags?: string[];
};

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type SpaceContent = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type ServiceContent = {
  id: string;
  title: string;
  subtitle: string;
  label: string;
  image: string;
};

export type WorkflowStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type TestimonialContent = {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
};

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "x";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type ContactContent = {
  phone: string;
  email: string;
  address: string;
  ctaLabel?: string;
  copyrightSuffix?: string;
  copyrightExtra?: string;
  socialLinks?: SocialLink[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type ServiceMenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  image?: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type BlogConfig = {
  title: string;
  description: string;
};

export type Post = {
  id: string;
  landingId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  heroImage: string;
  status: LandingStatus;
  edited: string;
  publishedAt?: string;
};

export type Presentation = {
  id: string;
  title: string;
  audience: string;
  status: LandingStatus;
  slides: PresentationSlide[];
};

export type PresentationSlide = {
  id: string;
  title: string;
  body: string;
};

export type Asset = {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "Published" | "Draft";
  dimensions?: string;
  uploadedBy: string;
  date: string;
  colors: string[];
  url: string;
};

export type IconName =
  | "web"
  | "folder"
  | "settings"
  | "profile"
  | "bell"
  | "help"
  | "search"
  | "add"
  | "more"
  | "document"
  | "drag"
  | "link"
  | "image"
  | "grid"
  | "upload"
  | "copy"
  | "download"
  | "trash"
  | "chevron"
  | "palette"
  | "save"
  | "publish"
  | "check"
  | "close"
  | "info"
  | "tutorial";

export const dashboardViews: Array<{
  id: DashboardView;
  label: string;
  icon: IconName;
}> = [
  { id: "editor", label: "Editor", icon: "document" },
  { id: "assets", label: "Imágenes", icon: "image" },
  { id: "domain", label: "Dominio", icon: "link" },
  { id: "blog", label: "Blog", icon: "document" },
];


export const initialPosts: Post[] = [];

export const initialPresentations: Presentation[] = [
  {
    id: "deck-sales",
    title: "Toll Story Sales Deck",
    audience: "Clientes de eventos privados",
    status: "Draft",
    slides: [
      {
        id: "slide-1",
        title: "Espacios privados para celebrar",
        body: "Tres jardines versátiles en Valencia para eventos familiares, bodas y empresas.",
      },
      {
        id: "slide-2",
        title: "Todo lo necesario incluido",
        body: "Piscina, parking privado, pérgola, descanso, baños y soporte durante la reserva.",
      },
    ],
  },
];

export const initialAssets: Asset[] = [
  {
    id: "hero-banner",
    name: "hero.png",
    type: "PNG Image",
    size: "1.8 MB",
    status: "Published",
    dimensions: "1920 x 1080 px",
    uploadedBy: "Riley Adams",
    date: "Jun 6, 2026 at 14:30",
    colors: ["#213138", "#f5f0ea", "#171717", "#e8e4df"],
    url: VELAR_ASSETS.hero,
  },
  {
    id: "garden-1",
    name: "toll7.jpeg",
    type: "JPEG Image",
    size: "820 KB",
    status: "Published",
    dimensions: "1600 x 1200 px",
    uploadedBy: "Marta Rivera",
    date: "Jun 5, 2026 at 09:12",
    colors: ["#213138", "#10b981", "#f59e0b"],
    url: VELAR_ASSETS.toll7,
  },
  {
    id: "garden-2",
    name: "toll6.jpeg",
    type: "JPEG Image",
    size: "760 KB",
    status: "Published",
    dimensions: "1600 x 1200 px",
    uploadedBy: "Sarah Khan",
    date: "Jun 5, 2026 at 10:44",
    colors: ["#0050cb", "#d0e1fb", "#191b24"],
    url: VELAR_ASSETS.toll6,
  },
];



