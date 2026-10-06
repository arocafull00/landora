import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

const dashboardHeadline = IBM_Plex_Sans({
  variable: "--font-source-headline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  variable: "--font-source-inter",
  weight: "100 900",
  style: "normal",
  display: "swap",
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
