import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { PALLET_ROSS_ASSETS } from "@/lib/pallet-ross-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { PALLET_ROSS_TEMPLATE } from "./definition";

export const PALLET_ROSS_DEFAULT_CONTENT: TemplateContentMap["pallet-ross"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  brand: "Pallet Ross",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "ARTIST MARKETPLACE",
    title: "Pallet Ross",
    subtitle: "A place to display your masterpiece.",
    description:
      "Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.",
    image: PALLET_ROSS_ASSETS.card1,
    ctaLabel: "Join for $9.99/m",
  },
  nav: [
    { id: "nav-start", label: "Get Started", href: "#hero" },
    { id: "nav-ecommerce", label: "E-Commerce", href: "#ecommerce" },
    { id: "nav-class", label: "Class", href: "#class" },
    { id: "nav-contacto", label: "Contact", href: "#contacto" },
  ],
  sectionHeadings: PALLET_ROSS_TEMPLATE.headings,
  contact: {
    phone: "+1 555 010 2200",
    email: "hello@palletross.com",
    address: "Brooklyn, NY",
    ctaLabel: "Get in touch",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [],
  testimonials: [],
  about: {
    statement: "Dynamic community where artists and buyers seamlessly merge.",
  },
  gallery: [],
  team: [],
  serviceMenu: [],
  benefits: [],
  faq: [],
};
