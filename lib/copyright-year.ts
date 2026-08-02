import "server-only";
import { cacheLife } from "next/cache";

export async function getCopyrightYear() {
  "use cache";
  cacheLife("hours");
  return new Date().getFullYear();
}
