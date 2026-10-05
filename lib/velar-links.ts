import { getWhatsAppLink } from "@/lib/whatsapp-link";
import { getCompanyMapsHref } from "@/lib/company-details";

export const VELAR_WHATSAPP_MESSAGE =
  "Hola! Me podríais dar información sobre la disponibilidad en vuestro espacio?";

export const VELAR_CTA_LABEL = "Consulta disponibilidad";

export const VELAR_MAPS_QUERY = "Toll Story Valencia";

export const VELAR_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VELAR_MAPS_QUERY)}`;

export const VELAR_INSTAGRAM_URL = "https://www.instagram.com/tollstory/";

export function getVelarWhatsAppLink(phone: string) {
  return getWhatsAppLink(phone, VELAR_WHATSAPP_MESSAGE);
}

export function getVelarMapsHref(
  mapsUrl: string | undefined,
  address: string,
) {
  return getCompanyMapsHref(address) || mapsUrl?.trim() || "";
}

export function getVelarMapsEmbedSrc(mapsHref: string) {
  if (!mapsHref) return "";
  if (mapsHref.includes("output=embed")) return mapsHref;

  try {
    const url = new URL(mapsHref);
    const query = url.searchParams.get("query") || url.searchParams.get("q");
    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }
  } catch {
    return `https://www.google.com/maps?q=${encodeURIComponent(VELAR_MAPS_QUERY)}&output=embed`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(VELAR_MAPS_QUERY)}&output=embed`;
}
