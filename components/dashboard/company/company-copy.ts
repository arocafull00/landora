import type { CompanyDetailsValues } from "@/lib/schemas/company-details";

export const COMPANY_COPY = {
  title: "Datos de la empresa",
  description: "Gestiona los datos de contacto que se utilizan en toda tu web.",
  contact: "Contacto",
  phoneHelp: "Este número se utiliza también en WhatsApp y en el catálogo. Incluye el prefijo internacional, por ejemplo +34600111222.",
  social: "Redes sociales",
  socialHelp: "Añade la URL completa de cada perfil. Deja el campo vacío si no utilizas esa red.",
  save: "Guardar datos",
  saving: "Guardando…",
  invalid: "Revisa los datos de la empresa",
  draft: "Los datos se guardan en el borrador. Publica desde el editor para actualizar tu web pública.",
  editor: "Ir al editor",
  link: "Editar datos de la empresa",
  skip: "Saltar al contenido",
  urlPlaceholder: "https://",
} as const;

export const COMPANY_CONTACT_FIELDS = [
  { name: "phone", label: "Teléfono / WhatsApp", type: "tel", autoComplete: "tel", placeholder: "+34600111222" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "" },
  { name: "address", label: "Dirección", type: "text", autoComplete: "street-address", placeholder: "" },
] as const satisfies readonly { name: keyof CompanyDetailsValues; label: string; type: string; autoComplete: string; placeholder: string }[];

export const COMPANY_SOCIAL_FIELDS = [
  { name: "instagram", label: "Instagram" },
  { name: "facebook", label: "Facebook" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "tiktok", label: "TikTok" },
  { name: "youtube", label: "YouTube" },
  { name: "x", label: "X" },
] as const;
