import { ClerkProvider } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AppInteractionProviders } from "@/components/shared/app-interaction-providers";
import { isAdmin } from "@/lib/is-admin";

export async function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/");

  return (
    <ClerkProvider>
      <AppInteractionProviders>{children}</AppInteractionProviders>
    </ClerkProvider>
  );
}
