import type { Metadata } from "next";
import { getPublicLandingUrl } from "@/lib/public-site-url";

type PublicMetadataLanding = {
  name: string;
  slug: string;
  customDomain?: string | null;
  branding?: { brand: string } | null;
  seo?: {
    favicon: string;
    socialImage: string;
  } | null;
  hero?: {
    image: string;
    houseImage: string;
    fanImages: string[];
  } | null;
};

type PublicSiteMetadataParams = {
  landing: PublicMetadataLanding;
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  type?: "article" | "website";
};

function resolvePublicImageUrl(value: string, canonicalUrl: string) {
  const normalized = value.trim();
  if (!normalized) return null;

  try {
    const url = new URL(normalized, canonicalUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function getSocialImage(
  landing: PublicMetadataLanding,
  canonicalUrl: string,
  routeImage: string | undefined,
) {
  const candidates = [
    routeImage,
    landing.seo?.socialImage,
    landing.hero?.image,
    landing.hero?.houseImage,
    landing.hero?.fanImages[0],
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const resolved = resolvePublicImageUrl(candidate, canonicalUrl);
    if (resolved) return resolved;
  }

  return null;
}

export function createPublicSiteMetadata({
  landing,
  title,
  description,
  pathname = "",
  image,
  type = "website",
}: PublicSiteMetadataParams): Metadata {
  const canonicalUrl = getPublicLandingUrl(landing, pathname);
  const brand = landing.branding?.brand || landing.name;
  const socialImage = getSocialImage(landing, canonicalUrl, image);
  const images = socialImage ? [socialImage] : undefined;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    icons: landing.seo?.favicon ? { icon: landing.seo.favicon } : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: brand,
      type,
      images,
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}
