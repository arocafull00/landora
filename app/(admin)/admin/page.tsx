import {
  getAllBookingManualAccess,
  getAllLandingPages,
  getAllUsers,
} from "@/data/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAllProductsAccess } from "@/data/product-access";

const VALID_VIEWS = ["users", "templates", "settings"] as const;
type AdminView = (typeof VALID_VIEWS)[number];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const [{ view }, users, landingPages, bookingManualAccess, productsManualAccess] = await Promise.all([
    searchParams,
    getAllUsers(),
    getAllLandingPages(),
    getAllBookingManualAccess(),
    getAllProductsAccess(),
  ]);

  const initialView: AdminView = VALID_VIEWS.includes(view as AdminView)
    ? (view as AdminView)
    : "users";

  return (
    <AdminShell
      initialView={initialView}
      bookingManualAccess={bookingManualAccess}
      productsManualAccess={productsManualAccess}
      landingPages={landingPages}
      users={users}
    />
  );
}
