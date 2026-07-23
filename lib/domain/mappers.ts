import type { AssetDto, BlogPostDto } from "@/lib/domain/dtos";

export function toAssetDto(row: {
  id: string;
  publicId: string;
  url: string;
  name: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  createdAt: Date | null;
}): AssetDto {
  return {
    id: row.id,
    publicId: row.publicId,
    url: row.url,
    name: row.name,
    mimeType: row.mimeType,
    width: row.width,
    height: row.height,
    createdAt: row.createdAt?.toISOString() ?? null,
  };
}

export function toBlogPostDto(row: {
  id: string;
  landingId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  heroImage: string;
  published: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}): BlogPostDto {
  return {
    id: row.id,
    landingId: row.landingId,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    heroImage: row.heroImage,
    published: row.published,
    createdAt: row.createdAt?.toISOString() ?? null,
    updatedAt: row.updatedAt?.toISOString() ?? null,
  };
}
