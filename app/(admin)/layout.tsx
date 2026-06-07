import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/");
  return <>{children}</>;
}
