import {
  DEFAULT_COPYRIGHT_SUFFIX,
  type ContactContent,
  type SocialLink,
  type SocialPlatform,
} from "@/lib/dashboard-data";

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "instagram",
  "facebook",
  "linkedin",
  "tiktok",
  "youtube",
  "x",
];

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
};

function isSocialPlatform(value: string): value is SocialPlatform {
  return SOCIAL_PLATFORMS.includes(value as SocialPlatform);
}

export function normalizeSocialUrl(value: string): string {
  const url = value.trim();
  if (/^(?:www\.)?(?:instagram\.com|facebook\.com|fb\.com|linkedin\.com|tiktok\.com|youtube\.com|youtu\.be|x\.com|twitter\.com)(?:[/?#]|$)/i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

export function parseSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const platform = "platform" in item && typeof item.platform === "string" ? item.platform : "";
    const url = "url" in item && typeof item.url === "string" ? normalizeSocialUrl(item.url) : "";
    if (!isSocialPlatform(platform) || !url) return [];
    return [{ platform, url }];
  });
}

function getCopyrightSuffix(contact: ContactContent): string {
  return contact.copyrightSuffix?.trim() || DEFAULT_COPYRIGHT_SUFFIX;
}

export function getCopyrightLine(
  brand: string,
  contact: ContactContent,
  year: number,
): string {
  const normalizedBrand = brand.replace(".", "");
  return `Copyright © ${year} ${normalizedBrand} ${getCopyrightSuffix(contact)}`;
}

export function getFooterAnchor(templateId: string): string {
  if (templateId === "velar") return "inquire";
  return "contacto";
}

export function getSocialUrl(contact: ContactContent, platform: SocialPlatform): string {
  return contact.socialLinks?.find((link) => link.platform === platform)?.url ?? "";
}

export function buildSocialLinks(
  contact: ContactContent,
  platform: SocialPlatform,
  url: string,
): SocialLink[] {
  const trimmedUrl = url.trim();
  const otherLinks = (contact.socialLinks ?? []).filter((link) => link.platform !== platform);
  if (!trimmedUrl) return otherLinks;
  return [...otherLinks, { platform, url: trimmedUrl }];
}
