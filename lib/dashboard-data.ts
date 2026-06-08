import { VELAR_DEFAULT_CONTENT } from "@/lib/default-content";
import { VELAR_ASSETS } from "@/lib/velar-assets";

export type DashboardView = "editor" | "assets";
export type ContentGroup = "Pages" | "Posts" | "Presentations" | "Assets";
export type LandingStatus = "Published" | "Draft" | "Changes";

export type BaseContent = {
  brand: string;
  hero: HeroContent;
  nav: NavLink[];
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
};

export type StudioExtensions = {
  about: { statement: string };
  gallery: GalleryItem[];
  team: TeamMember[];
  serviceMenu: ServiceMenuItem[];
  benefits: BenefitItem[];
  faq: FaqItem[];
};

export type PortfolioExtensions = {
  about: { statement: string };
  gallery: GalleryItem[];
  benefits: BenefitItem[];
  serviceMenu: ServiceMenuItem[];
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
  content: LandingContent;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  houseImage?: string;
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

export type ContactContent = {
  phone: string;
  email: string;
  address: string;
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

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: LandingStatus;
  edited: string;
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
  | "info";

export const dashboardViews: Array<{
  id: DashboardView;
  label: string;
  icon: IconName;
}> = [
  { id: "editor", label: "Editor", icon: "document" },
  { id: "assets", label: "Assets", icon: "folder" },
];

export function isDashboardView(value: string): value is DashboardView {
  return dashboardViews.some((view) => view.id === value);
}

export const workspaceTabs = ["Structure", "Presentation", "Vision", "Media"];
export const contentGroups: ContentGroup[] = ["Pages", "Posts", "Presentations", "Assets"];
export const editorTabs = ["Hero", "Historia", "Espacios", "Servicios", "Posts", "Presentaciones"];

export const initialLandings: Landing[] = [
  {
    id: "toll-story",
    name: "Toll Story",
    slug: "/toll-story",
    status: "Draft",
    edited: "Just now",
    seoTitle: "Toll Story | Espacios para eventos en Valencia",
    owner: "Riley",
    template: "velar",
    content: VELAR_DEFAULT_CONTENT,
  },
  {
    id: "black-friday",
    name: "Black Friday",
    slug: "/bfcm-24",
    status: "Published",
    edited: "2 hours ago",
    seoTitle: "Black Friday 2024 Huge Deals",
    owner: "Sarah",
    template: "velar",
    content: {
      brand: "Black Friday.",
      hero: {
        eyebrow: "PROMO",
        title: "BLACK FRIDAY",
        subtitle: "Campaña limitada para clientes premium.",
        description: "Landing promocional con CTA directo y bloques de producto.",
        image: VELAR_ASSETS.toll4,
        houseImage: VELAR_ASSETS.hero,
      },
      story: {
        statement:
          "Una campaña compacta para validar ofertas, medir conversiones y publicar cambios sin depender de despliegues.",
      },
      stats: [
        { id: "conversion", value: "12", label: "Variantes activas" },
        { id: "leads", value: "430", label: "Leads captados" },
        { id: "sales", value: "88", label: "Ventas atribuidas" },
      ],
      gallery: [],
      nav: [],
      spaces: [],
      services: [],
      workflow: [],
      testimonials: [],
      contact: {
        phone: "+34 600 00 00 00",
        email: "marketing@landora.test",
        address: "Campaña ecommerce",
      },
    },
  },
];

export const initialPosts: Post[] = [
  {
    id: "post-eventos-valencia",
    title: "Cómo elegir un espacio para eventos en Valencia",
    slug: "/blog/espacios-eventos-valencia",
    excerpt: "Criterios prácticos para seleccionar una finca privada para bodas, comuniones o empresa.",
    body: "Evalúa capacidad, accesos, zonas de descanso, aparcamiento, sombra y soporte del equipo antes de reservar.",
    status: "Draft",
    edited: "Just now",
  },
  {
    id: "post-celebraciones",
    title: "Ideas para celebraciones familiares al aire libre",
    slug: "/blog/celebraciones-aire-libre",
    excerpt: "Una guía para convertir un jardín privado en una experiencia cómoda para todos.",
    body: "Planifica recorridos, zonas de comida, música, descanso, sombra y puntos de agua para que el evento fluya.",
    status: "Published",
    edited: "Yesterday",
  },
];

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

export const folders = [
  { name: "Images", items: "9 items" },
  { name: "Documents", items: "2 items" },
  { name: "Presentations", items: "1 item" },
];

export const settingCategories = ["General", "Team", "API", "Billing"];
export const settingPages = ["Project Info", "Domains", "Environment", "Danger Zone"];
