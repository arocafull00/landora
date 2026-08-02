import "server-only";
import { cacheLife } from "next/cache";

export async function getPublicRenderTime() {
  "use cache";
  cacheLife("minutes");
  return new Date();
}
