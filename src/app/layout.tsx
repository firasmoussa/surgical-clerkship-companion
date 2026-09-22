import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-atlas",
});

export const metadata: Metadata = {
  title: { default: "ScrubReady | Prepare for your next case", template: "%s | ScrubReady" },
  metadataBase: new URL("https://www.scrubready.net"),
  icons: { icon: "/icon.svg" },
  openGraph: { siteName: "ScrubReady", title: "ScrubReady | Prepare for your next case", description: "Anatomy, operative steps, and OR questions for your surgical clerkship.", type: "website" },
  description: "Anatomy, operative steps, and OR questions for your surgical clerkship.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${playfair.variable} min-h-screen bg-parchment text-ink antialiased`}>

        <SiteHeader />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <main id="main-content" tabIndex={-1} className="pb-16">{children}</main>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border-warm py-8 text-xs text-muted">
            <span className="font-medium text-secondary">ScrubReady <span className="ml-2 font-normal text-muted">scrubready.net</span></span>
            <span>Educational use only. Not clinical guidance.</span>
          </footer>
        </div>

      </body>
    </html>
  );
}