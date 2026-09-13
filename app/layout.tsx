import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PROFILE } from "@/lib/content";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aaronrhim.github.io"),
  title: {
    default: `${PROFILE.name} - ${PROFILE.role}`,
    template: `%s - ${PROFILE.name}`,
  },
  description:
    "Aaron Rhim writes the control software for a Mars rover arm at UBC and builds pose estimation from consumer wearables. Founder of Eithelmir, software co-lead on UBC Rover.",
  openGraph: {
    title: `${PROFILE.name} - ${PROFILE.role}`,
    description:
      "9.8 cm mean joint error from a pair of glasses and two wrist IMUs. A rover arm at 100 Hz.",
    type: "website",
  },
};

const themeScript = `
(function () {
  try {
    var s = localStorage.getItem("theme") || "system";
    var d = s === "dark" || (s === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.themeSetting = s;
    document.documentElement.dataset.theme = d ? "dark" : "light";
  } catch (e) {
    document.documentElement.dataset.themeSetting = "system";
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="bg-bg text-text focus:border-rule sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />

        <main id="main" className="pt-18">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
