import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted from @fontsource packages so builds never depend on a network call to Google Fonts.
const playfair = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
});
const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: "../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  weight: "100 900",
});
const jetbrainsMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://m16616678.github.io"),
  title: "Adi Narayana Manga | Software Engineer & Technical AI Evaluator",
  description:
    "Portfolio of Adi Narayana Manga: enterprise Java at TCS on CFMS 2.0, healthcare software at Innovision, technical AI evaluation, case studies and a 16-game browser arcade.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Adi Narayana Manga | Software Engineer & Technical AI Evaluator",
    description: "Enterprise Java, healthcare full-stack software, technical AI evaluation and interactive engineering.",
    url: "https://m16616678.github.io/",
    type: "website",
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Adi Manga" },
  icons: { icon: "/favicon.ico", apple: "/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

// Registers the service worker and reloads once when a new version takes control,
// so visitors never stay stuck on a stale cached homepage.
const swScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
      reg.update();
    }).catch(function () {});
    // Only reload when an existing worker is replaced by a new deploy, never on the first install.
    var hadController = !!navigator.serviceWorker.controller;
    var refreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController || refreshed) return;
      refreshed = true;
      if (sessionStorage.getItem('sw-reloaded') !== '1') { sessionStorage.setItem('sw-reloaded', '1'); window.location.reload(); }
    });
  });
}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className={`${playfair.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050507] text-[#e2e8f0] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
