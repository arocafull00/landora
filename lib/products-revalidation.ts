import "server-only";
import { revalidatePath, updateTag } from "next/cache";

export function revalidateProductRoutes(landing: { id: string; slug: string }) {
  updateTag(`catalog:${landing.id}`);
  revalidatePath("/products", "layout");
  revalidatePath(`/${landing.slug.replace(/^\/+|\/+$/g, "")}`, "layout");
  revalidatePath(`/preview/${landing.id}`, "layout");
  revalidatePath("/editor");
}
