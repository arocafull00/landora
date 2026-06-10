import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, JetBrains_Mono, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Landora",
  description: "Dashboard para gestionar landings multi-tenant.",
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
        className={`${ibmPlexSans.variable} ${inter.variable} ${jetBrainsMono.variable} ${syne.variable} ${playfairDisplay.variable} h-full antialiased`}
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
