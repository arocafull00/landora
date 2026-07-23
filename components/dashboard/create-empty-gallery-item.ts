import type { GalleryItem } from "@/lib/dashboard-data";

export function createEmptyGalleryItem(): GalleryItem {
  return {
    id: crypto.randomUUID(),
    image: "",
    title: "",
    description: "",
    tags: [],
    link: "",
    linkType: "none",
    projectSlug: "",
    projectBody: "",
    projectGallery: [],
  };
}
