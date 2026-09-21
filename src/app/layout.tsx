import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Surgical Clerkship Companion (Beta)",
  description: "Structured case preparation for medical students on general surgery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} min-h-screen bg-parchment text-ink antialiased`}>

        <SiteHeader />

        <div className="mx-auto max-w-5xl px-4">
          <main id="main-content" tabIndex={-1} className="pb-16">{children}</main>

          <footer className="border-t border-border-warm py-6 text-xs text-muted">
            Educational use only. Not clinical guidance.
          </footer>
        </div>

      </body>
    </html>
  );
}