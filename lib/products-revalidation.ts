import "server-only";
import { revalidatePath } from "next/cache";

export function revalidateProductRoutes(landing: { id: string; slug: string }) {
  revalidatePath("/products", "layout");
  revalidatePath(`/${landing.slug.replace(/^\/+|\/+$/g, "")}`, "layout");
  revalidatePath(`/preview/${landing.id}`, "layout");
  revalidatePath("/editor");
}
