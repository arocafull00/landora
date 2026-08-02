import { ToastProvider } from "@/components/shared/toast-provider";

export default function PublicBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
