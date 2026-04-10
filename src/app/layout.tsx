import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
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

        <header className="bg-charcoal px-6 h-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-[22px] h-[22px] bg-ochre rounded-[4px] flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="1.5" x2="5" y2="8.5" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="1.5" y1="5" x2="8.5" y2="5" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-serif italic text-[15px] text-[#E8DDD0]">
              Surgical Clerkship Companion
            </span>
          </a>

          <nav className="flex items-center gap-6">
            <a href="/procedures" className="text-[12px] text-muted hover:text-[#E8DDD0] transition-colors">
              Procedures
            </a>
            <a href="/submit" className="text-[12px] text-muted hover:text-[#E8DDD0] transition-colors">
              Submit
            </a>
          </nav>
        </header>

        <div className="mx-auto max-w-5xl px-4">
          <main className="pb-16">{children}</main>

          <footer className="border-t border-border-warm py-6 text-xs text-muted">
            Educational use only. Not clinical guidance.
          </footer>
        </div>

      </body>
    </html>
  );
}