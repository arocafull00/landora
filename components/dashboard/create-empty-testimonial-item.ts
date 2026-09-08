import type { TestimonialContent } from "@/lib/dashboard-data";

export function createEmptyTestimonialItem(): TestimonialContent {
  return {
    id: crypto.randomUUID(),
    author: "",
    date: "",
    rating: 5,
    comment: "",
    verified: false,
  };
}
