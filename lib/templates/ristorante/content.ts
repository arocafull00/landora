import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { RISTORANTE_TEMPLATE } from "@/lib/templates/ristorante/definition";

export const RISTORANTE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=90",
  sharing: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1200&q=88",
  month: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1400&q=90",
  interior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=88",
  table: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=88",
  detail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=88",
};

export const RISTORANTE_DEFAULT_CONTENT: TemplateContentMap["ristorante"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  brand: "L'ITALIANO",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "DAL 1987",
    title: "L'ITALIANO",
    subtitle: "Auténtica cocina italiana\nhecha para compartir.",
    description: "Cucina · Famiglia · Amore",
    image: RISTORANTE_IMAGES.hero,
    ctaLabel: "RESERVAR",
  },
  nav: [
    { id: "nav-menu", label: "CARTA", href: "#carta" },
    { id: "nav-about", label: "NOSOTROS", href: "#nosotros" },
    { id: "nav-gallery", label: "GALERÍA", href: "#galeria" },
    { id: "nav-contact", label: "CONTACTO", href: "#contacto" },
  ],
  sectionHeadings: RISTORANTE_TEMPLATE.headings,
  contact: {
    phone: "+34 600 000 000",
    email: "",
    address: "Carrer d'Italia, 12 · Valencia",
    ctaLabel: "RESERVAR MESA",
    copyrightSuffix: "FATTO CON AMORE",
    socialLinks: [{ platform: "instagram", url: "https://www.instagram.com/litaliano.pizzeria/" }],
  },
  stats: [],
  testimonials: [],
  story: { statement: "Aquí no contamos porciones. Ponemos platos en medio, servimos otra ronda y dejamos que la conversación haga el resto." },
  gallery: [
    { id: "sharing", image: RISTORANTE_IMAGES.sharing, title: "Pizza para compartir" },
    { id: "month", image: RISTORANTE_IMAGES.month, title: "Pizza especial del mes", description: "HIGOS" },
    { id: "interior", image: RISTORANTE_IMAGES.interior, title: "Interior cálido de restaurante" },
    { id: "table", image: RISTORANTE_IMAGES.table, title: "Mesa de restaurante italiano" },
    { id: "detail", image: RISTORANTE_IMAGES.detail, title: "Detalle de restaurante" },
  ],
  serviceMenu: [
    { id: "margherita", category: "PIZZAS", name: "MARGHERITA", price: "12,50 €", description: "Tomate · fior di latte · albahaca · AOVE", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
    { id: "diavola", category: "PIZZAS", name: "DIAVOLA", price: "14,50 €", description: "Tomate · mozzarella · salame piccante · guindilla", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85" },
    { id: "burrata", category: "PIZZAS", name: "BURRATA", price: "16,00 €", description: "Tomate · burrata · cherry · pesto · parmesano", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
    { id: "prosciutto", category: "PIZZAS", name: "PROSCIUTTO", price: "15,50 €", description: "Mozzarella · prosciutto · rúcula · parmigiano", image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85" },
    { id: "carbonara", category: "PASTA", name: "CARBONARA", price: "14,00 €", description: "Guanciale · pecorino · yema · pimienta negra", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85" },
    { id: "pesto", category: "PASTA", name: "PESTO", price: "13,50 €", description: "Albahaca · piñones · parmesano · ajo · AOVE", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85" },
    { id: "rigatoni", category: "PASTA", name: "RIGATONI", price: "14,50 €", description: "Tomate · crema · parmigiano · chile", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85" },
    { id: "antipasto", category: "ENTRANTES", name: "ANTIPASTO", price: "15,00 €", description: "Mortadella · prosciutto · quesos · focaccia", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85" },
    { id: "bruschetta", category: "ENTRANTES", name: "BRUSCHETTA", price: "8,50 €", description: "Pan tostado · tomate · ajo · albahaca · AOVE", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85" },
    { id: "tiramisu", category: "POSTRES", name: "TIRAMISÙ", price: "7,00 €", description: "Mascarpone · café · cacao · savoiardi", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" },
    { id: "panna-cotta", category: "POSTRES", name: "PANNA COTTA", price: "6,50 €", description: "Vainilla · frutos rojos · limón", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85" },
    { id: "cannoli", category: "POSTRES", name: "CANNOLI", price: "6,00 €", description: "Ricotta dulce · pistacho · naranja", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85" },
  ],
  benefits: [
    { id: "figs", title: "Higos", description: "", icon: "ArrowUpRight" },
    { id: "burrata", title: "Burrata", description: "", icon: "ArrowUpRight" },
    { id: "ham", title: "Jamón serrano", description: "", icon: "ArrowUpRight" },
    { id: "pistachio", title: "Pistachos", description: "", icon: "ArrowUpRight" },
  ],
  workflow: [{ id: "hours", number: "HORARIO", title: "Mar–Dom · 13:00–00:00", description: "" }],
};

export const RISTORANTE_IMAGE_OPTIONS = [
  ...Object.entries(RISTORANTE_IMAGES).map(([label, value]) => ({ label, value })),
  ...RISTORANTE_DEFAULT_CONTENT.serviceMenu.map((item) => ({ label: item.name, value: item.image ?? "" })),
];
