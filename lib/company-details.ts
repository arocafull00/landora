import type { ContactContent, LandingContent, SocialLink, SocialPlatform } from "@/lib/dashboard-data";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { getSocialUrl, SOCIAL_PLATFORM_LABELS } from "@/lib/footer-content";
import { getWhatsAppLink } from "@/lib/whatsapp-link";

const SOCIAL_HOSTS: Record<string, SocialPlatform> = {
  "instagram.com": "instagram", "facebook.com": "facebook", "fb.com": "facebook",
  "linkedin.com": "linkedin", "tiktok.com": "tiktok", "youtube.com": "youtube",
  "youtu.be": "youtube", "x.com": "x", "twitter.com": "x",
};

function getSocialPlatform(href: string): SocialPlatform | undefined {
  try {
    const host = new URL(href).hostname;
    return Object.entries(SOCIAL_HOSTS).find(([domain]) => host === domain || host.endsWith(`.${domain}`))?.[1];
  } catch {
    return undefined;
  }
}

export function getCompanyMapsHref(address: string) {
  return address.trim() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}` : "";
}

export function getCompanyHref(href: string, contact: ContactContent) {
  if (href.startsWith("tel:")) return contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : "";
  if (href.startsWith("mailto:")) return contact.email ? `mailto:${contact.email}` : "";
  let url: URL;
  try { url = new URL(href); } catch { return href; }
  if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com" || url.hostname === "web.whatsapp.com") {
    return getWhatsAppLink(contact.phone, url.searchParams.get("text") ?? "");
  }
  const platform = getSocialPlatform(href);
  if (platform) return getSocialUrl(contact, platform);
  return href;
}

export function getLegacyCompanySocialLinks(links: SocialLink[], config: NuvoletsContent | undefined): SocialLink[] {
  if (!config) return links;
  const result = [...links];
  for (const { href } of [{ href: config.instagram.url }, ...config.footer.socialLinks]) {
    const platform = getSocialPlatform(href);
    if (!platform || result.some((link) => link.platform === platform)) continue;
    result.push({ platform, url: href });
  }
  return result;
}

export function updateCompanyContact(content: LandingContent, patch: Partial<ContactContent>): LandingContent {
  const contact = { ...content.contact, ...patch };
  const config = content.nuvolets;
  if (!config || patch.socialLinks === undefined) return { ...content, contact };
  return {
    ...content, contact,
    nuvolets: {
      ...config,
      instagram: { ...config.instagram, url: getSocialUrl(contact, "instagram") },
      footer: { ...config.footer, socialLinks: (contact.socialLinks ?? []).map((link) => ({ id: link.platform, label: SOCIAL_PLATFORM_LABELS[link.platform], href: link.url })) },
    },
  };
}

export function syncCompanyContent(content: LandingContent): LandingContent {
  const contact = content.contact;
  const resolve = (href: string) => getCompanyHref(href, contact);
  const nav = content.nav.map((item) => ({ ...item, href: resolve(item.href) })).filter((item) => item.href);
  const mapsUrl = getCompanyMapsHref(contact.address);
  const config = content.nuvolets;
  if (!config) return { ...content, nav, mapsUrl };
  const mapLink = <T extends { href: string }>(item: T): T => ({ ...item, href: resolve(item.href) });
  return {
    ...content, nav, mapsUrl,
    nuvolets: {
      ...config,
      heroDetails: { ...config.heroDetails, primaryHref: resolve(config.heroDetails.primaryHref), secondaryHref: resolve(config.heroDetails.secondaryHref) },
      categories: config.categories.map(mapLink),
      products: config.products.map((item) => ({ ...item, ...(item.href ? { href: resolve(item.href) } : {}) })),
      collection: { ...config.collection, href: resolve(config.collection.href) },
      story: { ...config.story, ctaHref: resolve(config.story.ctaHref) },
      store: { ...config.store, mapsUrl, secondaryHref: resolve(config.store.secondaryHref) },
      instagram: { ...config.instagram, url: getSocialUrl(contact, "instagram"), images: config.instagram.images.map((item) => ({ ...item, href: getSocialUrl(contact, "instagram") })) },
      footer: {
        ...config.footer,
        exploreLinks: config.footer.exploreLinks.map(mapLink),
        infoLinks: config.footer.infoLinks.map(mapLink),
        socialLinks: (contact.socialLinks ?? []).map((link) => ({ id: link.platform, label: SOCIAL_PLATFORM_LABELS[link.platform], href: link.url })),
      },
    },
  };
}
