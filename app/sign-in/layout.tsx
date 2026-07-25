import { ClerkProvider } from "@clerk/nextjs";
import { DashboardThemeScope } from "@/components/dashboard/dashboard-theme-scope";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <DashboardThemeScope />
      {children}
    </ClerkProvider>
  );
}
