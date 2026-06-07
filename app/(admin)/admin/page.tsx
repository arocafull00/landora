import { getAllUsers, getAllLandingPages } from "@/data/admin";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const [users, landingPages] = await Promise.all([
    getAllUsers(),
    getAllLandingPages(),
  ]);

  const validViews = ["users", "templates", "settings"] as const;
  type AdminView = (typeof validViews)[number];
  const initialView: AdminView = validViews.includes(view as AdminView)
    ? (view as AdminView)
    : "users";

  return (
    <AdminShell
      initialView={initialView}
      landingPages={landingPages}
      users={users}
    />
  );
}
