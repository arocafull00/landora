import { IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";

const dashboardHeadline = IBM_Plex_Sans({
  variable: "--font-source-headline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-source-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dashboardLabel = JetBrains_Mono({
  variable: "--font-source-label",
  subsets: ["latin"],
  weight: ["500"],
});

export const dashboardFontVariables = [
  dashboardHeadline.variable,
  inter.variable,
  dashboardLabel.variable,
].join(" ");
