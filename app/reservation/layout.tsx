import { ToastProvider } from "@/components/shared/toast-provider";

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
