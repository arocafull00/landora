import { redirect } from "next/navigation";
import { getEffectiveClientId } from "@/lib/auth";
import { getBookingSettings } from "@/data/booking-settings";
import { BookingSettingsForm } from "@/components/dashboard/booking/booking-settings-form";

export default async function BookingSettingsPage() {
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const settings = await getBookingSettings(clientId);

  return <BookingSettingsForm settings={settings} />;
}
