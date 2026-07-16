import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { siteFontVariables } from "@/lib/site-fonts";

export const metadata: Metadata = {
  title: "Landora",
  description: "Dashboard para gestionar landings multi-tenant.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="es"
        className={`${siteFontVariables} h-full antialiased`}
        suppressHydrationWarning
      >
        <body
          className="min-h-full overflow-hidden bg-surface-bg text-on-background"
          suppressHydrationWarning
        >
          <Analytics />
          <SpeedInsights />
          <TooltipProvider>
            {children}
            <ToastContainer />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
