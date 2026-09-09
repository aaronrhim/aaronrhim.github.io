import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PROFILE } from "@/lib/content";

/**
 * Two families, and they do genuinely different jobs.
 *
 * Archivo is a grotesque drawn for both display and text, so one family covers
 * the masthead and the body without the usual serif-display-over-sans-body
 * pairing, which has become the default look of a generated page. JetBrains
 * Mono is not decoration: it carries every number and every label, and its
 * tabular figures are why a column of measurements lines up.
 *
 * Both are self-hosted by next/font at build time, so the static export makes
 * no request to Google and there is no layout shift while a webfont arrives.
 */
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

/**
 * Runs before first paint, which is the only way to avoid a flash of the wrong
 * theme. It reads the persisted SETTING and writes both attributes the
 * stylesheet and the toggle depend on - `data-theme-setting` for the raw
 * choice, `data-theme` for the resolved one.
 *
 * Everything is inside try/catch because localStorage throws outright in some
 * contexts (private windows, embedded previews, storage blocked by policy) and
 * a theme preference is never worth a blank page.
 */
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
    /* The font variables go on <html>, not <body>. @theme resolves
       `--font-sans: var(--font-archivo)` at :root, so if next/font declares
       --font-archivo further down the tree the reference is unset where it is
       read and the whole stack silently falls back to system-ui. */
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
        {/* Clears the 56px fixed header, the way al-folio's
            `body.fixed-top-nav { padding-top: 57px }` does. */}
        <main id="main" className="pt-14">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
