import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surgical Clerkship Companion (Beta)",
  description: "Structured case preparation for medical students on general surgery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="mx-auto max-w-5xl px-4">
          <header className="flex items-center justify-between py-6">
            <div className="text-sm font-semibold tracking-tight">
              Surgical Clerkship Companion <span className="text-slate-500">(Beta)</span>
            </div>
            <nav className="flex gap-4 text-sm text-slate-600">
              <a className="hover:text-slate-900" href="/procedures">
  Procedures
</a>
              <a className="hover:text-slate-900" href="/about">
                About
              </a>
              <a className="hover:text-slate-900" href="/submit">
  Submit
</a>
            </nav>
          </header>

          <main className="pb-16">{children}</main>

          <footer className="border-t py-6 text-xs text-slate-500">
            Educational use only. Not clinical guidance.
          </footer>
        </div>
      </body>
    </html>
  );
}
